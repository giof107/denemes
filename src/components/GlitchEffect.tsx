import React, { useEffect, useRef } from 'react';

export const GlitchEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let frame = 0;
    const slices = 10;
    const sliceHeight = canvas.height / slices;

    const draw = () => {
      frame++;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glitch slices
      for (let i = 0; i < slices; i++) {
        const y = i * sliceHeight;
        const glitchOffset = Math.random() > 0.95 ? (Math.random() - 0.5) * 50 : 0;
        const rgbShiftAmount = Math.random() > 0.95 ? Math.random() * 10 : 0;

        // Red channel
        ctx.fillStyle = `rgba(255, 0, 0, 0.3)`;
        ctx.fillRect(glitchOffset, y, canvas.width, sliceHeight);

        // Blue channel
        ctx.fillStyle = `rgba(0, 0, 255, 0.3)`;
        ctx.fillRect(glitchOffset - rgbShiftAmount, y, canvas.width, sliceHeight);
      }

      // Scanlines
      for (let i = 0; i < canvas.height; i += 2) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, i, canvas.width, 1);
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 opacity-60"
      style={{ background: 'black' }}
    />
  );
};