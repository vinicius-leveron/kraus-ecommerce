'use client'

import { TrendingUp, TrendingDown, Package, Clock, AlertTriangle, ShoppingCart, Truck, CheckCircle, XCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import KPICard from '@/components/KPICard'
import { vendasHoje, vendasSemana, pedidosResumo, pedidos, alertas } from '@/lib/ecommerce-data'

export default function HomePage() {
  const pedidosUrgentes = pedidos.filter(p => p.status === 'atrasado' || (p.status === 'pendente' && (p.horas_restantes || 0) <= 4))

  return (
    <div>
      {/* KPIs do Dia */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Vendas Hoje"
          value={vendasHoje.total.valor}
          subtitle={`${vendasHoje.total.pedidos} pedidos`}
          icon={ShoppingCart}
          trend={{ value: `${vendasHoje.total.variacaoOntem > 0 ? '+' : ''}${vendasHoje.total.variacaoOntem}% vs ontem`, positive: vendasHoje.total.variacaoOntem > 0 }}
          format="currency"
          delay={0}
        />

        <KPICard
          title="Pendentes de Envio"
          value={pedidosResumo.pendentes}
          subtitle="aguardando envio"
          icon={Package}
          color="orange"
          delay={100}
        />

        <KPICard
          title="Atrasados"
          value={pedidosResumo.atrasados}
          subtitle="acao imediata!"
          icon={AlertTriangle}
          color="red"
          delay={200}
        />

        <KPICard
          title="Ticket Medio"
          value={vendasHoje.total.ticketMedio}
          subtitle="valor medio por pedido"
          icon={TrendingUp}
          format="currency"
          delay={300}
        />
      </div>

      {/* Alertas Urgentes */}
      {alertas.filter(a => a.tipo === 'urgente').length > 0 && (
        <div className="mb-6 space-y-3 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          {alertas.filter(a => a.tipo === 'urgente').map(alerta => (
            <div key={alerta.id} className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-900">{alerta.titulo}</p>
                  <p className="text-sm text-red-700">{alerta.descricao}</p>
                </div>
              </div>
              {alerta.acao && (
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  {alerta.acao}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Comparativo ML vs Shopee */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Card ML */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-yellow-600">ML</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Mercado Livre</h3>
              <p className="text-xs text-gray-500">Vendas de hoje</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Faturamento</span>
              <span className="font-semibold text-gray-900">R$ {vendasHoje.ml.valor.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pedidos</span>
              <span className="font-semibold text-gray-900">{vendasHoje.ml.pedidos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ticket Medio</span>
              <span className="font-semibold text-gray-900">R$ {vendasHoje.ml.ticketMedio.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className={`flex items-center gap-1 text-sm ${vendasHoje.ml.variacaoOntem >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {vendasHoje.ml.variacaoOntem >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {vendasHoje.ml.variacaoOntem >= 0 ? '+' : ''}{vendasHoje.ml.variacaoOntem}% vs ontem
              </div>
            </div>
          </div>
        </div>

        {/* Card Shopee */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-orange-600">S</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Shopee</h3>
              <p className="text-xs text-gray-500">Vendas de hoje</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Faturamento</span>
              <span className="font-semibold text-gray-900">R$ {vendasHoje.shopee.valor.toLocaleString('pt-BR')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pedidos</span>
              <span className="font-semibold text-gray-900">{vendasHoje.shopee.pedidos}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ticket Medio</span>
              <span className="font-semibold text-gray-900">R$ {vendasHoje.shopee.ticketMedio.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <div className={`flex items-center gap-1 text-sm ${vendasHoje.shopee.variacaoOntem >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {vendasHoje.shopee.variacaoOntem >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {vendasHoje.shopee.variacaoOntem >= 0 ? '+' : ''}{vendasHoje.shopee.variacaoOntem}% vs ontem
              </div>
            </div>
          </div>
        </div>

        {/* Grafico Semanal */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
          <h3 className="font-semibold text-gray-900 mb-4">Vendas da Semana</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={vendasSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#9ca3af" fontSize={12} />
              <YAxis tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} stroke="#9ca3af" fontSize={12} />
              <Tooltip
                formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="ml" name="ML" fill="#EAB308" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shopee" name="Shopee" fill="#F97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status dos Pedidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Resumo de Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
          <h3 className="font-semibold text-gray-900 mb-4">Status dos Pedidos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Package className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{pedidosResumo.pendentes}</p>
              <p className="text-xs text-orange-700">Pendentes</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{pedidosResumo.atrasados}</p>
              <p className="text-xs text-red-700">Atrasados</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{pedidosResumo.emTransito}</p>
              <p className="text-xs text-blue-700">Em Transito</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{pedidosResumo.entregues}</p>
              <p className="text-xs text-green-700">Entregues</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center col-span-2 sm:col-span-1">
              <XCircle className="w-6 h-6 text-gray-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-600">{pedidosResumo.problemas}</p>
              <p className="text-xs text-gray-700">Problemas</p>
            </div>
          </div>
        </div>

        {/* Pedidos Urgentes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '900ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Pedidos que Precisam de Atencao</h3>
            <span className="text-xs text-gray-500">{pedidosUrgentes.length} urgentes</span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pedidosUrgentes.map(pedido => (
              <div key={pedido.id} className={`p-3 rounded-lg border ${pedido.status === 'atrasado' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${pedido.canal === 'ML' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                      {pedido.canal}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{pedido.id}</span>
                  </div>
                  {pedido.status === 'atrasado' ? (
                    <span className="text-xs text-red-600 font-medium">ATRASADO</span>
                  ) : (
                    <span className="text-xs text-orange-600 font-medium">{pedido.horas_restantes}h restantes</span>
                  )}
                </div>
                <p className="text-sm text-gray-700">{pedido.produto}</p>
                <p className="text-xs text-gray-500">{pedido.cliente} - R$ {pedido.valor}</p>
              </div>
            ))}
            {pedidosUrgentes.length === 0 && (
              <p className="text-center text-gray-500 py-4">Nenhum pedido urgente</p>
            )}
          </div>
        </div>
      </div>

      {/* Alertas de Atencao */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '1000ms', animationFillMode: 'backwards' }}>
        <h3 className="font-semibold text-gray-900 mb-4">Alertas e Notificacoes</h3>
        <div className="space-y-3">
          {alertas.filter(a => a.tipo !== 'urgente').map(alerta => (
            <div
              key={alerta.id}
              className={`p-4 rounded-lg border flex items-center justify-between ${
                alerta.tipo === 'atencao'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alerta.tipo === 'atencao' ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alerta.tipo === 'atencao' ? 'text-amber-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <p className={`font-medium ${
                    alerta.tipo === 'atencao' ? 'text-amber-900' : 'text-gray-900'
                  }`}>{alerta.titulo}</p>
                  <p className={`text-sm ${
                    alerta.tipo === 'atencao' ? 'text-amber-700' : 'text-gray-600'
                  }`}>{alerta.descricao}</p>
                </div>
              </div>
              {alerta.acao && (
                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  alerta.tipo === 'atencao'
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {alerta.acao}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
