import React, { useEffect } from 'react';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import { GOOGLE_REVIEW_URL, THANKS_SCREEN_DURATION_MS } from '../constants';

interface ThankYouScreenProps {
  onComplete: () => void;
}

// FIX: The module loader is failing to resolve the default export.
// Using the specific named export `QRCodeCanvas` and aliasing it to `QRCode`.
const QRCodeCanvas: React.FC<{ value: string; size: number }> = ({ value, size }) => (
  <QRCode value={value} size={size} />
);
const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, THANKS_SCREEN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">
        Obrigado!
      </h1>
      <p className="text-2xl md:text-4xl text-gray-300 mb-12">
        Sua opinião ajuda o Bred a melhorar 🥖✨
      </p>
      <div className="bg-white p-4 rounded-lg shadow-2xl mb-8">
        <QRCode value={GOOGLE_REVIEW_URL} size={256} />
      </div>
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-2xl py-4 px-10 rounded-full transition-transform transform hover:scale-105"
      >
        Avalie-nos no Google
      </a>
    </div>
  );
};

export default ThankYouScreen;