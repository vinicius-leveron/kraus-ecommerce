// Dados mockados de e-commerce real (ML + Shopee)

export interface Pedido {
  id: string
  canal: 'ML' | 'Shopee'
  status: 'pendente' | 'atrasado' | 'em_transito' | 'entregue' | 'problema'
  cliente: string
  produto: string
  sku: string
  valor: number
  data: string
  prazo_envio: string
  horas_restantes?: number
  tracking?: string
  problema_tipo?: 'devolucao' | 'extravio' | 'avaria'
}

export interface ProdutoRentabilidade {
  sku: string
  nome: string
  canal: 'ML' | 'Shopee'
  preco_venda: number
  custo_produto: number
  taxa_marketplace: number
  frete_vendedor: number
  custo_ads: number
  lucro_liquido: number
  margem_liquida: number
  vendas_mes: number
  lucro_total_mes: number
}

export interface EstoqueCobertura {
  sku: string
  nome: string
  estoque_atual: number
  vendas_dia_media: number
  dias_cobertura: number
  local: 'proprio' | 'full_ml' | 'full_shopee'
  valor_estoque: number
  ultima_venda_dias: number
  sugestao_reposicao: number
}

export interface AlertaInteligente {
  id: string
  tipo: 'urgente' | 'atencao' | 'info'
  titulo: string
  descricao: string
  acao?: string
  link?: string
}

// Vendas do dia por canal
export const vendasHoje = {
  ml: {
    valor: 4890,
    pedidos: 12,
    ticketMedio: 407.50,
    variacaoOntem: 15.2
  },
  shopee: {
    valor: 3245,
    pedidos: 18,
    ticketMedio: 180.28,
    variacaoOntem: -5.8
  },
  total: {
    valor: 8135,
    pedidos: 30,
    ticketMedio: 271.17,
    variacaoOntem: 8.4
  }
}

// Vendas da semana para grafico
export const vendasSemana = [
  { dia: 'Seg', ml: 3200, shopee: 2800 },
  { dia: 'Ter', ml: 4100, shopee: 3100 },
  { dia: 'Qua', ml: 3800, shopee: 2950 },
  { dia: 'Qui', ml: 4500, shopee: 3400 },
  { dia: 'Sex', ml: 5200, shopee: 3800 },
  { dia: 'Sab', ml: 4890, shopee: 3245 },
  { dia: 'Dom', ml: 0, shopee: 0 },
]

// Pedidos por status
export const pedidosResumo = {
  pendentes: 8,
  atrasados: 2,
  emTransito: 15,
  entregues: 245,
  problemas: 3
}

