FROM node:14.17.5-alpine

LABEL author="João Leão"

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

RUN npm config set unsafe-perm true

RUN npm install -g nodemon

RUN npm install -g rxjs@6.5.5 moment@2.29.1 typescript@4.5.4 webpack@5.65.0 webpack-cli@4.9.1 file-saver@1.3.8 uuid@8.3.2

EXPOSE 8000

WORKDIR /usr/src/app/server/dist/

ENTRYPOINT ["nodemon", "main.js"]