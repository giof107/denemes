export interface Participant {
  username: string;
  weight: number;
  timestamp: number;
  source: 'twitch' | 'manual';
}

export interface RaffleSettings {
  drawingMethod: 'random' | 'weighted';
  winnerCount: number;
  animationDuration: number;
  soundEnabled: boolean;
  theme: 'dark' | 'light' | 'matrix';
  animationType: 'matrix' | 'particles' | 'glitch';
  eligibilityRules: {
    minFollowAge: number;
    minSubMonths: number;
    roles: string[];
  };
}