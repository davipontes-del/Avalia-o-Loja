import React, { useState, useEffect, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  // Novos estados para e-mail, senha e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);

  // Foca no campo de e-mail ao abrir o modal
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Nova lógica de submissão assíncrona
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Previne múltiplos cliques

    setIsLoading(true);
    setError('');

    try {
      const auth = getAuth();
      // Chama o Firebase para verificar as credenciais
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess(); // Se o login for bem-sucedido, chama o onSuccess
    } catch (error) {
      console.error("Erro de autenticação:", error);
      // Define uma mensagem de erro genérica e segura
      setError('E-mail ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in-fast">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Acesso Administrativo</h2>
        <p className="text-gray-400 mb-6">Faça login para continuar.</p>
        <form onSubmit={handleSubmit}>
          {/* Campo de E-mail */}
          <div className="mb-4">
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full bg-gray-700 text-white text-lg p-3 rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Campo de Senha */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full bg-gray-700 text-white text-lg p-3 rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {/* Mostra um texto diferente durante o carregamento */}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;