import React, { useEffect, useRef } from 'react';
import { useRaffleStore } from '../store/raffleStore';
import { MessageCircle } from '@lucide/react';

export const Chat: React.FC = () => {
  const { messages } = useRaffleStore();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-[#151F2E] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageCircle size={20} />
          Chat
        </h2>
        <div className="text-sm text-gray-400">
          Active Viewers: {messages.length > 0 ? new Set(messages.map(m => m.username)).size : 0}
        </div>
      </div>
      
      <div 
        ref={chatRef}
        className="space-y-2 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#243447] scrollbar-track-[#1A2634]"
      >
        {messages.map((msg, index) => (
          <div key={index} className="bg-[#1A2634] p-2 rounded">
            <span className="font-medium text-green-400">{msg.username}: </span>
            <span className="text-white">{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};