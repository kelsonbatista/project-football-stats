import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/user.model';
// import bcrypt from 'bcryptjs';
// import { Response } from 'superagent';
// import { Request } from 'supertest';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Login endpoint tests', () => {

  // let chaiHttpResponse: Response;
  // const { password, ...userInfo } = payload;
  // const salt = bcrypt.genSaltSync(10);
  // const passHash = bcrypt.hashSync(password, salt);
  
  const stubUser = {
    "id": 2,
    "username": "User",
    "role": "user",
    "email": "user@user.com",
    "password": "12345678"
  }
  
  const userCredentials = { email: 'user@user.com', password: '12345678' };

  before(async () => {
    sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Returns status 200(OK)', async () => {
    const response = await chai.request(app).post('/login').send(userCredentials);
    expect(response.status).to.be.eq(200);
  });

  it('Returns an object with user data', async () => {
    const response = await chai.request(app).post('/login').send(userCredentials);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.eql(stubUser)
  });
});

describe('2 - Login Validation endpoint tests', () => {
  
  const stubUser = {
    "id": 4,
    "username": "maria",
    "role": "user",
    "email": "maria@user.com",
    "password": "12345678"
  }
  
  // const payload = { email: 'user@user.com', password: '12345678' };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJ1c2VybmFtZSI6Im1hcmlhIiwicm9sZSI6IlVzZXIiLCJlbWFpbCI6Im1hcmlhQHVzZXIuY29tIn0sImlhdCI6MTY1NzM4MTk3OCwiZXhwIjoxNjU3Mzg1NTc4fQ.w_3m8CqSA9Fb-nf8UotH7EvW85ERSu4c1N2i5WL0MSg';

  before(async () => {
    sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Returns status 200(OK)', async () => {
    const response = await chai.request(app).get('/login/validate').set({ "Authorization": token })
    expect(response.status).to.be.eq(200);
  });

  it('Returns an object with user data', async () => {
    const response = await chai.request(app).get('/login/validate');
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.eql(stubUser)
  });
});
