'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            code: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            unitPrice: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            // Cantidad de productos por cada caja
            quantityPerBox: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            // Caja este precio se calcula precio unitario por cantidad por caja
            boxPrice: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            // 0 Significa armado
            // 1 Significa desarmado
            packagingType: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },

            // Cantidad de modelos que vienen en la caja
            numberModels: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },

            // Textarea que me permita dejar mensajes sobre el producto
            notes: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            primaryPhotoURL: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            thumbnailPhotoUrl: {
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
        return queryInterface.dropTable('products');
    }
};