'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle, XCircle, Clock, AlertTriangle, Filter, Search, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import KPICard from '@/components/KPICard'
import { pedidos, pedidosResumo, slaPedidos } from '@/lib/ecommerce-data'

const statusConfig = {
  pendente: { label: 'Pendente', cor: 'bg-orange-100 text-orange-700 border-orange-200', icon: Package },
  atrasado: { label: 'Atrasado', cor: 'bg-red-100 text-red-700 border-red-200', icon: Clock },
  em_transito: { label: 'Em Transito', cor: 'bg-blue-100 text-blue-700 border-blue-200', icon: Truck },
  entregue: { label: 'Entregue', cor: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  problema: { label: 'Problema', cor: 'bg-gray-100 text-gray-700 border-gray-200', icon: XCircle }
}

const dadosStatus = [
  { nome: 'Pendentes', valor: pedidosResumo.pendentes, cor: '#F97316' },
  { nome: 'Atrasados', valor: pedidosResumo.atrasados, cor: '#EF4444' },
  { nome: 'Em Transito', valor: pedidosResumo.emTransito, cor: '#3B82F6' },
  { nome: 'Entregues', valor: pedidosResumo.entregues, cor: '#10B981' },
  { nome: 'Problemas', valor: pedidosResumo.problemas, cor: '#6B7280' },
]

export default function PedidosPage() {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [filtroCanal, setFiltroCanal] = useState<string>('todos')
  const [busca, setBusca] = useState('')

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchStatus = filtroStatus === 'todos' || pedido.status === filtroStatus
    const matchCanal = filtroCanal === 'todos' || pedido.canal === filtroCanal
    const matchBusca = busca === '' ||
      pedido.id.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      pedido.produto.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchCanal && matchBusca
  })

  return (
    <div>
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="Pendentes"
          value={pedidosResumo.pendentes}
          subtitle="aguardando envio"
          icon={Package}
          color="orange"
          delay={0}
        />

        <KPICard
          title="Atrasados"
          value={pedidosResumo.atrasados}
          subtitle="acao urgente!"
          icon={AlertTriangle}
          color="red"
          delay={100}
        />

        <KPICard
          title="Em Transito"
          value={pedidosResumo.emTransito}
          subtitle="a caminho"
          icon={Truck}
          delay={200}
        />

        <KPICard
          title="Entregues (Mes)"
          value={pedidosResumo.entregues}
          subtitle="concluidos com sucesso"
          icon={CheckCircle}
          color="green"
          delay={300}
        />

        <KPICard
          title="Problemas"
          value={pedidosResumo.problemas}
          subtitle="devolucoes/extravios"
          icon={XCircle}
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Grafico de Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuicao por Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dadosStatus.filter(d => d.valor > 0)}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="valor"
                nameKey="nome"
              >
                {dadosStatus.filter(d => d.valor > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {dadosStatus.filter(d => d.valor > 0).map(status => (
              <div key={status.nome} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.cor }} />
                <span className="text-sm text-gray-600">{status.nome}: {status.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metricas de SLA */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metricas de SLA</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Envio no Prazo</span>
              </div>
              <span className="font-bold text-green-600">{slaPedidos.envioNoPrazo}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">Taxa de Atraso</span>
              </div>
              <span className="font-bold text-red-600">{slaPedidos.atrasos}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Devolucoes</span>
              </div>
              <span className="font-bold text-gray-600">{slaPedidos.devolucoes}%</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-100 text-yellow-700">ML</span>
                  <span className="font-semibold text-gray-900">{slaPedidos.notaML}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-orange-100 text-orange-700">Shopee</span>
                  <span className="font-semibold text-gray-900">{slaPedidos.notaShopee}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">Nota reputacao</span>
            </div>
          </div>
        </div>

        {/* Motivos de Cancelamento */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in-up" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Motivos de Cancelamento</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={slaPedidos.motivosCancelamento} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis type="category" dataKey="motivo" stroke="#9ca3af" width={120} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Bar dataKey="quantidade" fill="#6B7280" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Total: {slaPedidos.motivosCancelamento.reduce((acc, m) => acc + m.quantidade, 0)} cancelamentos este mes
          </p>
        </div>
      </div>

      {/* Filtros e Lista de Pedidos */}
      <div className="bg-white rounded-xl border border-gray-200 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Pedidos</h2>
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Busca */}
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar pedido, cliente..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              {/* Filtro Status */}
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
              >
                <option value="todos">Todos os Status</option>
                <option value="pendente">Pendentes</option>
                <option value="atrasado">Atrasados</option>
                <option value="em_transito">Em Transito</option>
                <option value="entregue">Entregues</option>
                <option value="problema">Problemas</option>
              </select>
              {/* Filtro Canal */}
              <select
                value={filtroCanal}
                onChange={(e) => setFiltroCanal(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
              >
                <option value="todos">Todos os Canais</option>
                <option value="ML">Mercado Livre</option>
                <option value="Shopee">Shopee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Pedido</th>
                <th className="px-4 py-3 text-left">Cliente</th>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-center">Canal</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Valor</th>
                <th className="px-4 py-3 text-center">Prazo</th>
                <th className="px-4 py-3 text-center">Acoes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pedidosFiltrados.map((pedido, index) => {
                const config = statusConfig[pedido.status]
                const StatusIcon = config.icon

                return (
                  <tr
                    key={pedido.id}
                    className={`table-row-hover animate-fade-in-up ${
                      pedido.status === 'atrasado' ? 'bg-red-50/50' :
                      pedido.status === 'problema' ? 'bg-gray-50/50' : ''
                    }`}
                    style={{ animationDelay: `${900 + index * 50}ms`, animationFillMode: 'backwards' }}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{pedido.id}</p>
                      <p className="text-xs text-gray-500">{pedido.data}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{pedido.cliente}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-900">{pedido.produto}</p>
                      <p className="text-xs text-gray-500">{pedido.sku}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        pedido.canal === 'ML' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {pedido.canal}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border ${config.cor}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      R$ {pedido.valor.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {pedido.status === 'atrasado' ? (
                        <span className="text-xs font-medium text-red-600">
                          {Math.abs(pedido.horas_restantes || 0)}h atrasado
                        </span>
                      ) : pedido.status === 'pendente' ? (
                        <span className={`text-xs font-medium ${
                          (pedido.horas_restantes || 0) <= 4 ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {pedido.horas_restantes}h restantes
                        </span>
                      ) : pedido.status === 'em_transito' ? (
                        <span className="text-xs text-blue-600">{pedido.tracking}</span>
                      ) : pedido.problema_tipo ? (
                        <span className="text-xs text-gray-600 capitalize">{pedido.problema_tipo}</span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {(pedido.status === 'pendente' || pedido.status === 'atrasado') && (
                        <button className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-green-600 transition-colors">
                          Enviar
                        </button>
                      )}
                      {pedido.status === 'em_transito' && (
                        <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-600 transition-colors">
                          Rastrear
                        </button>
                      )}
                      {pedido.status === 'problema' && (
                        <button className="bg-gray-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-600 transition-colors">
                          Resolver
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {pedidosFiltrados.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum pedido encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
