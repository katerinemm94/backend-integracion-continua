'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {

    const product = await queryInterface.rawSelect('products', {
      where: {
        id: 1,
      },
    }, ['id']);

    if (!product) {
      
      return queryInterface.bulkInsert('products', [{
        id: 1,
        code: 'H76TYT0',
        description: 'Pipeta exosto mofle universal akrapovic',
        unitPrice: 190000,
        quantityPerBox: 3,
        boxPrice: 480000,
        packagingType: false,
        numberModels: 3,
        notes: 'N/A',
        primaryPhotoURL: null,
        thumbnailPhotoUrl: null,
        status: true,
        createdAt: '2020-06-07 08:32:24',
        updatedAt: '2020-06-07 08:32:24'
      }], {});

    } else {
      return;
    }

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