// Lista de pedidos
export const pedidos: Pedido[] = [
  {
    id: 'MLB-2847563',
    canal: 'ML',
    status: 'atrasado',
    cliente: 'Carlos Silva',
    produto: 'Drone DJI Mini SE',
    sku: 'DRN001',
    valor: 2139,
    data: '22/03',
    prazo_envio: '23/03 14:00',
    horas_restantes: -4
  },
  {
    id: 'MLB-2847589',
    canal: 'ML',
    status: 'pendente',
    cliente: 'Ana Costa',
    produto: 'Controle Drone Universal',
    sku: 'DRN002',
    valor: 189,
    data: 'Hoje',
    prazo_envio: 'Hoje 18:00',
    horas_restantes: 2
  },
  {
    id: 'SHP-9847521',
    canal: 'Shopee',
    status: 'pendente',
    cliente: 'Pedro Santos',
    produto: 'F-14 Tomcat Miniatura',
    sku: 'MIN001',
    valor: 159,
    data: 'Hoje',
    prazo_envio: 'Hoje 20:00',
    horas_restantes: 4
  },
  {
    id: 'SHP-9847534',
    canal: 'Shopee',
    status: 'atrasado',
    cliente: 'Maria Oliveira',
    produto: 'Camera IP WiFi 360',
    sku: 'CAM001',
    valor: 189,
    data: '22/03',
    prazo_envio: '23/03 10:00',
    horas_restantes: -8
  },
  {
    id: 'MLB-2847601',
    canal: 'ML',
    status: 'pendente',
    cliente: 'Lucas Ferreira',
    produto: 'Lego Technic Aviao',
    sku: 'BRQ001',
    valor: 299,
    data: 'Hoje',
    prazo_envio: 'Amanha 14:00',
    horas_restantes: 22
  },
  {
    id: 'SHP-9847556',
    canal: 'Shopee',
    status: 'em_transito',
    cliente: 'Juliana Lima',
    produto: 'Ventilador USB Portatil',
    sku: 'VNT001',
    valor: 49,
    data: '21/03',
    prazo_envio: '25/03',
    tracking: 'BR847592635BR'
  },
  {
    id: 'MLB-2847445',
    canal: 'ML',
    status: 'problema',
    cliente: 'Roberto Alves',
    produto: 'Boeing 747 Air France',
    sku: 'MIN002',
    valor: 129,
    data: '18/03',
    prazo_envio: '20/03',
    problema_tipo: 'devolucao'
  },
  {
    id: 'SHP-9847412',
    canal: 'Shopee',
    status: 'problema',
    cliente: 'Fernanda Souza',
    produto: 'Miniatura Jetski Yamaha',
    sku: 'MIN003',
    valor: 89,
    data: '17/03',
    prazo_envio: '19/03',
    problema_tipo: 'extravio'
  }
]

// Rentabilidade real por produto
export const produtosRentabilidade: ProdutoRentabilidade[] = [
  {
    sku: 'DRN001',
    nome: 'Drone DJI Mini SE',
    canal: 'ML',
    preco_venda: 2139,
    custo_produto: 1500,
    taxa_marketplace: 342.24, // 16%
    frete_vendedor: 45,
    custo_ads: 25,
    lucro_liquido: 226.76,
    margem_liquida: 10.6,
    vendas_mes: 12,
    lucro_total_mes: 2721.12
  },
  {
    sku: 'VNT001',
    nome: 'Ventilador USB Portatil',
    canal: 'Shopee',
    preco_venda: 49,
    custo_produto: 18,
    taxa_marketplace: 9.80, // 20%
    frete_vendedor: 0, // frete gratis shopee
    custo_ads: 2,
    lucro_liquido: 19.20,
    margem_liquida: 39.2,
    vendas_mes: 120,
    lucro_total_mes: 2304
  },
  {
    sku: 'MIN001',
    nome: 'F-14 Tomcat Miniatura',
    canal: 'ML',
    preco_venda: 159,
    custo_produto: 65,
    taxa_marketplace: 25.44, // 16%
    frete_vendedor: 18,
    custo_ads: 5,
    lucro_liquido: 45.56,
    margem_liquida: 28.7,
    vendas_mes: 45,
    lucro_total_mes: 2050.20
  },
  {
    sku: 'MIN002',
    nome: 'Boeing 747 Air France',
    canal: 'Shopee',
    preco_venda: 129,
    custo_produto: 52,
    taxa_marketplace: 25.80, // 20%
    frete_vendedor: 0,
    custo_ads: 3,
    lucro_liquido: 48.20,
    margem_liquida: 37.4,
    vendas_mes: 38,
    lucro_total_mes: 1831.60
  },
  {
    sku: 'CAM001',
    nome: 'Camera IP WiFi 360',
    canal: 'ML',
    preco_venda: 189,
    custo_produto: 78,
    taxa_marketplace: 30.24, // 16%
    frete_vendedor: 22,
    custo_ads: 8,
    lucro_liquido: 50.76,
    margem_liquida: 26.9,
    vendas_mes: 22,
    lucro_total_mes: 1116.72
  },
  {
    sku: 'DRN002',
    nome: 'Controle Drone Universal',
    canal: 'Shopee',
    preco_venda: 189,
    custo_produto: 95,
    taxa_marketplace: 37.80, // 20%
    frete_vendedor: 0,
    custo_ads: 5,
    lucro_liquido: 51.20,
    margem_liquida: 27.1,
    vendas_mes: 28,
    lucro_total_mes: 1433.60
  },
  {
    sku: 'BRQ001',
    nome: 'Lego Technic Aviao',
    canal: 'ML',
    preco_venda: 299,
    custo_produto: 145,
    taxa_marketplace: 47.84, // 16%
    frete_vendedor: 35,
    custo_ads: 15,
    lucro_liquido: 56.16,
    margem_liquida: 18.8,
    vendas_mes: 15,
    lucro_total_mes: 842.40
  },
  // Produto com PREJUIZO
  {
    sku: 'MIN003',
    nome: 'Miniatura Jetski Yamaha',
    canal: 'Shopee',
    preco_venda: 89,
    custo_produto: 35,
    taxa_marketplace: 17.80, // 20%
    frete_vendedor: 0,
    custo_ads: 45, // ads alto por promocao
    lucro_liquido: -8.80,
    margem_liquida: -9.9,
    vendas_mes: 32,
    lucro_total_mes: -281.60
  },
  {
    sku: 'DRN003',
    nome: 'Bateria Extra Drone DJI',
    canal: 'ML',
    preco_venda: 199,
    custo_produto: 85,
    taxa_marketplace: 31.84, // 16%
    frete_vendedor: 12,
    custo_ads: 8,
    lucro_liquido: 62.16,
    margem_liquida: 31.2,
    vendas_mes: 18,
    lucro_total_mes: 1118.88
  },
  // Outro produto com prejuizo
  {
    sku: 'CAM002',
    nome: 'Exaustor Camera Filmagem',
    canal: 'ML',
    preco_venda: 79,
    custo_produto: 32,
    taxa_marketplace: 12.64, // 16%
    frete_vendedor: 25, // frete caro
    custo_ads: 12,
    lucro_liquido: -2.64,
    margem_liquida: -3.3,
    vendas_mes: 25,
    lucro_total_mes: -66
  }
]

