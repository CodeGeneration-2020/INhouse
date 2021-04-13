# build app
FROM node:14.13-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY ./src ./src
COPY ./public ./public

ARG REACT_APP_ADDRESS
ENV REACT_APP_ADDRESS $REACT_APP_ADDRESS

RUN npm run build

# serve build
FROM node:14.13-alpine AS serve

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build

RUN npm install --global --unsafe-perm serve

ARG PORT=8000
ENV PORT $PORT

EXPOSE $PORT

CMD ["serve", "--no-clipboard", "build"]
