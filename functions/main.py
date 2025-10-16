"""Firebase Cloud Function implementing the AI DevOps workflow."""
import base64
import json
import os
import uuid
from typing import Dict

import functions_framework
import requests

# --- Firebase Environment Configuration ---
# These values should be configured via Firebase environment configuration or
# Google Secret Manager and exposed as environment variables when the function
# runs in production.
GITHUB_API_TOKEN = os.environ.get("GITHUB_TOKEN")
GITHUB_REPO_OWNER = os.environ.get("GITHUB_REPO_OWNER")
GITHUB_REPO_NAME = os.environ.get("GITHUB_REPO_NAME")
GITHUB_DEFAULT_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")


# --- External AI Service (Conceptual) ---
def call_external_ai_for_code(natural_language_command: str) -> Dict[str, str]:
    """Simulates a call to an external AI model that returns generated code."""
    print(f"Calling external AI for command: '{natural_language_command}'")

    simulated_ai_output = {
        "src/new_feature_firebase.py": f"""
# AI-generated Python code for Firebase environment
def calculate_firebase_value(data):
    # Logic based on AI command: {natural_language_command}
    print("Calculating Firebase value for:", data)
    return len(data) * 20 # A different calculation for Firebase!

def greet_from_firebase():
    return "Hello from Firebase AI-generated code!"
""",
        "src/main.py": f"""
import new_feature_firebase

def run_firebase_app():
    print("Firebase application starting...")
    sample_data = [10, 20]
    result = new_feature_firebase.calculate_firebase_value(sample_data)
    print(f"Firebase AI feature calculated result: {{result}}")
    print(new_feature_firebase.greet_from_firebase())

# This would typically not be executed directly in a Cloud Function context
# but shown for clarity of AI-generated content.
if __name__ == "__main__":
    run_firebase_app()
""",
    }
    return simulated_ai_output


# --- GitHub API Interactions ---
def github_api_request(method: str, path: str, data: Dict | None = None) -> Dict:
    """Helper to make authenticated GitHub API requests."""
    if not (GITHUB_API_TOKEN and GITHUB_REPO_OWNER and GITHUB_REPO_NAME):
        raise ValueError("GitHub repository configuration is missing.")

    url = f"https://api.github.com/repos/{GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}{path}"
    headers = {
        "Authorization": f"token {GITHUB_API_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    }

    print(f"GitHub API request: {method} {url}")
    response = requests.request(method, url, headers=headers, data=json.dumps(data) if data else None)
    response.raise_for_status()
    return response.json()


def get_latest_commit_sha(branch: str) -> str:
    """Gets the SHA of the latest commit on a branch."""
    ref_info = github_api_request("GET", f"/git/ref/heads/{branch}")
    return ref_info["object"]["sha"]


def create_git_ref(new_branch_name: str, sha: str) -> Dict:
    """Creates a new Git reference (branch)."""
    data = {
        "ref": f"refs/heads/{new_branch_name}",
        "sha": sha,
    }
    return github_api_request("POST", "/git/refs", data=data)


def get_file_sha(file_path: str, branch: str) -> str | None:
    """Gets the SHA of a file on a given branch."""
    try:
        content_info = github_api_request("GET", f"/contents/{file_path}?ref={branch}")
        return content_info.get("sha")
    except requests.exceptions.HTTPError as exc:  # pragma: no cover - simple passthrough
        if exc.response.status_code == 404:
            return None
        raise


def update_file_content(
    file_path: str,
    content: str,
    commit_message: str,
    branch: str,
    sha: str | None = None,
) -> Dict:
    """Creates or updates a file's content."""
    encoded_content = base64.b64encode(content.encode("utf-8")).decode("utf-8")
    data: Dict[str, str] = {
        "message": commit_message,
        "content": encoded_content,
        "branch": branch,
    }
    if sha:
        data["sha"] = sha

    print(f"Updating file: {file_path} on branch {branch}")
    return github_api_request("PUT", f"/contents/{file_path}", data=data)


def create_pull_request(
    head_branch: str,
    base_branch: str,
    title: str = "AI Generated Feature/Fix",
    body: str = "This PR contains AI-generated code. Please review thoroughly.",
) -> str:
    """Creates a Pull Request on GitHub."""
    data = {
        "title": title,
        "head": head_branch,
        "base": base_branch,
        "body": body,
    }
    print(f"Creating PR from {head_branch} to {base_branch}")
    pr_info = github_api_request("POST", "/pulls", data=data)
    return pr_info.get("html_url")


@functions_framework.http
def ai_devops_agent(request):
    """Entry point for the AI-driven DevOps workflow."""
    print("AI DevOps Agent Cloud Function triggered.")

    request_json = request.get_json(silent=True)
    if not request_json or "command" not in request_json:
        return {"error": "Invalid request: 'command' not found in JSON body."}, 400

    natural_language_command = request_json["command"]
    print(f"Received command: '{natural_language_command}'")

    try:
        ai_generated_files = call_external_ai_for_code(natural_language_command)
        if not ai_generated_files:
            return {"message": "AI did not generate any files."}, 200

        new_branch_name = f"ai-feat-{uuid.uuid4().hex[:8]}"
        commit_message = f"feat(ai): {natural_language_command[:70]}..."
        pr_title = f"AI Feature: {natural_language_command}"
        pr_body = (
            "Automated PR by AI Code Workshop.\n\n"
            f"**Command:** {natural_language_command}\n\n"
            "**Please review generated code.**"
        )

        print(f"Getting latest commit from {GITHUB_DEFAULT_BRANCH}...")
        latest_sha = get_latest_commit_sha(GITHUB_DEFAULT_BRANCH)
        print(f"Latest SHA: {latest_sha}")

        print(f"Creating new branch: {new_branch_name}")
        create_git_ref(new_branch_name, latest_sha)

        file_urls = []
        for file_path, content in ai_generated_files.items():
            existing_file_sha = get_file_sha(file_path, GITHUB_DEFAULT_BRANCH)
            update_file_content(file_path, content, commit_message, new_branch_name, existing_file_sha)
            file_urls.append(
                f"https://github.com/{GITHUB_REPO_OWNER}/{GITHUB_REPO_NAME}/blob/{new_branch_name}/{file_path}"
            )
        print("All AI-generated files processed.")

        pr_url = create_pull_request(new_branch_name, GITHUB_DEFAULT_BRANCH, pr_title, pr_body)

        print("\n--- CI/CD Trigger (Conceptual) ---")
        print("GitHub Actions (or similar CI) will automatically run tests/builds on the new Pull Request.")
        print(f"Review the PR at: {pr_url}")

        return {
            "message": "AI DevOps workflow initiated successfully.",
            "pull_request_url": pr_url,
            "generated_files_on_branch": file_urls,
            "new_branch": new_branch_name,
        }, 200

    except requests.exceptions.HTTPError as exc:
        print(f"GitHub API Error: {exc.response.status_code} - {exc.response.text}")
        return {"error": f"Failed to interact with GitHub API: {exc.response.text}"}, exc.response.status_code
    except ValueError as exc:
        print(f"Configuration Error: {exc}")
        return {"error": str(exc)}, 500
    except Exception as exc:  # pragma: no cover - defensive
        print(f"An unexpected error occurred: {exc}")
        return {"error": f"An unexpected error occurred: {exc}"}, 500
