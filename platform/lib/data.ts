export const produtos = [
  {
    sku: "DRN001",
    nome: "Drone DJI Mini SE",
    categoria: "Drones",
    preco: 2139.00,
    custo: 1500.00,
    margem: 29.9,
    estoque: { sao_jose: 5, sao_paulo: 8 },
    imagem: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400",
    vendas_mes: 12,
    nota: 5.0
  },
  {
    sku: "DRN002",
    nome: "Controle Drone Universal",
    categoria: "Drones",
    preco: 189.00,
    custo: 95.00,
    margem: 49.7,
    estoque: { sao_jose: 15, sao_paulo: 20 },
    imagem: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400",
    vendas_mes: 28,
    nota: 4.8
  },
  {
    sku: "MIN001",
    nome: "F-14 Tomcat Miniatura 1:72",
    categoria: "Miniaturas",
    preco: 159.00,
    custo: 65.00,
    margem: 59.1,
    estoque: { sao_jose: 3, sao_paulo: 5 },
    imagem: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400",
    vendas_mes: 45,
    nota: 5.0
  },
  {
    sku: "MIN002",
    nome: "Boeing 747 Air France 1:400",
    categoria: "Miniaturas",
    preco: 129.00,
    custo: 52.00,
    margem: 59.7,
    estoque: { sao_jose: 18, sao_paulo: 22 },
    imagem: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    vendas_mes: 38,
    nota: 4.9
  },
  {
    sku: "CAM001",
    nome: "Camera IP WiFi 360",
    categoria: "Cameras",
    preco: 189.00,
    custo: 78.00,
    margem: 58.7,
    estoque: { sao_jose: 12, sao_paulo: 15 },
    imagem: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    vendas_mes: 22,
    nota: 4.7
  },
  {
    sku: "BRQ001",
    nome: "Lego Technic Aviao",
    categoria: "Brinquedos",
    preco: 299.00,
    custo: 145.00,
    margem: 51.5,
    estoque: { sao_jose: 4, sao_paulo: 5 },
    imagem: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
    vendas_mes: 15,
    nota: 5.0
  },
  {
    sku: "VNT001",
    nome: "Ventilador USB Portatil",
    categoria: "Eletronicos",
    preco: 49.00,
    custo: 18.00,
    margem: 63.3,
    estoque: { sao_jose: 50, sao_paulo: 60 },
    imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    vendas_mes: 120,
    nota: 4.6
  },
  {
    sku: "MIN003",
    nome: "Miniatura Jetski Yamaha",
    categoria: "Miniaturas",
    preco: 89.00,
    custo: 35.00,
    margem: 60.7,
    estoque: { sao_jose: 20, sao_paulo: 25 },
    imagem: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
    vendas_mes: 32,
    nota: 4.8
  },
  {
    sku: "DRN003",
    nome: "Bateria Extra Drone DJI",
    categoria: "Drones",
    preco: 199.00,
    custo: 85.00,
    margem: 57.3,
    estoque: { sao_jose: 10, sao_paulo: 12 },
    imagem: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400",
    vendas_mes: 18,
    nota: 4.9
  },
  {
    sku: "CAM002",
    nome: "Exaustor Camera Filmagem",
    categoria: "Cameras",
    preco: 79.00,
    custo: 32.00,
    margem: 59.5,
    estoque: { sao_jose: 15, sao_paulo: 18 },
    imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    vendas_mes: 25,
    nota: 4.7
  }
]

export const organizacoes = [
  {
    id: "continental",
    nome: "Continental Imports",
    cnpj: "12.345.678/0001-01",
    tipo: "Produtos Importados Legais",
    localizacao: "Sao Paulo",
    cor: "#3B82F6"
  },
  {
    id: "topo_minas",
    nome: "Topo Minas",
    cnpj: "23.456.789/0001-02",
    tipo: "Miniaturas e Brinquedos",
    localizacao: "Sao Jose",
    cor: "#10B981"
  },
  {
    id: "kraus_digital",
    nome: "Kraus Digital",
    cnpj: "34.567.890/0001-03",
    tipo: "E-commerce Geral",
    localizacao: "Sao Jose",
    cor: "#8B5CF6"
  }
]

export const financeiro = {
  resumo: {
    faturamento_mes: 300000,
    despesas_mes: 210000,
    lucro_mes: 90000,
    a_receber: 73000
  },
  por_empresa: {
    continental: {
      faturamento: [
        { mes: "Janeiro", valor: 120000 },
        { mes: "Fevereiro", valor: 135000 },
        { mes: "Marco", valor: 145000 }
      ]
    },
    topo_minas: {
      faturamento: [
        { mes: "Janeiro", valor: 85000 },
        { mes: "Fevereiro", valor: 92000 },
        { mes: "Marco", valor: 98000 }
      ]
    },
    kraus_digital: {
      faturamento: [
        { mes: "Janeiro", valor: 45000 },
        { mes: "Fevereiro", valor: 48000 },
        { mes: "Marco", valor: 57000 }
      ]
    }
  },
  transacoes: [
    { id: 1, data: "Hoje", descricao: "Venda Drone DJI Mini SE", empresa: "Continental", tipo: "receita", valor: 2139 },
    { id: 2, data: "Hoje", descricao: "Frete Correios - Lote SP", empresa: "Continental", tipo: "despesa", valor: 450 },
    { id: 3, data: "Ontem", descricao: "Venda F-14 Tomcat x3", empresa: "Topo Minas", tipo: "receita", valor: 477 },
    { id: 4, data: "Ontem", descricao: "Compra estoque China", empresa: "Topo Minas", tipo: "despesa", valor: 3200 },
    { id: 5, data: "22/03", descricao: "Taxa Mercado Livre", empresa: "Kraus Digital", tipo: "despesa", valor: 892 },
    { id: 6, data: "22/03", descricao: "Venda Lego Technic x2", empresa: "Kraus Digital", tipo: "receita", valor: 598 }
  ]
}

