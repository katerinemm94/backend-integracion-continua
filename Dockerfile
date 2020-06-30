FROM node:12.18.0
LABEL maintainer "katerinemm94@gamil.com"
RUN mkdir -p /usr/src/app
WORKDIR /user/src/app
COPY package.json ./
RUN npm install
RUN npm install -g pm2 sequelize-cli
COPY . .
EXPOSE 8000
ENTRYPOINT ["npm", "run", "start"]
