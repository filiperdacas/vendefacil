'use client';

import { useCart } from '../../lib/cart-context';
import Link from 'next/link';
import { useState } from 'react';

export default function CarrinhoPage() {
  const { itens, remover, atualizarQuantidade, total } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itens })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(data.error || 'Erro ao finalizar compra');
        setIsLoading(false);
        return;
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      alert('Erro inesperado ao processar o checkout.');
      setIsLoading(false);
    }
  };

  if (itens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Seu carrinho está vazio</h1>
        <p className="text-slate-500 mb-8">Parece que você ainda não adicionou nenhum produto.</p>
        <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Voltar às compras
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-8">Seu Carrinho</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <ul className="divide-y divide-slate-200">
          {itens.map((item) => (
            <li key={item.produto.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="text-5xl bg-slate-50 w-24 h-24 rounded-xl flex justify-center items-center">
                {item.produto.imagem_emoji}
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-800">{item.produto.nome}</h3>
                <p className="text-sm text-slate-500">{item.produto.categoria}</p>
                <div className="text-indigo-600 font-bold mt-1">
                  {item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg">
                  <button 
                    onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 font-medium text-slate-800 border-x border-slate-200">
                    {item.quantidade}
                  </span>
                  <button 
                    onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-bold text-slate-900 w-32 text-center sm:text-right">
                  {(item.produto.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>

                <button 
                  onClick={() => remover(item.produto.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Remover item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl font-medium text-slate-600">
            Total: <span className="text-3xl font-extrabold text-indigo-900 ml-2">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm text-lg flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </div>
    </div>
  );
}
