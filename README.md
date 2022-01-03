# BowlingApp
Bowling App

# Docker
## Build image
```shell
docker build --no-cache -t bowling-app .
```

## Create container
```shell
docker create \
  -v $(pwd)/src:/app/src:ro \
  -v $(pwd)/build:/app/build \
  --name bowling-app \
  bowling-app
```

## Run
Runs `build` script from `package.json`.
```shell
docker start -a bowling-app
```
