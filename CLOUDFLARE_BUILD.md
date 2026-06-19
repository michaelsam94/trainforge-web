# Cloudflare Pages Build Settings

The `trainforge` Pages project must use the OpenNext build path.

## Required Dashboard Settings

Open **Cloudflare Dashboard** -> **Workers & Pages** -> **trainforge** -> **Settings** -> **Builds & deployments** and set:

| Setting | Value |
| --- | --- |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `.open-next` |
| Root directory | repository root |
| Node.js version | `22` |

Then save and retry the failed deployment.

## Do Not Use

Do not use the old `@cloudflare/next-on-pages` preset or command. This project uses `@opennextjs/cloudflare`.

The failing command looks like this:

```text
npx @npm ci && opennextjs-cloudflare build && bash scripts/prepare-pages-deploy.shcloudflare/next-on-pages@1
```

That command is invalid for two reasons:

1. `npx @npm ci` is not a valid npm install command.
2. `@cloudflare/next-on-pages` is the old adapter and should not be appended to the OpenNext build.

## Why This Avoids Recursion

`opennextjs-cloudflare build` can invoke the app's normal build script internally. `open-next.config.ts` pins that internal command to the plain Next.js build:

```bash
next build
```

Keep `buildCommand` on the exported config object, outside the `defineCloudflareConfig(...)` call. The helper only accepts Cloudflare override fields and drops unknown options.

The dashboard can use `npm run build`, which performs the full Cloudflare Pages build:

```bash
opennextjs-cloudflare build && bash scripts/prepare-pages-deploy.sh
```

Cloudflare Pages runs `npm ci` before the build command, so do not add another install command to the dashboard build command.
