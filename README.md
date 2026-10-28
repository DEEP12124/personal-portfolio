<div align="center">

# DIPANSHU BANSAL
### Building intelligent experiences. Designing with intention.

**AI / ML Enthusiast · Full-Stack Developer · Creative Technologist**

A portfolio where engineering meets visual storytelling — from machine learning concepts to interactive web experiences.

[![Explore Live Portfolio](https://img.shields.io/badge/EXPLORE_LIVE_PORTFOLIO-CC5037?style=for-the-badge&logo=vercel&logoColor=white)](https://dipanshu-bansal.vercel.app)
[![View Source](https://img.shields.io/badge/VIEW_SOURCE-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DEEP12124/personal-portfolio)

**[dipanshu-bansal.vercel.app](https://dipanshu-bansal.vercel.app)**

</div>

---

## ✨ The Idea

**More than a digital résumé.** A thoughtfully crafted corner of the web that brings together development, artificial intelligence, experimentation and design. Built to feel personal, expressive and polished — without compromising on real functionality.

## 🌐 Live Demo

**[→ Visit Dipanshu's Portfolio](https://dipanshu-bansal.vercel.app)**

The public website runs on Vercel, with a separate Express API and MongoDB-backed contact storage behind the scenes. Only the visitor-facing portfolio is linked here.

## 🛠️ Tech Stack

| Layer | Technologies |
|:--|:--|
| **Frontend** | React 19 · React Router · JavaScript · CSS · Vite |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB Atlas · Mongoose |
| **Deployment** | Vercel · Render |
| **Quality** | Node.js test runner · GitHub Actions |

## 💫 What You'll Find

- **Statement-making introduction** — bold typography, animated text and a distinctive editorial aesthetic.
- **Interactive portfolio** — responsive layouts, dark/light themes, hover effects and scroll-based reveals.
- **Selected projects** — AI/ML-inspired work and interactive concept demonstrations.
- **Skills and journey** — a curated view of technologies, education and ongoing learning.
- **Downloadable résumé** — PDF and Word formats served by the backend.
- **A working contact form** — validated submissions stored in MongoDB, with feedback on success and failure.
- **Accessible motion** — reduced-motion preferences respected.

## 🧩 How It Works

```text
                  VISITOR
                     |
                     v
           React + Vite Portfolio
                (Vercel)
                     |
              HTTPS API calls
                     |
                     v
            Node.js + Express
                 (Render)
                     |
                     v
            MongoDB Atlas
             Contact messages
```

## 📁 Project Structure

```text
personal-portfolio/
├── client/             # React application, styles and interactive demos
├── server/             # Express API, MongoDB models, routes and tests
├── docs/               # Project documentation
├── scripts/            # Development utilities
├── .github/workflows/  # Automated checks
├── render.yaml         # Backend deployment configuration
├── vercel.json         # Frontend deployment configuration
└── README.md
```

## 🚀 Run Locally

**Requirements:** Node.js 22+, npm, and a MongoDB instance or Atlas cluster.

```bash
git clone https://github.com/DEEP12124/personal-portfolio.git
cd personal-portfolio
npm ci
```

Create local environment files using the credential-free examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

> On Windows PowerShell, use `Copy-Item` instead of `cp`. Set `MONGODB_URI` in the server's local environment only; never commit credentials.

Start the API and frontend in **separate terminals**:

```bash
npm run dev --workspace server
```

```bash
npm run dev
```

Open **http://localhost:5173**.

## 🧪 Verify the Build

```bash
npm test
npm run build
```

## ☁️ Deployment Notes

- **Frontend:** Deploy the repository to Vercel using the included `vercel.json`. Set `VITE_API_URL` to the Render API origin.
- **Backend:** Deploy Express to Render using `render.yaml` and set `MONGODB_URI` securely.
- **Cross-origin requests:** Set `CLIENT_ORIGIN=https://dipanshu-bansal.vercel.app` on Render and redeploy when the domain changes.
- **Database:** Use MongoDB Atlas and verify the contact collection after sending a test message.
- **Free hosting:** The API may take extra time to respond after inactivity on Render's free tier.

## 🎯 Project Integrity

The interactive demos use sample/synthetic data and are not presented as deployed production ML models. Certifications and project claims are kept aligned with available evidence.

---

<div align="center">

### Have an idea worth building?

**[Let's connect →](https://dipanshu-bansal.vercel.app/#contact)**

*Made with curiosity, code and a little obsession with the details.*

**© Dipanshu Bansal**

</div>
