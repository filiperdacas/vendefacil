import { Produto, produtos } from './produtos';

export interface Coocorrencia {
  id1: string;
  id2: string;
  score: number;
}

export const coocorrencias: Coocorrencia[] = [
  { id1: '8', id2: '4', score: 0.9 }, // Notebook + Mochila
  { id1: '8', id2: '1', score: 0.8 }, // Notebook + Fone
  { id1: '8', id2: '5', score: 0.6 }, // Notebook + Relogio
  { id1: '1', id2: '5', score: 0.7 }, // Fone + Relogio
  { id1: '1', id2: '4', score: 0.5 }, // Fone + Mochila
  { id1: '1', id2: '2', score: 0.6 }, // Fone + Tenis
  { id1: '2', id2: '3', score: 0.8 }, // Tenis + Camiseta
  { id1: '2', id2: '7', score: 0.4 }, // Tenis + Calca
  { id1: '2', id2: '4', score: 0.5 }, // Tenis + Mochila
  { id1: '3', id2: '7', score: 0.9 }, // Camiseta + Calca
  { id1: '3', id2: '6', score: 0.7 }, // Camiseta + Oculos
  { id1: '7', id2: '6', score: 0.6 }, // Calca + Oculos
  { id1: '6', id2: '5', score: 0.6 }, // Oculos + Relogio
  { id1: '6', id2: '4', score: 0.4 }, // Oculos + Mochila
  { id1: '5', id2: '2', score: 0.8 }, // Relogio + Tenis
  { id1: '5', id2: '3', score: 0.5 }, // Relogio + Camiseta
];

export function recomendar(produto_id: string, n: number = 3): Produto[] {
  const relacionados = coocorrencias
    .filter(c => c.id1 === produto_id || c.id2 === produto_id)
    .map(c => {
      const outroId = c.id1 === produto_id ? c.id2 : c.id1;
      return { id: outroId, score: c.score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n);

  const idsRecomendados = relacionados.map(r => r.id);
  
  // Se não tiver o suficiente, adiciona alguns aleatórios
  if (idsRecomendados.length < n) {
    const restantes = produtos
      .filter(p => p.id !== produto_id && !idsRecomendados.includes(p.id))
      .slice(0, n - idsRecomendados.length)
      .map(p => p.id);
    idsRecomendados.push(...restantes);
  }

  return idsRecomendados
    .map(id => produtos.find(p => p.id === id)!)
    .filter(Boolean);
}
