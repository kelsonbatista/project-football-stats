// import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as bcrypt from 'bcryptjs';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import UserModel from '../database/models/user.model';
import { Response } from 'superagent';
import HandleToken from '../utils/handle.token';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Login endpoint tests', () => {

  let chaiHttpResponse: Response;
  
  const stubUser = {
    "id": 2,
    "username": "User",
    "role": "user",
    "email": "user@user.com",
    "password": '12345678',
  }

  // const { password, ...userInfo } = stubUser;
  // const passHash = bcrypt.hash(password, 10);
  // const stubUserHash = { ...userInfo, password: passHash }
  // console.log(stubUserHash, '<<<<<<<<<<<<<<<<<<<< stubUserHash');
  
  const validCredentials = { email: 'admin@admin.com', password: 'secret_admin' };
  const noEmailProperty = { password: 'secret_admin' };
  const wrongEmailCredentials = { email: 'wrong@admin.com', password: 'secret_admin' };
  const invalidEmailCredentials = { email: 'admin@admincom', password: 'secret_admin' };
  const noPasswordProperty = { email: 'admin@admin.com' };
  const wrongPasswordCredentials = { email: 'wrong@admin.com', password: 'secret_adm' };
  const invalidPasswordCredentials = { email: 'wrong@admin.com', password: 'admin' };

  before(async () => {
    // sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
    // sinon.stub(bcrypt, "compare").resolves(true);
  });

  after(()=>{
    // (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('1.1 - Returns status 200 and a token with valid credentials', async () => {
    const res = await chai.request(app).post('/login').send(validCredentials);
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('token');
  });

  it('1.2 - Returns an error status 400 if has no email property', async () => {
    const res = await chai.request(app).post('/login').send(noEmailProperty);
    expect(res.status).to.be.eq(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('"email" is required');
  });

  it('1.3 - Returns an error status 401 with wrong email credential', async () => {
    const res = await chai.request(app).post('/login').send(wrongEmailCredentials);
    expect(res.status).to.be.eq(401);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Incorrect email or password');
  });

  it('1.4 - Returns an error status 400 with invalid email credential', async () => {
    const res = await chai.request(app).post('/login').send(invalidEmailCredentials);
    expect(res.status).to.be.eq(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('All fields must be filled');
  });

  it('1.5 - Returns an error status 400 if has no password property', async () => {
    const res = await chai.request(app).post('/login').send(noPasswordProperty);
    expect(res.status).to.be.eq(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('"password" is required');
  });

  it('1.6 - Returns an error status 401 with wrong password credential', async () => {
    const res = await chai.request(app).post('/login').send(wrongPasswordCredentials);
    expect(res.status).to.be.eq(401);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Incorrect email or password');
  });

  it('1.7 - Returns an error status 400 with invalid password credential', async () => {
    const res = await chai.request(app).post('/login').send(invalidPasswordCredentials);
    expect(res.status).to.be.eq(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('All fields must be filled');
  });
});

describe('2 - Login Validation endpoint tests', () => {
  
  const stubUser = {
    "id": 1,
    "username": "admin",
    "role": "Admin",
    "email": "admin@admin.com",
    "password": "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  }

  const handleToken = new HandleToken();
  const token = handleToken.getToken(stubUser);
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU3ODA3MDg3LCJleHAiOjE2NTc4MTA2ODd9.gSAHYWwRByRqv0Vt4ZH2L7P00wqJrRKVchOiQy2122Y'

  before(async () => {
    // sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    // (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('2.1 - Returns status 200 and user information with valid token', async () => {
    const res = await chai.request(app).post('/login/validate').set({ "Authorization": token });
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('email');
  });

  it('2.2 - Returns an error status 401 with invalid token', async () => {
    const res = await chai.request(app).post('/login/validate').set({ "Authorization": invalidToken });
    expect(res.status).to.be.eq(401);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Token must be a valid token');
  });

});
