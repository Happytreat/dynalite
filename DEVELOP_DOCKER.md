# Docker-compose deployment guide
This project can be deployed via `docker-compose` as two Docker containers, `dynalite_backend` and `dynalite_psql`. `dynalite_backend` will contain the NodeJS HTTP-COAP server app. `dynalite_psql` will contain the PostgreSQL database.

To deploy:

1. Change directory to the _src_ folder: `cd src`
2. Create a file named _.env_ in the current directory (refer to _.env.docker_backup_): `cp .env.docker_backup .env`
3. Open _.env_ and enter the following: `vim .env`

```
NODE_ENV=development
DATABASE_URL=postgres://<username>:<password>@<hostname>:<port>/<database_name>
ALGORITHM=<algorithm>
KEY=<key>
DB_USER=<username>
DB_PW=<password>
DB_NAME=<database_name>
```

Note:
- 5432 is the default port for PostgreSQL.
- DATABASE_URL is used by Bob

4. Save _.env_
5. `set -a`
6. Set _.env_ as the source: `source .env`
7. Start the 2 containers: `docker-compose up -d`
8. View the exposed TCP HTTP port and UDP COAP port of the HTTP-COAP server: `docker container list`
9. Consider using a reverse proxy such as Nginx to route TCP and UDP packets to the server. See [Nginx's documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/).