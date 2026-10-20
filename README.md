# Dipanshu Bansal — MERN portfolio

An animated, responsive personal portfolio built with React, React Router, CSS and JavaScript, with a Node.js/Express API and Mongoose contact-message model. The visual direction pairs an editorial dark theme with lime accents, an interactive orbital illustration, project previews, a learning timeline, and a light theme.

## Current delivery status

- React frontend and three interactive concept demos: implemented.
- Express contact and résumé routes, validation, CORS and rate limiting: implemented.
- API suite: 8 tests passing. Production build: passing.
- Temporary hosted preview: https://dipanshu-ai-portfolio.fancyllama2.chatgpt.site (owner-private; publishing status is confirmed separately at handoff).
- New GitHub repository: **not created yet**. Connected GitHub account: `DEEP12124`. Repository creation requires GitHub sign-in or an empty new repository supplied by the owner.
- Assignment-required Vercel/Netlify frontend, Render/Railway API and live MongoDB: **not deployed or connected yet**.
- Real-browser visual and interaction QA: not run in this environment; manual checklist below.

The hosted preview is built with `VITE_STATIC_PREVIEW=true`: it provides local PDF/DOCX downloads and an honest email fallback. It does **not** claim to save messages in MongoDB or satisfy the backend-download deployment requirement. The normal production build defaults to Express `/api` endpoints; use that build for final submission.

## Features

- Typewriter headline, orbital animation, hover states, animated skills, scroll reveals and reduced-motion support.
- Responsive mobile/tablet/desktop layouts, mobile menu, accessible controls and persistent light/dark theme.
- About, skills grouped into AI, frontend/backend and tools, projects with technology filters, education/creative timeline, ongoing certifications, contact and résumé sections.
- Three React Router demo routes: `/lab/health`, `/lab/vision`, `/lab/movies`.
- `POST /api/contact`: validates and stores a contact message using Mongoose. Returns success only after a successful write.
- `GET /api/resume/pdf` and `/api/resume/docx`: downloads original résumé content through Express.
- `GET /api/health`: HTTP 200 only when MongoDB is connected; 503 otherwise.
- No public endpoint for reading contact messages. No credentials or `.env` files committed.

## Honest content and remaining owner details

The résumé supplied the three AI project descriptions, university, skills, contact details and 50K+ content views. Certificates are labelled **in progress**, matching the résumé. No graduation dates, internship, completed certificate, headshot, or original project repository/demo URLs were invented.

The three new demos are deliberately labelled concepts: a synthetic patient dashboard with filter/CSV export, an animated detection visualization, and a deterministic genre-based film recommender. They are not the original trained models or full AI systems. Until the repository is created, the cards link to the real GitHub profile; setting `VITE_REPOSITORY_URL` changes those links to the demo source in this repository. Replace them with the original project repository URLs once available.

To finish the content checklist, provide a professional photo, city/location, study years, and original project source/live URLs. Add certificate images or verification URLs when the listed courses are completed. Optional profile-photo configuration is already supported. Skill bars show practice areas, not certified scores.

## Structure

- `client/`: React SPA, content, styling, demos and preview-only résumé copies.
- `server/src/`: Express app, MongoDB startup and Mongoose model.
- `server/resumes/`: PDF and Word documents served by backend routes.
- `server/test/`: API behavior tests (injected storage, not live database tests).
- `docs/`: deployment and assignment completion checklist.
- `render.yaml`, `vercel.json`, `netlify.toml`: deployment configuration.
- `.github/workflows/ci.yml`: tests and production build on pushes/PRs.
- `compose.yaml`: optional localhost-only MongoDB for development.

## Local setup

Prerequisites: Node.js 22+, npm, and MongoDB locally or an Atlas cluster.

```sh
npm ci
cp server/.env.example server/.env
cp client/.env.example client/.env
# Optional local database, if Docker is installed:
docker compose up -d mongodb
```

On Windows PowerShell, use `Copy-Item server/.env.example server/.env` and `Copy-Item client/.env.example client/.env` for those copy commands.

