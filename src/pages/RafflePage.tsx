import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ParticipantList } from '../components/ParticipantList';
import { WinnerDisplay } from '../components/WinnerDisplay';
import { Settings } from '../components/Settings';
import { TwitchConnect } from '../components/TwitchConnect';

export const RafflePage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const { twitchChannel, keyword } = location.state || {};

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#4ADE80]">Raffle #{id}</h1>
              <p className="text-[#94A3B8]">Channel: {twitchChannel} • Keyword: {keyword}</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#1A332F] hover:bg-[#2D4A44] px-4 py-2 rounded-lg transition-colors">
                Share
              </button>
              <button className="bg-[#1A332F] hover:bg-[#2D4A44] px-4 py-2 rounded-lg transition-colors">
                End Raffle
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <TwitchConnect />
            <Settings />
          </div>

          <div>
            <ParticipantList />
          </div>

          <div>
            <WinnerDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};