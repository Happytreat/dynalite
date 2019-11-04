# Alpine is a minimal Docker image
FROM node:alpine

# Create app directory
WORKDIR /usr/src/react-node-docker

# Copy package.json and package-lock.json into WORKDIR
COPY package*.json ./

# Copy source code into WORKDIR
COPY build/* ./build/

# Build for production
RUN npm i serve -g

EXPOSE 3000

# Start serving application
CMD ["serve", "-s", "build", "-p", "3000"]
