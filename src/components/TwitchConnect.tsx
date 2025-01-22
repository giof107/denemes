import React, { useState } from 'react';
import { useRaffleStore } from '../store/raffleStore';
import { Twitch } from 'lucide-react';
import { Client } from 'tmi.js';

export const TwitchConnect: React.FC = () => {
  const { twitchChannel, setTwitchChannel, isConnected, setConnected, addParticipant } = useRaffleStore();
  const [inputChannel, setInputChannel] = useState('');
  const [client, setClient] = useState<Client | null>(null);

  const connectToTwitch = async () => {
    if (client) {
      await client.disconnect();
    }

    const newClient = new Client({
      channels: [inputChannel],
    });

    try {
      await newClient.connect();
      setClient(newClient);
      setTwitchChannel(inputChannel);
      setConnected(true);

      newClient.on('message', (channel, tags, message) => {
        if (tags.username) {
          addParticipant({
            username: tags.username,
            weight: 1,
            timestamp: Date.now(),
            source: 'twitch',
          });
        }
      });
    } catch (error) {
      console.error('Failed to connect to Twitch:', error);
    }
  };

  const disconnect = async () => {
    if (client) {
      await client.disconnect();
      setClient(null);
      setConnected(false);
      setTwitchChannel('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
        <Twitch className="mr-2 text-purple-400" />
        Twitch Integration
      </h2>

      {!isConnected ? (
        <div className="space-y-4">
          <input
            type="text"
            value={inputChannel}
            onChange={(e) => setInputChannel(e.target.value)}
            placeholder="Enter channel name"
            className="w-full bg-gray-700 text-white rounded-lg p-2"
          />
          <button
            onClick={connectToTwitch}
            className="w-full bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-700 transition-colors"
          >
            Connect to Twitch
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-white">Connected to: {twitchChannel}</span>
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