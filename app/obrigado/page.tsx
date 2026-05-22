'use client';

import Link from 'next/link';
import { useCart } from '../../lib/cart-context';
import { useEffect } from 'react';

export default function ObrigadoPage() {
  const { limpar } = useCart();

  useEffect(() => {
    // Limpar o carrinho assim que a página de sucesso for acessada
    limpar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-6xl mb-6 bg-green-100 text-green-500 w-24 h-24 rounded-full flex justify-center items-center">
        ✓
      </div>
      <h1 className="text-4xl font-extrabold text-slate-800 mb-4 text-center">Pedido recebido!</h1>
      <p className="text-slate-500 mb-8 text-center max-w-md">
        Obrigado por comprar conosco. Seu pagamento está sendo processado e logo prepararemos os seus produtos.
      </p>
      <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm text-lg">
        Voltar ao catálogo
      </Link>
    </div>
  );
}
