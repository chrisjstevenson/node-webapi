var db = require('../data/scorpionMongo').db;
var BSON = require('mongoskin').BSONPure;

function Add(req, res, next) {

    if (!req.body) {
        res.send(500, 'Invalid Request');
        return;
    }

    dbParts().insert(req.body, function (e, result) {
        if (e) return next(e);
        res.send(result);
    });
}

function Update(req, res, next) {

    if (!req.params.id) {
        res.send(500, 'id is required');
    }

    dbParts().updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? {msg: 'success'} : {msg: 'error'});
    });
}

function All(req, res, next) {
    // Clean query? who knows
    var query = req.query || {};

    dbParts().find(query, {limit: 10}).toArray(function (e, results) {
        if (e) return next(e);
        res.send(results)
    });
}

function Single(req, res, next){


    if(!req.params.id){
        res.send(500, 'id is required');
    }

    //Convert the string to an ObjectId.
    //http://stackoverflow.com/questions/10929443/nodejs-mongodb-getting-data-from-collection-with-findone
    var obj_id = BSON.ObjectID.createFromHexString(req.params.id);

    dbParts().findOne({ _id: obj_id }, function (e, result) {
        if (e) return next(e);
        if(result){
            res.send(result);
        }
        else{
            res.send(404, "Part not found. id: " + req.params.id);
        }
    });
}

function dbParts() {
    return db.collection('parts');
}

module.exports = {
    all: All,
    single: Single,
    add: Add,
    update: Update
};