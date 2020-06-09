const controller = require('../controllers').products;
const upload = require('./../middlewares/multer.middleware');

module.exports = function(app, api_version) {

    app.get(api_version + '/products', controller.allProducts);
    app.post(api_version + '/products', controller.createProduct);
    app.get(api_version + '/products/status/:status', controller.allProductsByStatus);
    app.get(api_version + '/products/:productId', controller.findProductByID);
    app.put(api_version + '/products/:productId', controller.updateProduct);
    app.get(api_version + '/products/code/:code', controller.findProductByCode);
    app.put(api_version + '/products/status/:productId', controller.updateProductStatus);
    app.post(api_version + '/products/upload/:productId', [upload.single('image')], controller.uploadProductPhoto);
    app.get(api_version + '/products/photo/:photo', controller.getProductPhoto);
};