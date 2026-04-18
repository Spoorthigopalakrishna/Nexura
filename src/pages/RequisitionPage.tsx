import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Archive, ArrowLeft, Send, Trash2, AlertCircle, Paperclip } from 'lucide-react';

export const RequisitionPage: React.FC<{ onBack: () => void; onSubmit: () => void }> = ({ onBack, onSubmit }) => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const [justification, setJustification] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate approval workflow submission
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      onSubmit();
    }, 2000);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <Archive size={64} color="var(--text-secondary)" />
        <h2 style={{ fontSize: '24px' }}>Your requisition cart is empty</h2>
        <button className="btn-primary" onClick={onBack}>Browse Catalog</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <button 
        onClick={onBack}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px' }}
      >
        <ArrowLeft size={18} /> Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Review Requisition</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {items.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--surface-lighter)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '20px' }}>📦</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '2px' }}>{item.name}</h4>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Supplier: {item.supplier}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="number" 
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    style={{ width: '60px', padding: '8px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', textAlign: 'center' }}
                  />
                  <div style={{ width: '100px', textAlign: 'right', fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '8px' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} color="var(--primary)" /> Requisition Details
            </h3>
            <form onSubmit={handleFinalSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Business Justification</label>
                <textarea 
                  required
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Explain why these items are necessary for business operations..."
                  style={{ 
                    width: '100%', 
                    height: '120px', 
                    background: 'var(--bg-dark)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px', 
                    padding: '12px', 
                    color: 'white', 
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Priority Level</label>
                  <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ width: '100%', padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'white', outline: 'none' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>Supporting Documents</label>
                  <div style={{ 
                    border: '2px dashed var(--border-color)', 
                    borderRadius: '8px', 
                    padding: '10px', 
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}>
                    <Paperclip size={16} /> Attach Files (PDF, Images)
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="glass-card" style={{ padding: '24px', position: 'sticky', top: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Requisition Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Requestor</span>
                <span>{user?.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Department</span>
                <span>Operations</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: 600 }}>Total Estimate</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-cyan)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit"
              className="btn-primary" 
              onClick={handleFinalSubmit}
              disabled={isSubmitting || !justification}
              style={{ width: '100%', padding: '16px', justifyContent: 'center', fontSize: '16px', opacity: !justification ? 0.6 : 1 }}
            >
              {isSubmitting ? 'Submitting PR...' : (
                <>
                  <Send size={20} /> Submit Requisition
                </>
              )}
            </button>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '16px' }}>
              By submitting, you are initiating the formal approval workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
