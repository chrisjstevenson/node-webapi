/* https://github.com/klode/SandBox-Angular-Express-Passport/blob/master/server/authentication.js */

var passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

var ActiveDirectory = require('activedirectory');
var ad = new ActiveDirectory({
    url: 'LDAP://na.bestbuy.com',
    baseDN: 'dc=na,dc=bestbuy,dc=com',
    username: 'XXXXXX@bestbuy.com',
    password: 'XXXXXX' });

//OU=Default,OU=Users,OU=Best Buy,OU=Users and Groups,DC=na,DC=bestbuy,DC=com


//var sAMAccountName = 'XXXX';
//var userPrincipalName = 'my.email@bestbuy.com';


// Find user by a sAMAccountName
//ad.findUser(sAMAccountName, function(err, user) {
//    if (err) {
//        console.log('ERROR: ' +JSON.stringify(err));
//        return;
//    }
//
//    if (! user) console.log('User: ' + sAMAccountName + ' not found.');
//    else console.log(JSON.stringify(user));
//});


var username = 'XXXXXX0@bestbuy.com',
    password = 'XXXXXX'

ad.authenticate(username, password, function(err, auth) {
    if (err) {
        console.log('ERROR: '+JSON.stringify(err));
        return;
    }

    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});


var Users = require('./users');

console.log('test Users:\n', JSON.stringify(Users.testUsers, null, 4));

module.exports = {
    localStrategy: new localStrategy(
        function(username, password, done) {
            var user = Users.findUserByUsername(username);
            if(!user) {
                done(null, false, { message: 'Incorrect username.' });
            } else if (user.password != password) {
                done(null, false, {message: 'Incorrect password.' });
            } else {
                return done(null, user);
            }
        }
    ),

    serializeUser: function(user, done) {
        done(null, user.id);
    },

    deserializeUser: function(id, done) {
        var user = Users.findUserById(id);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    },

    login: function(req, res, next) {
        return passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send(400, { message: 'Bad username or password' });
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                res.json(200, user);
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        return res.send(200);
    },

    ensureAuthenticated: function (req, res, next) {
        console.log('Calling: ensureAuthenticated...');
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send(401);
        }
    },

    ensureAdmin: function (req, res, next) {
        console.log('Calling: ensureAdmin...')
        if (req.user && req.user.role == 'ADMIN') {
            return next();
        } else {
            return res.send(401);
        }
    }

};