function notImplementedEndpoint(req, res, next) {
    res.send(501, 'Not Implemented');
    return;
}

module.exports = {
    notImplementedEndpoint: notImplementedEndpoint
};