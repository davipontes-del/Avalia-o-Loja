import React, { useState, useCallback } from 'react';
import { Screen, Evaluation } from '../types';
import { saveEvaluation } from './services/storageService';
import RatingScreen from './components/RatingScreen';
import CommentScreen from './components/CommentScreen';
import ThankYouScreen from './components/ThankYouScreen';
import AdminScreen from './components/AdminScreen';
import LoginModal from './components/LoginModal';
import { useInactivityTimer } from './hooks/useInactivityTimer';
import Logo from './components/Logo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.RATING);
  const [currentEvaluation, setCurrentEvaluation] = useState<Partial<Evaluation>>({});
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const resetFlow = useCallback(() => {
    setCurrentEvaluation({});
    setCurrentScreen(Screen.RATING);
  }, []);

  useInactivityTimer(resetFlow);

  const handleRatingSelect = (rating: number) => {
    setCurrentEvaluation({ rating });
    setCurrentScreen(Screen.COMMENT);
  };

  const handleCommentSubmit = async (comment: string | null) => {
    const evaluationData = {
      rating: currentEvaluation.rating!,
      comment: comment,
    };
    // Agora chama a função assíncrona do serviço
    await saveEvaluation(evaluationData);
    setCurrentScreen(Screen.THANKS);
  };

 const handleAdminAuthSuccess = () => {
    setLoginModalOpen(false);
    setCurrentScreen(Screen.ADMIN);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.RATING:
        return <RatingScreen onRatingSelect={handleRatingSelect} />;
      case Screen.COMMENT:
        return <CommentScreen onSubmit={handleCommentSubmit} />;
      case Screen.THANKS:
        return <ThankYouScreen onComplete={resetFlow} />;
      case Screen.ADMIN:
        return <AdminScreen onExit={resetFlow} />;
      default:
        return <RatingScreen onRatingSelect={handleRatingSelect} />;
    }
  };

return (
    <div className="relative flex flex-col items-center justify-center h-screen w-screen p-4 md:p-8 bg-gray-900 overflow-hidden">
      <header className="absolute top-4 left-4">
        <Logo onLongPress={() => setLoginModalOpen(true)} />
      </header>
      <main>
        {renderScreen()}
      </main>
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          onSuccess={handleAdminAuthSuccess}
        />
      )}
    </div>
  );
}
