FROM node:20.11.0-alpine

WORKDIR /app

RUN apk add --no-cache curl

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "dev" ]