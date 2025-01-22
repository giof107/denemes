import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRaffleStore } from '../store/raffleStore';
import { Trash2 } from '@lucide/react';

export const ParticipantList: React.FC = () => {
  const { participants, removeParticipant, addParticipant, clearParticipants } = useRaffleStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const usernames = text.split('\n').filter(line => line.trim());
      
      usernames.forEach(username => {
        addParticipant({
          username: username.trim(),
          weight: 1,
          timestamp: Date.now(),
          source: 'manual'
        });
      });
    };
    reader.readAsText(file);

    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleExport = () => {
    const content = participants.map(p => p.username).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'participants.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#151F2E] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Entries ({participants.length})</h2>
        <div className="flex gap-2">
          <button 
            onClick={clearParticipants}
            className="bg-[#1A2634] hover:bg-[#243447] px-3 py-1 rounded text-sm"
          >
            Clear
          </button>
          <button 
            onClick={handleImport}
            className="bg-[#1A2634] hover:bg-[#243447] px-3 py-1 rounded text-sm"
          >
            Import
          </button>
          <button 
            onClick={handleExport}
            className="bg-[#1A2634] hover:bg-[#243447] px-3 py-1 rounded text-sm"
          >
            Export
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {participants.map((participant, index) => (
          <motion.div
            key={`${participant.username}-${participant.timestamp}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between bg-[#1A2634] p-3 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-white">{participant.username}</span>
              <span className="text-xs text-gray-400">
                {participant.source === 'kick' ? '🟢 Kick' : '📝 Manual'}
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