# Local development guide
This guide is made up of two parts, the first being on **web server setup** and the second being about **Raspberry Pi setup**.

## Web server setup
### Downloads

1. [Install PostgreSQL](https://www.postgresql.org/download/).
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository (e.g. enter `git clone https://github.com/Happytreat/dynalite.git` in your command-line terminal).
4. Change directory to the newly created _dynalite_ directory by entering `cd dynalite`.

### Database setup

1. Log into **psql** by entering `psql -U username -d database`. Replace the fields accordingly (e.g. `psql -U postgres -d postgres`).
2. Execute _setup.sql_ by running the command `\i setup.sql`.
7. Exit **psql** by entering `\q`.

### NodeJS setup

1. Change directory to the _src_ folder by entering the command `cd src`.
2. Install the required packages by entering `npm install`.
3. Create a file named _.env_ in the current directory (refer to _.env.backup_).
4. Open _.env_ and enter the following: 
```
DATABASE_URL=postgres://<username>:<password>@<hostname>:<port>/<database_name>
```
Replace the fields in `< >` accordingly.

Example:
```
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres
```

- 5432 is the default port for PostgreSQL

### Local server setup

1. Run this project on your local server by using `npm start`.
2. Stop the server by using `CTRL + C`.

### Testing

1. To test Dynalite without a Raspberry Pi, refer to [COAP-CLI](https://github.com/avency/coap-cli). An example command would be: `coap post coap://localhost/ -p "Hello COAP"`.
2. Dynalite receives POST COAP messages at `coap://localhost/` which are stored in a PostgreSQL table.
3. Dynalite displays these stored messages at `http://localhost:3000/`.

## Raspberry Pi setup
These are the scripts to run on the actual raspberry pis.

- To run without DTLS, install `txthings` using `pip`. Then, run `python light-client.py`. This is in python2 because of Twisted [not being fully ported](https://twistedmatrix.com/documents/14.0.2/core/howto/python3.html). txThings does not have support for DTLS yet.
- To run with DTLS, install the development version of `aiocoap` by following the instructions [here](https://aiocoap.readthedocs.io/en/latest/installation.html). Then, run `python3 light-client-dtls.py`. This script is in python3.
- `rpi.py` just contains a capacitor-reading code. It uses time to convert digital signals from the Raspberry Pi to analog signals. The full tutorial is [here](https://www.youtube.com/watch?v=dPwW9zmX84E). 
- To run on an actual Pi and read from the GPIO pin, uncomment the GPIO portions. For testing on laptops, there will be no `RPi.GPIO` module.
- The connection on the RaspberryPi is just the Pi, photoresistor and a capacitor in series. Without a capacitor, the code can still run but only reading digital signals (it can tell there is light, but not how much light).