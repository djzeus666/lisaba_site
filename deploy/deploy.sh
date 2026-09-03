#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/lisaba-site}"
REPO_URL="${REPO_URL:-}"

echo "==> Deploying LISABA site to ${APP_DIR}"

if [ -n "${REPO_URL}" ]; then
  if [ ! -d "${APP_DIR}/.git" ]; then
    git clone "${REPO_URL}" "${APP_DIR}"
  else
    git -C "${APP_DIR}" pull --ff-only
  fi
fi

cd "${APP_DIR}"
docker compose down || true
docker compose build --no-cache
docker compose up -d

echo "==> App available on port 3080"
docker compose ps
