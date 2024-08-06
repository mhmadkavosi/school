FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm
RUN npm ci
COPY . .
RUN npm run build
CMD ["sh", "-c", "npm run start"]

