import React, { useState, useEffect } from 'react';
import { Evaluation } from '../../types';
import { getEvaluations, exportEvaluationsToCSV } from '../services/storageService';

interface AdminScreenProps {
  onExit: () => void;
}

const AdminScreen: React.FC<AdminScreenProps> = ({ onExit }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adiciona um estado de loading

  useEffect(() => {
    const fetchEvaluations = async () => {
      setIsLoading(true);
      const data = await getEvaluations(); // Busca os dados do Firebase
      setEvaluations(data);
      setIsLoading(false);
    };

    fetchEvaluations();
  }, []);

  if (isLoading) {
    return <div>Carregando avaliações...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col p-4 bg-gray-800 rounded-lg shadow-xl animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Panel - Avaliações</h1>
        <div>
          <button
            onClick={exportEvaluationsToCSV}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-4"
          >
            Exportar CSV
          </button>
          <button
            onClick={onExit}
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sair
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-700 sticky top-0">
            <tr>
              <th className="p-3">Data/Hora</th>
              <th className="p-3">Nota</th>
              <th className="p-3">Comentário</th>
              <th className="p-3">ID</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {evaluations.length > 0 ? (
              evaluations.slice().reverse().map(e => (
                <tr key={e.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-3 align-top">{new Date(e.timestamp).toLocaleString()}</td>
                  <td className="p-3 align-top text-center text-2xl">{e.rating}</td>
                  <td className="p-3 align-top whitespace-pre-wrap break-words">{e.comment}</td>
                  <td className="p-3 align-top text-xs text-gray-500 font-mono">{e.id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-8 text-gray-500">
                  Nenhuma avaliação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminScreen;
