# Deployment and acceptance checks

The included frontend-only hosted preview is a review build, not proof of a completed MERN deployment.

## Access required

- GitHub new-repository creation under `DEEP12124`, with public visibility.
- A Vercel or Netlify project connected to that repository.
- A Render or Railway account for the Express process.
- MongoDB Atlas cluster/database user and a server-side `MONGODB_URI`.

Secrets must be entered through the hosting provider's environment settings. Do not paste passwords or database URIs into frontend source, the README or GitHub. Environment examples contain only a localhost URI.

## After deployment

1. Open the public frontend in a signed-out browser. Check mobile, tablet and desktop widths.
2. Open `/api/health` on the API domain. Require HTTP 200 with `database: connected`.
3. Submit one recognizably labelled test message using the portfolio form. Require HTTP 201 and confirm the record appears in the Atlas `messages` collection with the same name/email/message. Use test-only content.
4. Simulate an invalid email or a message under 10 characters; confirm validation without a success state.
5. Download both formats through `/api/resume/pdf` and `/api/resume/docx` on the backend domain, and open them.
6. Reload each `/lab/...` route directly. SPA rewrites must prevent host-level 404s.
7. Test theme persistence after reload, mobile menu open/close, keyboard focus, project filters, health filters/export, detection threshold/pause/reset and movie filtering/sort.
8. Enable reduced motion in the browser/OS and confirm that decorative animations stop.
9. Add the verified frontend, backend and GitHub links to README. Review the assignment checklist before submission.

## Recovery

- API HTTP 503: check `MONGODB_URI`, database user permissions and Atlas network access. The UI correctly shows a failure rather than pretending the message was saved.
- Browser CORS failure: set `CLIENT_ORIGIN` to the frontend's exact HTTPS origin (no trailing slash), then restart the API.
- Downloads 404: verify the `server/resumes/` files are in Git and deployment output.
- Browser routes 404: ensure the included Vercel/Netlify SPA rewrite config is used.
- Static-preview contact warning: rebuild with `VITE_STATIC_PREVIEW=false` and a correct `VITE_API_URL`.
- GitHub links still show profile: set `VITE_REPOSITORY_URL` and rebuild. Supply original per-project links if available.

No email notifications are implemented; they are optional in the assignment. Messages are stored in MongoDB. There is intentionally no unauthenticated endpoint listing submitted messages.
