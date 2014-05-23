var express = require('express'),
    routes = require('./server/routes'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

routes.init(app);

app.listen(process.env.PORT || 3000);