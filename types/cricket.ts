export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score?: Score[];
  matchStarted: boolean;
  matchEnded: boolean;
}

export const TEAM: Record<string, { short: string; color: string; city: string }> = {
  "Mumbai Indians":                 { short: "MI",   color: "#0057A8", city: "Mumbai" },
  "Chennai Super Kings":            { short: "CSK",  color: "#F5A623", city: "Chennai" },
  "Royal Challengers Bangalore":    { short: "RCB",  color: "#C8102E", city: "Bengaluru" },
  "Kolkata Knight Riders":          { short: "KKR",  color: "#3A225D", city: "Kolkata" },
  "Sunrisers Hyderabad":            { short: "SRH",  color: "#F26522", city: "Hyderabad" },
  "Delhi Capitals":                 { short: "DC",   color: "#0078BC", city: "Delhi" },
  "Punjab Kings":                   { short: "PBKS", color: "#D11930", city: "Mohali" },
  "Rajasthan Royals":               { short: "RR",   color: "#E91E8C", city: "Jaipur" },
  "Lucknow Super Giants":           { short: "LSG",  color: "#29A8E0", city: "Lucknow" },
  "Gujarat Titans":                 { short: "GT",   color: "#1B4D8E", city: "Ahmedabad" },
};

export const SQUAD: Record<string, Array<{ name: string; role: string; bat?: number; wkt?: number; sr?: number }>> = {
  "Mumbai Indians": [
    { name: "Rohit Sharma",       role: "Batsman",        bat: 45, sr: 148 },
    { name: "Suryakumar Yadav",   role: "Batsman",        bat: 82, sr: 204 },
    { name: "Ishan Kishan",       role: "Wicket-keeper",  bat: 37, sr: 162 },
    { name: "Hardik Pandya",      role: "All-rounder",    bat: 29, wkt: 2, sr: 155 },
    { name: "Jasprit Bumrah",     role: "Bowler",         wkt: 4 },
  ],
  "Chennai Super Kings": [
    { name: "MS Dhoni",           role: "Wicket-keeper",  bat: 18, sr: 175 },
    { name: "Ruturaj Gaikwad",    role: "Batsman",        bat: 71, sr: 151 },
    { name: "Ravindra Jadeja",    role: "All-rounder",    bat: 38, wkt: 2, sr: 142 },
    { name: "Deepak Chahar",      role: "Bowler",         wkt: 3 },
    { name: "Devon Conway",       role: "Batsman",        bat: 52, sr: 138 },
  ],
  "Royal Challengers Bangalore": [
    { name: "Virat Kohli",        role: "Batsman",        bat: 74, sr: 148 },
    { name: "Faf du Plessis",     role: "Batsman",        bat: 61, sr: 163 },
    { name: "Glenn Maxwell",      role: "All-rounder",    bat: 47, wkt: 1, sr: 178 },
    { name: "Mohammed Siraj",     role: "Bowler",         wkt: 3 },
    { name: "Dinesh Karthik",     role: "Wicket-keeper",  bat: 24, sr: 192 },
  ],
  "Kolkata Knight Riders": [
    { name: "Shreyas Iyer",       role: "Batsman",        bat: 58, sr: 151 },
    { name: "Andre Russell",      role: "All-rounder",    bat: 65, wkt: 2, sr: 188 },
    { name: "Sunil Narine",       role: "All-rounder",    bat: 41, wkt: 2, sr: 157 },
    { name: "Nitish Rana",        role: "Batsman",        bat: 44, sr: 143 },
    { name: "Varun Chakravarthy", role: "Bowler",         wkt: 3 },
  ],
  "Sunrisers Hyderabad": [
    { name: "Travis Head",        role: "Batsman",        bat: 88, sr: 198 },
    { name: "Abhishek Sharma",    role: "Batsman",        bat: 49, sr: 182 },
    { name: "Heinrich Klaasen",   role: "Wicket-keeper",  bat: 72, sr: 191 },
    { name: "Pat Cummins",        role: "All-rounder",    bat: 20, wkt: 3, sr: 131 },
    { name: "Bhuvneshwar Kumar",  role: "Bowler",         wkt: 2 },
  ],
  "Delhi Capitals": [
    { name: "David Warner",       role: "Batsman",        bat: 58, sr: 159 },
    { name: "Rishabh Pant",       role: "Wicket-keeper",  bat: 41, sr: 176 },
    { name: "Axar Patel",         role: "All-rounder",    bat: 26, wkt: 2, sr: 143 },
    { name: "Kuldeep Yadav",      role: "Bowler",         wkt: 3 },
    { name: "Prithvi Shaw",       role: "Batsman",        bat: 51, sr: 167 },
  ],
  "Punjab Kings": [
    { name: "Shikhar Dhawan",     role: "Batsman",        bat: 68, sr: 145 },
    { name: "Jonny Bairstow",     role: "Wicket-keeper",  bat: 75, sr: 169 },
    { name: "Liam Livingstone",   role: "All-rounder",    bat: 62, wkt: 1, sr: 187 },
    { name: "Arshdeep Singh",     role: "Bowler",         wkt: 3 },
    { name: "Sam Curran",         role: "All-rounder",    bat: 33, wkt: 2, sr: 151 },
  ],
  "Rajasthan Royals": [
    { name: "Sanju Samson",       role: "Wicket-keeper",  bat: 44, sr: 157 },
    { name: "Jos Buttler",        role: "Batsman",        bat: 88, sr: 181 },
    { name: "Shimron Hetmyer",    role: "Batsman",        bat: 51, sr: 185 },
    { name: "Yuzvendra Chahal",   role: "Bowler",         wkt: 3 },
    { name: "Trent Boult",        role: "Bowler",         wkt: 2 },
  ],
};
