/**
 * Created by Ibrahim Ayman on 13/07/2017.
 */
var User = require("../app/models/user"),
    config = require("../config"),
    mongoose = require("mongoose"),
    express = require("express"),
    request = require('supertest');

var app = express();

mongoose.connect(config.database, (err) => {
    if (err) return err;
    console.log("connected to Db");
});

// test to create new user
// describe("Create New user", () => {
//     it('add new user', () => {
//         var user = new User({
//             name: "ibrahim",
//             username: "ibrahimayman",
//             password: "123"
//         });
//
//         user.save().then((result) => {
//             console.log(result);
//         });
//
//     });
// });

// test to login
describe('Login API', function () {
    it('Should success if credential is valid', function (done) {
        request(app)
            .post('/api/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: 'amrAyman', password: '123'})
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });
});