rm -rf node_modules/sharp
npm install --arch=x64 --platform=linux sharp
npx sequelize db:migrate --env production
npx sequelize db:seed:all --env production
npm run start