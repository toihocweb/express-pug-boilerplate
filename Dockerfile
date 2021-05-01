FROM node:alpine

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /app/
RUN npm install

COPY . /app

ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start" ]
