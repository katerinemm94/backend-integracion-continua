const controller = require('../controllers').providers;
const upload = require('./../middlewares/multer.middleware');

module.exports = function(app, api_version) {

    app.get(api_version + '/providers', controller.allProviders);
    app.post(api_version + '/providers', controller.createProvider);
    app.get(api_version + '/providers/status/:status', controller.allProvidersByStatus);
    app.get(api_version + '/providers/:providerId', controller.findProviderByID);
    app.put(api_version + '/providers/:providerId', controller.updateProvider);
    app.get(api_version + '/providers/code/:code', controller.findProviderByCode);
    app.put(api_version + '/providers/status/:providerId', controller.updateProviderStatus);
    app.post(api_version + '/providers/upload/:providerId', [upload.single('image')], controller.uploadProviderPhoto);
    app.get(api_version + '/providers/photo/:photo', controller.getProviderPhoto);
};