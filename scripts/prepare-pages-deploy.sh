#!/usr/bin/env bash
set -euo pipefail

# OpenNext keeps static files under .open-next/assets/, but HTML references /_next/* at the site root.
cp .open-next/worker.js .open-next/_worker.js
cp -R .open-next/assets/. .open-next/

# Static assets must bypass the Pages worker (worker has no ASSETS binding in Pages mode).
cp public/_routes.json .open-next/_routes.json
