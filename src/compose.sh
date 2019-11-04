#!/bin/bash

docker container rm -f dyna_b
docker container rm -f dyna_p
docker image rm -f src_dynalite_backend
set -a
source .env
docker-compose up -d
