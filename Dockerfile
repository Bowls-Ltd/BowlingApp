# syntax=docker/dockerfile:1

FROM node:latest

WORKDIR /app
VOLUME /app

ENV NODE_ENV=development
ENV NPM_CONFIG_CACHE=/app/.npm

ARG UID=1000
ARG GID=1000
USER ${UID}:${GID}

ENTRYPOINT [ "npm" ]
