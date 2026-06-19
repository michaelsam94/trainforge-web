# Cloudflare Pages — Git build settings

> **Your build is failing because the Cloudflare dashboard still has a broken command.**
> Pushing to GitHub does **not** change the dashboard. You must edit it manually (steps below).

## Fix in Cloudflare Dashboard (required)

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → project **trainforge**
2. **Settings** → **Build** (or *Build configuration*) → **Edit**
3. Set exactly:

| Field | Value |
|--------|--------|
| **Framework preset** | **None** |
| **Build command** | `npm run build` |
| **Build output directory** | `.open-next` |

4. **Remove** any text like `npx @npm ci`, `@cloudflare/next-on-pages`, or extra commands
5. **Save** → **Retry deployment**

### Build environment variables

Add under **Settings** → **Environment variables** (Production + Preview):

| Variable | Value |
|----------|--------|
| `API_PROXY_TARGET` | `https://trainforge-api.michaelsam00.workers.dev` |
| `NEXT_PUBLIC_APP_URL` | `https://trainforge.pages.dev` |
| `NEXT_PUBLIC_API_URL` | `/api` |

---

## What your failed log shows (wrong)

```text
npx @npm ci && opennextjs-cloudflare build && bash scripts/prepare-pages-deploy.shcloudflare/next-on-pages@1
```

This is invalid. Do **not** use `@cloudflare/next-on-pages` — this project uses **OpenNext**.

## Correct command (copy-paste)

```bash
npm run build
```

Cloudflare already runs `npm ci` before this — do not add it again.
