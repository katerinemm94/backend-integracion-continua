FROM node:12.18.0
LABEL maintainer "katerinemm94@gamil.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# RUN npm i --g sequelize-cli pm2
# RUN npm i
# RUN npx sequelize db:migrate --env production
# RUN npx sequelize db:seed:all --env production

ENTRYPOINT  ["/entrypoint.sh"]

EXPOSE 8000

CMD ["npm", "start"]