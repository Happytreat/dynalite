FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into WORKDIR
COPY package*.json ./

# Copy source code into WORKDIR
COPY . .

# Build for production
RUN npm i serve -g

EXPOSE 3000

# Start serving application
CMD ["serve", "-s", "build", "-p", "3000"]
