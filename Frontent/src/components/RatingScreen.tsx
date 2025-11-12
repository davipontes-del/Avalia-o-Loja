import React from 'react';
import { RatingButton } from './RatingButton';
import { TerribleFace, BadFace, OkFace, GoodFace, GreatFace } from './icons/Faces';

interface RatingScreenProps {
  onRatingSelect: (rating: number) => void;
}

const ratings = [
  { rating: 1, label: 'RUIM', icon: <TerribleFace />, color: 'bg-red-600', hoverColor: 'hover:bg-red-500' },
  { rating: 2, label: 'REGULAR', icon: <BadFace />, color: 'bg-orange-500', hoverColor: 'hover:bg-orange-400' },
  { rating: 3, label: 'GOSTEI', icon: <OkFace />, color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-400' },
  { rating: 4, label: 'BOM', icon: <GoodFace />, color: 'bg-lime-500', hoverColor: 'hover:bg-lime-400' },
  { rating: 5, label: 'EXCELENTE', icon: <GreatFace />, color: 'bg-green-500', hoverColor: 'hover:bg-green-400' },
];

const RatingScreen: React.FC<RatingScreenProps> = ({ onRatingSelect }) => {
  return (
    <div className="flex flex-col items-center text-center w-full animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 md:mb-16 tracking-tight">
        CONTA PARA O BRED COMO FOI A SUA EXPERIÊNCIA?
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 w-full max-w-5xl">
        {ratings.map(({ rating, label, icon, color, hoverColor }) => (
          <RatingButton
            key={rating}
            label={label}
            icon={icon}
            color={color}
            hoverColor={hoverColor}
            onClick={() => onRatingSelect(rating)}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingScreen;
