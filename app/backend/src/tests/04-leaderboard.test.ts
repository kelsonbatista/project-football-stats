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

describe('5 - Leaderboard endpoint tests', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    // sinon.stub(UserModel, "findOne").resolves(stubUser as UserModel);
  });

  after(()=>{
    // (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('5.1 - Get All Leaderboard returns status 200 and the leaderboard with 16 teams', async () => {
    const res = await chai.request(app).get('/leaderboard');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
  });

  it('5.2 - Get Home Leaderboard returns status 200 and the leaderboard with 16 teams', async () => {
    const res = await chai.request(app).get('/leaderboard/home');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
  });

  it('5.3 - Get Away Leaderboard returns status 200 and the leaderboard with 16 teams', async () => {
    const res = await chai.request(app).get('/leaderboard');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsOwn', 'goalsBalance', 'efficiency');
  });

  it('5.4 - Get Home Matches returns status 200 and the leaderboard with 16 teams', async () => {
    const res = await chai.request(app).get('/leaderboard/matches/home');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('id', 'teamName', 'homeMatches');
  });

  it('5.5 - Get Away Matches returns status 200 and the leaderboard with 16 teams', async () => {
    const res = await chai.request(app).get('/leaderboard/matches/away');
    expect(res.status).to.be.eq(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.length(16);
    expect(res.body[0]).to.have.keys('id', 'teamName', 'awayMatches');
  });
});
