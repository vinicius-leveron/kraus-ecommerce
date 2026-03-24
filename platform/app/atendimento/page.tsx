'use client'

import { useState } from 'react'
import { MessageSquare, Bot, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { atendimento } from '@/lib/data'

export default function AtendimentoPage() {
  const [selectedConversation, setSelectedConversation] = useState(atendimento.conversas[0])
  const { metricas, conversas } = atendimento

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolvido': return 'bg-green-100 text-green-700'
      case 'escalado': return 'bg-red-100 text-red-700'
      case 'aguardando': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCanalColor = (canal: string) => {
    return canal === 'Shopee' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div>
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Mensagens Hoje</span>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{metricas.mensagens_hoje}</p>
          <p className="text-xs text-green-500 mt-1">+23% vs ontem</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Resolvidas pelo Bot</span>
            <Bot className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{metricas.resolvidas_bot}</p>
          <p className="text-xs text-gray-500 mt-1">78% automatico</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Aguardando Humano</span>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-orange-600 mt-1">{metricas.aguardando_humano}</p>
          <p className="text-xs text-gray-500 mt-1">8.5% do total</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Tempo Economizado</span>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-1">{metricas.tempo_economizado}h</p>
          <p className="text-xs text-gray-500 mt-1">hoje</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Inbox */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                  Todos ({conversas.length})
                </button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                  Shopee ({conversas.filter(c => c.canal === 'Shopee').length})
                </button>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                  ML ({conversas.filter(c => c.canal === 'ML').length})
                </button>
              </div>
            </div>
            <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option>Aguardando resposta</option>
              <option>Todos</option>
              <option>Resolvidos</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {conversas.map((conversa) => (
              <div
                key={conversa.id}
                onClick={() => setSelectedConversation(conversa)}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${
                  conversa.status === 'escalado' ? 'border-l-4 border-orange-500' :
                  conversa.status === 'aguardando' ? 'border-l-4 border-yellow-500' :
                  'bg-green-50/50'
                } ${selectedConversation.id === conversa.id ? 'bg-purple-50' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    conversa.status === 'resolvido' ? 'bg-green-100' :
                    conversa.status === 'escalado' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <span className={`font-medium ${
                      conversa.status === 'resolvido' ? 'text-green-600' :
                      conversa.status === 'escalado' ? 'text-orange-600' : 'text-yellow-600'
                    }`}>{conversa.iniciais}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{conversa.cliente}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${getCanalColor(conversa.canal)}`}>
                          {conversa.canal}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${getStatusColor(conversa.status)}`}>
                          {conversa.status === 'resolvido' && <CheckCircle className="w-3 h-3" />}
                          {conversa.status === 'resolvido' ? 'Bot resolveu' :
                           conversa.status === 'escalado' ? 'Escalado' : 'Aguardando'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{conversa.tempo}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{conversa.mensagem}</p>
                    {conversa.resposta_bot && (
                      <p className="text-xs text-green-600 mt-1">Bot: &quot;{conversa.resposta_bot}&quot;</p>
                    )}
                    {conversa.produto && (
                      <p className="text-xs text-gray-400 mt-1">Produto: {conversa.produto} - Pedido {conversa.pedido}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhes da Conversa */}
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedConversation.status === 'resolvido' ? 'bg-green-100' :
                  selectedConversation.status === 'escalado' ? 'bg-orange-100' : 'bg-yellow-100'
                }`}>
                  <span className={`font-medium ${
                    selectedConversation.status === 'resolvido' ? 'text-green-600' :
                    selectedConversation.status === 'escalado' ? 'text-orange-600' : 'text-yellow-600'
                  }`}>{selectedConversation.iniciais}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedConversation.cliente}</p>
                  <p className="text-xs text-gray-500">{selectedConversation.canal} - Pedido {selectedConversation.pedido || '#--'}</p>
                </div>
              </div>
              {selectedConversation.status === 'escalado' && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-lg">Precisa atencao</span>
              )}
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* Mensagem cliente */}
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-orange-600 text-xs font-medium">{selectedConversation.iniciais}</span>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                <p className="text-sm text-gray-800">{selectedConversation.mensagem}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedConversation.tempo}</p>
              </div>
            </div>

            {/* Resposta bot */}
            {selectedConversation.resposta_bot && (
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-purple-100 rounded-lg p-3 max-w-[85%]">
                  <p className="text-sm text-gray-800">{selectedConversation.resposta_bot}</p>
                  <p className="text-xs text-purple-500 mt-1">Bot - resposta automatica</p>
                </div>
              </div>
            )}

            {selectedConversation.status === 'escalado' && (
              <>
                <div className="flex gap-2 flex-row-reverse">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-yellow-100 rounded-lg p-3 max-w-[85%]">
                    <p className="text-sm text-gray-800">Entendi! Vou encaminhar para nosso time. Um momento.</p>
                    <p className="text-xs text-yellow-600 mt-1">Bot - Escalando para humano</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-red-700">Conversa escalada para atendimento humano</p>
                  <p className="text-xs text-red-500">Motivo: Cliente solicitou falar com vendedor</p>
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Digite sua resposta..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 text-sm bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200">
                Marcar Resolvido
              </button>
              <button className="flex-1 text-sm bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                Resposta Rapida
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configuracoes do Bot */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Configuracoes do Bot</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ml-2 text-sm font-medium text-green-600">Ativo</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Respostas Automaticas</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Consulta de estoque
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Prazo de entrega
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Informacoes do produto
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Formas de pagamento
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Escalar para Humano</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                Solicitacao de troca/devolucao
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                Reclamacao/problema
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                Negociacao de preco
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                Cliente pede humano
              </li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Integracao</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-xs font-bold text-white">S</div>
                  <span className="text-sm">Shopee</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center text-xs font-bold text-yellow-900">ML</div>
                  <span className="text-sm">Mercado Livre</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Conectado</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-xs font-bold text-white">E</div>
                  <span className="text-sm">Estoque</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Sincronizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
