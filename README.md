<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/03539e8c-5b48-498d-9d31-dd0bbda40ef0

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Content manager (admin backend)

Open **http://localhost:3000/admin** and sign in with the password from `.env`.

Copy `.env.example` to `.env` and set at least:

```
ADMIN_PASSWORD="a-strong-password"
ADMIN_SESSION_SECRET="a-long-random-string"
```

The content manager lets an admin self-manage:

- **Images** — upload / delete images (JPEG, PNG, WebP, GIF, AVIF, BMP; 12 MB max),
  copy public URLs, and assign images to website slots (hero, product photos, etc.).
- **Products** — create / edit / delete catalog entries with specs, features, images and categories.
- **Catalogue PDFs** — upload / delete PDFs (40 MB max) and choose the active PDF that visitors download.

Files are stored in `uploads/images` and `uploads/documents` and served from `/uploads`.
Catalog metadata lives in `data/catalog.json`, seeded from the bundled product data on first run.
Both folders are created automatically and gitignored. The public site fetches `/api/catalog`
on page load, so republishing only requires a refresh — no rebuild needed.

### Admin API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/admin/login` | Sign in (`{ "password": "…" }`), sets an 8-hour httpOnly cookie |
| `POST` | `/api/admin/logout` | Sign out |
| `GET` | `/api/admin/session` | Session status |
| `GET` | `/api/admin/catalog` | Full saved catalog |
| `GET/POST` | `/api/admin/images` | List / upload an image (multipart field `file`) |
| `PATCH` | `/api/admin/images/slot` | Assign an image to a website slot |
| `DELETE` | `/api/admin/images/:name` | Delete an image |
| `GET/POST` | `/api/admin/documents` | List / upload a catalogue PDF |
| `PATCH` | `/api/admin/documents/activate` | Set the active catalogue PDF |
| `DELETE` | `/api/admin/documents/:name` | Delete a catalogue PDF |
| `GET/POST` | `/api/admin/products` | List / create a product |
| `PUT/DELETE` | `/api/admin/products/:id` | Update / delete a product |
| `GET` | `/api/catalog` | Public catalog payload used by the storefront |

All admin endpoints except login/session require the admin cookie. Failed logins are
rate-limited (5 attempts → 15 minute lockout). Set `COOKIE_SECURE=true` behind HTTPS.
