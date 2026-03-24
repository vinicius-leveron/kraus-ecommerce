import { NextRequest, NextResponse } from 'next/server'

// In-memory store (em produção seria banco de dados)
let estoque = {
  'DRN001': { nome: 'Drone DJI Mini SE', sao_jose: 5, sao_paulo: 8, custo: 1500 },
  'DRN002': { nome: 'Controle Drone Universal', sao_jose: 15, sao_paulo: 20, custo: 95 },
  'MIN001': { nome: 'F-14 Tomcat Miniatura 1:72', sao_jose: 25, sao_paulo: 30, custo: 65 },
  'MIN002': { nome: 'Boeing 747 Air France 1:400', sao_jose: 18, sao_paulo: 22, custo: 52 },
  'CAM001': { nome: 'Camera IP WiFi 360', sao_jose: 12, sao_paulo: 15, custo: 78 },
  'BRQ001': { nome: 'Lego Technic Aviao', sao_jose: 8, sao_paulo: 10, custo: 145 },
  'VNT001': { nome: 'Ventilador USB Portatil', sao_jose: 50, sao_paulo: 60, custo: 18 },
  'MIN003': { nome: 'Miniatura Jetski Yamaha', sao_jose: 20, sao_paulo: 25, custo: 35 },
  'DRN003': { nome: 'Bateria Extra Drone', sao_jose: 10, sao_paulo: 12, custo: 85 },
  'CAM002': { nome: 'Exaustor Camera Filmagem', sao_jose: 15, sao_paulo: 18, custo: 32 },
}

// GET - Consultar estoque
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sku = searchParams.get('sku')
  const localizacao = searchParams.get('localizacao')
  const estoqueBaixo = searchParams.get('estoque_baixo')

  // Consulta por SKU específico
  if (sku) {
    const produto = estoque[sku as keyof typeof estoque]
    if (!produto) {
      return NextResponse.json({ error: 'Produto nao encontrado' }, { status: 404 })
    }
    const total = produto.sao_jose + produto.sao_paulo
    return NextResponse.json({
      sku,
      ...produto,
      total,
      valor_total: total * produto.custo
    })
  }

  // Consulta produtos com estoque baixo
  if (estoqueBaixo === 'true') {
    const produtosBaixos = Object.entries(estoque)
      .filter(([_, p]) => (p.sao_jose + p.sao_paulo) < 10)
      .map(([sku, p]) => ({
        sku,
        ...p,
        total: p.sao_jose + p.sao_paulo,
        alerta: 'ESTOQUE BAIXO'
      }))
    return NextResponse.json({
      quantidade: produtosBaixos.length,
      produtos: produtosBaixos
    })
  }

  // Consulta por localização
  if (localizacao) {
    const loc = localizacao === 'sao_jose' ? 'sao_jose' : 'sao_paulo'
    const produtos = Object.entries(estoque).map(([sku, p]) => ({
      sku,
      nome: p.nome,
      quantidade: p[loc as keyof typeof p] as number,
      valor: (p[loc as keyof typeof p] as number) * p.custo
    }))
    const valorTotal = produtos.reduce((acc, p) => acc + p.valor, 0)
    return NextResponse.json({
      localizacao: localizacao === 'sao_jose' ? 'Sao Jose' : 'Sao Paulo',
      produtos,
      valor_total: valorTotal
    })
  }

  // Retorna todo o estoque
  const todosOsProdutos = Object.entries(estoque).map(([sku, p]) => ({
    sku,
    ...p,
    total: p.sao_jose + p.sao_paulo,
    valor_total: (p.sao_jose + p.sao_paulo) * p.custo
  }))

  const valorTotalGeral = todosOsProdutos.reduce((acc, p) => acc + p.valor_total, 0)
  const unidadesTotal = todosOsProdutos.reduce((acc, p) => acc + p.total, 0)

  return NextResponse.json({
    resumo: {
      total_skus: todosOsProdutos.length,
      total_unidades: unidadesTotal,
      valor_total: valorTotalGeral
    },
    produtos: todosOsProdutos
  })
}

// POST - Registrar entrada/saída/transferência
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { acao, sku, quantidade, localizacao, destino } = body

  if (!sku || !estoque[sku as keyof typeof estoque]) {
    return NextResponse.json({ error: 'SKU invalido ou nao encontrado' }, { status: 400 })
  }

  const produto = estoque[sku as keyof typeof estoque]

  switch (acao) {
    case 'entrada':
      if (!localizacao || !quantidade) {
        return NextResponse.json({ error: 'Localizacao e quantidade sao obrigatorios' }, { status: 400 })
      }
      const locEntrada = localizacao === 'sao_jose' ? 'sao_jose' : 'sao_paulo'
      produto[locEntrada] += quantidade

      return NextResponse.json({
        sucesso: true,
        mensagem: `Entrada registrada: +${quantidade} unidades de ${produto.nome} em ${localizacao === 'sao_jose' ? 'Sao Jose' : 'Sao Paulo'}`,
        estoque_atual: {
          sao_jose: produto.sao_jose,
          sao_paulo: produto.sao_paulo,
          total: produto.sao_jose + produto.sao_paulo
        }
      })

    case 'saida':
      if (!localizacao || !quantidade) {
        return NextResponse.json({ error: 'Localizacao e quantidade sao obrigatorios' }, { status: 400 })
      }
      const locSaida = localizacao === 'sao_jose' ? 'sao_jose' : 'sao_paulo'
      if (produto[locSaida] < quantidade) {
        return NextResponse.json({
          error: `Estoque insuficiente. Disponivel em ${localizacao}: ${produto[locSaida]} unidades`
        }, { status: 400 })
      }
      produto[locSaida] -= quantidade

      return NextResponse.json({
        sucesso: true,
        mensagem: `Saida registrada: -${quantidade} unidades de ${produto.nome} em ${localizacao === 'sao_jose' ? 'Sao Jose' : 'Sao Paulo'}`,
        estoque_atual: {
          sao_jose: produto.sao_jose,
          sao_paulo: produto.sao_paulo,
          total: produto.sao_jose + produto.sao_paulo
        }
      })

    case 'transferencia':
      if (!localizacao || !destino || !quantidade) {
        return NextResponse.json({ error: 'Origem, destino e quantidade sao obrigatorios' }, { status: 400 })
      }
      const origem = localizacao === 'sao_jose' ? 'sao_jose' : 'sao_paulo'
      const dest = destino === 'sao_jose' ? 'sao_jose' : 'sao_paulo'

      if (origem === dest) {
        return NextResponse.json({ error: 'Origem e destino devem ser diferentes' }, { status: 400 })
      }

      if (produto[origem] < quantidade) {
        return NextResponse.json({
          error: `Estoque insuficiente na origem. Disponivel: ${produto[origem]} unidades`
        }, { status: 400 })
      }

      produto[origem] -= quantidade
      produto[dest] += quantidade

      return NextResponse.json({
        sucesso: true,
        mensagem: `Transferencia realizada: ${quantidade} unidades de ${produto.nome} de ${localizacao === 'sao_jose' ? 'Sao Jose' : 'Sao Paulo'} para ${destino === 'sao_jose' ? 'Sao Jose' : 'Sao Paulo'}`,
        estoque_atual: {
          sao_jose: produto.sao_jose,
          sao_paulo: produto.sao_paulo,
          total: produto.sao_jose + produto.sao_paulo
        }
      })

    default:
      return NextResponse.json({ error: 'Acao invalida. Use: entrada, saida ou transferencia' }, { status: 400 })
  }
}
