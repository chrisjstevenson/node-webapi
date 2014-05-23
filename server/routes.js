var notImplementedEndpoint = require('./service/notImplementedEndpoint.js');
var part = require('./service/part.js');

exports.init = function (app) {
    //app.param('id', /^\d+$/);

    //Heartbeat
    app.get('/api/v1/_isAlive', notImplementedEndpoint.notImplementedEndpoint);

    //Default
    app.get('/', function(req, res) {
        res.send('welcome to scorpion');
    });

    app.post('/part', function(req, res, next) {
        part.import(req, res, next);
    });

    app.get('/part', function(req, res, next) {
        part.all(req, res, next);
    })
}