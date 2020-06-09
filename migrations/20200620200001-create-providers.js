'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('providers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            country: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            whatsapp: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            telephone: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            // Foto de la tarjeta del proveedor o del local
            primaryPhotoURL: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('providers');
    }
};