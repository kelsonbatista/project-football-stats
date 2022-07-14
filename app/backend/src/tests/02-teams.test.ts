// import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as bcrypt from 'bcryptjs';
import { before } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('3 - Teams endpoint tests', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    // sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    // (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('3.1 - Get All Teams returns status 200 and 16 teams', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('id','teamName');
  });

  it('3.2 - Get Team By Id returns status 200 and 1 team', async () => {
    const res = await chai.request(app).get('/teams/1');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.keys('id','teamName');
  });

  it('3.3 - Get Team By Id returns status 404 if invalid Id', async () => {
    const res = await chai.request(app).get('/teams/50');
    expect(res.status).to.be.eq(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Team not found');
  });
});
