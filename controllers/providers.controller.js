const db = require('../models');
const Provider = require('../models').providers;
const Resize = require("./../utils/resize.images");
const path = require('path');
const fs = require('fs');

allProviders = (req, res) => {
    return Provider.findAll({
        order: db.Sequelize.literal('status')
    }).then(providers => res.status(200).json({
        message: "Listado de proveedores",
        data: providers,
        response: true,
        errors: null
    })).catch(error => res.status(500).send({
        message: 'Ocurrió un error al consultar los proveedores',
        data: null,
        response: false,
        errors: {
            message: error.message
        }
    }));
};

allProvidersByStatus = (req, res) => {

    const status = req.params.status == 'active' ? true : false;

    return Provider.findAll({
        where: {
            status: status
        }
    }).then(providers => res.status(200).json({
        message: "Listado de proveedores",
        data: providers,
        response: true,
        errors: null
    })).catch(err => res.status(500).send({
        message: 'Ocurrió un error al consultar los proveedores por estado',
        data: null,
        response: false,
        errors: {
            message: err.message
        }
    }));
};

createProvider = (req, res) => {
    return Provider.create({
        code: req.body.code,
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        whatsapp: req.body.whatsapp,
        telephone: req.body.telephone,
        notes: req.body.notes,
        primaryPhotoURL: req.body.primaryPhotoURL,
        status: true
    }).then(provider => res.status(200).json({
        message: "Proveedor registrado correctamente!",
        data: provider,
        response: true,
        errors: null
    })).catch(err => res.status(500).send({
        message: 'Ocurrió un error al registrar el proveedor',
        data: null,
        response: false,
        errors: {
            message: err.message
        }
    }));
};

findProviderByID = (req, res) => {

    Provider.findByPk(req.params.providerId).then(provider => {

        if (!provider) {
            return res.status(404).send({
                message: 'Ocurrió un error al buscar el proveedor',
                data: null,
                response: false,
                errors: {
                    message: 'El proveedor no existe o no esta disponible'
                }
            });
        }

        return res.status(200).json({
            message: "Proveedor encontrado",
            data: provider,
            response: true,
            errors: null
        });
    }).catch(err => {
        return res.status(500).send({
            message: 'Ocurrió un error al consultar el proveedor, o no existe',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
};

findProviderByCode = (req, res) => {

    const code = req.params.code;

    Provider.findOne({
        where: {
            code: code
        }
    }).then(provider => {

        if (!provider) {
            return res.status(200).send({
                message: 'Ocurrió un error al buscar el proveedor',
                data: null,
                response: false,
                errors: {
                    message: 'El proveedor no existe o no esta disponible'
                }
            });
        }

        return res.status(200).json({
            message: "Proveedor encontrado",
            data: provider,
            response: true,
            errors: null
        });
    }).catch(err => {
        return res.status(500).send({
            message: 'Ocurrió un error al consultar el proveedor, o no existe',
            data: null,
            response: false,
            errors: {
                message: err.message
            }
        });
    });
};

updateProvider = (req, res) => {
    Provider.findByPk(req.params.providerId)
        .then(provider => {
            if (provider === null) {
                throw {
                    code: 404,
                    message: 'El proveedor no existe o no esta disponible para ser actualizado'
                };
            }
            return provider;
        })
        .then(provider => {
            var providerInst = provider.update({
                code: req.body.code,
                name: req.body.name,
                city: req.body.city,
                country: req.body.country,
                whatsapp: req.body.whatsapp,
                telephone: req.body.telephone,
                notes: req.body.notes
            })
            return new Promise(function (resolve, reject) {
                providerInst
                    .then((providerUpdate) => {
                        if (!providerUpdate) {
                            reject({
                                code: 500,
                                message: 'El proveedor no existe o no esta disponible'
                            });
                        } else {
                            resolve(providerUpdate);
                        }
                    })
                    .catch(err => {
                        reject({
                            code: 500,
                            message: err.message
                        });
                    });
            });
        })
        .then(function (providerUpdate) {
            return res.status(201).send({
                message: 'Proveedor actualizado correctamente!',
                data: providerUpdate,
                response: true,
                errors: null
            });
        })
        .catch(error => {
            return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
                message: 'Ocurrió un error al actualizar el proveedor',
                data: null,
                response: false,
                errors: {
                    message: error.hasOwnProperty('message')
                        ? error.message
                        : 'Ocurrió un error al actualizar el proveedor'
                }
            });
        });
};

updateProviderStatus = (req, res) => {

    Provider.findByPk(req.params.providerId)
        .then(provider => {
            if (provider === null) {
                throw {
                    code: 404,
                    message: 'El proveedor no existe o no esta disponible para ser actualizado'
                };
            }
            return provider;
        })
        .then(provider => {
            var providerInst = provider.update({
                status: req.body.status
            })
            return new Promise(function (resolve, reject) {
                providerInst
                    .then((providerUpdate) => {
                        resolve(providerUpdate);
                    })
                    .catch(err => {
                        reject({
                            code: 500,
                            message: err.message
                        });
                    });
            });
        })
        .then(function (providerUpdate) {
            return res.status(200).send({
                message: 'Proveedor actualizado correctamente!',
                data: providerUpdate,
                response: true,
                errors: null
            });
        })
        .catch(error => {
            return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
                message: 'Ocurrió un error al actualizar el proveedor',
                data: null,
                response: false,
                errors: {
                    message: error.hasOwnProperty('message')
                        ? error.message
                        : 'Ocurrió un error al actualizar el proveedor'
                }
            });
        });
};

