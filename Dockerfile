FROM node:7.3.0

RUN npm install nodemon -g

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app
RUN npm run dist-setup

EXPOSE 80

CMD ["node", "server.js"]
