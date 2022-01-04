# BowlingApp

Bowling App

# Docker

## Build the image

```shell
docker build \
  --no-cache \
  --build-arg "UID=$(id -u)" \
  --build-arg "GID=$(id -g)" \
  -t bowling-app .
```

## Create the containers

### Create the "build" container

```shell
docker create -t \
  -v "$(pwd)":/app/opt \
  --name bowling-build \
  bowling-app run build
```

### Create the "test" container

```shell
docker create -t \
  -v "$(pwd)":/app/opt \
  --name bowling-test \
  bowling-app run test
```

## Run the containers

### Run the "build" container

Runs `build` script from `package.json`.

```shell
docker start -a bowling-build
```

### Run "test" container

Runs `test` script from `package.json`.

```shell
docker start -a bowling-test
```
