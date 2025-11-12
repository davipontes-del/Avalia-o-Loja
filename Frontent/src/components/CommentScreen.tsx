import React, { useState } from 'react';
import { MAX_COMMENT_LENGTH } from '../constants';

interface CommentScreenProps {
  onSubmit: (comment: string | null) => void;
}

const CommentScreen: React.FC<CommentScreenProps> = ({ onSubmit }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_COMMENT_LENGTH) {
      setComment(e.target.value);
    }
  };

  if (showCommentBox) {
    return (
      <div className="flex flex-col items-center text-center w-full max-w-2xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Deixe seu comentário:</h1>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          className="w-full h-48 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-xl text-white focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Digite aqui..."
          autoFocus
        />
        <div className="w-full text-right mt-2 text-gray-400">
          {comment.length} / {MAX_COMMENT_LENGTH}
        </div>
        <button
          onClick={() => onSubmit(comment.trim() === '' ? null : comment.trim())}
          className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-3xl py-4 px-16 rounded-full transition-transform transform hover:scale-105"
        >
          Enviar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center w-full animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-12">
        OBRIGADO PELA SUA AVALIAÇÃO!
      </h1>
      <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-16">
        Deseja deixar um comentário?
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <button
          onClick={() => onSubmit(null)}
          className="bg-red-600 hover:bg-red-500 text-white font-bold text-4xl py-6 px-24 rounded-full transition-transform transform hover:scale-105">
          NÃO
        </button>
        <button
          onClick={() => setShowCommentBox(true)}
          className="bg-green-600 hover:bg-green-500 text-white font-bold text-4xl py-6 px-24 rounded-full transition-transform transform hover:scale-105">
          SIM
        </button>
      </div>
    </div>
  );
};

export default CommentScreen;
