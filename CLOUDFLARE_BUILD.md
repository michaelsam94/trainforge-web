# Cloudflare Pages — Git build settings

Use these in the **trainforge** Pages project when connected to `trainforge-web` on GitHub.

| Setting | Value |
|---------|--------|
| **Framework preset** | None |
| **Build command** | `npm run build:pages` |
| **Build output directory** | `.open-next` (also set in `wrangler.jsonc`) |
| **Node version** | 20 or 22 |

Cloudflare already runs `npm ci` before your build command — **do not** add `npm ci` again.

### Environment variables (Build)

| Variable | Value |
|----------|--------|
| `API_PROXY_TARGET` | `https://trainforge-api.michaelsam00.workers.dev` |
| `NEXT_PUBLIC_APP_URL` | `https://trainforge.pages.dev` |
| `NEXT_PUBLIC_API_URL` | `/api` |

### Common mistakes (will fail the build)

```bash
# WRONG — invalid package name
npx @npm ci && opennextjs-cloudflare build ...

# WRONG — do not use @cloudflare/next-on-pages (this project uses OpenNext)
npx @cloudflare/next-on-pages@1

# WRONG — plain next build is not enough for Pages worker bundle
npm run build
```

### Correct build command

```bash
npm run build:pages
```

Equivalent to:

```bash
opennextjs-cloudflare build && bash scripts/prepare-pages-deploy.sh
```
