'use client';

import * as React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  LogOut, 
  Search, 
  Filter, 
  Bell, 
  Settings, 
  Plus, 
  Minus, 
  Tag, 
  XCircle, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  { id: '1', name: 'Espresso Roast 500g', category: 'Café', price: 12.50, image: 'https://picsum.photos/seed/coffee/200', unit: '500g' },
  { id: '2', name: 'Pão de Fermentação Natural', category: 'Padaria', price: 4.95, image: 'https://picsum.photos/seed/bread/200', unit: 'Fresco' },
  { id: '3', name: 'Água Mineral 1.5L', category: 'Bebidas', price: 1.20, image: 'https://picsum.photos/seed/water/200', unit: '1.5L' },
  { id: '4', name: 'Ovos Orgânicos', category: 'Laticínios', price: 5.50, image: 'https://picsum.photos/seed/eggs/200', unit: 'Dúzia' },
  { id: '5', name: 'Macarrão', category: 'Mercearia', price: 2.80, image: 'https://picsum.photos/seed/pasta/200', unit: '1kg' },
  { id: '6', name: 'Suco de Maçã', category: 'Bebidas', price: 3.20, image: 'https://picsum.photos/seed/apple/200', unit: '1L' },
];

// --- Components ---

export default function POSPage() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [discountValue, setDiscountValue] = React.useState(0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const applyDiscount = () => {
    const val = prompt('Digite o valor do desconto (R$):', discountValue.toString());
    if (val !== null) {
      const num = parseFloat(val);
      if (!isNaN(num)) setDiscountValue(num);
    }
  };

  const cancelSale = () => {
    if (confirm('Deseja realmente cancelar esta venda?')) {
      setCart([]);
      setDiscountValue(0);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = Math.max(0, subtotal + tax - discountValue);

  return (
    <div className="flex h-screen bg-[#F6F6F8] text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-[#135BEC] p-2 rounded-lg text-white">
            <Store size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Nexus POS</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Menu</p>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Vendas" active />
          <Link href="/inventory/new">
            <SidebarItem icon={<Package size={20} />} label="Estoque" />
          </Link>
          <SidebarItem icon={<Users size={20} />} label="Clientes" />
          <SidebarItem icon={<BarChart3 size={20} />} label="Relatórios" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-semibold">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 text-slate-600">
              <Store size={18} />
              <span className="font-medium">Filial Principal - Estação 04</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-semibold">
              <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
              Online
            </div>
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors">
              <Settings size={20} />
            </button>
            <div className="size-10 bg-[#135BEC] rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
              JD
            </div>
          </div>
        </header>

        {/* Product Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Search and Filter Area with Blue Border as per screenshot */}
          <div className="p-4 border-2 border-[#135BEC] rounded-3xl bg-white/50 mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Pesquisar produtos por nome, categoria"
                  className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#135BEC]/20 focus:border-[#135BEC] transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="h-14 px-6 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter size={20} />
                Categoria
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden relative">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-slate-400 font-medium mb-4">{product.category} / {product.unit}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#135BEC]">R$ {product.price.toFixed(2)}</span>
                  <div className="size-8 bg-blue-50 text-[#135BEC] rounded-lg flex items-center justify-center group-hover:bg-[#135BEC] group-hover:text-white transition-colors">
                    <Plus size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <footer className="h-12 bg-white border-t border-slate-200 px-8 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>F1: Ajuda</span>
            <span>F2: Cód. Barras</span>
            <span>F8: Gaveta</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500">
            <div className="size-1.5 bg-emerald-500 rounded-full" />
            Sincronização: Completa (2s atrás)
          </div>
          <div>Usuário: Julian Doe (Admin) • V4.2.0-Estável</div>
        </footer>
      </main>

      {/* Cart / Order Summary */}
      <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold">Pedido Atual</h2>
            <button className="text-[#135BEC] hover:bg-blue-50 p-2 rounded-lg transition-colors">
              <Plus size={24} />
            </button>
          </div>
          <p className="text-sm text-slate-400 font-medium">Pedido #88421 • Cliente Balcão</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4"
              >
                <div className="size-14 bg-slate-50 rounded-xl overflow-hidden relative flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">R$ {item.price.toFixed(2)} / unid</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="size-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#135BEC] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="size-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#135BEC] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right min-w-[60px]">
                  <span className="font-bold text-slate-800">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <Store size={64} />
              <p className="font-bold mt-4">Carrinho vazio</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-100 space-y-4">
          <div className="space-y-2 text-sm font-medium">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-800">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Imposto (8%)</span>
              <span className="text-slate-800">R$ {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Desconto</span>
              <span className="text-red-500">-R$ {discountValue.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-2">
            <span className="text-lg font-bold text-slate-800">Valor Total</span>
            <span className="text-3xl font-black text-[#135BEC]">R$ {total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={applyDiscount}
              className="flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Tag size={18} />
              Desconto
            </button>
            <button 
              onClick={cancelSale}
              className="flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-sm transition-all bg-red-50 border border-red-100 text-red-600 hover:bg-red-100"
            >
              <XCircle size={18} />
              Cancelar Venda
            </button>
          </div>

          <button className="w-full h-16 bg-[#135BEC] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-200 hover:brightness-110 transition-all active:scale-[0.98]">
            <Store size={24} />
            Pagar Agora (R$ {total.toFixed(2)})
          </button>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <PaymentMethod icon={<Banknote size={16} />} label="Dinheiro" />
            <PaymentMethod icon={<QrCode size={16} />} label="PIX" />
            <PaymentMethod icon={<CreditCard size={16} />} label="Cartão" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`flex items-center gap-3 w-full p-3.5 rounded-2xl transition-all ${active ? 'bg-[#135BEC] text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}>
      {icon}
      <span className="font-bold">{label}</span>
    </button>
  );
}

function PaymentMethod({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-1.5 p-2 bg-white border border-slate-200 rounded-xl hover:border-[#135BEC] hover:text-[#135BEC] transition-all group">
      <div className="text-slate-400 group-hover:text-[#135BEC] transition-colors">
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
