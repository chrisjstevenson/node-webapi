var superagent = require('superagent');
var expect = require('expect.js');

describe('scorpion rest api server', function() {

    var baseUrl = 'http://localhost:3000';
    var id;

    it('posts a part', function(done) {

       superagent.post(baseUrl + '/part')
           .send({
               "serviceOrder": 308053941,
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

               //console.log(res.error);

               expect(e).to.eql(null);
               expect(res.body.length).to.eql(1);
               expect(res.body[0]._id.length).to.eql(24); //mongo key length is 24
               id = res.body[0]._id;
               done();
           })

    });


    it('Retrieves a part', function(done) {
        superagent.get(baseUrl + '/part/' + id)
            .end(function(error, res) {
                expect(error).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length).to.eql('24');
                expect(res.body._id).to.eql(id);
                done();
            });
    });


    it('Updates a part', function(done) {
        superagent.put(baseUrl + '/part/' + id)
            .send({"manufacturer": "UpdatedManufacturer"
            })
           .end(function(error, res) {
              expect(error).to.eql(null);
              expect(res.body.msg).to.eql('success');
              done();
           });
    });


    it('gets all parts', function(done) {
        superagent.get(baseUrl + '/part')
            .end(function(error, res) {
                expect(error).to.eql(null);
                expect(res.body.length).to.be.above(0);
                done();
            });
    });

})