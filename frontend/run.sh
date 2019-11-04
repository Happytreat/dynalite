#!/bin/bash

# Remove container with the same name if exist
docker stop dynalite_front || true && docker rm dynalite_front || true

# "-p <public port on host>:<private port of Docker>"
# "-d" represents detached mode, run in background
# "--rm" remove container on exit
docker run --name dynalite_front --rm -p 38081:3000 -d dynalite_frontend
