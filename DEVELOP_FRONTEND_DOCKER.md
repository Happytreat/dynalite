# Docker frontend server deployment guide
This front-end server can be deployed via `docker` as a Docker container, `dynalite_frontend`.

This guide assumes you have already installed NodeJS, PostgreSQL and performed `npm install`. If you have not, please see [local frontend server deployment guide](DEVELOP_FRONTEND.md).

To deploy:

1. Change directory to the _src_ folder: `cd frontend`
2. Create a file named _.env_ in the current directory (refer to _.env.docker_backup_): `cp docker_env .env`
3. Open _.env_ and change the environment variable fields accordingly: `vim .env`
4. Build a production-ready build of the front-end app: `npm run build`
5. Build a Docker image of the app: `docker build -t dynalite_frontend --no-cache .`
6. Run a container from the image: `docker run --name dynalite_front --rm -p 80:3000 -d dynalite_frontend`
    - Maps TCP port 3000 in the container to port 80 on the Docker host
7. You can now view the front-end app at `http://<hostname>:80`
8. To stop and remove the container: `docker stop dynalite_front || true && docker rm dynalite_front || true`