uploadProviderPhoto = async (req, res) => {

    const folderPath = './public/images/providers';
    const imagePath = path.resolve(folderPath);
    const primaryPhoto = new Resize(imagePath);
    if (!req.file) {

        return res.status(500).send({
            message: 'Ocurrió un error al subir la imagen del proveedor',
            data: null,
            response: false,
            errors: {
                message: 'La imagen del proveedor es requerida'
            }
        });
    }

    const primaryPhotoURL = await primaryPhoto.save(req.file.buffer, 512, 512);

    Provider.findByPk(req.params.providerId)
        .then(provider => {
            if (provider === null) {
                throw {
                    code: 404,
                    message: 'El proveedor no existe o no esta disponible para ser actualizado'
                };
            }
            return provider;
        })
        .then(provider => {
            var providerInst = provider.update({
                primaryPhotoURL: primaryPhotoURL
            });
            return new Promise(function (resolve, reject) {
                providerInst
                    .then((providerUpdate) => {
                        resolve(providerUpdate);
                    })
                    .catch(err => {
                        reject({
                            code: 500,
                            message: err.message
                        });
                    });
            });
        })
        .then(function (providerUpdate) {
            return res.status(201).send({
                message: 'Imagenes del proveedor guardadas correctamente!',
                data: {
                    provider: providerUpdate,
                    primaryPhotoURL: primaryPhotoURL
                },
                response: true,
                errors: null
            });
        })
        .catch(error => {
            return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
                message: 'Ocurrió un error al guardar las imágenes el proveedor',
                data: null,
                response: false,
                errors: {
                    message: error.hasOwnProperty('message')
                        ? error.message
                        : 'Ocurrió un error al guardar las imágenes el proveedor'
                }
            });
        });

};

getProviderPhoto = (req, res, next) => {
    const folderPath = './public/images/providers';
    const photo = req.params.photo;
    const pathPhoto = path.resolve(`${folderPath}/${photo}`);
    // validacion de que si exista la ruta de la img
    if (fs.existsSync(pathPhoto)) {
        return res.sendFile(pathPhoto);
    } else {
        return res.status(500).send({
            message: 'Ocurrió un error al mostrar la foto del proveedor',
            data: null,
            response: false,
            errors: {
                message: `La imagen del proveedor ${photo} no existe`
            }
        });
    }

}

module.exports = {
    allProviders,
    allProvidersByStatus,
    createProvider,
    findProviderByID,
    findProviderByCode,
    updateProvider,
    updateProviderStatus,
    uploadProviderPhoto,
    getProviderPhoto
};
