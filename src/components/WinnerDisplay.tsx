import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRaffleStore } from '../store/raffleStore';
import { Trophy } from 'lucide-react';
import { MatrixRain } from './MatrixRain';
import { ParticlesEffect } from './ParticlesEffect';
import { GlitchEffect } from './GlitchEffect';
import { WinnerReveal } from './WinnerReveal';

export const WinnerDisplay: React.FC = () => {
  const { winners, isDrawing, settings } = useRaffleStore();
  const [showReveal, setShowReveal] = useState(false);
  const [currentWinner, setCurrentWinner] = useState('');
  const [displayedWinners, setDisplayedWinners] = useState<typeof winners>([]);

  useEffect(() => {
    if (isDrawing) {
      // Çekiliş başladığında mevcut kazananları temizle
      setDisplayedWinners([]);
      setShowReveal(false);
      setCurrentWinner('');
    }
  }, [isDrawing]);

  useEffect(() => {
    // Yeni bir kazanan eklendiğinde
    if (winners.length > displayedWinners.length && !isDrawing) {
      const newWinner = winners[winners.length - 1];
      setCurrentWinner(newWinner.username.toUpperCase());
      setShowReveal(true);
    }
  }, [winners, displayedWinners.length, isDrawing]);

  const handleRevealComplete = () => {
    setShowReveal(false);
    setDisplayedWinners(winners);
  };

  const renderEffect = () => {
    switch (settings.animationType) {
      case 'matrix':
        return <MatrixRain />;
      case 'particles':
        return <ParticlesEffect />;
      case 'glitch':
        return <GlitchEffect />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {(isDrawing || showReveal) && renderEffect()}
      <WinnerReveal
        text={currentWinner}
        isVisible={showReveal}
        onComplete={handleRevealComplete}
      />
      <div className="bg-gray-800 rounded-lg p-6 relative z-30">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Trophy className="mr-2 text-yellow-400" />
          Winners
        </h2>
        <AnimatePresence>
          {displayedWinners.map((winner, index) => (
            <motion.div
              key={`${winner.username}-${winner.timestamp}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-700 p-4 rounded-lg mb-3 last:mb-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {winner.username}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Selected at {new Date(winner.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-2xl">🎉</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};