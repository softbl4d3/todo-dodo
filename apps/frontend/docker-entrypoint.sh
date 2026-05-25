#!/bin/sh
echo "window.__RUNTIME_CONFIG__={API_URL:'${VITE_API_URL:-http://localhost:3000}'};" > /usr/share/nginx/html/env-config.js
exec "$@"
