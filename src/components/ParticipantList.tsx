import React from 'react';
import { motion } from 'framer-motion';
import { useRaffleStore } from '../store/raffleStore';
import { Trash2 } from 'lucide-react';

export const ParticipantList: React.FC = () => {
  const { participants, removeParticipant } = useRaffleStore();

  return (
    <div className="bg-gray-800 rounded-lg p-4 max-h-[600px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Participants ({participants.length})</h2>
      <div className="space-y-2">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.username}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-white">{participant.username}</span>
              <span className="text-xs text-gray-400">
                {participant.source === 'twitch' ? '🟣 Twitch' : '📝 Manual'}
              </span>
            </div>
            <button
              onClick={() => removeParticipant(participant.username)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};