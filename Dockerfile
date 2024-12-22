FROM node:16.0.0 AS build

WORKDIR /app

COPY package.json .

RUN yarn chache clean & yarn install --ignore-engines

COPY . .

CMD ["yarn", "start"]

#RUN npm run build
#
#FROM linuxserver/swag:latest AS prod
#
#COPY --from=build /app/build/ /usr/share/nginx/html
#
#CMD ["nginx", "-g", "daemon off;"]
