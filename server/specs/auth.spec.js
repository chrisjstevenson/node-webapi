var superagent = require('superagent');
var expect = require('expect.js');

describe('Scorpion Server Auth API should', function() {

    var baseUrl = 'http://localhost:3000';

    it('allow access to /', function (done) {
        superagent.get(baseUrl + '/')
            .end(function (error, res) {
                expect(error).to.eql(null);
                done();
            });
    });


    it('disallow access to /service-orders', function (done) {
        superagent.get(baseUrl + '/service-orders')
            .end(function (error, res) {
                expect(error).to.eql(null);
                expect(res.status).to.eql(401);
                done();
            })
    })

    it('should login', function(done) {
        superagent.get(baseUrl + '/login?username=user&password=pass')
            .end(function (error, res) {
                expect(error).to.eql(null)
                expect(res.status).to.eql(200);
                done();
            })
    })

    it('should logout', function(done) {
        superagent.get(baseUrl + '/logout')
            .end(function (error, res) {
                expect(error).to.eql(null)
                expect(res.status).to.eql(200);
                done();
            })
    })

});



