var users = require('../users.js'),
    expect = require('expect');

describe('Users', function() {

    it ('should find user by id', function() {
        expect(users.findUserById(1).username === 'user');
    });


    it ('should find user', function() {
        expect(users.findUserByUsername('user').password === 'pass');
    })

    it ('should get testUsers', function() {
        expect(users.testUsers.length === 2);
    })

    it ('should get user', function () {
        expect(users.user.length === 1);
        expect(users.user.username === 'user');
    })

    it ('should get admin', function () {
        expect(users.admin.length === 1);
        expect(users.admin.username === 'admin');
    })

})