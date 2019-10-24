# Dynalite
Dynalite is an [Internet-of-Things](https://en.wikipedia.org/wiki/Internet_of_things) application which performs dynamic visualisation of room occupancy. Dynalite uses one or more Raspberry Pis to measure room occupancy and a NodeJS-Express-PostgreSQL web server to store and visualise the measured data. Communication betwene the Pis and the server is implemented using [COAP](https://coap.technology/).

## Tech stack
This project was built using the following technologies:

Web server:

- Back-end: NodeJS, ExpressJS, PostgreSQL
- Front-end: JQuery, Bootstrap
- Communication: NodeJS-COAP

Raspberry Pi:

- To fill

## Development guides

- To deploy the web server locally for development purposes, follow the steps in [local web server deployment guide](DEVELOP_WEB.md).
- To deploy the web server and database using `docker-compose`, follow the steps in the [Docker-compose deployment guide](DEVELOP_DOCKER.md).
- To setup the Raspberry Pi, view the [Raspberry Pi setup guide](DEVELOP_RASPBERRY_PI.md).