FROM node:22.6-alpine AS base

WORKDIR /app

RUN corepack enable pnpm

COPY . .

FROM base as deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma:generate

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma:generate
RUN pnpm run build

FROM base
ENV DATABASE_URL=mongodb://root:password@prisma-mongodb-mongo-1:27017/test?authSource=admin&directConnection=true&replicaSet=rs0
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD [ "pnpm", "nest", "start" ]
