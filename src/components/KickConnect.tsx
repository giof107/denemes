import React, { useState } from 'react';
import { useRaffleStore } from '../store/raffleStore';

export const KickConnect: React.FC = () => {
  const { channel, setChannel, isConnected, setConnected, addParticipant } = useRaffleStore();
  const [inputChannel, setInputChannel] = useState('');

  const connectToKick = async () => {
    try {
      // Kick integration will be implemented here
      setChannel(inputChannel);
      setConnected(true);
    } catch (error) {
      console.error('Failed to connect to Kick:', error);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setChannel('');
  };

  return (
    <div className="bg-[#151F2E] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <span className="text-green-400 mr-2">●</span>
        Kick Integration
      </h2>

      {!isConnected ? (
        <div className="space-y-4">
          <input
            type="text"
            value={inputChannel}
            onChange={(e) => setInputChannel(e.target.value)}
            placeholder="Enter channel name"
            className="w-full bg-[#1A2634] text-white rounded-lg p-2 border border-[#243447] focus:border-green-400 focus:ring-1 focus:ring-green-400"
          />
          <button
            onClick={connectToKick}
            className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition-colors"
          >
            Connect to Kick
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#1A2634] p-3 rounded-lg">
            <span className="text-white">Connected to: {channel}</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Live</span>
            </div>
          </div>
          <button
            onClick={disconnect}
            className="w-full bg-red-600 text-white rounded-lg p-2 hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};