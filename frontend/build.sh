#!/bin/bash

# Builds a production-ready directory /build for serving
# Ensure that there is a '.env' file in the same directory as 'package.json'
# which should contain the environmental variable PUBLIC_URL.
# Example: PUBLIC_URL= https://www.evantay.com/tech/react-node-docker/
npm i
npm run build

# Rebuild image
docker build -t dynalite_frontend --no-cache .