// Cobertura de estoque
export const estoqueCobertura: EstoqueCobertura[] = [
  {
    sku: 'MIN001',
    nome: 'F-14 Tomcat Miniatura',
    estoque_atual: 8,
    vendas_dia_media: 1.5,
    dias_cobertura: 5,
    local: 'proprio',
    valor_estoque: 520, // 8 * 65
    ultima_venda_dias: 0,
    sugestao_reposicao: 37 // para 30 dias
  },
  {
    sku: 'BRQ001',
    nome: 'Lego Technic Aviao',
    estoque_atual: 9,
    vendas_dia_media: 0.5,
    dias_cobertura: 18,
    local: 'full_ml',
    valor_estoque: 1305, // 9 * 145
    ultima_venda_dias: 1,
    sugestao_reposicao: 6
  },
  {
    sku: 'VNT001',
    nome: 'Ventilador USB Portatil',
    estoque_atual: 110,
    vendas_dia_media: 4,
    dias_cobertura: 27,
    local: 'full_shopee',
    valor_estoque: 1980, // 110 * 18
    ultima_venda_dias: 0,
    sugestao_reposicao: 0
  },
  {
    sku: 'DRN001',
    nome: 'Drone DJI Mini SE',
    estoque_atual: 13,
    vendas_dia_media: 0.4,
    dias_cobertura: 32,
    local: 'proprio',
    valor_estoque: 19500, // 13 * 1500
    ultima_venda_dias: 2,
    sugestao_reposicao: 0
  },
  {
    sku: 'MIN002',
    nome: 'Boeing 747 Air France',
    estoque_atual: 40,
    vendas_dia_media: 1.3,
    dias_cobertura: 31,
    local: 'proprio',
    valor_estoque: 2080, // 40 * 52
    ultima_venda_dias: 0,
    sugestao_reposicao: 0
  },
  {
    sku: 'CAM001',
    nome: 'Camera IP WiFi 360',
    estoque_atual: 27,
    vendas_dia_media: 0.7,
    dias_cobertura: 38,
    local: 'full_ml',
    valor_estoque: 2106, // 27 * 78
    ultima_venda_dias: 1,
    sugestao_reposicao: 0
  },
  // Produto parado (estoque morto)
  {
    sku: 'MIN003',
    nome: 'Miniatura Jetski Yamaha',
    estoque_atual: 45,
    vendas_dia_media: 0.1,
    dias_cobertura: 450,
    local: 'proprio',
    valor_estoque: 1575, // 45 * 35
    ultima_venda_dias: 65,
    sugestao_reposicao: 0
  }
]

