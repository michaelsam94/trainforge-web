# Cloudflare Pages build settings

Use these exact settings for the `trainforge` Pages project.

| Setting | Value |
| --- | --- |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `.open-next` |
| Root directory | repository root |
| Node.js version | `22` |

Required production environment variables:

| Variable | Value |
| --- | --- |
| `API_PROXY_TARGET` | `https://trainforge-api.michaelsam00.workers.dev` |
| `NEXT_PUBLIC_APP_URL` | `https://trainforge.pages.dev` |
| `NEXT_PUBLIC_API_URL` | `/api` |

Do not use the old `@cloudflare/next-on-pages` preset or command. This app is built with `@opennextjs/cloudflare`, and `npm run build` already runs:

1. `opennextjs-cloudflare build`
2. `bash scripts/prepare-pages-deploy.sh`

If a deploy log says Cloudflare is executing a command that starts with `npx @npm ci`, or contains `@cloudflare/next-on-pages`, update the Pages dashboard build command back to:

```bash
npm run build
```

The repo also exposes `npm run build:cloudflare` as an alias, but the dashboard should use `npm run build` so it stays aligned with the default production build.
