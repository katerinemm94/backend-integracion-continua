module.exports = (app) => {
    require('./product.routes')(app, '/api/v1');
    require('./provider.routes')(app, '/api/v1');
};