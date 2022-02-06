# Tenpins (or less...)

A tenpins score calculator.  
It is also possible to play with less than 10 pins.

## Online usage

Stable version available here: https://www.tenpins.fun  
Development version available here: https://dev.tenpins.fun

## Local usage

### Prerequisites

You need to install npm to build the project.

You can either set up a Node.js
environment: [Downloading and installing Node.js and npm | npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
Or use the [Dockerfile](Dockerfile) included in the repository (Linux only).

The examples below use Docker via the [`docker-npm`](docker-npm) script from the repository.  
If you are setting up your own Node.js environment, substitute `./docker-npm` for `npm` in the examples.  
If you are using Docker Desktop on Windows, make sure to run the [`docker-npm`](docker-npm) script from WSL.

### Build

```shell
# install the dependencies
./docker-npm install
# transpile *.ts files to *.js
./docker-npm run build
```

### Test

```shell
./docker-npm run test
```
