'use client'

import { usePathname } from 'next/navigation'
import { Sun, Moon, Bell, Settings } from 'lucide-react'
import { useState } from 'react'

const pageConfig: Record<string, { label: string; color: string; icon: string }> = {
  '/financeiro': { label: 'Dashboard Financeiro', color: 'bg-blue-100 text-blue-800', icon: '💰' },
  '/estoque': { label: 'Sistema de Estoque', color: 'bg-green-100 text-green-800', icon: '📦' },
  '/anuncios': { label: 'Criacao de Anuncios', color: 'bg-orange-100 text-orange-800', icon: '🎯' },
  '/atendimento': { label: 'Atendimento', color: 'bg-purple-100 text-purple-800', icon: '💬' },
}

export default function Header() {
  const pathname = usePathname()
  const config = pageConfig[pathname] || { label: 'Dashboard', color: 'bg-gray-100 text-gray-800', icon: '📊' }
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const notifications = [
    { id: 1, title: 'Estoque baixo', message: 'F-14 Tomcat com menos de 5 un.', time: '2min', type: 'warning' },
    { id: 2, title: 'Venda concluida', message: 'Drone DJI Mini vendido no ML', time: '15min', type: 'success' },
    { id: 3, title: 'Novo chat', message: '3 mensagens nao lidas na Shopee', time: '1h', type: 'info' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 dark:bg-gray-800 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Kraus E-commerce</h1>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${config.color}`}>
            <span>{config.icon}</span>
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Company Selector */}
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors">
            <option value="todas">Todas as Empresas</option>
            <option value="continental">Continental Imports</option>
            <option value="topo_minas">Topo Minas</option>
            <option value="kraus_digital">Kraus Digital</option>
          </select>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 animate-scale-in">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Notificacoes</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notif.type === 'warning' ? 'bg-amber-500' :
                          notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{notif.message}</p>
                        </div>
                        <span className="text-xs text-gray-400">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline py-1">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md">
              RK
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Renan Kraus</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
