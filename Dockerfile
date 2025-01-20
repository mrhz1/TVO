# Multi-stage docker file
ARG NODE_IMAGE=node:23.6.0-bookworm-slim

# Stage 1
# Install dependencies only when needed
FROM ${NODE_IMAGE} AS deps

ARG WORK_DIR=/
WORKDIR ${WORK_DIR}
COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2
# Rebuild the source code only when needed
FROM ${NODE_IMAGE} AS builder

ARG WORK_DIR=/
WORKDIR ${WORK_DIR}

COPY client/src ./src
COPY client/public ./public
COPY client/package.json ./
COPY client/tsconfig.json ./
COPY client/tsconfig.app.json ./
COPY client/tsconfig.node.json ./
COPY client/vite.config.ts ./
COPY client/index.html ./
COPY client/postcss.config.js ./
COPY client/tailwind.config.js ./
COPY --from=deps ${WORK_DIR}node_modules ./node_modules

# Generate static files in dist folder
RUN yarn build

# Stage 3
# Production image, copy all the files and run the server
FROM ${NODE_IMAGE} AS runner

ARG WORK_DIR=/
WORKDIR ${WORK_DIR}
RUN addgroup --group nodejs --gid 1001
RUN adduser myuser --gid 1001 --uid 1001
COPY --from=builder ${WORK_DIR}dist ./client/dist
COPY server ./server
RUN cd server
RUN yarn install --frozen-lockfile

USER myuser

ENV NODE_ENV=production

# Expose
EXPOSE 7000

CMD ["node", "server/index.ts"]