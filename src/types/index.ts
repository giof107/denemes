export interface Participant {
  username: string;
  weight: number;
  timestamp: number;
  source: 'kick' | 'manual';
}

export interface RaffleSettings {
  drawingMethod: 'random' | 'weighted';
  winnerCount: number;
  animationDuration: number;
  soundEnabled: boolean;
  theme: 'dark' | 'light' | 'matrix';
  animationType: 'matrix' | 'particles' | 'glitch';
  keyword?: string;
  language?: string;
  subscriberLuck?: number;
  eligibilityRules: {
    minFollowAge: number;
    minSubMonths: number;
    roles: string[];
  };
}