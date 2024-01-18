FROM node:20.11.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]