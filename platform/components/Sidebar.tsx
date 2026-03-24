'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, Package, ShoppingCart, Megaphone, MessageSquare } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard, color: 'gray' },
  { href: '/financeiro', label: 'Financeiro', icon: BarChart3, color: 'green' },
  { href: '/estoque', label: 'Estoque', icon: Package, color: 'orange' },
  { href: '/pedidos', label: 'Pedidos', icon: ShoppingCart, color: 'yellow' },
  { href: '/anuncios', label: 'Anuncios', icon: Megaphone, color: 'orange' },
  { href: '/atendimento', label: 'Atendimento', icon: MessageSquare, color: 'gray' },
]

const colorClasses: Record<string, string> = {
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  yellow: 'bg-yellow-50 text-yellow-700',
}

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? `${colorClasses[item.color]} font-medium`
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Canais de Venda */}
      <div className="mt-8">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Canais de Venda
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">Mercado Livre</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-700">Shopee</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
