# DEJAF Training and Consultancy

A MERN-stack website and content management system for DEJAF Training and Consultancy, modeled on the structure of cafecsc.com: a public marketing site (home, about, training catalog, services, vacancies, contact) backed by a custom admin CMS for managing all of that content.

## Stack

- **MongoDB** (Mongoose) — data storage
- **Express** — REST API (`server/`)
- **React + Vite + Tailwind CSS** — public site and admin CMS (`client/`)
- **Node.js** — runtime

Auth is JWT-based with two roles: `admin` (full access, including user management) and `editor` (content management only).

## Project layout

```
dejaf/
├── client/   # React app: public site + /admin CMS
├── server/   # Express API + MongoDB models
└── render.yaml
```

## Local development

### 1. Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 2. Server

```bash
cd server
cp .env.example .env   # edit MONGO_URI / JWT_SECRET as needed
npm install
npm run seed            # creates a default admin user + placeholder DEJAF content
npm run dev              # starts the API on http://localhost:5000
```

The seed script prints the admin email/password it created (from `.env`, defaults to `admin@dejaf.com` / `ChangeMe123!`) — log in with this and change the password via the Users page.

### 3. Client

```bash
cd client
cp .env.example .env   # VITE_API_URL should point at the API above
npm install
npm run dev              # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` for the public site and `http://localhost:5173/admin/login` for the CMS.

## Content management

Everything editable through the CMS lives in MongoDB and is fetched live by the public site — there is no hardcoded content besides labels/structure:

- Training programs (catalog, categories, featured flag)
- Services (the 4 homepage service cards)
- Value propositions (the 6 "why choose us" items)
- Stats (e.g. programs delivered, trainees, clients)
- Client logos
- Vacancy announcements
- Contact messages (submitted via the public contact form)
- Site settings (org name, tagline, hero/about/mission/vision text, contact info, hours)
- Users (admin-only: create/edit/delete admin and editor accounts)

## Deploying

This repo includes config for **Vercel (client) + Render (API) + MongoDB Atlas (database)**:

1. **MongoDB Atlas** — create a free cluster, a database user, and allow network access; copy the connection string.
2. **Render** — create a new Web Service from this repo using `render.yaml` (root dir `server`). Set `MONGO_URI` to your Atlas connection string and `CLIENT_URL` to your deployed Vercel URL.
3. **Vercel** — import this repo with root directory `client`. Set `VITE_API_URL` to your Render API URL + `/api`.
4. After the API is live, run `npm run seed` once (e.g. via Render's shell) to create the first admin user and placeholder content.

## Notes

- Image uploads (`POST /api/upload`) are stored on local disk under `server/uploads` for simplicity. For production, consider swapping to a cloud storage provider (e.g. Cloudinary/S3) — only `middleware/upload.js` and `controllers/uploadController.js` would need to change, since the rest of the app just stores/reads a URL string.
