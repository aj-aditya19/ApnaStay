# ApnaStay

ApnaStay is a full‑stack web application for listing, discovering, and booking short‑term properties. It includes user authentication, property CRUD, image uploads (Cloudinary), location maps, search & filters, and user reviews.

Key features

- User signup / login with `passport` and session management
- Create, read, update, delete property listings with images
- Upload images via Cloudinary and serve them in the UI
- Map-based property locations (MapTiler)
- Reviews and basic authorization rules for owners vs guests

Tech stack

- Node.js, Express
- MongoDB + Mongoose
- EJS templates for server-rendered frontend
- Passport for authentication
- Cloudinary for image storage

Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- MapTiler API key (for map tiles)

Quick start

1. Clone the repo:

   git clone <repo-url>
   cd ApnaStay

2. Install dependencies:

   npm install

3. Create a `.env` file in the project root with the following variables:

- `PORT` (optional)
- `ATLASDB_URL` — MongoDB connection string (app uses `ATLASDB_URL`)
- `SECRET` — session secret
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` — Cloudinary credentials (used by `backend/cloudConfig.js`)
- `MAPTILER_KEY` (if using MapTiler)

4. Run the app in development:

   npm run dev

   The server runs from `backend/app.js` by default. To start in production mode use `npm start`.

Database seed (optional)

- There is an initializer `backend/init/index.js` (simple insert) and a more complete seeder `backend/seed/seed.js` that creates fake users and uploads listing images to Cloudinary.

Run the quick initializer (no Cloudinary uploads):

```
node backend/init/index.js
```

Run the seeder (uploads remote images to Cloudinary and registers fake users):

```
npm run seed
```

Make sure `ATLASDB_URL` and Cloudinary env vars are set before running the seeder.

Notes

- Static frontend files are under `frontend/public` and views under `frontend/views`.
- Server source is in `backend/` and the `main` entry in `package.json` points to `backend/app.js`.

Contributing

- Open issues or pull requests for bugs and improvements. Be sure to include steps to reproduce and a description of intended behavior.

License

- MIT (add your preferred license or change as needed)
