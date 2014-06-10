var notImplementedEndpoint = require('./service/notImplementedEndpoint.js'),
    serviceOrder = require('./service/serviceOrder.js'),
    passport = require('passport'),
    authentication = require('./authentication.js')


var printConsoleMessage = function(message) {
    return function(req, res, next) {
        console.log(message);
        next();
    }};

exports.init = function (app, authentication) {

    app.get('/', function (req, res) {
        console.log(req.user)
        res.send('welcome to scorpion');
    });

    //Create
    app.post('/service-order', function(req, res, next) {
        serviceOrder.add(req, res, next);
    });

    app.get('/service-orders', printConsoleMessage('ROUTER api'),
        authentication.ensureAuthenticated,
        serviceOrder.all
    )

    //Get all
//    app.get('/service-orders', function(req, res, next) {
//        serviceOrder.all(req, res, next);
//    });

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