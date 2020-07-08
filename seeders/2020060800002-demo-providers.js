'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {

    const provider = await queryInterface.rawSelect('providers', {
      where: {
        id: 1,
      },
    }, ['id']);

    if (!provider) {
      
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

    } else {
      return;
    }

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('providers', null, {});
  }
};