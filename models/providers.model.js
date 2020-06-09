module.exports = (sequelize, DataTypes) => {
    const Providers = sequelize.define('providers', {

        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        city: {
            type: DataTypes.STRING,
            allowNull: true
        },

        country: {
            type: DataTypes.STRING,
            allowNull: true
        },

        whatsapp: {
            type: DataTypes.STRING,
            allowNull: true
        },

        telephone: {
            type: DataTypes.STRING,
            allowNull: true
        },

        primaryPhotoURL: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {});

    Providers.associate = function (models) {
    };

    return Providers;
}