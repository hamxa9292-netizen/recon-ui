# STELCO Recon — UI

Static frontend for the STELCO Debtors Reconciliation app, served via
GitHub Pages. Talks to the API in the separate `recon-server` repo.

This repo needs to be **public** — GitHub Pages on a private repo requires
a paid GitHub plan (Pro/Team/Enterprise). Being public just exposes the UI
code (HTML/CSS/JS); it doesn't expose any data — every screen behind
`login.html` requires signing in, and the server enforces that
independently of anything the browser does.

## Structure

```
recon-ui/
├── index.html      # the app (reconciliation / adjustment / adjustment (2) tabs)
├── login.html       # sign-in page
├── css/style.css
└── js/
    ├── auth.js       # session storage + authenticated fetch wrapper
    ├── app.js
    ├── adjustment.js
    └── adjustment2.js
```

## Configuring the API URL

Each of these files has an `API_URL` (or `API` / `ADJ_API_URL`) constant
near the top, pointing at the `recon-server` deployment:

- `login.html`
- `js/app.js`
- `js/adjustment.js`
- `js/adjustment2.js`

If you redeploy the server to a new URL, update it in all four places.

## Local preview

```bash
python -m http.server 3000
```

Then open http://localhost:3000 — but note the API_URL still points at the
live server unless you change it, so local preview talks to production.

## Deploy — GitHub Pages

1. Push this repo to GitHub as **public**.
2. Repo → Settings → Pages.
3. Source: deploy from a branch → `main` → `/ (root)`.
4. Save. Give it a minute, then the page will show
   "Your site is live at `https://<username>.github.io/<repo-name>/`".

If you ever toggle this repo private and back to public, Pages does **not**
re-publish automatically — you'll need to revisit Settings → Pages and
reselect the source branch to trigger a fresh deployment.
