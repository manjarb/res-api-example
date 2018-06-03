import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);
const app = 'http://localhost:8500';

let userId = 1; // default user id

describe('API endpoint /users', function () {

    this.timeout(5000); // How long to wait for a response (ms)

    before(function () {

    });

    after(function () {

    });

    // GET - Check server
    it('should return service name', function () {
        return chai.request(app)
            .get('/')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body.service_name).to.be.an('string');
                expect(res.body).to.be.an('object');
            });
    });

    // GET - List all users
    it('should return all users', function () {
        return chai.request(app)
            .get('/users')
            .then(function (res) {
                if (res.body && res.body[0].id) {
                    userId = res.body[0].id;
                    console.log(`setting userId = ${userId}`);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
            });
    });

    // GET - Get a user details
    it(`Get a user details of user with id ${userId}`, function () {
        return chai.request(app)
            .get(`/users/${userId}`)
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.be.equals(userId);
            });
    });

    // GET - Invalid path
    it('should return not found', function () {
        return chai.request(app)
            .get('/user')
            .then(function (res) {
                expect(res.body).to.be.an('object');
            })
            .catch(function (err) {
                expect(err).to.have.status(404);
            });
    });

    // POST - Create a new user
    it('should create a new user', function () {
        const payload = {
            firstName: `Saravana`,
            lastName: 'Nagarethinam',
            age: 27
        };
        return chai.request(app)
            .post('/users')
            .send(payload)
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                if (res.body.id) {
                    userId = res.body.id;
                    console.log(`setting userId = ${userId}`);
                }
                expect(res.body.firstName).equals(payload.firstName);
                expect(res.body.lastName).equals(payload.lastName);
                expect(res.body.age).equals(payload.age);
            });
    });

    // POST - Create a new user with invalid form data
    it('should throw a bad request error', function () {
        const payload = {
            firstName: `Saravana`,
            age: 27
        };
        return chai.request(app)
            .post('/users')
            .send(payload)
            .then(function (res) {
                expect(res.body).to.be.an('object');
            }).catch(function (err) {
                expect(err).to.have.status(404);
            });
    });

    // DELETE - DELETE a user by id
    it(`should delete user of id ${userId}`, function () {
        return chai.request(app)
            .del(`/users/${userId}`)
            .then(function (res) {
                expect(res).to.have.status(200);
            });
    });

});
