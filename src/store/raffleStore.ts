import { create } from 'zustand';
import { Participant, RaffleSettings } from '../types';

interface RaffleStore {
  participants: Participant[];
  winners: Participant[];
  settings: RaffleSettings;
  isDrawing: boolean;
  twitchChannel: string;
  isConnected: boolean;
  
  addParticipant: (participant: Participant) => void;
  removeParticipant: (username: string) => void;
  setWinners: (winners: Participant[]) => void;
  updateSettings: (settings: Partial<RaffleSettings>) => void;
  setDrawing: (isDrawing: boolean) => void;
  setTwitchChannel: (channel: string) => void;
  setConnected: (isConnected: boolean) => void;
  clearParticipants: () => void;
  clearWinners: () => void;
}

export const useRaffleStore = create<RaffleStore>((set) => ({
  participants: [],
  winners: [],
  isDrawing: false,
  twitchChannel: '',
  isConnected: false,
  settings: {
    drawingMethod: 'random',
    winnerCount: 1,
    animationDuration: 3000,
    soundEnabled: true,
    theme: 'dark',
    animationType: 'matrix',
    eligibilityRules: {
      minFollowAge: 0,
      minSubMonths: 0,
      roles: [],
    },
  },

  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),

  removeParticipant: (username) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.username !== username),
    })),

  setWinners: (winners) => set({ winners }),
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  setDrawing: (isDrawing) => set({ isDrawing }),
  
  setTwitchChannel: (channel) => set({ twitchChannel: channel }),
  
  setConnected: (isConnected) => set({ isConnected }),
  
  clearParticipants: () => set({ participants: [] }),
  
  clearWinners: () => set({ winners: [] }),
}));