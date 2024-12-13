# Base image
FROM node:21.1 as base

WORKDIR /usr/src/app

LABEL organisation="Lexirogue"
LABEL description="Docker project for Ynov"

COPY package*.json ./

RUN npm install
COPY . .

FROM base as dev
COPY .env ./


EXPOSE 3001

CMD ["npm", "run", "start:dev"]