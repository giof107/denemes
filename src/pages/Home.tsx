import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, Plus, History } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [twitchChannel, setTwitchChannel] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleCreateRaffle = (e: React.FormEvent) => {
    e.preventDefault();
    const raffleId = Math.random().toString(36).substring(2, 9);
    navigate(`/raffle/${raffleId}`, { 
      state: { twitchChannel, keyword } 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-5xl font-bold text-[#4ADE80] flex items-center gap-3 mb-2">
          <Gift className="h-12 w-12" />
          Raffle System
        </h1>
        <p className="text-[#94A3B8] text-lg">Create and manage Twitch giveaways easily</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#1A332F] rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#4ADE80] flex items-center gap-2 mb-6">
            <Plus className="h-6 w-6" />
            Create New Raffle
          </h2>
          
          <form onSubmit={handleCreateRaffle} className="space-y-6">
            <div>
              <label className="block text-[#94A3B8] mb-2">Twitch Channel</label>
              <input
                type="text"
                value={twitchChannel}
                onChange={(e) => setTwitchChannel(e.target.value)}
                className="w-full bg-[#0A1F1C] border border-[#2D4A44] rounded-lg p-3 text-white focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-colors"
                placeholder="Enter channel name"
                required
              />
            </div>

            <div>
              <label className="block text-[#94A3B8] mb-2">Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-[#0A1F1C] border border-[#2D4A44] rounded-lg p-3 text-white focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-colors"
                placeholder="e.g. !join"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4ADE80] hover:bg-[#22C55E] text-[#0A1F1C] font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Create Raffle
            </button>
          </form>
        </div>

        <div className="bg-[#1A332F] rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#4ADE80] flex items-center gap-2 mb-6">
            <History className="h-6 w-6" />
            Recent Raffles
          </h2>
          
          <div className="space-y-4">
            {/* Bu kısım gerçek verilerle doldurulacak */}
            <div className="bg-[#0A1F1C] rounded-lg p-4 hover:bg-[#152926] transition-colors cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Channel: dizireis</h3>
                  <p className="text-[#94A3B8] text-sm">Keyword: !katil</p>
                </div>
                <span className="text-[#4ADE80] text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};