# electric_plug high_brightness low_brightness Dynalite electric_plug high_brightness low_brightness
Dynalite is an [Internet-of-Things](https://en.wikipedia.org/wiki/Internet_of_things) application which performs dynamic visualisation of room occupancy. Dynalite uses one or more Raspberry Pis to measure room occupancy and a NodeJS-Express-PostgreSQL web server to store and visualise the measured data. Communication betwene the Pis and the server is implemented using [COAP](https://coap.technology/).

## View the project (Deprecated)

- Frontend: https://www.evantay.com/tech/dynalite/
- Backend: https://www.evantay.com/tech/dynalite-api/

## :zap: Tech stack :zap:
This project was built using 3 Docker containers and 1 Raspberry Pi:

1. Raspberry Pi:

- Python 3, aiocoap and RPI GPIO API
- Other hardware add-ons such as Light Dependent Resistors
- More RPi can always be added to Project Dynalite with no further configurations

2. Back-end NodeJS-PostgreSQL web server:

- A Docker container containing a PostgreSQL database
- A Docker container containing a NodeJS-ExpressJS app using the NodeJS-COAP library
    - Receives COAP messages from RPis at coap://hostname/
    - Authenticates payload before inserting into PostgreSQL container
    - Publishes data from PSQL via HTTP JSON API at https://www.evantay.com/tech/dynalite-api/occupancy
    - Publishes debug message log at https://www.evantay.com/tech/dynalite-api/

3. Front-end React web server:

- A Docker container containing the React app
- Reads data from backend server via API at https://www.evantay.com/tech/dynalite-api/occupancy
- Uses ChartJS for visualisation

## :dolphin: Development guides

### Raspberry Pi
To setup the Raspberry Pi, view the [Raspberry Pi setup guide](DEVELOP_RASPBERRY_PI.md).

### Frontend HTTP server
- To deploy the frontend server locally for development purposes, follow the steps in [local frontend server deployment guide](DEVELOP_FRONTEND.md).
- To deploy the frontend server using `Dockerfile`, follow the steps in [Docker frontend server deployment guide](DEVELOP_FRONTEND_DOCKER.md).

### Backend HTTP-COAP server
- To deploy the backend server locally for development purposes, follow the steps in [local backend server deployment guide](DEVELOP_BACKEND.md).
- To deploy the backend server and database using `docker-compose`, follow the steps in the [Docker-compose backend deployment guide](DEVELOP_BACKEND_DOCKER.md).

## Acknowledgements
* Dynalite was developed for National University of Singapore's [CS3103: Computer Networks Practice](https://nusmods.com/modules/CS3103/computer-networks-practice) in Autumn 2019. The module was taught by [Dr. Anand Bhojan](https://www.comp.nus.edu.sg/cs/bio/bhojan/).
* This project was developed by [Evan Tay](https://github.com/DigiPie/), [Joyce Yeo](https://github.com/pikulet/), [Matthew Lee](https://github.com/crazoter) and [Melodies Sim](https://github.com/Happytreat) from September to November 2019.
