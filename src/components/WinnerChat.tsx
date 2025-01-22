import React, { useEffect, useRef } from 'react';
import { useRaffleStore } from '../store/raffleStore';
import { MessageSquare } from '@lucide/react';

export const WinnerChat: React.FC = () => {
  const { winnerMessages } = useRaffleStore();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [winnerMessages]);

  return (
    <div className="bg-[#151F2E] rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare size={20} />
          Winner Chat
        </h2>
      </div>
      
      <div 
        ref={chatRef}
        className="space-y-2 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#243447] scrollbar-track-[#1A2634]"
      >
        {winnerMessages.map((msg, index) => (
          <div key={index} className="bg-[#1A2634] p-2 rounded">
            <span className="font-medium text-yellow-400">{msg.username}: </span>
            <span className="text-white">{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};