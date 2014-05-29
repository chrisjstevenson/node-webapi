var superagent = require('superagent');
var expect = require('expect.js');

describe('Scorpion Service Order API should', function() {

    var baseUrl = 'http://localhost:3000';
    var id;
    var serviceOrderId;

    it('create a Service Order', function(done) {

       superagent.post(baseUrl + '/service-order')
           .send({
               "serviceOrderId": 308053941,
               "serialNumber": "bfb2ad63-8957-4e52-bdc4-147b863e945e",
               "classification": [
                   "velit",
                   "voluptate",
                   "nisi",
                   "quis",
                   "ea"
               ],
               "manufacturer": "ZIGGLES",
               "modelNumber": "G3418",
               "employeeId": "a1056009",
               "workstationId": "c59a3234-8d43-43b7-aac9-caaf285c0d4a",
               "condition": "Fair",
               "notes": [
                   "cupidatat amet voluptate amet exercitation magna magna deserunt laboris ea mollit quis esse commodo deserunt esse",
                   "dolor tempor nisi nulla cillum pariatur culpa proident exercitation velit reprehenderit cillum laboris ullamco sint et",
                   "incididunt aliquip ullamco nisi aliquip anim ad consequat ut laboris exercitation est anim dolore do mollit",
                   "adipisicing quis nostrud in occaecat culpa veniam excepteur Lorem mollit cillum sint laborum proident irure incididunt",
                   "incididunt sit ad culpa occaecat aliqua irure id esse culpa et non eu mollit eiusmod eiusmod"
               ],
               "accessories": [
                   "sunt"
               ],
               "other": [
                   "ea reprehenderit dolor consectetur in"
               ],
               "sortTo": "GS"
           })
           .end(function(e, res) {
               expect(e).to.eql(null);
               expect(res.body.length).to.eql(1);
               expect(res.body[0]._id.length).to.eql(24); //check for mongo key, length is 24
               id = res.body[0]._id;
               serviceOrderId = res.body[0].serviceOrderId;
               done();
           })

    });


    it('retrieve a Service Order', function(done) {
        superagent.get(baseUrl + '/service-order/' + id)
            .end(function(error, res) {
                expect(error).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id).to.eql(id);
                done();
            });
    });


    it('update a Service Order', function(done) {
        superagent.put(baseUrl + '/service-order/' + id)
            .send({"manufacturer": "UpdatedManufacturer"
            })
           .end(function(error, res) {
              expect(error).to.eql(null);
              expect(res.body.msg).to.eql('success');
              done();
           });
    });


    it('get all Service Orders', function(done) {
        superagent.get(baseUrl + '/service-orders')
            .end(function(error, res) {
                expect(error).to.eql(null);
                expect(res.body.length).to.be.above(0);
                done();
            });
    });

    it('get Service Order by serviceOrderId', function(done) {
        superagent.get(baseUrl + '/service-order-byid/' + serviceOrderId)
            .end(function(error, res) {

                console.log(res);

                expect(error).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body[0].serviceOrderId).to.eql(serviceOrderId);
                expect(res.body[0]._id).to.eql(id);
            })
    })


})