'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, Check, Loader2 } from 'lucide-react'
import ChatIA from '@/components/ChatIA'
import { produtos } from '@/lib/data'

const generatedImages = [
  'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400',
  'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=400'
]

export default function AnunciosPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [selectedProduct] = useState(produtos.find(p => p.sku === 'MIN001')!)

  const handleGenerateImages = () => {
    setIsGenerating(true)
    setImages([])

    generatedImages.forEach((url, index) => {
      setTimeout(() => {
        setImages(prev => [...prev, url])
        if (index === generatedImages.length - 1) {
          setIsGenerating(false)
        }
      }, 1000 * (index + 1))
    })
  }

  return (
    <div>
      {/* Fluxo de Criacao */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Criar Novo Anuncio</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Modo:</span>
            <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option>Automatico (IA)</option>
              <option>Manual</option>
            </select>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
            <span className="text-sm font-medium text-gray-900">Produto</span>
          </div>
          <div className={`flex-1 h-0.5 ${images.length > 0 ? 'bg-orange-600' : 'bg-gray-200'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              images.length > 0 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>2</div>
            <span className={`text-sm ${images.length > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>Gerar</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium">3</div>
            <span className="text-sm text-gray-500">Publicar</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Produto Selecionado */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Produto do Estoque</h3>
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex gap-4">
                <Image
                  src={selectedProduct.imagem}
                  alt={selectedProduct.nome}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{selectedProduct.nome}</p>
                  <p className="text-sm text-gray-500">SKU: {selectedProduct.sku}</p>
                  <div className="mt-2 flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Custo</p>
                      <p className="font-medium text-gray-900">R$ {selectedProduct.custo.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Preco Sugerido</p>
                      <p className="font-medium text-green-600">R$ {selectedProduct.preco.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Margem</p>
                      <p className="font-medium text-blue-600">{selectedProduct.margem.toFixed(0)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuracoes */}
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Preco de Venda</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    defaultValue={`R$ ${selectedProduct.preco.toFixed(2)}`}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                  <button className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200">Auto</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Marketplaces</label>
                <div className="flex gap-2 mt-2">
                  <label className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg cursor-pointer border border-yellow-200">
                    <input type="checkbox" defaultChecked className="rounded text-yellow-600" />
                    <span className="text-sm">Mercado Livre</span>
                  </label>
                  <label className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg cursor-pointer border border-orange-200">
                    <input type="checkbox" defaultChecked className="rounded text-orange-600" />
                    <span className="text-sm">Shopee</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Anuncio */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview do Anuncio</h3>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">Gerado por IA</span>
                <button className="text-xs text-blue-600 hover:text-blue-800">Editar</button>
              </div>
              <h4 className="font-semibold text-gray-900 text-lg">
                Miniatura F-14 Tomcat 1:72 - Aviacao Militar - Metal Diecast Premium
              </h4>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Miniatura de alta qualidade do iconico F-14 Tomcat, famoso caca da Marinha dos EUA.
                Fabricada em metal diecast com detalhes precisos. Escala 1:72.
                Perfeita para colecionadores e fas de aviacao militar.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">R$ 159,00</span>
                <span className="text-sm text-gray-500 line-through">R$ 199,00</span>
                <span className="text-sm text-green-600">20% OFF</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" />
                  Frete Gratis
                </span>
                <span>Estoque: 55 un.</span>
              </div>
            </div>

            <button
              onClick={handleGenerateImages}
              disabled={isGenerating}
              className="mt-4 w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ImageIcon className="w-5 h-5" />
              )}
              {isGenerating ? 'Gerando...' : 'Gerar Imagens com IA'}
            </button>
          </div>
        </div>
      </div>

      {/* Imagens Geradas */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Imagens Geradas</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Custo estimado:</span>
              <span className="font-medium text-gray-900">R$ 1,20</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {images.length === 0 && !isGenerating && (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Aguardando...</span>
                  </div>
                ))}
              </>
            )}

            {isGenerating && images.length < 4 && (
              <>
                {images.map((url, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                    <Image src={url} alt={`Imagem ${i + 1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium">Usar</button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <input type="checkbox" className="w-5 h-5 rounded" />
                    </div>
                  </div>
                ))}
                {Array.from({ length: 4 - images.length }).map((_, i) => (
                  <div key={`loading-${i}`} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ))}
              </>
            )}

            {!isGenerating && images.length > 0 && images.map((url, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                <Image src={url} alt={`Imagem ${i + 1}`} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium">Usar</button>
                </div>
                <div className="absolute top-2 right-2">
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              disabled={images.length === 0}
              className="flex-1 bg-yellow-400 text-yellow-900 py-3 rounded-lg font-medium hover:bg-yellow-500 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <div className="w-5 h-5 bg-yellow-600 rounded flex items-center justify-center text-xs font-bold text-white">ML</div>
              Publicar no Mercado Livre
            </button>
            <button
              disabled={images.length === 0}
              className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center text-xs font-bold text-orange-500">S</div>
              Publicar na Shopee
            </button>
          </div>
        </div>

        {/* Chat IA */}
        <ChatIA
          context="anuncios"
          title="Assistente de Anuncios"
          color="orange"
          welcomeMessage={`Ola! Posso te ajudar a criar anuncios automaticamente. Comandos disponiveis:

- "Cria anuncio para [produto]"
- "Gera 5 variacoes de imagem"
- "Publica no ML e Shopee"
- "Otimiza titulo para SEO"`}
          quickQuestions={[
            { label: '+4 imagens', question: 'Gera mais 4 imagens' },
            { label: 'Otimizar titulo', question: 'Otimiza o titulo' },
          ]}
        />
      </div>
    </div>
  )
}
