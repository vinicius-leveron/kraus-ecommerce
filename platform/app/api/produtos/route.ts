import { NextRequest, NextResponse } from 'next/server'

// Dados completos dos produtos
const produtos = {
  'DRN001': {
    sku: 'DRN001',
    nome: 'Drone DJI Mini SE',
    categoria: 'drones',
    custo: 1500,
    preco_sugerido: 2139,
    margem: 30,
    peso: 249,
    dimensoes: '15x10x6 cm',
    origem: 'China',
    ncm: '8806.10.00',
    imagem: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400'
  },
  'DRN002': {
    sku: 'DRN002',
    nome: 'Controle Drone Universal',
    categoria: 'acessorios',
    custo: 95,
    preco_sugerido: 189,
    margem: 50,
    peso: 180,
    dimensoes: '18x12x5 cm',
    origem: 'China',
    ncm: '8526.92.00',
    imagem: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400'
  },
  'MIN001': {
    sku: 'MIN001',
    nome: 'F-14 Tomcat Miniatura 1:72',
    categoria: 'miniaturas',
    custo: 65,
    preco_sugerido: 159,
    margem: 59,
    peso: 320,
    dimensoes: '25x20x8 cm',
    origem: 'China',
    ncm: '9503.00.39',
    imagem: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400'
  },
  'MIN002': {
    sku: 'MIN002',
    nome: 'Boeing 747 Air France 1:400',
    categoria: 'miniaturas',
    custo: 52,
    preco_sugerido: 129,
    margem: 60,
    peso: 180,
    dimensoes: '18x15x6 cm',
    origem: 'China',
    ncm: '9503.00.39',
    imagem: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400'
  },
  'CAM001': {
    sku: 'CAM001',
    nome: 'Camera IP WiFi 360',
    categoria: 'cameras',
    custo: 78,
    preco_sugerido: 189,
    margem: 59,
    peso: 150,
    dimensoes: '8x8x12 cm',
    origem: 'China',
    ncm: '8525.80.29',
    imagem: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400'
  },
  'BRQ001': {
    sku: 'BRQ001',
    nome: 'Lego Technic Aviao',
    categoria: 'brinquedos',
    custo: 145,
    preco_sugerido: 299,
    margem: 51,
    peso: 850,
    dimensoes: '38x26x7 cm',
    origem: 'Estados Unidos',
    ncm: '9503.00.39',
    imagem: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400'
  },
  'VNT001': {
    sku: 'VNT001',
    nome: 'Ventilador USB Portatil',
    categoria: 'eletronicos',
    custo: 18,
    preco_sugerido: 49,
    margem: 63,
    peso: 85,
    dimensoes: '10x10x15 cm',
    origem: 'China',
    ncm: '8414.51.90',
    imagem: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
  },
  'MIN003': {
    sku: 'MIN003',
    nome: 'Miniatura Jetski Yamaha',
    categoria: 'miniaturas',
    custo: 35,
    preco_sugerido: 89,
    margem: 61,
    peso: 120,
    dimensoes: '12x8x5 cm',
    origem: 'China',
    ncm: '9503.00.39',
    imagem: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
  },
  'DRN003': {
    sku: 'DRN003',
    nome: 'Bateria Extra Drone',
    categoria: 'acessorios',
    custo: 85,
    preco_sugerido: 199,
    margem: 57,
    peso: 95,
    dimensoes: '8x6x3 cm',
    origem: 'China',
    ncm: '8507.60.00',
    imagem: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400'
  },
  'CAM002': {
    sku: 'CAM002',
    nome: 'Exaustor Camera Filmagem',
    categoria: 'acessorios',
    custo: 32,
    preco_sugerido: 79,
    margem: 59,
    peso: 45,
    dimensoes: '6x4x2 cm',
    origem: 'China',
    ncm: '8414.59.90',
    imagem: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'
  }
}

// GET - Consultar produtos
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sku = searchParams.get('sku')
  const categoria = searchParams.get('categoria')
  const busca = searchParams.get('busca')

  // Consulta por SKU específico
  if (sku) {
    const produto = produtos[sku as keyof typeof produtos]
    if (!produto) {
      return NextResponse.json({ error: 'Produto nao encontrado' }, { status: 404 })
    }
    return NextResponse.json(produto)
  }

  let resultado = Object.values(produtos)

  // Filtrar por categoria
  if (categoria) {
    resultado = resultado.filter(p => p.categoria === categoria)
  }

  // Busca por nome
  if (busca) {
    resultado = resultado.filter(p =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.sku.toLowerCase().includes(busca.toLowerCase())
    )
  }

  // Estatísticas
  const stats = {
    total_produtos: resultado.length,
    categorias: Array.from(new Set(resultado.map(p => p.categoria))),
    valor_custo_total: resultado.reduce((acc, p) => acc + p.custo, 0),
    margem_media: (resultado.reduce((acc, p) => acc + p.margem, 0) / resultado.length).toFixed(1) + '%'
  }

  return NextResponse.json({
    estatisticas: stats,
    produtos: resultado
  })
}

// POST - Cadastrar novo produto
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { sku, nome, categoria, custo, preco_sugerido, peso, dimensoes, origem, ncm } = body

  if (!sku || !nome || !custo) {
    return NextResponse.json({
      error: 'Campos obrigatorios: sku, nome, custo'
    }, { status: 400 })
  }

  if (produtos[sku as keyof typeof produtos]) {
    return NextResponse.json({
      error: 'SKU ja existe no cadastro'
    }, { status: 400 })
  }

  const preco = preco_sugerido || Math.round(custo * 1.5) // 50% margem default
  const margem = ((preco - custo) / preco * 100)

  const novoProduto = {
    sku,
    nome,
    categoria: categoria || 'geral',
    custo: Number(custo),
    preco_sugerido: preco,
    margem: Math.round(margem),
    peso: peso || 0,
    dimensoes: dimensoes || '',
    origem: origem || 'China',
    ncm: ncm || '',
    imagem: ''
  }

  // @ts-ignore - adicionando dinamicamente
  produtos[sku] = novoProduto

  return NextResponse.json({
    sucesso: true,
    mensagem: `Produto cadastrado: ${nome} (SKU: ${sku})`,
    produto: novoProduto
  })
}
