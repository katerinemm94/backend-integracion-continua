const db = require('../models');
const Product = require('../models').products;
const Resize = require("./../utils/resize.images");
const path = require('path');
const fs = require('fs');

allProducts = (req, res) => {
  return Product.findAll({
    order: db.Sequelize.literal('status')
  }).then(products => res.status(200).json({
    message: "Listado de productos",
    data: products,
    response: true,
    errors: null
  })).catch(error => res.status(500).send({
    message: 'Ocurrió un error al consultar los productos',
    data: null,
    response: false,
    errors: {
      message: error.message
    }
  }));
};

allProductsByStatus = (req, res) => {

  const status = req.params.status == 'active' ? true : false;

  return Product.findAll({
    where: {
      status: status
    }
  }).then(products => res.status(200).json({
    message: "Listado de productos",
    data: products,
    response: true,
    errors: null
  })).catch(err => res.status(500).send({
    message: 'Ocurrió un error al consultar los productos por estado',
    data: null,
    response: false,
    errors: {
      message: err.message
    }
  }));
};

createProduct = (req, res) => {
  return Product.create({
    code: req.body.code,
    description: req.body.description,
    unitPrice: req.body.unitPrice,
    boxPrice: req.body.boxPrice,
    quantityPerBox: req.body.quantityPerBox,
    packagingType: req.body.packagingType,
    numberModels: req.body.numberModels,
    notes: req.body.notes,
    primaryPhotoURL: req.body.primaryPhotoURL,
    thumbnailPhotoUrl: req.body.thumbnailPhotoUrl,
    status: true
  }).then(product => res.status(200).json({
    message: "Producto registrado correctamente!",
    data: product,
    response: true,
    errors: null
  })).catch(err => res.status(500).send({
    message: 'Ocurrió un error al registrar el producto',
    data: null,
    response: false,
    errors: {
      message: err.message
    }
  }));
};

createProduct2 = (req) => {
  return Product.create({
    code: req.body.code,
    description: req.body.description,
    unitPrice: req.body.unitPrice,
    boxPrice: req.body.boxPrice,
    quantityPerBox: req.body.quantityPerBox,
    packagingType: req.body.packagingType,
    numberModels: req.body.numberModels,
    notes: req.body.notes,
    primaryPhotoURL: req.body.primaryPhotoURL,
    thumbnailPhotoUrl: req.body.thumbnailPhotoUrl,
    status: true
  }).then(product => {
    return {
      data: product,
      message: "Producto registrado correctamente!",
      response: true,
      errors: null
    };
  }).catch(err => {
    return {
      message: 'Ocurrió un error al registrar el producto',
      data: null,
      response: false,
      errors: {
        message: err.message
      }
    };
  });
};



findProductByID = (req, res) => {

  Product.findByPk(req.params.productId).then(product => {

    if (!product) {
      return res.status(404).send({
        message: 'Ocurrió un error al buscar el producto',
        data: null,
        response: false,
        errors: {
          message: 'El producto no existe o no esta disponible'
        }
      });
    }

    return res.status(200).json({
      message: "Producto encontrado",
      data: product,
      response: true,
      errors: null
    });
  }).catch(err => {
    return res.status(500).send({
      message: 'Ocurrió un error al consultar el producto, o no existe',
      data: null,
      response: false,
      errors: {
        message: err.message
      }
    });
  });
};

findProductByCode = (req, res) => {

  const code = req.params.code;

  Product.findOne({
    where: {
      code: code
    }
  }).then(product => {

    if (!product) {
      return res.status(200).send({
        message: 'Ocurrió un error al buscar el producto',
        data: null,
        response: false,
        errors: {
          message: 'El producto no existe o no esta disponible'
        }
      });
    }

    return res.status(200).json({
      message: "Producto encontrado",
      data: product,
      response: true,
      errors: null
    });
  }).catch(err => {
    return res.status(500).send({
      message: 'Ocurrió un error al consultar el producto, o no existe',
      data: null,
      response: false,
      errors: {
        message: err.message
      }
    });
  });
};

