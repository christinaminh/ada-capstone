FROM node:12-slim

WORKDIR /app

COPY package.json /app

RUN yarn install && yarn cache clean

COPY . /app

EXPOSE 8080

CMD ["yarn", "run", "build"]



