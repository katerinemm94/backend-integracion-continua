'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('providers', [{
      id: 1,
      code: 'WE879J',
      name: 'MotoWork la 33',
      city: 'Medellìn',
      country: 'Colombia',
      whatsapp: '3147889865',
      telephone: '5033328',
      primaryPhotoURL: null,
      notes: 'N/A',
      status: true,
      createdAt: '2020-06-07 08:32:24',
      updatedAt: '2020-06-07 08:32:24'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('providers', null, {});
  }
};