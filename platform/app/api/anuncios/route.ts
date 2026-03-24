import { NextRequest, NextResponse } from 'next/server'

// In-memory store de anúncios
let anuncios: Array<{
  id: string
  sku: string
  titulo: string
  descricao: string
  preco: number
  preco_original?: number
  marketplace: string[]
  status: 'rascunho' | 'publicado' | 'pausado'
  created_at: Date
  imagens: string[]
}> = [
  {
    id: '1',
    sku: 'MIN001',
    titulo: 'Miniatura F-14 Tomcat 1:72 - Aviacao Militar - Metal Diecast Premium',
    descricao: 'Miniatura de alta qualidade do iconico F-14 Tomcat, famoso caca da Marinha dos EUA. Fabricada em metal diecast com detalhes precisos. Escala 1:72. Perfeita para colecionadores e fas de aviacao militar.',
    preco: 159,
    preco_original: 199,
    marketplace: ['mercado_livre', 'shopee'],
    status: 'publicado',
    created_at: new Date(),
    imagens: ['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400']
  }
]

// Dados dos produtos para criação de anúncios
const produtos = {
  'DRN001': { nome: 'Drone DJI Mini SE', custo: 1500, preco_sugerido: 2139, categoria: 'drones' },
  'DRN002': { nome: 'Controle Drone Universal', custo: 95, preco_sugerido: 189, categoria: 'acessorios' },
  'MIN001': { nome: 'F-14 Tomcat Miniatura 1:72', custo: 65, preco_sugerido: 159, categoria: 'miniaturas' },
  'MIN002': { nome: 'Boeing 747 Air France 1:400', custo: 52, preco_sugerido: 129, categoria: 'miniaturas' },
  'CAM001': { nome: 'Camera IP WiFi 360', custo: 78, preco_sugerido: 189, categoria: 'cameras' },
  'BRQ001': { nome: 'Lego Technic Aviao', custo: 145, preco_sugerido: 299, categoria: 'brinquedos' },
  'VNT001': { nome: 'Ventilador USB Portatil', custo: 18, preco_sugerido: 49, categoria: 'eletronicos' },
  'MIN003': { nome: 'Miniatura Jetski Yamaha', custo: 35, preco_sugerido: 89, categoria: 'miniaturas' },
  'DRN003': { nome: 'Bateria Extra Drone', custo: 85, preco_sugerido: 199, categoria: 'acessorios' },
  'CAM002': { nome: 'Exaustor Camera Filmagem', custo: 32, preco_sugerido: 79, categoria: 'acessorios' },
}

// GET - Listar anúncios
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const marketplace = searchParams.get('marketplace')

  let resultado = [...anuncios]

  if (status) {
    resultado = resultado.filter(a => a.status === status)
  }

  if (marketplace) {
    resultado = resultado.filter(a => a.marketplace.includes(marketplace))
  }

  return NextResponse.json({
    quantidade: resultado.length,
    anuncios: resultado
  })
}

// POST - Criar/publicar anúncio
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { acao, sku, preco, margem, marketplace, titulo_custom, descricao_custom } = body

  if (acao === 'gerar') {
    // Gerar anúncio automaticamente
    if (!sku || !produtos[sku as keyof typeof produtos]) {
      return NextResponse.json({ error: 'SKU invalido' }, { status: 400 })
    }

    const produto = produtos[sku as keyof typeof produtos]

    // Calcular preço baseado em margem se fornecida
    let precoFinal = preco || produto.preco_sugerido
    if (margem) {
      precoFinal = Math.round(produto.custo / (1 - margem / 100))
    }

    // Gerar título otimizado para SEO
    const titulosTemplate: Record<string, string> = {
      drones: `${produto.nome} - Drone Profissional - Camera HD - Controle Remoto`,
      miniaturas: `${produto.nome} - Colecao Premium - Metal Diecast - Alta Qualidade`,
      cameras: `${produto.nome} - Monitoramento Residencial - App Celular - Visao Noturna`,
      acessorios: `${produto.nome} - Compativel Universal - Alta Durabilidade`,
      brinquedos: `${produto.nome} - Original - Educativo - Presente Ideal`,
      eletronicos: `${produto.nome} - Portatil - USB - Silencioso - Economico`
    }

    // Gerar descrição otimizada
    const descricoesTemplate: Record<string, string> = {
      drones: `Drone de alta performance com tecnologia avancada. Ideal para fotos e videos aereos. Facil de pilotar, perfeito para iniciantes e profissionais. Acompanha controle remoto e bateria. Garantia do vendedor.`,
      miniaturas: `Miniatura de alta qualidade em metal diecast. Detalhes precisos e acabamento premium. Perfeita para colecao ou decoracao. Excelente presente para fas e colecionadores. Embalagem de luxo.`,
      cameras: `Camera de seguranca WiFi com visao 360 graus. Resolucao HD, visao noturna, audio bidirecional. Controle pelo celular de qualquer lugar. Instalacao simples, sem fios. Armazenamento em nuvem.`,
      acessorios: `Acessorio de alta qualidade, compativel com diversos modelos. Material resistente e duravel. Garantia do vendedor. Envio rapido.`,
      brinquedos: `Brinquedo educativo e divertido. Estimula criatividade e coordenacao. Material seguro e atestado pelo INMETRO. Presente perfeito para todas as idades.`,
      eletronicos: `Produto eletronico portatil e pratico. Design moderno e compacto. Conexao USB, facil de usar. Economico e silencioso. Ideal para uso diario.`
    }

    const titulo = titulo_custom || titulosTemplate[produto.categoria] || `${produto.nome} - Produto Premium`
    const descricao = descricao_custom || descricoesTemplate[produto.categoria] || `Produto de alta qualidade. Envio rapido. Garantia do vendedor.`

    const novoAnuncio = {
      id: Date.now().toString(),
      sku,
      titulo,
      descricao,
      preco: precoFinal,
      preco_original: Math.round(precoFinal * 1.25),
      marketplace: marketplace || ['mercado_livre', 'shopee'],
      status: 'rascunho' as const,
      created_at: new Date(),
      imagens: []
    }

    anuncios.unshift(novoAnuncio)

    return NextResponse.json({
      sucesso: true,
      mensagem: `Anuncio gerado para ${produto.nome}`,
      anuncio: novoAnuncio,
      metricas: {
        custo: produto.custo,
        preco_venda: precoFinal,
        margem_calculada: ((precoFinal - produto.custo) / precoFinal * 100).toFixed(1) + '%',
        lucro_por_venda: precoFinal - produto.custo
      }
    })
  }

  if (acao === 'publicar') {
    const anuncioId = body.anuncio_id
    const anuncio = anuncios.find(a => a.id === anuncioId)

    if (!anuncio) {
      return NextResponse.json({ error: 'Anuncio nao encontrado' }, { status: 404 })
    }

    anuncio.status = 'publicado'

    return NextResponse.json({
      sucesso: true,
      mensagem: `Anuncio "${anuncio.titulo.substring(0, 50)}..." publicado em ${anuncio.marketplace.map(m => m === 'mercado_livre' ? 'Mercado Livre' : 'Shopee').join(' e ')}`,
      anuncio
    })
  }

  return NextResponse.json({ error: 'Acao invalida. Use: gerar ou publicar' }, { status: 400 })
}
