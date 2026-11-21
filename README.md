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

---

## Deploying on your server (HTTPS on www.centronicmedical.com)

The bundled `docker-compose.yml` starts the app behind **Caddy**, which automatically
obtains and renews a Let's Encrypt TLS certificate. Once DNS points at the server, the
only command you need is:

```bash
docker compose up -d --build
```

### One-time DNS / firewall setup

1. Point **both** DNS names to the server's public IP (both are needed for TLS certs):
   - `A centronicmedical.com → <PUBLIC-IP>`
   - `A www.centronicmedical.com → <PUBLIC-IP>`
2. Open TCP **80** and **443** in the firewall / security group. Port 80 is required for
   Let's Encrypt validation and the automatic HTTP → HTTPS redirect.
3. Create `.env` (optional, but strongly recommended) and set real admin credentials:

   ```bash
   cp .env.example .env
   nano .env
   ```

   | Variable | Purpose |
   | --- | --- |
   | `ADMIN_PASSWORD` | Password for `/admin` |
   | `ADMIN_SESSION_SECRET` | Long random string used to sign sessions |
   | `SITE_EMAIL` | Email used by Caddy for certificate notices |
   | `GEMINI_API_KEY` | Enables the Medical Buddy AI assistant |

   If `.env` is missing, defaults are used so the one command still works —
   **change the admin credentials before exposing the site**.

### First deploy

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
sudo systemctl enable --now docker
sudo usermod -aG docker $USER          # log out and back in for this to apply

git clone <YOUR-REPO-URL> /opt/centronic-medical-india
cd /opt/centronic-medical-india
cp .env.example .env && nano .env      # recommended
docker compose up -d --build
```

Open:

- `https://www.centronicmedical.com`
- `https://www.centronicmedical.com/admin`

`centronicmedical.com` (non-www) redirects to the canonical `www` domain, and all HTTP
traffic is redirected to HTTPS. The admin cookie is automatically set with
`COOKIE_SECURE=true`.

### How it works

- **Caddy** publishes ports 80/443, terminates TLS, handles renewals, and proxies to the
  Node app at `centronic:3000` over the private compose network. Port 3000 is not public.
- Certificates live in the `caddy-data` volume, so they survive rebuilds.
- Uploaded images/PDFs and the catalog live in `cmi-data` and `cmi-uploads`.
- `deploy/Caddyfile` allows 45 MB request bodies for the 40 MB catalogue upload limit.

### Updates and operations

```bash
# Deploy changes
git pull && docker compose up -d --build

# Check health / logs
docker compose ps
docker compose logs -f centronic
docker compose logs -f caddy

# Stop without deleting data
docker compose down

# Back up all persistent data
docker run --rm -v cmi-data:/data -v cmi-uploads:/uploads -v caddy-data:/caddy \
  -v "$PWD":/backup alpine tar czf /backup/centronic-backup.tgz -C / data uploads caddy
```

Keep `.env` private — it is excluded by `.dockerignore` and should never be committed.

### Troubleshooting HTTPS

If the certificate is not issued:

- Confirm both DNS names resolve publicly to the server (`dig +short centronicmedical.com`).
- Confirm ports 80 and 443 are reachable from the internet.
- Check `docker compose logs caddy` for ACME errors.
- Caddy retries automatically, so once DNS/firewall are fixed the certificate appears
  without another deploy.
