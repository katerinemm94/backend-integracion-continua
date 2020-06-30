#!/bin/bash

# Migrar los modelos a la base de datos
echo "Migrar los modelos a la base de datos"
sequelize db:migrate --env production

# Crear datos básicos en las tablas migradas anteriormente
echo "Crear datos básicos en las tablas migradas anteriormente"
sequelize db:seed:all --env production

# Correr server
echo "Correr server"
npm run start
