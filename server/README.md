# Server configuration

The Express server uses the Firebase Admin SDK and requires a project ID before it will talk to Firestore. On startup it tries to build that project ID from one of the following sources:

- `FIREBASE_SERVICE_ACCOUNT` (JSON string) – used directly to initialise the SDK and capture `project_id`.
- `FIREBASE_CONFIG` – expects a JSON blob with `projectId` or `project_id`.
- `GOOGLE_CLOUD_PROJECT` / `GCLOUD_PROJECT` – standard Firebase environment variables.
- `GOOGLE_APPLICATION_CREDENTIALS` – path to a service account file that the code reads to obtain the project id.
- `FIRESTORE_EMULATOR_HOST` – marks the Firestore emulator as available.

If none of those are defined the `firestoreAvailable` flag stays `false`, and every request either falls back to mock data or returns a `503` from the user endpoints. To get real data back you must provide one of the supported credential sources or point the server at the Firestore emulator.

With no credentials the behaviour looks like this:

```bash
$ curl -i http://localhost:3001/api/users/demo/profile
HTTP/1.1 503 Service Unavailable
...
{"error":"Firestore is not configured"}
```
