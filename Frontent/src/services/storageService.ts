import { db } from './firebase-config'; // Você precisará criar este arquivo (Passo 2)
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { Evaluation } from '../../types';

export const saveEvaluation = async (evaluationData: Omit<Evaluation, 'id' | 'timestamp'>): Promise<void> => {
  try {
    await addDoc(collection(db, "evaluations"), {
      ...evaluationData,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("Erro ao salvar avaliação: ", e);
  }
};

export const getEvaluations = async (): Promise<Evaluation[]> => {
  const q = query(collection(db, "evaluations"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const evaluations: Evaluation[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    evaluations.push({
      id: doc.id,
      rating: data.rating,
      comment: data.comment,
      timestamp: data.timestamp?.toDate().toISOString() || new Date().toISOString(),
    });
  });
  return evaluations;
};

export const exportEvaluationsToCSV = async (): Promise<void> => {
  const evaluations = await getEvaluations();
  if (evaluations.length === 0) {
    alert("Nenhuma avaliação para exportar.");
    return;
  }
  // O resto da lógica de criar o CSV é a mesma
  const header = ['id', 'rating', 'comment', 'timestamp'];
  const rows = evaluations.map(e => [e.id, e.rating, `"${e.comment ? e.comment.replace(/"/g, '""') : ''}"`, e.timestamp].join(','));
  const csvContent = [header.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `evaluations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};