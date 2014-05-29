var db = require('../data/scorpionMongo').db;

function Add(req, res, next) {

    if (!req.body) {
        res.send(500, 'Invalid Request');
        return;
    }

    dbServiceOrders().insert(req.body, function (e, result) {
        if (e) return next(e);
        res.send(result);
    });
}

function Update(req, res, next) {

    if (!req.params.id) {
        res.send(500, 'id is required');
    }

    dbServiceOrders().updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function (e, result) {
        if (e) return next(e);
        res.send((result === 1) ? {msg: 'success'} : {msg: 'error'});
    });
}

function All(req, res, next) {
    var query = req.query || {};

    dbServiceOrders().find(query, {limit: 10}).toArray(function (e, results) {
        if (e) return next(e);
        res.send(results)
    });
}

function Single(req, res, next) {

    if(!req.params.id){
        res.send(500, 'id is required');
    }

    dbServiceOrders().findById(req.params.id, function(e, result) {
        if (e) return next(e);
        if (result){
            res.send(result);
        }
        else{
            res.send(404, "Service Order not found.  id: " + req.params.id);
        }
    });
}

function Lookup(req, res, next) {

    console.log(req.params.serviceOrderId)

    dbServiceOrders().findOne({serviceOrderId:req.params.serviceOrderId}, function(e, result) {

        if (e) return next(e);
        if (result){
            res.send(result);
        }
        else{
            res.send(404, "Service Order not found.  Id: " + req.params.serviceOrderId);
        }
    });
}


function dbServiceOrders() {
    return db.collection('serviceOrders');
}

module.exports = {
    all: All,
    single: Single,
    add: Add,
    update: Update,
    lookup: Lookup
};