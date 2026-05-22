'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Produto } from './produtos';

export interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface CartContextType {
  itens: CartItem[];
  adicionar: (produto: Produto) => void;
  remover: (produtoId: string) => void;
  limpar: () => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CartItem[]>([]);

  const adicionar = (produto: Produto) => {
    setItens((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const remover = (produtoId: string) => {
    setItens((prev) => prev.filter((item) => item.produto.id !== produtoId));
  };

  const limpar = () => {
    setItens([]);
  };

  const atualizarQuantidade = (produtoId: string, quantidade: number) => {
    if (quantidade < 1) return;
    setItens((prev) =>
      prev.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      )
    );
  };

  const total = itens.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ itens, adicionar, remover, limpar, atualizarQuantidade, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
