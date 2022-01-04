# BowlingApp

Bowling App

# Docker

## Build image

```shell
docker build --no-cache -t bowling-app .
```

## Create container

### Build container

```shell
docker create \
  -v "$(pwd)/src":/app/src:ro \
  -v "$(pwd)/build":/app/build \
  -v "$(pwd)/tsconfig.json":/app/tsconfig.json \
  -v "$(pwd)/package.json":/app/package.json \
  -v "$(pwd)/webpack.config.js":/app/webpack.config.js \
  --name bowling-build \
  bowling-app build
```

### Test container

```shell
docker create \
  -v "$(pwd)/src":/app/src:ro \
  -v "$(pwd)/build":/app/build \
  -v "$(pwd)/tsconfig.json":/app/tsconfig.json \
  -v "$(pwd)/package.json":/app/package.json \
  -v "$(pwd)/webpack.config.js":/app/webpack.config.js \
  -v "$(pwd)/babel.config.js":/app/babel.config.js \
  -v "$(pwd)/jest.config.ts":/app/jest.config.ts \
  --name bowling-test \
  bowling-app test
```

## Run

### Run build

Runs `build` script from `package.json`.

```shell
docker start -a bowling-build
```

### Run test

Runs `test` script from `package.json`.

```shell
docker start -a bowling-test
```
