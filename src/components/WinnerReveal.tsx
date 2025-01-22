import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WinnerRevealProps {
  text: string;
  isVisible: boolean;
  onComplete?: () => void;
}

export const WinnerReveal: React.FC<WinnerRevealProps> = ({ text, isVisible, onComplete }) => {
  const [letters, setLetters] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isVisible && text) {
      const letterArray = text.split('');
      setLetters(letterArray);
      setCurrentIndex(0);

      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx >= letterArray.length - 1) {
          clearInterval(interval);
          onComplete?.();
        } else {
          currentIdx += 1;
          setCurrentIndex(currentIdx);
        }
      }, 300);

      return () => clearInterval(interval);
    } else {
      setLetters([]);
      setCurrentIndex(0);
    }
  }, [isVisible, text, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && letters.length > 0 && (
        <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="flex space-x-2">
            {letters.map((letter, index) => (
              <motion.div
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index <= currentIndex ? 1 : 0,
                  y: index <= currentIndex ? 0 : 20,
                }}
                className="text-6xl font-bold text-white text-shadow-lg"
                style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)'
                }}
              >
                {letter}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};