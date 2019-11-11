# Docker-compose backend deployment guide
The back-end server can be deployed via `docker-compose` as two Docker containers, `dynalite_backend` and `dynalite_psql`. `dynalite_backend` will contain the NodeJS HTTP-COAP server app. `dynalite_psql` will contain the PostgreSQL database.

This guide assumes you have already installed NodeJS, PostgreSQL and performed `npm install`. If you have not, please see [local backend server deployment guide](DEVELOP_BACKEND.md).

To deploy:

1. Change directory to the _src_ folder: `cd src`
2. Create a file named _.env_ in the current directory (refer to _.env.docker_backup_): `cp docker_env .env`
3. Open _.env_ and change the environment variable fields accordingly: `vim .env`

Note:
- 5432 is the default port for PostgreSQL.
- DATABASE_URL is used by Bob

4. Save _.env_
5. `set -a`
6. Set _.env_ as the source: `source .env`
7. Start the 2 containers: `docker-compose up -d`
8. View the exposed TCP HTTP port and UDP COAP port of the HTTP-COAP server: `docker container list`
9. Consider using a reverse proxy such as Nginx to route TCP and UDP packets to the server. See [Nginx's documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/tcp-udp-load-balancer/).