var notImplementedEndpoint = require('./service/notImplementedEndpoint.js');
var serviceOrder = require('./service/serviceOrder.js');

exports.init = function (app) {
    //app.param('id', /^\d+$/);

    //Default
    app.get('/', function(req, res) {
        res.send('welcome to scorpion');
    });

    //Create
    app.post('/service-order', function(req, res, next) {
        serviceOrder.add(req, res, next);
    });

    //Get all
    app.get('/service-orders', function(req, res, next) {
        serviceOrder.all(req, res, next);
    });

    //Get one
    app.get('/service-order/:id', function(req, res, next) {
       serviceOrder.single(req, res, next);
    });

    //Get one
    app.get('/service-order-byid/:id', function(req, res, next) {
        serviceOrder.lookup(req, res, next);
    });

    //Update one
    app.put('/service-order/:id', function(req, res, next) {
       serviceOrder.update(req, res, next);
    });
}