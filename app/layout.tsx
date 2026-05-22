import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../lib/cart-context';
import { CartIcon } from '../components/cart-icon';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VendeFacil',
  description: 'Seu e-commerce fácil e rápido',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-white text-slate-900 min-h-screen flex flex-col`}>
        <CartProvider>
          <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
                VendeFacil <span className="text-yellow-400">⚡</span>
              </Link>
              <CartIcon />
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-slate-100 border-t border-slate-200 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-slate-600 text-sm font-medium">
              Feito na aula de IA do UNISENAI
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
