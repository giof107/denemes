import { create } from 'zustand';
import { Participant, RaffleSettings } from '../types';

interface RaffleStore {
  participants: Participant[];
  winners: Participant[];
  settings: RaffleSettings;
  isDrawing: boolean;
  channel: string;
  isConnected: boolean;
  messages: { username: string; message: string; timestamp: number }[];
  winnerMessages: { username: string; message: string; timestamp: number }[];
  
  addParticipant: (participant: Participant) => void;
  removeParticipant: (username: string) => void;
  setWinners: (winners: Participant[]) => void;
  updateSettings: (settings: Partial<RaffleSettings>) => void;
  setDrawing: (isDrawing: boolean) => void;
  setChannel: (channel: string) => void;
  setConnected: (isConnected: boolean) => void;
  clearParticipants: () => void;
  clearWinners: () => void;
  addMessage: (message: { username: string; message: string; timestamp: number }) => void;
  addWinnerMessage: (message: { username: string; message: string; timestamp: number }) => void;
  clearMessages: () => void;
  clearWinnerMessages: () => void;
}

export const useRaffleStore = create<RaffleStore>((set) => ({
  participants: [],
  winners: [],
  isDrawing: false,
  channel: '',
  isConnected: false,
  messages: [],
  winnerMessages: [],
  settings: {
    drawingMethod: 'random',
    winnerCount: 1,
    animationDuration: 3000,
    soundEnabled: true,
    theme: 'dark',
    animationType: 'matrix',
    keyword: '',
    language: 'en',
    subscriberLuck: 1,
    eligibilityRules: {
      minFollowAge: 0,
      minSubMonths: 0,
      roles: ['Mod', 'VIP', 'OG', 'Sub', 'Follower'],
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
  
  setChannel: (channel) => set({ channel }),
  
  setConnected: (isConnected) => set({ isConnected }),
  
  clearParticipants: () => set({ participants: [] }),
  
  clearWinners: () => set({ winners: [] }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message].slice(-100), // Keep last 100 messages
    })),

  addWinnerMessage: (message) =>
    set((state) => ({
      winnerMessages: [...state.winnerMessages, message].slice(-100),
    })),

  clearMessages: () => set({ messages: [] }),
  
  clearWinnerMessages: () => set({ winnerMessages: [] }),
}));