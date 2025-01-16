# Use the Node.js base image with the required version
FROM node:20.11.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to install dependencies
COPY package*.json ./

# Install the specified npm version globally
RUN npm install -g npm@10.2.4

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

CMD ['npm' ,'run' , 'build']

# Start the application
CMD ["npm", "start"]
