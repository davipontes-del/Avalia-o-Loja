import React, { useRef } from 'react';
import { LOGO_LONG_PRESS_DURATION_MS } from '../constants';

interface LogoProps {
  onLongPress: () => void;
}

const Logo: React.FC<LogoProps> = ({ onLongPress }) => {
  const timerRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    timerRef.current = window.setTimeout(() => {
      onLongPress();
    }, LOGO_LONG_PRESS_DURATION_MS);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
  
  const handleTouchStart = () => {
    timerRef.current = window.setTimeout(() => {
      onLongPress();
    }, LOGO_LONG_PRESS_DURATION_MS);
  };

  const handleTouchEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="bg-gray-800 text-yellow-400 p-3 rounded-full text-2xl font-black cursor-pointer select-none"
    >
      Bred 🥖
    </div>
  );
};

export default Logo;
