FROM node:12-slim

WORKDIR /app

COPY package.json /app

RUN yarn install && yarn cache clean

COPY . /app

ENV PORT=8000

CMD ["yarn", "run", "build"]


# FROM node:12-slim
# RUN mkdir -p usr/src/app
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install -g serve
# RUN npm install
# RUN npm run build
# EXPOSE 8080
# CMD ["serve", "-s", "-l", "8080", "./build"]