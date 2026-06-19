# TrainForge Web

Mobile-first Next.js frontend for TrainForge — marketing (SSG) + authenticated app.

## Stack

- **Framework:** Next.js 15 App Router
- **UI:** React 19, Tailwind CSS 4
- **Server state:** TanStack Query
- **Deploy:** Cloudflare Pages (OpenNext adapter in Phase 8)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

App runs at `http://localhost:2021`. The browser calls `/api/*` through Next.js rewrites. By default, rewrites target the deployed API worker; set `API_PROXY_TARGET=http://localhost:2020` in `.env.local` to use a local API server.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | OpenNext production build for Cloudflare Pages |
| `npm run build:cloudflare` | Alias for the Cloudflare Pages build |
| `npm run build:next` | Plain `next build` alias |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint + jsx-a11y |
| `npm run test` | Vitest (domain + components) |

## Cloudflare Pages deploy

**Build command in dashboard must be:** `npm run build` (preset: **None**). See [CLOUDFLARE_BUILD.md](./CLOUDFLARE_BUILD.md).

## Structure

```
src/
├── app/           # Routes: (marketing), (auth), (app)
├── features/      # Feature slices (Phase 2+)
├── domain/        # Pure business logic
└── shared/        # UI kit, apiClient, config
```

## Architecture rules

- Components never call `fetch` — use feature hooks + TanStack Query
- Business logic lives in `domain/`, not components
- LLM and OAuth secrets stay on `trainforge-api` only

See [../ROADMAP.md](../ROADMAP.md) and [../docs/adr/](../docs/adr/).
