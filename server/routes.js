var notImplementedEndpoint = require('./service/notImplementedEndpoint.js'),
    serviceOrder = require('./service/serviceOrder.js'),
    passport = require('passport'),
    authentication = require('./authentication.js')


var printConsoleMessage = function(message) {
    return function(req, res, next) {
        console.log('authenticated: ' + req.isAuthenticated());
        console.log('sessionData: ' + JSON.stringify(req.user, null, 4));
        console.log(message);
        next();
    }};

exports.init = function (app, authentication) {

    app.get('/', function (req, res) {
        res.send('welcome to scorpion');
    });

    app.get('/login', printConsoleMessage("ROUTER login"),
        authentication.login
    );

    app.get('/logout', printConsoleMessage("ROUTER logout"),
        authentication.logout
    );

    //Get all
    app.get('/service-orders', printConsoleMessage('ROUTER api'),
        authentication.ensureAuthenticated,
        serviceOrder.all
    )

    //Get one
    app.get('/service-order/:id', function(req, res, next) {
        serviceOrder.single(req, res, next);
    });

    //Get one
    app.get('/service-order-byid/:id', function(req, res, next) {
        serviceOrder.lookup(req, res, next);
    });


    //API Endpoints


    //Create
    app.post('/api/service-order', printConsoleMessage('router: api'),
        serviceOrder.add
    );

    //Get all
    app.get('/api/service-orders', printConsoleMessage('router: api'),
        serviceOrder.all
    )

    //Get one
    app.get('/api/service-order/:id', function(req, res, next) {
       serviceOrder.single(req, res, next);
    });

    //Get one
    app.get('/api/service-order-byid/:id', function(req, res, next) {
        serviceOrder.lookup(req, res, next);
    });

    //Update one
    app.put('/api/service-order/:id', function(req, res, next) {
       serviceOrder.update(req, res, next);
    });
}