Set `MONGODB_URI` in `server/.env`. The example uses the local database started by Docker. Start two terminals from the repository root:

```sh
# Terminal 1
npm run dev --workspace server
# Terminal 2
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to port 5000, so leave `VITE_API_URL` empty for local development. The API reads `server/.env` when started with the workspace command. If MongoDB is absent, downloads still work and contact submissions honestly return HTTP 503.

```sh
npm test
npm run build
```

For optional single-service hosting, build the client, then run the server with `NODE_ENV=production`; Express serves `dist/` and API endpoints. For the assignment, use the required split deployment described below.

## Required split deployment

1. Create a new **public** GitHub repository named `dipanshu-mern-portfolio` in `DEEP12124`, then push this source. The supplied `scripts/publish-github.ps1` automates creation and push from a fresh extracted folder when GitHub CLI is available. It checks the signed-in account and does not overwrite existing repositories.
2. In MongoDB Atlas, create/select a cluster and a database user with `readWrite` for `dipanshu_portfolio`. Keep its URI in server environment settings only. Allow the backend's documented outbound IP ranges in Atlas Network Access.
3. In Render, import this repository as a Blueprint using `render.yaml`. Set `MONGODB_URI` and `CLIENT_ORIGIN` (the exact deployed frontend origin). Start command is `npm start --workspace server`; health path is `/api/health`.
4. In Vercel, import the same repository with the repository root as Root Directory. The included config builds with `npm run build` and publishes `dist`. Alternatively import into Netlify; `netlify.toml` defines the equivalent settings.
5. Set frontend environment variables: `VITE_API_URL` to the Render origin, `VITE_STATIC_PREVIEW=false`, and `VITE_REPOSITORY_URL` to the exact new GitHub URL. Optionally set `VITE_PROFILE_PHOTO_URL` to an owner-supplied photo. Do not put `MONGODB_URI` or any secret in a `VITE_` variable.
6. Ensure Render `CLIENT_ORIGIN` matches the real frontend URL. Rebuild the frontend after changing `VITE_` variables. Verify health, contact persistence in MongoDB and both backend downloads before submitting.
7. Replace the current status above with verified public frontend/API/repository links. Submit the public repository link in Google Classroom yourself.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for acceptance checks and [docs/ASSIGNMENT_CHECKLIST.md](docs/ASSIGNMENT_CHECKLIST.md) for exact remaining work.

## Environment reference

| Variable | Where | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Server only | MongoDB connection URI; secret |
| `CLIENT_ORIGIN` | Server | Comma-separated exact frontend origins |
| `PORT` | Server | API port, defaults to 5000 |
| `NODE_ENV` | Server | Production enables optional static serving |
| `TRUST_PROXY_HOPS` | Server | Trusted reverse proxies; 1 for the provided hosting setup |
| `VITE_API_URL` | Client build | Public Express origin; empty for local proxy/same-origin |
| `VITE_STATIC_PREVIEW` | Client build | `true` only for temporary frontend-only preview |
| `VITE_REPOSITORY_URL` | Client build | Exact created repository URL |
| `VITE_PROFILE_PHOTO_URL` | Client build | Optional owner-supplied photo |

## Verification and limits

Eight Supertest tests cover storage-write success, validation, offline/failure behavior, database health state, real PDF/DOCX file responses, CORS, rate limiting and malformed/oversized requests. Tests inject the storage boundary; they do not prove a live Atlas connection. A real message round-trip remains required after deployment.

Manual browser QA remains required at 375, 768 and 1440 CSS pixels: menu, both themes, keyboard navigation, filters, all demo controls, downloads, form errors/success and reduced motion. No browser screenshot review was performed here.

Original résumé content is included in PDF and DOCX. Google Fonts is requested for DM Sans and Space Grotesk; system fallbacks keep the site usable if that request is unavailable.

## Deployment references

- [Render Blueprint specification](https://render.com/docs/blueprint-spec)
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [MongoDB Atlas access list](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
