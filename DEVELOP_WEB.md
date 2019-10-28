# Local web server deployment guide
## Downloads

1. [Install PostgreSQL](https://www.postgresql.org/download/).
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository (e.g. enter `git clone https://github.com/Happytreat/dynalite.git` in your command-line terminal).
4. Change directory to the newly created _dynalite_ directory by entering `cd dynalite`.

## NodeJS setup

1. Change directory to the _src_ folder by entering the command `cd src`.
2. Install the required packages by entering `npm install`.
3. Create a file named _.env_ in the current directory (refer to _.env.backup_).
4. Open _.env_ and enter the following: 
```
DATABASE_URL=postgres://<username>:<password>@<hostname>:<port>/<database_name>
ALGORITHM=<algorithm>
KEY=<key>
```
Replace the fields in `< >` accordingly.

Example (not actual fields):
```
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres
ALGORITHM=aes-128-cbc
KEY=helloWorldSecureKey21
```

- 5432 is the default port for PostgreSQL

## Local server setup

1. Run this project on your local server by using `npm start`.
2. Stop the server by using `CTRL + C`.

## Testing

1. To test Dynalite without a Raspberry Pi, refer to [COAP-CLI](https://github.com/avency/coap-cli). An example command would be: `coap post coap://localhost/ -p "Hello COAP"`.
2. Dynalite receives POST COAP messages at `coap://localhost/` which are stored in a PostgreSQL table.
3. Dynalite displays these stored messages at `http://localhost:3000/`.