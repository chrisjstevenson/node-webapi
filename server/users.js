

var Users = [{id: 1, username: 'user', password: 'pass', role: 'USER'},
             {id: 2, username: 'admin', password: 'pass', role: 'ADMIN'}]


function findUserByProperty (prop, val) {

    for (var i = 0, l = Users.length; i < l; i++) {
        if (typeof Users[i][prop] === 'undefined') {
            continue;
        }

        if (Users[i][prop] === val) {
            return Users[i];
        }
    }

    return false;
}


module.exports = {
    testUsers: Users,
    user: Users[0],
    admin: Users[1],
    findUserByUsername: function(username) {
        return findUserByProperty('username', username);
    },
    findUserById: function(id) {
        return findUserByProperty('id', id);
    }

}