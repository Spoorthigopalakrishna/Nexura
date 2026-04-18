import React, { useState } from 'react';
import { usePO } from '../context/POContext';
import {
  Package,
  CheckCircle,
  Truck,
  UploadCloud,
  FileText,
  Clock,
  ShieldCheck,
  Zap,
  CheckSquare
} from 'lucide-react';
import type { PurchaseOrder, POStatus } from '../types';

const statusColors: Record<string, string> = {
  Dispatched: 'var(--warning)',
  Acknowledged: 'var(--success)',
  Order_Confirmed: 'var(--accent-cyan)',
  In_Production: 'var(--accent-purple)',
  Shipped: '#f59e0b',
  Delivered: '#10b981'
};

const statusIcons: Record<string, React.ReactNode> = {
  Dispatched: <Clock size={14} />,
  Acknowledged: <CheckSquare size={14} />,
  Order_Confirmed: <CheckCircle size={14} />,
  In_Production: <Zap size={14} />,
  Shipped: <Truck size={14} />,
  Delivered: <Package size={14} />
};

export const VendorPortalPage: React.FC = () => {
  const { purchaseOrders, updatePOStatus, uploadDocument } = usePO();
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  // Vendor sees all POs dispatched to their email or all if missing prefix parsing (fallback)
  const vendorOrders = purchaseOrders.filter(
    po => ['Dispatched', 'Acknowledged', 'Order_Confirmed', 'In_Production', 'Shipped', 'Delivered'].includes(po.status)
  );

  const selected = selectedPO
    ? vendorOrders.find(p => p.id === selectedPO.id) ?? selectedPO
    : null;

  const handleStatusUpdate = (poId: string, newStatus: POStatus) => {
    updatePOStatus(poId, newStatus);
  };

  const handleUpload = (poId: string) => {
    const docName = prompt('Enter document name (e.g., Shipping Manifest, Quality Certificate):');
    if (docName) {
      uploadDocument(poId, {
        name: docName,
        url: '#',
        addedAt: new Date().toISOString()
      });
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '20px', height: '100%' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Vendor Fulfillment Portal</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage incoming orders, update fulfillment milestones on the blockchain, and securely upload compliance documents.
        </p>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'New Orders', value: vendorOrders.filter(p => ['Dispatched', 'Acknowledged'].includes(p.status)).length, color: 'var(--warning)' },
          { label: 'In Production', value: vendorOrders.filter(p => p.status === 'In_Production' || p.status === 'Order_Confirmed').length, color: 'var(--accent-purple)' },
          { label: 'In Transit', value: vendorOrders.filter(p => p.status === 'Shipped').length, color: '#f59e0b' },
          { label: 'Delivered', value: vendorOrders.filter(p => p.status === 'Delivered').length, color: '#10b981' },
        ].map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px', height: 'calc(100vh - 320px)' }}>
        {/* Orders List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>
            Active Orders ({vendorOrders.length})
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {vendorOrders.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.15 }} />
                <p>No active orders.</p>
              </div>
            ) : (
              vendorOrders.map(po => (
                <div
                  key={po.id}
                  onClick={() => setSelectedPO(po)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    background: selectedPO?.id === po.id ? 'var(--surface-lighter)' : 'transparent',
                    border: selectedPO?.id === po.id ? '1px solid var(--primary)' : '1px solid transparent',
                    marginBottom: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>{po.id}</span>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: `${statusColors[po.status] || 'gray'}20`,
                      color: statusColors[po.status] || 'gray',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {statusIcons[po.status]} {po.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Items: {po.items.length}</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>₹{po.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PO Details & Actions */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {selected ? (
            <>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {selected.id}
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: `${statusColors[selected.status] || 'white'}15`,
                      color: statusColors[selected.status] || 'white',
                      border: `1px solid ${statusColors[selected.status]}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {statusIcons[selected.status]} Current: {selected.status.replace('_', ' ')}
                    </span>
                  </h2>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Received: {new Date(selected.dispatchedAt || selected.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                  
                  {/* Left Column: Flow & Documents */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)' }}>Fulfillment Workflow</h3>
                    
                    {/* Action Buttons to update status */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                      <button 
                        className="btn-primary" 
                        onClick={() => handleStatusUpdate(selected.id, 'Order_Confirmed')}
                        disabled={selected.status !== 'Dispatched' && selected.status !== 'Acknowledged'}
                        style={{ padding: '12px', justifyContent: 'center', opacity: (selected.status === 'Dispatched' || selected.status === 'Acknowledged') ? 1 : 0.5 }}
                      >
                        <CheckCircle size={16} /> Confirm Order
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={() => handleStatusUpdate(selected.id, 'In_Production')}
                        disabled={selected.status !== 'Order_Confirmed'}
                        style={{ padding: '12px', justifyContent: 'center', background: 'var(--accent-purple)', borderColor: 'var(--accent-purple)', opacity: selected.status === 'Order_Confirmed' ? 1 : 0.5 }}
                      >
                        <Zap size={16} /> Mark In Production
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={() => handleStatusUpdate(selected.id, 'Shipped')}
                        disabled={selected.status !== 'In_Production'}
                        style={{ padding: '12px', justifyContent: 'center', background: '#f59e0b', borderColor: '#f59e0b', opacity: selected.status === 'In_Production' ? 1 : 0.5 }}
                      >
                        <Truck size={16} /> Mark as Shipped
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={() => handleStatusUpdate(selected.id, 'Delivered')}
                        disabled={selected.status !== 'Shipped'}
                        style={{ padding: '12px', justifyContent: 'center', background: '#10b981', borderColor: '#10b981', opacity: selected.status === 'Shipped' ? 1 : 0.5 }}
                      >
                        <Package size={16} /> Mark Delivered
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Attached Documents</h3>
                      <button 
                        onClick={() => handleUpload(selected.id)}
                        className="btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        <UploadCloud size={14} /> Upload File
                      </button>
                    </div>

                    <div className="glass-card" style={{ padding: '16px', minHeight: '120px' }}>
                      {(!selected.documents || selected.documents.length === 0) ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', height: '100%', padding: '20px' }}>
                          <FileText size={32} style={{ marginBottom: '8px', opacity: 0.3 }} />
                          <p style={{ fontSize: '13px' }}>No documents uploaded yet.</p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {selected.documents.map((doc, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <FileText size={16} color="var(--accent-cyan)" />
                                <span style={{ fontSize: '14px', fontWeight: 500 }}>{doc.name}</span>
                              </div>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                {new Date(doc.addedAt).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Details & Blockchain */}
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Order Contents</h3>
                    <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      {selected.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                          <span>{item.quantity}x {item.name}</span>
                          <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        <span>Total Pay</span>
                        <span>₹{selected.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Shipping & Terms</h3>
                    <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>Delivery Address</h4>
                      <p style={{ fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>
                        Nexura HQ, Receiving Bay B<br />
                        45 Enterprise Way, Tech Park<br />
                        Bengaluru, Karnataka 560100
                      </p>
                      <h4 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>Terms & Conditions</h4>
                      <pre style={{ fontSize: '11px', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', fontFamily: 'inherit', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                        {selected.termsAndConditions}
                      </pre>
                    </div>

                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}>
                        <ShieldCheck size={16} /> Live Smart Contract
                      </h3>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <p style={{ marginBottom: '8px' }}>Every status update automatically registers a milestone on the Nexura Blockchain.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Blocks Mined:</span>
                          <strong style={{ color: 'white' }}>{selected.blockchain.blockNumber.toLocaleString()}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Last Sync:</span>
                          <strong style={{ color: 'white' }}>{new Date(selected.blockchain.timestamp).toLocaleTimeString()}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)' }}>
              <Package size={64} style={{ opacity: 0.1 }} />
              <p>Select an order to view details and update fulfillment events.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
