import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ParticipantList } from '../components/ParticipantList';
import { WinnerDisplay } from '../components/WinnerDisplay';
import { Settings } from '../components/Settings';
import { Chat } from '../components/Chat';
import { WinnerChat } from '../components/WinnerChat';
import { useRaffleStore } from '../store/raffleStore';

export const RafflePage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { channel, keyword } = location.state || {};
  const { updateSettings } = useRaffleStore();

  useEffect(() => {
    if (keyword) {
      updateSettings({ keyword });
    }
  }, [keyword, updateSettings]);

  // Simulate chat messages for demo
  useEffect(() => {
    const interval = setInterval(() => {
      const store = useRaffleStore.getState();
      const randomMessage = {
        username: `user${Math.floor(Math.random() * 100)}`,
        message: keyword,
        timestamp: Date.now(),
      };
      store.addMessage(randomMessage);
    }, 2000);

    return () => clearInterval(interval);
  }, [keyword]);

  return (
    <div className="min-h-screen bg-[#0B1622] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 bg-[#151F2E] p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Giveaway ID: {id}</h1>
              <p className="text-gray-400">Channel: {channel} • Keyword: {keyword}</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#1A2634] hover:bg-[#243447] px-4 py-2 rounded-lg transition-colors">
                Reset
              </button>
              <button className="bg-[#1A2634] hover:bg-[#243447] px-4 py-2 rounded-lg transition-colors">
                Wait for Winner
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Settings />
          </div>

          <div className="space-y-6">
            <ParticipantList />
            <Chat />
          </div>

          <div className="space-y-6">
            <WinnerDisplay />
            <WinnerChat />
          </div>
        </div>
      </div>
    </div>
  );
};