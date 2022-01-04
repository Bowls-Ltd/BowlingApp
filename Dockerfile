# syntax=docker/dockerfile:1

FROM node:latest
ENV NODE_ENV=development

WORKDIR /app

COPY ./package.json .

RUN npm install
ENV PATH="/app/node_modules/.bin:${PATH}"

ENTRYPOINT [ "npm", "run" ]
CMD [ "build" ]
