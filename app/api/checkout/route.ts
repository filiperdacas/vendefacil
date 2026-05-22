import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    const handle = process.env.NEXT_PUBLIC_INFINITEPAY_HANDLE;
    if (!handle) {
      return NextResponse.json({ error: 'Handle do InfinitePay não configurado no .env.local' }, { status: 500 });
    }

    // Converter os itens para o formato da InfinitePay
    const infinitePayItems = items.map((item: any) => ({
      quantity: item.quantidade,
      price: Math.round(item.produto.preco * 100), // convertendo para centavos
      description: item.produto.nome
    }));

    // Gerar order_nsu único (timestamp + string aleatória)
    const order_nsu = `pedido-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const payload = {
      handle: handle,
      redirect_url: `${baseUrl}/obrigado`,
      webhook_url: `${baseUrl}/api/webhook`, // webhook opcional para o futuro
      order_nsu: order_nsu,
      items: infinitePayItems
    };

    const response = await fetch('https://api.checkout.infinitepay.io/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro na API do InfinitePay:', errorData);
      return NextResponse.json({ error: 'Erro ao gerar link de pagamento' }, { status: 500 });
    }

    const data = await response.json();
    
    // Retornamos a url de redirecionamento do checkout
    return NextResponse.json({ url: data.url });

  } catch (error) {
    console.error('Erro interno:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
