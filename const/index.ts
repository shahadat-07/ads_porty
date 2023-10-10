interface Field {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
}

export interface AllUser {
  // Define the properties of a user object
  ads_wallet: {
    balance: number;
    life_time_ads_revenue: number;
  };
  gamesPredictionHistory: any[]; // You can replace 'any' with a specific type if needed
  games_wallet: {
    balance: number;
    life_time_game_predict_earnings: number;
  };
  todaysEarning: {
    earning_from_ads: number;
    earning_from_games: number;
    earning_from_referral: number;
  };
  totalEarnings: number;
  totalReferralEarnings: number;
  trackAdRevenue: any[]; // You can replace 'any' with a specific type if needed
  trackAdsView: any[]; // You can replace 'any' with a specific type if needed
  transactionHistory: {
    // Define the properties of a transaction history object
    trx_id: string;
    // Add other properties as needed
  }[];
  userinformation: {
    name: string;
    username: string;
    phonenumber: number;
    referralID: string;
    password: string;
    // Add other properties as needed
  };
  __v: number;
  _id: string;
}

interface Registrationfields {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
}

//interface for user which is using in page.tsx (main home page)
export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export interface User {
  notifications: {
    id: string;
    date: string;
    message: string;
    time: string;
    isSeen: boolean;
  }[];
  ads_wallet: {
    balance: number;
  };
  gamesPredictionHistory: any[];
  games_wallet: {
    balance: number;
  };
  todaysEarning: {
    earning_from_ads: number;
    earning_from_games: number;
  };
  trackAdsView: any[];
  transactionHistory: any[];
  userinformation: {
    isBlocked: boolean;
    name: string;
    password: string;
    phonenumber: string;
    referralID: string;
    username: string;
  };
  __v: number;
  _id: string;
}

export interface PredictionInformation {
  betAmount: number;
  teamName: string;
  potentialWinnings: string;
}

export interface UserSelectedTeam {
  gameId: string;
  predictionInformatins: PredictionInformation[];
}

interface WithdrawNumber {
  account_type: string;
  banking_method: string;
  number: string;
}

export interface SiteInformations {
  min_deposit_rate: number;
  ad_images: string[];
  ads_percentage_rate: number;
  dollar_rate: number;
  game_percentage_rate: number;
  uploadGames: {
    isApiCalled: boolean;
    id: string;
    match_date: string;
    match_time: string;
    match_type: string;
    which_sport: string;
    prediction_type: string;
    teams: string[];
    winning_team: string;
  }[];
  withdraw_numbers: WithdrawNumber[];
  __v: number;
  _id: string;
}

export interface TeamBet {
  [team: string]: number;
}

export interface GameProps {
  game: SiteInformations["uploadGames"][number];
  rate: number;
  currentUser: User;
  isPredictionSubmitted: boolean;
}

export const fields: Field[] = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
    isRequired: true,
    placeholder: "Password",
  },
];

export const Registrationfields: Field[] = [
  {
    labelText: "Name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Name",
  },
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Phone Number",
    labelFor: "phonenumber",
    id: "phonenumber",
    name: "phonenumber",
    type: "number",
    autoComplete: "phonenumber",
    isRequired: true,
    placeholder: "Phone Number",
  },
  {
    labelText: "Referral ID (optional)",
    labelFor: "referralID",
    id: "referralID",
    name: "referralID",
    type: "text",
    autoComplete: "referralID",
    isRequired: false,
    placeholder: "Referral ID (Optional)",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "new-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm_password",
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    autoComplete: "new-password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];
