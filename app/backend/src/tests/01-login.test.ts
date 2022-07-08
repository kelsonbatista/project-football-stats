import * as sinon from 'sinon';
import * as chai from 'chai';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/user.model';
// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1 - Teste de Login', () => {

  // let chaiHttpResponse: Response;

  const stubUser = {
    "id": 2,
    "username": "User",
    "role": "user",
    "email": "user@user.com",
    "password": "123456"
  }

  const payload = { email: 'user@user.com', password: '1234567' };

  before(async () => {
    sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Retorna status 200(OK)', async () => {
    const response = await chai.request(app).post('/login').send(payload);
    expect(response.status).to.be.eq(200);
  });

  it('Retorna um objeto com os dados do usuário', async () => {
    const response = await chai.request(app).post('/login').send(payload);
    expect(response.body).to.be.an('object');
    expect(response.body).to.be.eql(stubUser)
  });
});
