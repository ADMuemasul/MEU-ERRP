'use client';

import * as React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Bell, 
  Settings, 
  ChevronRight, 
  Info, 
  CreditCard, 
  Image as ImageIcon, 
  Eye, 
  UploadCloud, 
  Plus,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function NewProductPage() {
  const [status, setStatus] = React.useState<'active' | 'draft'>('active');

  return (
    <div className="min-h-screen bg-[#F6F6F8] text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 md:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-[#135BEC]">
            <Package size={32} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Nexus ERP</h2>
        </div>

        <nav className="hidden md:flex flex-1 justify-center gap-10">
          <NavLink href="/" label="Dashboard" />
          <NavLink href="#" label="Produtos" active />
          <NavLink href="#" label="Estoque" />
          <NavLink href="/" label="Vendas" />
        </nav>

        <div className="flex items-center gap-3">
          <HeaderButton icon={<Bell size={20} />} />
          <HeaderButton icon={<Settings size={20} />} />
          <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 ml-2">
            <div className="size-8 bg-[#135BEC] rounded-full flex items-center justify-center text-white">
              <Store size={18} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-slate-400 hover:text-[#135BEC] transition-colors">Início</Link>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-400">Estoque</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="font-semibold text-slate-900">Novo Produto</span>
        </nav>

        {/* Title Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Cadastro de Produto</h1>
            <p className="text-slate-500 mt-2 text-lg">Cadastre um novo item no seu sistema de estoque global.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-white hover:shadow-sm transition-all">
              Cancelar
            </button>
            <button className="px-10 py-3 rounded-2xl bg-[#135BEC] text-white font-bold shadow-xl shadow-blue-200 hover:brightness-110 transition-all active:scale-[0.98]">
              Salvar Produto
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Information */}
            <Card icon={<Info className="text-[#135BEC]" size={20} />} title="Informações Gerais">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Nome do Produto</label>
                  <input 
                    type="text" 
                    placeholder="ex: Cadeira de Escritório Ergonômica"
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">SKU / Código</label>
                    <input 
                      type="text" 
                      placeholder="ABC-12345-XYZ"
                      className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Categoria</label>
                    <select className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all appearance-none">
                      <option>Selecionar Categoria</option>
                      <option>Móveis</option>
                      <option>Eletrônicos</option>
                      <option>Suprimentos de Escritório</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Descrição</label>
                  <textarea 
                    placeholder="Descreva as características do produto, materiais e dimensões..."
                    className="w-full min-h-[160px] p-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Financial & Inventory */}
            <Card icon={<CreditCard className="text-[#135BEC]" size={20} />} title="Financeiro e Estoque">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Custo Unitário</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full h-14 pl-12 pr-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Preço de Venda</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full h-14 pl-12 pr-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Estoque Inicial</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    className="w-full h-14 px-5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Product Media */}
            <Card icon={<ImageIcon className="text-[#135BEC]" size={20} />} title="Mídia do Produto">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-10 bg-slate-50/50 hover:border-[#135BEC] hover:bg-blue-50/30 transition-all cursor-pointer group">
                <UploadCloud size={48} className="text-slate-300 group-hover:text-[#135BEC] transition-colors mb-4" />
                <p className="text-sm font-bold text-slate-600 text-center">Clique para carregar ou arraste e solte</p>
                <p className="text-xs text-slate-400 mt-2">PNG, JPG até 5MB</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative group">
                  <Image 
                    src="https://picsum.photos/seed/product/200" 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white p-2 hover:scale-110 transition-transform">
                      <Plus size={20} className="rotate-45" />
                    </button>
                  </div>
                </div>
                <button className="aspect-square bg-white border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 hover:text-[#135BEC] hover:border-[#135BEC] transition-all">
                  <Plus size={24} />
                </button>
              </div>
            </Card>

            {/* Visibility */}
            <Card icon={<Eye className="text-[#135BEC]" size={20} />} title="Visibilidade">
              <div className="space-y-4">
                <VisibilityOption 
                  active={status === 'active'} 
                  onClick={() => setStatus('active')}
                  title="Ativo"
                  description="Disponível para venda"
                />
                <VisibilityOption 
                  active={status === 'draft'} 
                  onClick={() => setStatus('draft')}
                  title="Rascunho"
                  description="Não visível na loja"
                />
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 px-10 mt-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-medium">
          <p>© 2024 Nexus ERP. Todos os direitos reservados.</p>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-[#135BEC] transition-colors">Documentação</Link>
            <Link href="#" className="hover:text-[#135BEC] transition-colors">Suporte</Link>
            <Link href="#" className="hover:text-[#135BEC] transition-colors">Termos de Serviço</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label, active = false }: { href: string, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-bold transition-all relative py-1 ${active ? 'text-[#135BEC]' : 'text-slate-500 hover:text-[#135BEC]'}`}
    >
      {label}
      {active && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#135BEC] rounded-full"
        />
      )}
    </Link>
  );
}

function HeaderButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
      {icon}
    </button>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) {
  return (
    <section className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
        {icon}
        <h3 className="font-black text-xl tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function VisibilityOption({ active, onClick, title, description }: { active: boolean, onClick: () => void, title: string, description: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${active ? 'border-[#135BEC] bg-blue-50/50' : 'border-slate-100 hover:border-slate-200'}`}
    >
      <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-[#135BEC] bg-[#135BEC]' : 'border-slate-300'}`}>
        {active && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500 font-medium">{description}</p>
      </div>
    </button>
  );
}
