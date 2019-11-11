# Local frontend server deployment guide
## Downloads

1. [Install PostgreSQL](https://www.postgresql.org/download/).
2. [Install NodeJS](https://nodejs.org/en/).
3. Clone this repository (e.g. enter `git clone https://github.com/Happytreat/dynalite.git` in your command-line terminal).
4. Change directory to the newly created _dynalite_ directory by entering `cd dynalite`.

## NodeJS setup

1. Change directory to the _src_ folder by entering the command `cd frontend`.
2. Install the required packages by entering `npm install`.
3. Create a file named _.env_ in the current directory (refer to _.env.backup_).
4. Open _.env_ and enter the following: 
```
REACT_APP_API_URL=<backend-url-root>/occupancy
PUBLIC_URL=<frontend-url>
```

- Replace the fields in `< >` accordingly.
- You can omit `PUBLIC_URL` and the front-end app will use `localhost` accordingly.

Example:
```
REACT_APP_API_URL=https://www.evantay.com/tech/dynalite-api/occupancy
```

## Local server setup

1. Run this project on your local server by using `npm start`.
2. Stop the server by using `CTRL + C`.

## Testing

1. To test Dynalite front-end without your own Raspberry Pi or back-end server, use the example `REACT_APP_API_URL` given above.