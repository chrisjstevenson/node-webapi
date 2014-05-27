var notImplementedEndpoint = require('./service/notImplementedEndpoint.js');
var part = require('./service/part.js');

exports.init = function (app) {
    //app.param('id', /^\d+$/);

    //Default
    app.get('/', function(req, res) {
        res.send('welcome to scorpion');
    });

    //Create
    app.post('/part', function(req, res, next) {
        part.add(req, res, next);
    });

    //Get all
    app.get('/part', function(req, res, next) {
        part.all(req, res, next);
    });

    //Get one
    app.get('/part/:id', function(req, res, next) {
       part.single(req, res, next);
    });

    app.put('/part/:id', function(req, res, next) {
       part.update(req, res, next);
    });

}