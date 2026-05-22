export interface Produto {
  id: string;
  nome: string;
  categoria: string;
  preco: number;
  imagem_emoji: string;
}

export const produtos: Produto[] = [
  { id: '1', nome: 'Fone de Ouvido Pro', categoria: 'Eletrônicos', preco: 299.99, imagem_emoji: '🎧' },
  { id: '2', nome: 'Tênis Running X', categoria: 'Calçados', preco: 199.90, imagem_emoji: '👟' },
  { id: '3', nome: 'Camiseta Básica', categoria: 'Roupas', preco: 49.90, imagem_emoji: '👕' },
  { id: '4', nome: 'Mochila Notebook', categoria: 'Acessórios', preco: 150.00, imagem_emoji: '🎒' },
  { id: '5', nome: 'Relógio Smart', categoria: 'Eletrônicos', preco: 450.00, imagem_emoji: '⌚' },
  { id: '6', nome: 'Óculos de Sol', categoria: 'Acessórios', preco: 120.00, imagem_emoji: '🕶️' },
  { id: '7', nome: 'Calça Jeans', categoria: 'Roupas', preco: 180.00, imagem_emoji: '👖' },
  { id: '8', nome: 'Notebook Dev', categoria: 'Eletrônicos', preco: 4500.00, imagem_emoji: '💻' },
];
