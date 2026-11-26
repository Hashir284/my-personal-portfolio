# Muhammad Hashir – MERN Portfolio + Private Admin CMS

- `client/` React + Vite + Tailwind + Framer Motion (public site at `/`, admin at `/admin`)
- `server/` Express + MongoDB (Mongoose) + JWT in an HTTP-only cookie + Cloudinary uploads

## 1. Server
    cd server
    npm install
    cp .env.example .env          # Windows: copy .env.example .env
Fill in `.env`:
- `MONGODB_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
- `CLIENT_ORIGIN` – `http://localhost:5173` (add your Vercel URL when deployed)
- `ADMIN_PASSWORD_HASH` – `npm run hash -- "your-strong-password"` (10+ characters), paste the output
- `CLOUDINARY_*` – free account at cloudinary.com. Needed ONLY for uploading photos, certificates, project screenshots and the resume PDF. Everything else works without it.

Then: `npm run seed` (imports your 2 projects once, never duplicates) and `npm run dev`.

## 2. Client
    cd client
    npm install
    cp .env.example .env          # set VITE_API_URL=http://localhost:5000
    npm run dev
Open http://localhost:5173 and http://localhost:5173/admin

## How the CMS works
The site ships with your details as defaults. When you press **Save** in any admin section, that section is stored in MongoDB and the public site shows it. Projects and messages are their own collections. Uploaded files go to Cloudinary; only their URLs are stored in MongoDB.

## Security
- One admin (`ADMIN_EMAIL` + bcrypt hash). No registration route exists.
- Session = HTTP-only cookie (Secure + SameSite=None in production), 12 h expiry; logout clears it.
- Every `/api/admin/*` route checks the cookie on the server. Logins are rate-limited (10 / 15 min), contact form 5 / hour.
- Helmet headers, strict CORS, an Origin check on all write requests (CSRF), size-limited JSON, all input validated and type-checked server-side.

## Deploy
- Server: Render / Railway. Set all env vars, plus `NODE_ENV=production` and `CLIENT_ORIGIN=https://your-site.vercel.app`.
- Client: Vercel (root directory `client`), env `VITE_API_URL=https://your-api-host`.
- Use the same parent domain family or keep both on HTTPS; the cookie is configured for cross-site use.
