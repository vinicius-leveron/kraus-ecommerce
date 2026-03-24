import { NextRequest, NextResponse } from 'next/server'

// In-memory store
let transacoes: Array<{
  id: string
  tipo: 'receita' | 'despesa'
  descricao: string
  valor: number
  empresa: string
  categoria: string
  data: string
  created_at: Date
}> = [
  { id: '1', tipo: 'receita', descricao: 'Venda ML #123456 - Drone DJI', valor: 2139, empresa: 'Continental Imports', categoria: 'vendas', data: '18/03/2025', created_at: new Date() },
  { id: '2', tipo: 'despesa', descricao: 'Frete China - Container', valor: 8500, empresa: 'Continental Imports', categoria: 'logistica', data: '17/03/2025', created_at: new Date() },
  { id: '3', tipo: 'receita', descricao: 'Venda Shopee - Miniaturas x5', valor: 795, empresa: 'Topo Minas', categoria: 'vendas', data: '17/03/2025', created_at: new Date() },
  { id: '4', tipo: 'despesa', descricao: 'Taxa Mercado Livre', valor: 342, empresa: 'Continental Imports', categoria: 'taxas', data: '16/03/2025', created_at: new Date() },
  { id: '5', tipo: 'receita', descricao: 'Venda B2B - Lote cameras', valor: 4500, empresa: 'Kraus Digital', categoria: 'vendas', data: '15/03/2025', created_at: new Date() },
]

const empresas = {
  continental: { nome: 'Continental Imports', faturamento_mes: 145000, despesas_mes: 101500 },
  topo_minas: { nome: 'Topo Minas', faturamento_mes: 98000, despesas_mes: 68600 },
  kraus_digital: { nome: 'Kraus Digital', faturamento_mes: 57000, despesas_mes: 39900 },
}

// GET - Consultar financeiro
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const empresa = searchParams.get('empresa')
  const tipo = searchParams.get('tipo')
  const resumo = searchParams.get('resumo')

  // Resumo geral ou por empresa
  if (resumo === 'true') {
    if (empresa && empresas[empresa as keyof typeof empresas]) {
      const emp = empresas[empresa as keyof typeof empresas]
      return NextResponse.json({
        empresa: emp.nome,
        faturamento_mes: emp.faturamento_mes,
        despesas_mes: emp.despesas_mes,
        lucro_bruto: emp.faturamento_mes - emp.despesas_mes,
        margem: ((emp.faturamento_mes - emp.despesas_mes) / emp.faturamento_mes * 100).toFixed(1) + '%'
      })
    }

    // Resumo consolidado
    const faturamentoTotal = Object.values(empresas).reduce((acc, e) => acc + e.faturamento_mes, 0)
    const despesasTotal = Object.values(empresas).reduce((acc, e) => acc + e.despesas_mes, 0)

    return NextResponse.json({
      consolidado: {
        faturamento_mes: faturamentoTotal,
        despesas_mes: despesasTotal,
        lucro_bruto: faturamentoTotal - despesasTotal,
        margem: ((faturamentoTotal - despesasTotal) / faturamentoTotal * 100).toFixed(1) + '%',
        a_receber: 45000
      },
      por_empresa: Object.entries(empresas).map(([key, e]) => ({
        id: key,
        nome: e.nome,
        faturamento: e.faturamento_mes,
        despesas: e.despesas_mes,
        lucro: e.faturamento_mes - e.despesas_mes
      }))
    })
  }

  // Filtrar transações
  let resultado = [...transacoes]

  if (empresa) {
    resultado = resultado.filter(t =>
      t.empresa.toLowerCase().includes(empresa.toLowerCase())
    )
  }

  if (tipo === 'receita' || tipo === 'despesa') {
    resultado = resultado.filter(t => t.tipo === tipo)
  }

  return NextResponse.json({
    quantidade: resultado.length,
    transacoes: resultado.slice(0, 20)
  })
}

// POST - Registrar transação
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { tipo, descricao, valor, empresa, categoria } = body

  if (!tipo || !descricao || !valor || !empresa) {
    return NextResponse.json({
      error: 'Campos obrigatorios: tipo (receita/despesa), descricao, valor, empresa'
    }, { status: 400 })
  }

  if (tipo !== 'receita' && tipo !== 'despesa') {
    return NextResponse.json({
      error: 'Tipo deve ser "receita" ou "despesa"'
    }, { status: 400 })
  }

  const novaTransacao = {
    id: Date.now().toString(),
    tipo: tipo as 'receita' | 'despesa',
    descricao,
    valor: Number(valor),
    empresa,
    categoria: categoria || 'geral',
    data: new Date().toLocaleDateString('pt-BR'),
    created_at: new Date()
  }

  transacoes.unshift(novaTransacao)

  // Atualizar resumo da empresa se existir
  const empresaKey = Object.keys(empresas).find(k =>
    empresas[k as keyof typeof empresas].nome.toLowerCase().includes(empresa.toLowerCase())
  )

  if (empresaKey) {
    const emp = empresas[empresaKey as keyof typeof empresas]
    if (tipo === 'receita') {
      emp.faturamento_mes += Number(valor)
    } else {
      emp.despesas_mes += Number(valor)
    }
  }

  return NextResponse.json({
    sucesso: true,
    mensagem: `${tipo === 'receita' ? 'Receita' : 'Despesa'} registrada: ${descricao} - R$ ${Number(valor).toLocaleString('pt-BR')} (${empresa})`,
    transacao: novaTransacao
  })
}
