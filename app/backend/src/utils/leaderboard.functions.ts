import { ITeamMatch } from '../protocols/leaderboard.interface';
import IMatch from '../protocols/match.interface';

const totalPointsHome = (prev: number, team: IMatch) => {
  if (team.homeTeamGoals > team.awayTeamGoals) return prev + 3;
  if (team.homeTeamGoals === team.awayTeamGoals) return prev + 1;
  return prev;
};

const totalPointsAway = (prev: number, team: IMatch) => {
  if (team.awayTeamGoals > team.homeTeamGoals) return prev + 3;
  if (team.awayTeamGoals === team.homeTeamGoals) return prev + 1;
  return prev;
};

const totalGames = (prev: number, team: IMatch) => {
  if (team.id) return prev + 1;
  return prev;
};

const totalVictories = (prev: number, team: IMatch) => {
  if (team.homeTeamGoals > team.awayTeamGoals) return prev + 1;
  return prev;
};

const totalDraws = (prev: number, team: IMatch) => {
  if (team.homeTeamGoals === team.awayTeamGoals) return prev + 1;
  return prev;
};

const totalLosses = (prev: number, team: IMatch) => {
  if (team.homeTeamGoals < team.awayTeamGoals) return prev + 1;
  return prev;
};

const goalsFavor = (prev: number, team: IMatch) => prev + team.homeTeamGoals;

const goalsOwn = (prev: number, team: IMatch) => prev + team.awayTeamGoals;

// const goalsBalance = (prev: number, team: IMatch) => {
//   const balance = goalsFavor(prev, team) - goalsOwn(prev, team);
//   return balance;
// };

const teamData = (team: ITeamMatch) => {
  const matches = team.homeMatches ? team.homeMatches : team.awayMatches;
  const type = team.homeMatches ? 'home' : 'away';
  return {
    totalPoints: matches.reduce(type === 'home' ? totalPointsHome : totalPointsAway, 0),
    totalGames: matches.reduce(totalGames, 0),
    totalVictories: matches.reduce(type === 'home' ? totalVictories : totalLosses, 0),
    totalDraws: matches.reduce(totalDraws, 0),
    totalLosses: matches.reduce(type === 'home' ? totalLosses : totalVictories, 0),
    goalsFavor: matches.reduce(type === 'home' ? goalsFavor : goalsOwn, 0),
    goalsOwn: matches.reduce(type === 'home' ? goalsOwn : goalsFavor, 0),
  };
};

export default teamData;
