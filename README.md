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

## Deploying on AWS EC2

The server already listens on `0.0.0.0` and honours the `PORT` env var, so it is reachable
on the instance's public IP. Two supported options below — pick one.

### 0. One-time EC2 setup (both options)

1. Launch an **Ubuntu 24.04 LTS** instance (t3.small or larger).
2. In its **Security Group → Inbound rules**, add:
   | Port | Source | Purpose |
   | --- | --- | --- |
   | `22` | Your IP | SSH |
   | `80` | `0.0.0.0/0` | Public website (HTTP) |
   | `3000` | `0.0.0.0/0` | Direct Node / container access |
3. Allocate an **Elastic IP** and associate it with the instance so the public IP stays fixed.
4. The site will be at `http://<PUBLIC-IP>` with Docker (or with nginx), and
   `http://<PUBLIC-IP>:3000` with the direct Node option. Admin is at `/admin`.

**Always set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env` before exposing the instance.**

### Option A — Docker (recommended)

Includes a multi-stage `Dockerfile`, `.dockerignore`, and `docker-compose.yml`.
Compose publishes host port **80 → container 3000** and also exposes 3000 directly.
Uploaded files and catalog JSON live in named volumes, so they survive rebuilds.

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
sudo systemctl enable --now docker
sudo usermod -aG docker $USER          # log out and back in for this to apply

git clone <YOUR-REPO-URL> /opt/centronic-medical-india
cd /opt/centronic-medical-india
cp .env.example .env
nano .env                              # set ADMIN_PASSWORD + ADMIN_SESSION_SECRET

docker compose up -d --build
docker compose ps                      # status + health
docker compose logs -f centronic       # follow logs
```

Open `http://<PUBLIC-IP>` and `http://<PUBLIC-IP>/admin`.

```bash
# Update / restart
git pull && docker compose up -d --build

# Stop without deleting data
docker compose down

# Back up the volumes
docker run --rm -v cmi-data:/data -v cmi-uploads:/uploads -v "$PWD":/backup \
  alpine tar czf /backup/centronic-backup.tgz -C / data uploads
```

To use local folders instead of named volumes, replace the `volumes:` block with:

```yaml
volumes:
  - ./data:/app/data
  - ./uploads:/app/uploads
```

If port 80 is already taken, change `"80:3000"` in `docker-compose.yml` to another host port.

### Option B — Node directly on EC2 (no Docker)

```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs git

git clone <YOUR-REPO-URL> /opt/centronic-medical-india
cd /opt/centronic-medical-india
npm ci
cp .env.example .env
nano .env                              # set ADMIN_PASSWORD + ADMIN_SESSION_SECRET
npm run build

sudo mkdir -p data uploads/images uploads/documents
sudo chown -R ubuntu:ubuntu data uploads

sudo cp deploy/centronic.service /etc/systemd/system/centronic.service
sudo systemctl daemon-reload
sudo systemctl enable --now centronic
sudo systemctl status centronic
```

Open `http://<PUBLIC-IP>:3000` and `http://<PUBLIC-IP>:3000/admin`.

```bash
# Logs / restart / update
sudo journalctl -u centronic -f
sudo systemctl restart centronic
git pull && npm ci && npm run build && sudo systemctl restart centronic
```

**Optional: serve on plain port 80 with nginx** (so the URL is `http://<PUBLIC-IP>`):

```bash
sudo apt install -y nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/centronic
sudo ln -s /etc/nginx/sites-available/centronic /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

The bundled `deploy/nginx.conf` sets `client_max_body_size 45M` — required for the
40 MB catalogue PDF upload limit.

### Deployment notes

- The site is HTTP by default. If you add an HTTPS load balancer / CloudFront / TLS proxy,
  set `COOKIE_SECURE=true` in `.env` so the admin cookie is only sent over HTTPS.
- Keep `.env` private — never commit it or bake it into the Docker image (`.dockerignore`
  excludes it).
- `data/catalog.json`, `uploads/images/` and `uploads/documents/` are the only state you
  need to back up; everything else is rebuilt from source.
- If uploads fail through nginx with a `413` error, raise `client_max_body_size`.
