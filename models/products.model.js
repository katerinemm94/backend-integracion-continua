module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('products', {

        code: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        quantityPerBox: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        boxPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },

        packagingType: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        numberModels: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        primaryPhotoURL: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        thumbnailPhotoUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    }, {});

    Products.associate = function(models) {
    };

    return Products;
};