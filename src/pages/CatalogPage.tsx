import React, { useState } from 'react';
import { useCart, type Product } from '../context/CartContext';
import { Search, Filter, ShoppingCart, Plus, Check } from 'lucide-react';

const MOCK_PRODUCTS: Product[] = [
  { id: 'P1', name: 'Industrial Grade Bearings', price: 12500, category: 'Hardware', supplier: 'Apex Logistics', image: '/products/bearings.png' },
  { id: 'P2', name: 'Cloud Server Slot - Enterprise', price: 45000, category: 'IT Services', supplier: 'Tech Solutions Inc', image: '/products/server.png' },
  { id: 'P3', name: 'High-Tensile Steel Rods', price: 8500, category: 'Hardware', supplier: 'Global Manufacturing', image: '/products/rods.png' },
  { id: 'P4', name: 'Precision Calibrators', price: 32000, category: 'Instruments', supplier: 'Apex Logistics', image: '/products/calibrator.png' },
  { id: 'P5', name: 'Workstation Laptop Pro 16', price: 185000, category: 'IT Hardware', supplier: 'Tech Solutions Inc', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80' },
  { id: 'P6', name: 'Bulk Safety Gear Set', price: 15000, category: 'Safety', supplier: 'EcoPack Specialists', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80' },
];

export const CatalogPage: React.FC<{ onProceed: () => void }> = ({ onProceed }) => {
  const { addToCart, items } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (category === 'All' || p.category === category)
  );

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Product Discovery</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Browse pre-approved supplier catalogs and select items for requisition.</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={onProceed}
          disabled={items.length === 0}
          style={{ padding: '12px 24px', opacity: items.length === 0 ? 0.5 : 1 }}
        >
          <ShoppingCart size={20} />
          View Cart ({items.length})
        </button>
      </header>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', flex: 1, gap: '12px' }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search products or suppliers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }}
          />
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', gap: '12px' }}>
          <Filter size={18} color="var(--text-secondary)" />
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', cursor: 'pointer' }}
          >
            {categories.map(c => <option key={c} value={c} style={{ background: 'var(--bg-dark)' }}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => {
          const inCart = items.some(item => item.id === product.id);
          return (
            <div key={product.id} className="glass-card product-card" style={{ padding: '20px', transition: 'transform 0.2s ease', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                height: '180px', 
                background: 'var(--surface-lighter)', 
                borderRadius: '12px', 
                marginBottom: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ fontSize: '40px' }}>📦</div>
                )}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginBottom: '4px' }}>{product.category}</div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{product.supplier}</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-cyan)' }}>₹{product.price.toLocaleString()}</div>
              </div>
              <button 
                onClick={() => addToCart(product)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '10px', 
                  border: '1px solid var(--primary)', 
                  background: inCart ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {inCart ? <Check size={18} color="var(--success)" /> : <Plus size={18} />}
                {inCart ? 'Added to Cart' : 'Add to Requisition'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
