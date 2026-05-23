'use client';

import { produtos } from '../lib/produtos';
import { useCart } from '../lib/cart-context';
import { recomendar } from '../lib/recomendacao';

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
        {produtos.map((produto) => {
          const recomendados = recomendar(produto.id, 3);
          
          return (
            <div 
              key={produto.id} 
              className="relative overflow-hidden group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="text-7xl mb-6 bg-slate-50 w-full rounded-xl py-8 flex justify-center items-center group-hover:bg-indigo-50 transition-colors">
                {produto.imagem_emoji}
              </div>
              
              <div className="w-full flex flex-col flex-grow relative z-10 group-hover:opacity-0 transition-opacity duration-300">
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

              {/* Overlay Recomendação */}
              <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-4 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out border-t border-indigo-100 flex flex-col z-20 h-1/2">
                <span className="text-sm font-bold text-indigo-900 mb-2">Você também pode gostar:</span>
                <div className="flex gap-2 justify-center flex-1 items-center">
                  {recomendados.map(r => (
                    <div key={r.id} className="flex flex-col items-center bg-slate-50 rounded-lg p-2 flex-1" title={r.nome}>
                      <span className="text-2xl mb-1">{r.imagem_emoji}</span>
                      <span className="text-[10px] text-slate-600 text-center leading-tight line-clamp-2">{r.nome}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    adicionar(produto);
                  }}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg transition-colors shadow-sm flex justify-center items-center gap-2 w-full text-sm"
                >
                  Adicionar Principal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
