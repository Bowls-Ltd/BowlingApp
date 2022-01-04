# BowlingApp

Bowling App

# Docker

## Build image

```shell
docker build --no-cache -t bowling-builder .
```

## Create container

```shell
docker create \
  -v "$(pwd)/src":/app/src:ro \
  -v "$(pwd)/build":/app/build \
  -v "$(pwd)/tsconfig.json":/app/tsconfig.json \
  -v "$(pwd)/package.json":/app/package.json \
  -v "$(pwd)/webpack.config.js":/app/webpack.config.js \
  --name bowling-build-inst \
  bowling-builder
```

## Run

Runs `build` script from `package.json`.

```shell
docker start -a bowling-build-inst
```
