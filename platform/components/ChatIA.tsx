'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, CheckCircle2, Bot, User } from 'lucide-react'
import { iaResponses } from '@/lib/data'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatIAProps {
  context: 'financeiro' | 'estoque' | 'anuncios'
  title: string
  color: string
  quickQuestions?: { label: string; question: string }[]
  welcomeMessage?: string
}

export default function ChatIA({ context, title, color, quickQuestions = [], welcomeMessage }: ChatIAProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const colorClasses: Record<string, { bg: string; gradient: string; ring: string; light: string }> = {
    blue: { bg: 'bg-gray-700', gradient: 'from-gray-600 to-gray-700', ring: 'ring-gray-500', light: 'bg-gray-50' },
    green: { bg: 'bg-green-600', gradient: 'from-green-500 to-emerald-600', ring: 'ring-green-500', light: 'bg-green-50' },
    orange: { bg: 'bg-orange-600', gradient: 'from-orange-500 to-amber-500', ring: 'ring-orange-500', light: 'bg-orange-50' },
  }

  const colors = colorClasses[color] || colorClasses.blue

  const contextEmojis: Record<string, string> = {
    financeiro: '💰',
    estoque: '📦',
    anuncios: '🎯'
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getResponse = (message: string): string => {
    const msg = message.toLowerCase()
    const responses = iaResponses[context] || {}

    for (const [key, value] of Object.entries(responses)) {
      if (key !== 'default' && msg.includes(key)) {
        return value
      }
    }

    return responses.default || 'Entendi! Processando sua solicitacao...'
  }

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getResponse(input),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => sendMessage(), 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[600px] shadow-sm animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 bg-gradient-to-r ${colors.gradient} rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-xs text-white/80">Online - IA Ativa</p>
            </div>
          </div>
          <span className="text-2xl">{contextEmojis[context]}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white">
        {welcomeMessage && messages.length === 0 && (
          <div className="flex gap-3 mb-4 chat-bubble-ai">
            <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-xl flex-shrink-0 flex items-center justify-center shadow-md`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className={`${colors.light} rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm`}>
              <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{welcomeMessage}</p>
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                <CheckCircle2 className="w-3 h-3" />
                <span>Agora</span>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-3 mb-4 ${message.isUser ? 'flex-row-reverse chat-bubble-user' : 'chat-bubble-ai'}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {message.isUser ? (
              <div className="w-8 h-8 bg-gray-700 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-xl flex-shrink-0 flex items-center justify-center shadow-md`}>
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`rounded-2xl p-4 max-w-[85%] shadow-sm ${
              message.isUser
                ? 'bg-gray-700 text-white rounded-tr-none'
                : `${colors.light} text-gray-800 rounded-tl-none`
            }`}>
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
              <div className={`mt-2 flex items-center gap-1 text-xs ${message.isUser ? 'text-gray-300' : 'text-gray-400'}`}>
                <CheckCircle2 className="w-3 h-3" />
                <span>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 mb-4 chat-bubble-ai">
            <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-xl flex-shrink-0 flex items-center justify-center shadow-md`}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className={`${colors.light} rounded-2xl rounded-tl-none p-4 shadow-sm`}>
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '300ms' }}></span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Processando...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {quickQuestions.length > 0 && messages.length < 3 && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-500 mb-2">Sugestoes rapidas:</p>
          <div className="flex gap-2 flex-wrap">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(q.question)}
                className={`text-xs ${colors.light} hover:opacity-80 px-3 py-1.5 rounded-full text-gray-700 border border-gray-200 transition-all hover:shadow-sm`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua pergunta..."
              className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 ${colors.ring} focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`bg-gradient-to-r ${colors.gradient} text-white px-4 py-3 rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
