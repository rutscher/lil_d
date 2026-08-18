# Self-hosted build for dorothypablo.com (moved off GitHub Pages + the lil-d
# password Worker, 2026-08-18 — unraid-stacks authentik-prep phase 4). The
# password gate is now Traefik basicAuth (dottie-auth@file); the worker/ dir
# in this repo is retired.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
