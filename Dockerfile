ARG NODE_VERSION="node:20-alpine"

FROM $NODE_VERSION AS base
WORKDIR /app
RUN touch ~/.npmrc
COPY . .
RUN npm ci --include=dev --legacy-peer-deps
ARG VITE_APP_BACKEND
ENV VITE_APP_BACKEND=$VITE_APP_BACKEND

FROM base as build
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=6144"

# build packages
RUN --mount=type=cache,target=/app/.npm-cache npx nx run-many -t build


# FRONTEND: frontend
FROM nginx:stable-alpine AS frontend
COPY packages/frontend/nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist/packages/frontend/ /usr/share/nginx/html/

# BACKEND: backend
FROM $NODE_VERSION AS backend
ARG app_version
ARG app_source_branch
ARG app_source_commit
ARG app_build_time
COPY packages/backend/config.y*ml /app/config.yaml
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist/packages/backend /app
ENV NODE_ENV=production \
    APP_VERSION=$app_version \
    APP_SOURCE_BRANCH=$app_source_branch \
    APP_SOURCE_COMMIT=$app_source_commit \
    APP_BUILD_TIME=$app_build_time
CMD node /app/main.js

# publish
FROM base AS publish
COPY --from=build /app/dist/libs/ /app/dist/libs/
WORKDIR /app
ENTRYPOINT ls -la && npx nx release publish --
