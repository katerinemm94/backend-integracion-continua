# Backend Integración Continua

# Crear Migración
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string

# Crear Seeders
npx sequelize seed:generate --name demo-user

# Migrar la base de datos
npx sequelize db:migrate --env test
npx sequelize db:migrate --env development

# Migrar Seeders
sequelize db:seed --seed [seed file name]
npx sequelize db:seed:all --env test
npx sequelize db:seed:all --env development

# .env
    NODE_ENV=test
    PORT=80

# Si no funciona en mac la instalación ejecutar lo siguiente

sudo npm i -g elm-github-install --unsafe-perm=true --allow-root

sudo npm i -g elm --unsafe-perm=true --allow-root


https://devcenter.heroku.com/articles/deploying-nodejs
http://pm2.keymetrics.io/docs/integrations/heroku/

# Pasos para crear y tener la base de datos corriendo
Se deben ejecutar los siguientes comandos para que se corra la base de datos del proyecto

# Crear contenedor de base de datos
docker run --name db_integracion_continua -e POSTGRES_PASSWORD=admin123 -e POSTGRES_USER=admin -e POSTGRES_DB=db_integracion_continua ---network mired -d -p 5432:5432 postgres

5432:5432
Puerto expuesto : puerto interno

# Migrar la base de datos
npx sequelize db:migrate --env development

# Migrar Seeders
npx sequelize db:seed:all --env development


# Pasos para correr el API
Se deben ejecutar los siguientes comandos para que se corra el API

# Ejcutar PM2 que por debajo levanta app.js
npm run dev

docker network create mired ---network mired

# Descargar imagenes con docker
para descargar una imagen con docker se debe tirar el siguiente comando
docker pull postgres:13-alpine
Tener en cuenta que por buena practica siempre se debe elegir la version con la cual se desea trabajar

# Descargar imagenes con docker
para descargar una imagen con docker se debe tirar el siguiente comando
docker pull postgres:13-alpine
Tener en cuenta que por buena practica siempre se debe elegir la version con la cual se desea trabajar