// Alertas inteligentes
export const alertas: AlertaInteligente[] = [
  {
    id: '1',
    tipo: 'urgente',
    titulo: '2 pedidos atrasados',
    descricao: 'MLB-2847563 e SHP-9847534 passaram do prazo de envio',
    acao: 'Enviar agora'
  },
  {
    id: '2',
    tipo: 'urgente',
    titulo: 'F-14 Tomcat com estoque critico',
    descricao: 'Apenas 5 dias de cobertura. Vendendo 1.5/dia.',
    acao: 'Repor estoque'
  },
  {
    id: '3',
    tipo: 'atencao',
    titulo: 'Miniatura Jetski com prejuizo',
    descricao: 'Margem de -9.9% devido a custo de ads alto. Revise a estrategia.',
    acao: 'Ver detalhes'
  },
  {
    id: '4',
    tipo: 'atencao',
    titulo: 'Estoque parado: Jetski Yamaha',
    descricao: 'R$ 1.575 em estoque sem venda ha 65 dias.',
    acao: 'Criar promocao'
  },
  {
    id: '5',
    tipo: 'info',
    titulo: 'Shopee: taxa subiu para 22%',
    descricao: 'Nova taxa aplicada desde 20/03. Recalcule margens.',
    acao: 'Atualizar precos'
  }
]

// Resumo financeiro real
export const financeiroReal = {
  lucroLiquidoMes: 13070.92,
  lucroLiquidoOntem: 485.20,
  lucroLiquidoHoje: 612.40,
  margemLiquidaMedia: 22.4,
  faturamentoMes: 58350,
  custosMes: 45279.08,
  taxasMarketplace: 8520,
  fretePago: 2340,
  adsInvestidos: 1890,
  roiAds: 3.2, // para cada R$1 em ads, retorno de R$3.20
  produtosComPrejuizo: 2,
  valorPrejuizoMes: 347.60
}

// SLA e metricas de operacao
export const slaPedidos = {
  envioNoPrazo: 94.2,
  atrasos: 5.8,
  devolucoes: 1.2,
  extravios: 0.3,
  notaML: 4.8,
  notaShopee: 4.9,
  motivosCancelamento: [
    { motivo: 'Cliente desistiu', quantidade: 8 },
    { motivo: 'Produto indisponivel', quantidade: 3 },
    { motivo: 'Problema no pagamento', quantidade: 2 },
    { motivo: 'Endereco incorreto', quantidade: 1 }
  ]
}

// Curva ABC
export const curvaABC = {
  classA: {
    skus: ['VNT001', 'MIN001', 'DRN001'],
    percentualSkus: 30,
    percentualFaturamento: 78
  },
  classB: {
    skus: ['MIN002', 'DRN002', 'CAM001'],
    percentualSkus: 30,
    percentualFaturamento: 18
  },
  classC: {
    skus: ['BRQ001', 'MIN003', 'DRN003', 'CAM002'],
    percentualSkus: 40,
    percentualFaturamento: 4
  }
}
