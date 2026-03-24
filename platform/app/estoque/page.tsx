'use client'

import { useState } from 'react'
import { Package, DollarSign, AlertTriangle, Clock, MapPin, RefreshCw, ShoppingBag, Warehouse, TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import KPICard from '@/components/KPICard'
import { estoqueCobertura, curvaABC, alertas } from '@/lib/ecommerce-data'

// Calcula metricas
const valorTotalEstoque = estoqueCobertura.reduce((acc, p) => acc + p.valor_estoque, 0)
const produtosRuptura = estoqueCobertura.filter(p => p.dias_cobertura <= 7)
const produtosParados = estoqueCobertura.filter(p => p.ultima_venda_dias >= 30)
const valorParado = produtosParados.reduce((acc, p) => acc + p.valor_estoque, 0)

// Dados por local
const dadosLocal = [
  { nome: 'Proprio', valor: estoqueCobertura.filter(p => p.local === 'proprio').reduce((acc, p) => acc + p.valor_estoque, 0) },
  { nome: 'Full ML', valor: estoqueCobertura.filter(p => p.local === 'full_ml').reduce((acc, p) => acc + p.valor_estoque, 0) },
  { nome: 'Full Shopee', valor: estoqueCobertura.filter(p => p.local === 'full_shopee').reduce((acc, p) => acc + p.valor_estoque, 0) },
]

const coresLocal = ['#374151', '#EAB308', '#F97316']

// Dados para curva ABC
const dadosCurvaABC = [
  { classe: 'A', percentualFat: curvaABC.classA.percentualFaturamento, skus: curvaABC.classA.percentualSkus },
  { classe: 'B', percentualFat: curvaABC.classB.percentualFaturamento, skus: curvaABC.classB.percentualSkus },
  { classe: 'C', percentualFat: curvaABC.classC.percentualFaturamento, skus: curvaABC.classC.percentualSkus },
]

const coresCurva = { A: '#10B981', B: '#F59E0B', C: '#EF4444' }

export default function EstoquePage() {
  const [filtro, setFiltro] = useState<'todos' | 'ruptura' | 'parado'>('todos')

  const produtosFiltrados = filtro === 'ruptura'
    ? estoqueCobertura.filter(p => p.dias_cobertura <= 7)
    : filtro === 'parado'
    ? estoqueCobertura.filter(p => p.ultima_venda_dias >= 30)
    : estoqueCobertura

  return (
    <div>
      {/* Alertas de Estoque */}
      {alertas.filter(a => a.titulo.includes('estoque') || a.titulo.includes('Jetski')).length > 0 && (
        <div className="mb-6 space-y-3">
          {alertas.filter(a => a.titulo.includes('estoque') || a.titulo.includes('Jetski')).map(alerta => (
            <div
              key={alerta.id}
              className={`rounded-xl p-4 border flex items-start gap-3 animate-fade-in-up ${
                alerta.tipo === 'urgente' ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' :
                alerta.tipo === 'atencao' ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200' :
                'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                alerta.tipo === 'urgente' ? 'bg-red-100' :
                alerta.tipo === 'atencao' ? 'bg-amber-100' : 'bg-gray-100'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  alerta.tipo === 'urgente' ? 'text-red-600' :
                  alerta.tipo === 'atencao' ? 'text-amber-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${
                  alerta.tipo === 'urgente' ? 'text-red-900' :
                  alerta.tipo === 'atencao' ? 'text-amber-900' : 'text-gray-900'
                }`}>{alerta.titulo}</p>
                <p className={`text-sm ${
                  alerta.tipo === 'urgente' ? 'text-red-700' :
                  alerta.tipo === 'atencao' ? 'text-amber-700' : 'text-gray-600'
                }`}>{alerta.descricao}</p>
              </div>
              {alerta.acao && (
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  alerta.tipo === 'urgente' ? 'bg-red-500 text-white hover:bg-red-600' :
                  alerta.tipo === 'atencao' ? 'bg-amber-500 text-white hover:bg-amber-600' :
                  'bg-gray-500 text-white hover:bg-gray-600'
                }`}>
                  {alerta.acao}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Valor em Estoque"
          value={valorTotalEstoque}
          subtitle="capital investido"
          icon={DollarSign}
          format="currency"
          delay={0}
        />

        <KPICard
          title="Risco de Ruptura"
          value={produtosRuptura.length}
          subtitle="cobertura < 7 dias"
          icon={AlertTriangle}
          color="red"
          delay={100}
        />

        <KPICard
          title="Estoque Parado"
          value={valorParado}
          subtitle={`${produtosParados.length} produtos > 30 dias`}
          icon={Clock}
          format="currency"
          color="orange"
          delay={200}
        />

        <KPICard
          title="SKUs Ativos"
          value={estoqueCobertura.length}
          subtitle="produtos cadastrados"
          icon={Package}
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Por Localizacao */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Por Localizacao</h3>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <ResponsiveContainer width="50%" height={150}>
              <PieChart>
                <Pie
                  data={dadosLocal}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  dataKey="valor"
                  nameKey="nome"
                >
                  {dadosLocal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={coresLocal[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {dadosLocal.map((local, index) => (
                <div key={local.nome} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: coresLocal[index] }} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{local.nome}</p>
                    <p className="font-semibold text-gray-900">R$ {local.valor.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
            <Warehouse className="w-4 h-4" />
            <span>Full = estoque no CD do marketplace</span>
          </div>
        </div>

        {/* Curva ABC */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Curva ABC</h3>
            <ShoppingBag className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={dadosCurvaABC} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `${v}%`} stroke="#9ca3af" domain={[0, 100]} />
              <YAxis type="category" dataKey="classe" stroke="#9ca3af" width={30} />
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="percentualFat" name="% Faturamento" radius={[0, 4, 4, 0]}>
                {dadosCurvaABC.map((entry) => (
                  <Cell key={entry.classe} fill={coresCurva[entry.classe as keyof typeof coresCurva]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-700">Classe A</p>
              <p className="text-green-600">{curvaABC.classA.percentualSkus}% SKUs</p>
              <p className="text-green-600">{curvaABC.classA.percentualFaturamento}% Fat.</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <p className="font-semibold text-amber-700">Classe B</p>
              <p className="text-amber-600">{curvaABC.classB.percentualSkus}% SKUs</p>
              <p className="text-amber-600">{curvaABC.classB.percentualFaturamento}% Fat.</p>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-700">Classe C</p>
              <p className="text-red-600">{curvaABC.classC.percentualSkus}% SKUs</p>
              <p className="text-red-600">{curvaABC.classC.percentualFaturamento}% Fat.</p>
            </div>
          </div>
        </div>

        {/* Produtos em Ruptura */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Risco de Ruptura</h3>
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {produtosRuptura.length > 0 ? (
              produtosRuptura.map(produto => (
                <div key={produto.sku} className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900 text-sm">{produto.nome}</p>
                    <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded">
                      {produto.dias_cobertura} dias
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Estoque: {produto.estoque_atual} un.</span>
                    <span>Venda: {produto.vendas_dia_media.toFixed(1)}/dia</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-amber-600">Repor: {produto.sugestao_reposicao} un.</span>
                    <button className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors">
                      Comprar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Nenhum produto em risco</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabela de Cobertura */}
      <div className="bg-white rounded-xl border border-gray-200 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-900">Cobertura de Estoque</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtro === 'todos' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('ruptura')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtro === 'ruptura' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ruptura
            </button>
            <button
              onClick={() => setFiltro('parado')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtro === 'parado' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Parado
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-center">Local</th>
                <th className="px-4 py-3 text-right">Estoque</th>
                <th className="px-4 py-3 text-right">Venda/Dia</th>
                <th className="px-4 py-3 text-right">Cobertura</th>
                <th className="px-4 py-3 text-right">Ultima Venda</th>
                <th className="px-4 py-3 text-right">Valor</th>
                <th className="px-4 py-3 text-center">Repor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produtosFiltrados.map((produto, index) => {
                const isRuptura = produto.dias_cobertura <= 7
                const isParado = produto.ultima_venda_dias >= 30

                return (
                  <tr
                    key={produto.sku}
                    className={`table-row-hover animate-fade-in-up ${
                      isRuptura ? 'bg-red-50/50' : isParado ? 'bg-amber-50/50' : ''
                    }`}
                    style={{ animationDelay: `${800 + index * 50}ms`, animationFillMode: 'backwards' }}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{produto.nome}</p>
                        <p className="text-xs text-gray-500">{produto.sku}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        produto.local === 'proprio' ? 'bg-gray-100 text-gray-700' :
                        produto.local === 'full_ml' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {produto.local === 'proprio' ? 'Proprio' :
                         produto.local === 'full_ml' ? 'Full ML' : 'Full Shopee'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {produto.estoque_atual}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      {produto.vendas_dia_media.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${
                        produto.dias_cobertura <= 7 ? 'text-red-600' :
                        produto.dias_cobertura <= 14 ? 'text-amber-600' :
                        'text-green-600'
                      }`}>
                        {produto.dias_cobertura} dias
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm ${produto.ultima_venda_dias >= 30 ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>
                        {produto.ultima_venda_dias === 0 ? 'Hoje' :
                         produto.ultima_venda_dias === 1 ? 'Ontem' :
                         `${produto.ultima_venda_dias} dias`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      R$ {produto.valor_estoque.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {produto.sugestao_reposicao > 0 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-amber-600 font-medium">+{produto.sugestao_reposicao}</span>
                          <button className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors">
                            <TrendingUp className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">OK</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estoque Parado */}
      {produtosParados.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-6 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">Capital Empatado em Estoque Parado</h3>
              <p className="text-sm text-amber-700 mb-3">
                Voce tem R$ {valorParado.toLocaleString('pt-BR')} investidos em {produtosParados.length} produtos sem venda ha mais de 30 dias.
              </p>
              <div className="flex flex-wrap gap-2">
                {produtosParados.map(produto => (
                  <span key={produto.sku} className="bg-white/80 border border-amber-200 text-amber-700 text-xs px-2 py-1 rounded-full">
                    {produto.nome} ({produto.ultima_venda_dias} dias)
                  </span>
                ))}
              </div>
              <button className="mt-3 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                Criar promocao para girar estoque
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
