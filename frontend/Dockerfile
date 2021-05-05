# build app
FROM node:14.13-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src ./src
COPY public ./public

ARG API_URL
ENV REACT_APP_ADDRESS=$API_URL

RUN npm run build

# run static server for app
FROM node:14.13-alpine AS run

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install --global --unsafe-perm serve

CMD ["serve", "--no-clipboard", "build"]