export const atendimento = {
  metricas: {
    mensagens_hoje: 200,
    resolvidas_bot: 156,
    aguardando_humano: 17,
    tempo_economizado: 4.2,
    tempo_resposta: 32,
    nota_shopee: 4.9
  },
  conversas: [
    {
      id: 1,
      cliente: "Joao Marcos",
      iniciais: "JM",
      canal: "Shopee",
      status: "escalado",
      tempo: "2 min",
      mensagem: "Quero falar com o vendedor sobre uma troca",
      produto: "F-14 Tomcat Miniatura",
      pedido: "#456789"
    },
    {
      id: 2,
      cliente: "Ana Silva",
      iniciais: "AS",
      canal: "Shopee",
      status: "resolvido",
      tempo: "5 min",
      mensagem: "Tem em estoque?",
      resposta_bot: "Sim! Temos 13 unidades disponiveis."
    },
    {
      id: 3,
      cliente: "Pedro Lima",
      iniciais: "PL",
      canal: "ML",
      status: "resolvido",
      tempo: "8 min",
      mensagem: "Quando chega em SP?",
      resposta_bot: "Estimativa de entrega: 3-5 dias uteis para SP capital."
    },
    {
      id: 4,
      cliente: "Maria Ribeiro",
      iniciais: "MR",
      canal: "Shopee",
      status: "aguardando",
      tempo: "12 min",
      mensagem: "Vcs fazem preco pra 5 unidades?"
    },
    {
      id: 5,
      cliente: "Carlos Santos",
      iniciais: "CS",
      canal: "Shopee",
      status: "resolvido",
      tempo: "15 min",
      mensagem: "O drone vem com bateria extra?",
      resposta_bot: "O Drone DJI Mini SE acompanha 1 bateria. Bateria extra disponivel por R$ 199."
    }
  ]
}

export const iaResponses: Record<string, Record<string, string>> = {
  financeiro: {
    'faturamento': 'O faturamento total em Marco foi de R$ 300.000, distribuido entre Continental (R$ 145k), Topo Minas (R$ 98k) e Kraus Digital (R$ 57k).',
    'continental': 'O faturamento da Continental Imports em Marco foi de R$ 145.000, um aumento de 7,4% em relacao a Fevereiro.',
    'projecao': 'Com base nos ultimos 3 meses, a projecao para o proximo trimestre e:\n\n- Abril: R$ 315.000 (+5%)\n- Maio: R$ 330.750 (+5%)\n- Junho: R$ 347.287 (+5%)',
    'registrar': 'Lancamento registrado com sucesso! Atualizei o dashboard com a nova transacao.',
    'default': 'Entendi sua pergunta. Deixa eu buscar essa informacao para voce...'
  },
  estoque: {
    'baixo': 'Produtos com estoque baixo (< 10 unidades):\n\n1. F-14 Tomcat (MIN001) - 8 un.\n2. Lego Technic Aviao (BRQ001) - 9 un.\n\nRecomendo reabastecer esses itens.',
    'valor': 'Valor total em estoque em Sao Jose:\n\nR$ 38.250 (custo)\nR$ 62.840 (preco de venda)\n\nDistribuido em 152 unidades.',
    'relatorio': 'Relatorio gerado com sucesso!\n\nEnviei para seu email o arquivo "Estoque_Marco_2025.xlsx" com posicao de estoque, valor e movimentacoes.\n\nPronto para enviar para a contadora.',
    'entrada': 'Entrada registrada com sucesso!\n\n+50 unidades de Drone DJI Mini SE\nLocalizacao: Sao Paulo\nCusto total: R$ 75.000\n\nEstoque atualizado.',
    'default': 'Entendi! Deixa eu verificar isso para voce...'
  },
  anuncios: {
    'imagens': 'Gerando mais 4 variacoes de imagem...\n\nUsando estilo: Produto em fundo branco, detalhes precisos.\n\nCusto: R$ 0,96',
    'titulo': 'Titulo otimizado para SEO:\n\nAntes: "F-14 Tomcat Miniatura"\n\nDepois: "Miniatura F-14 Tomcat 1:72 - Aviacao Militar - Metal Diecast Premium"',
    'publica': 'Publicando anuncio...\n\nMercado Livre: Publicado! ID: MLB-789456123\nShopee: Publicado! ID: SHP-456789\n\nAnuncios ativos!',
    'cria': 'Anuncio criado com sucesso!\n\nTitulo: Gerado automaticamente\nDescricao: Otimizada para SEO\nPreco: R$ 159,00 (margem 59%)\nImagens: 4 geradas por IA',
    'default': 'Entendi! Processando sua solicitacao...'
  }
}
