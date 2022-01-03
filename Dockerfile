# syntax=docker/dockerfile:1

FROM node:latest
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
ENV PATH="/app/node_modules/.bin:${PATH}"

COPY . .

CMD [ "npm", "run", "build" ]
