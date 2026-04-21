export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Match {
  id: string;
  name: string;
  matchType?: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  matchStarted: boolean;
  matchEnded: boolean;
  series_id?: string;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  playerImg?: string;
}

export interface ScorecardInning {
  inning: string;
  batting: Array<{
    batsman: { name: string; id: string };
    r: number;
    b: number;
    "4s": number;
    "6s": number;
    sr: number;
    "dismissal-text": string;
  }>;
  bowling: Array<{
    bowler: { name: string; id: string };
    o: number;
    m: number;
    r: number;
    w: number;
    eco: number;
  }>;
}

export interface MatchInfoData {
  id: string;
  name: string;
  matchType?: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  tossWinner?: string;
  tossChoice?: string;
  matchWinner?: string;
  matchStarted: boolean;
  matchEnded: boolean;
  series_id?: string;
}

export interface MatchDetail {
  info: MatchInfoData;
  scorecard: ScorecardInning[];
  squads: Array<{ teamName: string; player: Player[] }>;
}

export interface StandingTable {
  teamname: string;
  shortname: string;
  img: string;
  matches: number;
  wins: number;
  loss: number;
  ties: number;
  nr: number;
  points: number;
  nrr: number;
}

