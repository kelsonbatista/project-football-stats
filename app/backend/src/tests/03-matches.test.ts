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

describe('4 - Matches endpoint tests', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    // sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    // (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('4.1 - Get All Matches returns status 200 and all teams', async () => {
    const res = await chai.request(app).get('/matches');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(48);
    expect(res.body[0]).to.have.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
  });

  it('4.2 - Get Match By Id returns status 200 and 1 match', async () => {
    const res = await chai.request(app).get('/matches/1');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress');
  });

  it('4.3 - Get Match By Id returns status 404 if invalid Id', async () => {
    const res = await chai.request(app).get('/matches/99');
    expect(res.status).to.be.eq(404);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.be.equal('Match not found');
  });
});
