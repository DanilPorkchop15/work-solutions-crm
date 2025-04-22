# Base stage for dependencies
ARG NODE_VERSION="node:20-alpine"
FROM $NODE_VERSION AS base
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm ci --include=dev --legacy-peer-deps

# Build stage
FROM base AS build
WORKDIR /app
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=6144"
# Cache npm dependencies
RUN --mount=type=cache,target=/root/.npm npx nx run-many -t build
# Verify frontend build output
RUN ls -la dist/packages/frontend/index.html || { echo "Error: frontend assets not generated"; exit 1; }

# Frontend: Serve with Nginx
FROM nginx:stable-alpine AS frontend
COPY packages/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/packages/frontend /usr/share/nginx/html
# Verify frontend assets
RUN ls -la /usr/share/nginx/html/index.html || { echo "Error: frontend assets not copied"; exit 1; }
EXPOSE 80

# Backend: Serve with Node.js
FROM $NODE_VERSION AS backend
ARG app_version
ARG app_source_branch
ARG app_source_commit
ARG app_build_time
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist/packages/backend /app
# Copy config file
COPY packages/backend/config.y*ml /app/config.yaml
# Verify config file
RUN ls -la /app/config.y*ml || { echo "Error: config.yaml not copied"; exit 1; }

ENV NODE_ENV=production \
    APP_VERSION=$app_version \
    APP_SOURCE_BRANCH=$app_source_branch \
    APP_SOURCE_COMMIT=$app_source_commit \
    APP_BUILD_TIME=$app_build_time
EXPOSE 4000
CMD ["node", "/app/main.js"]

# Publish stage (optional, for releasing libraries)
FROM base AS publish
COPY --from=build /app/dist/libs /app/dist/libs
WORKDIR /app
ENTRYPOINT ["npx", "nx", "release", "publish"]