updateProduct = (req, res) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      if (product === null) {
        throw {
          code: 404,
          message: 'El producto no existe o no esta disponible para ser actualizado'
        };
      }
      return product;
    })
    .then(product => {
      var productInst = product.update({
        code: req.body.code,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        boxPrice: req.body.boxPrice,
        quantityPerBox: req.body.quantityPerBox,
        packagingType: req.body.packagingType,
        numberModels: req.body.numberModels,
        notes: req.body.notes
      })
      return new Promise(function (resolve, reject) {
        productInst
          .then((productUpdate) => {
            if (!productUpdate) {
              reject({
                code: 500,
                message: 'El producto no existe o no esta disponible'
              });
            } else {
              resolve(productUpdate);
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
    .then(function (productUpdate) {
      return res.status(201).send({
        message: 'Producto actualizado correctamente!',
        data: productUpdate,
        response: true,
        errors: null
      });
    })
    .catch(error => {
      return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
        message: 'Ocurrió un error al actualizar el producto',
        data: null,
        response: false,
        errors: {
          message: error.hasOwnProperty('message')
            ? error.message
            : 'Ocurrió un error al actualizar el producto'
        }
      });
    });
};

updateProductStatus = (req, res) => {

  Product.findByPk(req.params.productId)
    .then(product => {
      if (product === null) {
        throw {
          code: 404,
          message: 'El producto no existe o no esta disponible para ser actualizado'
        };
      }
      return product;
    })
    .then(product => {
      var productInst = product.update({
        status: req.body.status
      })
      return new Promise(function (resolve, reject) {
        productInst
          .then((productUpdate) => {
            resolve(productUpdate);
          })
          .catch(err => {
            reject({
              code: 500,
              message: err.message
            });
          });
      });
    })
    .then(function (productUpdate) {
      return res.status(200).send({
        message: 'Producto actualizado correctamente!',
        data: productUpdate,
        response: true,
        errors: null
      });
    })
    .catch(error => {
      return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
        message: 'Ocurrió un error al actualizar el producto',
        data: null,
        response: false,
        errors: {
          message: error.hasOwnProperty('message')
            ? error.message
            : 'Ocurrió un error al actualizar el producto'
        }
      });
    });
};

uploadProductPhoto = async (req, res) => {

  const folderPath = './public/images/products';
  const imagePath = path.resolve(folderPath);
  const primaryPhoto = new Resize(imagePath);
  const thumbnailPhoto = new Resize(imagePath);
  if (!req.file) {

    return res.status(500).send({
      message: 'Ocurrió un error al subir la imagen del producto',
      data: null,
      response: false,
      errors: {
        message: 'La imagen del producto es requerida'
      }
    });
  }

  const primaryPhotoURL = await primaryPhoto.save(req.file.buffer, 512, 512);
  const thumbnailPhotoUrl = await thumbnailPhoto.save(req.file.buffer, 130, 130);

  Product.findByPk(req.params.productId)
    .then(product => {
      if (product === null) {
        throw {
          code: 404,
          message: 'El producto no existe o no esta disponible para ser actualizado'
        };
      }
      return product;
    })
    .then(product => {
      var productInst = product.update({
        primaryPhotoURL: primaryPhotoURL,
        thumbnailPhotoUrl: thumbnailPhotoUrl,
      });
      return new Promise(function (resolve, reject) {
        productInst
          .then((productUpdate) => {
            resolve(productUpdate);
          })
          .catch(err => {
            reject({
              code: 500,
              message: err.message
            });
          });
      });
    })
    .then(function (productUpdate) {
      return res.status(201).send({
        message: 'Imagenes del producto guardadas correctamente!',
        data: {
          product: productUpdate,
          primaryPhotoURL: `${primaryPhotoURL}`,
          thumbnailPhotoUrl: `${thumbnailPhotoUrl}`
        },
        response: true,
        errors: null
      });
    })
    .catch(error => {
      return res.status(error.hasOwnProperty('code') ? error.code : 500).send({
        message: 'Ocurrió un error al guardar las imágenes el producto',
        data: null,
        response: false,
        errors: {
          message: error.hasOwnProperty('message')
            ? error.message
            : 'Ocurrió un error al guardar las imágenes el producto'
        }
      });
    });

};

getProductPhoto = (req, res, next) => {
  const folderPath = './public/images/products';
  const photo = req.params.photo;
  const pathPhoto = path.resolve(`${folderPath}/${photo}`);
  // validacion de que si exista la ruta de la img
  if (fs.existsSync(pathPhoto)) {
    return res.sendFile(pathPhoto);
  } else {
    return res.status(500).send({
      message: 'Ocurrió un error al mostrar la foto del producto',
      data: null,
      response: false,
      errors: {
        message: `La imagen del producto ${photo} no existe`
      }
    });
  }

}

module.exports = {
  allProducts,
  allProductsByStatus,
  createProduct,
  createProduct2,
  findProductByID,
  findProductByCode,
  updateProduct,
  updateProductStatus,
  uploadProductPhoto,
  getProductPhoto
};
