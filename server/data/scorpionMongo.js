var mongoskin = require('mongoskin');

var mongoUrl = process.env.MONGO_URL || process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/scorpion';

var db = mongoskin.db(mongoUrl, {safe:true});

exports.db = db;