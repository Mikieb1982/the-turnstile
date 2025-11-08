"""Firebase Cloud Function implementing the AI DevOps workflow."""
import base64
import json
import os
import uuid
from typing import Dict

from firebase_functions import https_fn, options
import requests
import vertexai
from vertexai.generative_models import GenerativeModel, Part

# --- Firebase Environment Configuration ---
GITHUB_API_TOKEN = os.environ.get("GITHUB_TOKEN")
GITHUB_REPO_OWNER = os.environ.get("GITHUB_REPO_OWNER")
GITHUB_REPO_NAME = os.environ.get("GITHUB_REPO_NAME")
GITHUB_DEFAULT_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")
GCP_PROJECT = os.environ.get("GCP_PROJECT")
GCP_REGION = os.environ.get("GCP_REGION", "us-central1")


# --- Vertex AI Gemini API ---
def call_gemini_for_code(natural_language_command: str) -> Dict[str, str]:
    """Calls Gemini 2.5 Pro to generate file content based on a command."""
    print(f"Initializing Vertex AI for project {GCP_PROJECT} in {GCP_REGION}...")
    vertexai.init(project=GCP_PROJECT, location=GCP_REGION)
    
    # Use gemini-2.5-pro as specified in the strategy document
    model = GenerativeModel("gemini-2.5-pro-preview-09-2025")
    
    # This prompt is engineered to get code back in a structured JSON format.
    system_prompt = """
    You are an expert full-stack developer for a Next.js 14 (App Router) / Firebase / TailwindCSS project.
    The user will give you a command to modify the codebase.
    You MUST respond with only a single, valid JSON object.
    The JSON object must have a single key, "files", which is an object.
    Each key in the "files" object is the full relative filepath (e.g., "app/page.tsx" or "components/Badge.tsx").
    The value for each key is the complete, new source code for that file as a single string.
    Do not use markdown, backticks, or any other formatting.
    Only output the raw JSON.
    
    Example for "add a new about page":
    {
      "files": {
        "app/about/page.tsx": "export default function AboutPage() {\\n  return (\\n    <div>\\n      <h1>About Us</h1>\\n    </div>\\n  );\\n}"
      }
    }
    """
    
    print(f"Calling Gemini with command: '{natural_language_command}'")
    
    response = model.generate_content(
        [
            Part.from_text(system_prompt),
            Part.from_text(f"User command: {natural_language_command}")
        ]
    )
    
    text_response = response.candidates[0].content.parts[0].text
    print(f"Raw Gemini response: {text_response}")
    
    try:
        # Parse the JSON response
        data = json.loads(text_response)
        if "files" in data and isinstance(data["files"], dict):
            return data["files"]
        else:
            print("Error: AI response was valid JSON but lacked the 'files' object.")
            return {"error.txt": f"AI response was valid JSON but lacked the 'files' object: {text_response}"}
    except json.JSONDecodeError:
        print(f"Error: AI response was not valid JSON: {text_response}")
        return {"error.txt": f"AI response was not valid JSON: {text_response}"}


# --- GitHub API Interactions ---
def github_api_request(method: str, path: str, data: Dict | None = None) -> Dict:
    """Helper to make authenticated GitHub API requests."""
    if not (GITHUB_API_TOKEN and GITHUB_REPO_OWNER and GITHUB_REPO_NAME):
        raise ValueError("GitHub repository configuration is missing. Set GITHUB_TOKEN, GITHUB_REPO_OWNER, and GITHUB_REPO_NAME secrets.")

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


@https_fn.on_request(cors=options.CorsOptions(cors_origins="*", cors_methods=["get", "post", "options"]))
def ai_devops_agent(request):
    """Entry point for the AI-driven DevOps workflow."""
    print("AI DevOps Agent Cloud Function triggered.")


    if request.method == 'OPTIONS':
      
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

   
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    

    request_json = request.get_json(silent=True)
    if not request_json or "command" not in request_json:
        # Pass headers to the error response
        return ({"error": "Invalid request: 'command' not found in JSON body."}, 400)

    natural_language_command = request_json["command"]
    print(f"Received command: '{natural_language_command}'")

    try:
        # --- MODIFIED: Call the REAL Gemini function ---
        ai_generated_files = call_gemini_for_code(natural_language_command)
        # --- END MODIFICATION ---
        
        if not ai_generated_files:
            # Pass headers to the success response
            return ({"message": "AI did not generate any files."}, 200)

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

        response_data = {
            "message": "AI DevOps workflow initiated successfully.",
            "pull_request_url": pr_url,
            "generated_files_on_branch": file_urls,
            "new_branch": new_branch_name,
        }
        # Pass headers to the final success response
        return (response_data, 200)

    except requests.exceptions.HTTPError as exc:
        print(f"GitHub API Error: {exc.response.status_code} - {exc.response.text}")
        # Pass headers to the error response
        return ({"error": f"Failed to interact with GitHub API: {exc.response.text}"}, exc.response.status_code)
    except ValueError as exc:
        print(f"Configuration Error: {exc}")
         # Pass headers to the error response
        return ({"error": str(exc)}, 500)
    except Exception as exc:  # pragma: no cover - defensive
        print(f"An unexpected error occurred: {exc}")
         # Pass headers to the error response
        return ({"error": f"An unexpected error occurred: {exc}"}, 500)
