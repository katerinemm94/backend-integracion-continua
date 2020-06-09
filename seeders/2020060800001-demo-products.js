'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};