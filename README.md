# Dipanshu Bansal — Personal MERN Portfolio

A personal portfolio using React, React Router, JavaScript and CSS, with a Node.js/Express REST API and MongoDB/Mongoose contact storage.

The studio design uses warm ivory, coral typography, an oversized name and a film contact sheet inspired by visual storytelling. A dark theme, reduced-motion support, project filters and three interactive concept demos are included.

## 🌐 Live Demo

**Frontend (Vercel):** https://dipanshu-bansal.vercel.app

**Backend (Render):** https://dipanshu-portfolio-api.onrender.com

**API health check:** https://dipanshu-portfolio-api.onrender.com/api/health

**GitHub repository:** https://github.com/DEEP12124/personal-portfolio

> The live site has been deployed and the MongoDB-backed contact form was previously verified. Render's free service can sleep during inactivity, causing a delay on the first request. After domain changes, recheck the contact form and CORS configuration.

## Assignment features

- Animated name/intro, typewriter role, scroll reveals, hover interactions and a download CV CTA.
- About, student status and profile-photo configuration; an initials monogram is used until the owner supplies a headshot.
- Frontend, backend/database, AI and tools skill groups with animated bars and practice-level tooltips.
- Three project cards with technology filters, repository source links and interactive React Router demo routes.
- Education/creative timeline and certifications accurately labelled in progress.
- Persistent light/dark mode and responsive mobile/tablet/desktop CSS.
- PDF and Word files served through Express download routes.
- Contact form with validation, loading/error/success states; Mongoose storage succeeds before HTTP 201 is returned.
- CORS allowlist, payload limits, rate limiting and environment examples without credentials.
- GitHub Actions runs the existing API tests and production build.

## Honest project content

The résumé describes Hospital Management with Predictive Analytics, CCTV Weapon Detection, and Movie Recommendations. Their original trained models and project repository URLs were not supplied. The included demos are clearly labelled new concepts using synthetic/sample data: a filterable patient dashboard with CSV export, a detection-box visualization, and a deterministic genre-based film explorer. They do not claim to run the original ML systems. The source link opens the implemented demo code in this repository.

A real profile photo, exact location, study years, original project URLs and verified certificate images/links remain owner-supplied content. No graduation dates, completed credentials or work experience were fabricated.

## Repository structure

```text
client/
  src/             React portfolio, styles and interactive demos
  public/resume/   Files for the temporary static preview
server/
  src/             Express routes and Mongoose Message model
  resumes/         PDF and DOCX served by the backend
  test/            API tests
docs/              Deployment and assignment checklists
.github/workflows/ Automated validation
```

## Local setup

Use Node.js 22+, npm, and MongoDB locally or through Atlas.

```sh
npm ci
cp server/.env.example server/.env
cp client/.env.example client/.env
# Optional local MongoDB, if Docker is available:
docker compose up -d mongodb
```

On Windows PowerShell use `Copy-Item` instead of `cp`. The server example contains a localhost MongoDB URI. Set the actual URI only in the server environment. Run these in separate terminals from the repository root:

```sh
npm run dev --workspace server
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` to port 5000. Leave `VITE_API_URL` empty locally. Without MongoDB, the server still serves CV files and accurately returns HTTP 503 for contact requests.

```sh
npm test
npm run build
```

## Deploy the assignment

### 1. MongoDB Atlas

Create/select a cluster and a database user with access to `dipanshu_portfolio`. Obtain its driver connection URI and allow the Render service's outbound IP ranges in Atlas Network Access. Save the URI only as a server secret.

### 2. Render backend

Import this repository as a Blueprint using the included `render.yaml`, or create a Node web service with:

- Root Directory: repository root.
- Build Command: `npm ci --omit=dev --workspace server --include-workspace-root=false`.
- Start Command: `npm start --workspace server`.
- Health Check Path: `/api/health`.
- `MONGODB_URI`: actual Atlas URI, entered in Render's environment settings.
- `CLIENT_ORIGIN`: exact HTTPS origin of the final frontend, without a trailing slash.
- `NODE_ENV=production`, `TRUST_PROXY_HOPS=1`.

The health endpoint returns HTTP 200 only when MongoDB is connected. Confirm that before treating the API as ready.

### 3. Vercel frontend

Import the same repository. Keep Root Directory at the repository root. The included `vercel.json` sets `npm run build`, output directory `dist` and SPA rewrites. Set:

```text
VITE_API_URL=<actual Render backend origin>
VITE_STATIC_PREVIEW=false
VITE_REPOSITORY_URL=https://github.com/DEEP12124/personal-portfolio
```

Optionally set `VITE_PROFILE_PHOTO_URL` to the owner's photo URL or a public asset path. Rebuild after changing frontend environment variables. Alternatively, Netlify uses the provided `netlify.toml`.

For the current deployment, set Render's `CLIENT_ORIGIN` to `https://dipanshu-bansal.vercel.app` (no trailing slash) and redeploy the API. If multiple origins are required, use a comma-separated list. Do not put a MongoDB URI or other secret in a `VITE_` variable.

### 4. Verify and submit

- Submit a labelled test message using the public frontend and confirm its record in Atlas.
- Download PDF and DOCX through the Render `/api/resume/...` routes.
- Reload all three `/lab/...` routes directly and test themes, filters and mobile layout.
- Confirm the live frontend/backend URLs above still resolve.
- Submit this public GitHub repository link in Google Classroom before the deadline.

## API

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/api/health` | Reports MongoDB readiness; HTTP 200 or 503 |
| POST | `/api/contact` | Validates name/email/message and stores a Message |
| GET | `/api/resume/pdf` | PDF attachment response |
| GET | `/api/resume/docx` | Word attachment response |

Contact fields: `name` (2–80 characters), `email` (valid address, at most 254 characters), and `message` (10–5000 characters). The optional hidden `website` honeypot must remain empty. There is no public endpoint for reading messages. Optional Nodemailer notifications are not implemented.

## Verification limits

The earlier local run passed all 8 API tests and a production build. Tests inject the storage boundary; they do not prove a real Atlas connection. The latest source changes are checked by GitHub Actions when available. The user previously confirmed a MongoDB Compass message round-trip; retest after deployment or domain changes. Live browser visual QA remains recommended.

## Environment safety

`.gitignore` excludes `node_modules`, `.env` and other local environment files, while allowing the credential-free `.env.example` templates. Do not include secrets when using the GitHub browser uploader.

## References

- [Render Blueprint documentation](https://render.com/docs/blueprint-spec)
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [MongoDB Atlas network access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
