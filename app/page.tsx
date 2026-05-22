'use client';

import { produtos } from '../lib/produtos';
import { useCart } from '../lib/cart-context';

export default function Home() {
  const { adicionar } = useCart();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900">Nossos Produtos</h1>
          <p className="text-slate-500 mt-2">Encontre as melhores ofertas selecionadas para você.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
          >
            <div className="text-7xl mb-6 bg-slate-50 w-full rounded-xl py-8 flex justify-center items-center group-hover:bg-indigo-50 transition-colors">
              {produto.imagem_emoji}
            </div>
            
            <div className="w-full flex flex-col flex-grow">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2 block">
                {produto.categoria}
              </span>
              <h2 className="text-lg font-bold text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                {produto.nome}
              </h2>
              
              <div className="mt-auto flex items-center justify-between w-full">
                <span className="text-2xl font-extrabold text-slate-900">
                  {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    adicionar(produto);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-4 py-2 rounded-full transition-colors shadow-sm flex items-center gap-2"
                >
                  <span className="text-sm hidden sm:inline">Adicionar ao carrinho</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
