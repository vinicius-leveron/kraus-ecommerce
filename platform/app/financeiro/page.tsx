'use client'

import { TrendingUp, TrendingDown, DollarSign, Percent, AlertTriangle, Target, ShoppingBag, Megaphone } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'
import KPICard from '@/components/KPICard'
import { financeiroReal, produtosRentabilidade, vendasSemana } from '@/lib/ecommerce-data'

// Dados para grafico de custos
const custoBreakdown = [
  { nome: 'Custo Produto', valor: 32500, cor: '#374151' },
  { nome: 'Taxas Marketplace', valor: financeiroReal.taxasMarketplace, cor: '#F97316' },
  { nome: 'Frete Pago', valor: financeiroReal.fretePago, cor: '#EAB308' },
  { nome: 'Investimento Ads', valor: financeiroReal.adsInvestidos, cor: '#10B981' },
]

// Ordena produtos por lucro total
const topProdutosLucrativos = [...produtosRentabilidade]
  .filter(p => p.lucro_liquido > 0)
  .sort((a, b) => b.lucro_total_mes - a.lucro_total_mes)
  .slice(0, 5)

const produtosComPrejuizo = produtosRentabilidade.filter(p => p.lucro_liquido < 0)

export default function FinanceiroPage() {
  return (
    <div>
      {/* KPI Cards - Lucro Real */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Lucro Liquido (Mes)"
          value={financeiroReal.lucroLiquidoMes}
          subtitle="apos todas as taxas"
          icon={DollarSign}
          trend={{ value: '+12.3% vs mes anterior', positive: true }}
          format="currency"
          color="green"
          delay={0}
        />

        <KPICard
          title="Margem Liquida Media"
          value={financeiroReal.margemLiquidaMedia}
          subtitle="descontando tudo"
          icon={Percent}
          format="percentage"
          delay={100}
        />

        <KPICard
          title="ROI de Ads"
          value={financeiroReal.roiAds}
          subtitle="retorno por R$1 investido"
          icon={Megaphone}
          color="green"
          delay={200}
        />

        <KPICard
          title="Produtos com Prejuizo"
          value={financeiroReal.produtosComPrejuizo}
          subtitle={`-R$ ${Math.abs(financeiroReal.valorPrejuizoMes).toFixed(2)} no mes`}
          icon={AlertTriangle}
          color="red"
          delay={300}
        />
      </div>

      {/* Alerta de Produtos com Prejuizo */}
      {produtosComPrejuizo.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-red-900">Atencao: Produtos com Margem Negativa</h3>
              <p className="text-sm text-red-700 mb-3">Esses produtos estao gerando prejuizo. Revise precos ou custos de ads.</p>
              <div className="space-y-2">
                {produtosComPrejuizo.map(produto => (
                  <div key={produto.sku} className="flex items-center justify-between bg-white/60 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${produto.canal === 'ML' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                        {produto.canal}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{produto.nome}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-red-600">{produto.margem_liquida.toFixed(1)}%</span>
                      <span className="text-xs text-gray-500 ml-2">R$ {produto.lucro_liquido.toFixed(2)}/un</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Breakdown de Custos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Composicao dos Custos</h2>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={custoBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="valor"
                    nameKey="nome"
                  >
                    {custoBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {custoBreakdown.map(item => (
                <div key={item.nome} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.cor }} />
                  <div>
                    <p className="text-sm text-gray-600">{item.nome}</p>
                    <p className="font-semibold text-gray-900">R$ {item.valor.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Custos</span>
              <span className="text-lg font-bold text-gray-900">R$ {financeiroReal.custosMes.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>

        {/* Top 5 Produtos Lucrativos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Produtos Mais Lucrativos</h2>
          <div className="space-y-3">
            {topProdutosLucrativos.map((produto, index) => (
              <div key={produto.sku} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${produto.canal === 'ML' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                      {produto.canal}
                    </span>
                    <p className="font-medium text-gray-900 truncate">{produto.nome}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{produto.vendas_mes} vendas</span>
                    <span className="text-xs text-green-600">Margem: {produto.margem_liquida.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">R$ {produto.lucro_total_mes.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-gray-500">lucro total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparativo de Vendas por Canal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Faturamento Semanal por Canal</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={vendasSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#9ca3af" />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} stroke="#9ca3af" />
              <Tooltip
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="ml" name="Mercado Livre" fill="#EAB308" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shopee" name="Shopee" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resumo Rapido */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Mes</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Faturamento</span>
              </div>
              <span className="font-semibold text-gray-900">R$ {financeiroReal.faturamentoMes.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Custos Totais</span>
              </div>
              <span className="font-semibold text-red-600">-R$ {financeiroReal.custosMes.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Lucro Liquido</span>
              </div>
              <span className="font-bold text-green-600">R$ {financeiroReal.lucroLiquidoMes.toLocaleString('pt-BR')}</span>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Margem sobre faturamento</span>
                <span className="text-sm font-medium text-gray-700">{((financeiroReal.lucroLiquidoMes / financeiroReal.faturamentoMes) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(financeiroReal.lucroLiquidoMes / financeiroReal.faturamentoMes) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Rentabilidade por Produto */}
      <div className="bg-white rounded-xl border border-gray-200 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Rentabilidade por Produto</h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
            <option>Todos os canais</option>
            <option>Mercado Livre</option>
            <option>Shopee</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-right">Preco</th>
                <th className="px-4 py-3 text-right">Custo</th>
                <th className="px-4 py-3 text-right">Taxa MP</th>
                <th className="px-4 py-3 text-right">Frete</th>
                <th className="px-4 py-3 text-right">Ads</th>
                <th className="px-4 py-3 text-right">Lucro Un.</th>
                <th className="px-4 py-3 text-right">Margem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {produtosRentabilidade.map((produto, index) => (
                <tr key={produto.sku} className="table-row-hover animate-fade-in-up" style={{ animationDelay: `${1000 + index * 50}ms`, animationFillMode: 'backwards' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${produto.canal === 'ML' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                        {produto.canal}
                      </span>
                      <span className="font-medium text-gray-900">{produto.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">R$ {produto.preco_venda.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">-R$ {produto.custo_produto.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-orange-600">-R$ {produto.taxa_marketplace.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">-R$ {produto.frete_vendedor.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-500">-R$ {produto.custo_ads.toFixed(2)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${produto.lucro_liquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {produto.lucro_liquido.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      produto.margem_liquida >= 25 ? 'bg-green-100 text-green-700' :
                      produto.margem_liquida >= 10 ? 'bg-yellow-100 text-yellow-700' :
                      produto.margem_liquida >= 0 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {produto.margem_liquida.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
