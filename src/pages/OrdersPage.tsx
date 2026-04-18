import React, { useState, useEffect } from 'react';
import { usePO } from '../context/POContext';
import { useRequisitions } from '../context/RequisitionContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  CheckCircle,
  Clock,
  Send,
  Link,
  Package,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import type { PurchaseOrder } from '../types';

const statusColors: Record<string, string> = {
  Generated: 'var(--text-secondary)',
  Blockchain_Recorded: 'var(--accent-purple)',
  Dispatched: 'var(--warning)',
  Acknowledged: 'var(--success)'
};

const statusIcons: Record<string, React.ReactNode> = {
  Generated: <Clock size={14} />,
  Blockchain_Recorded: <ShieldCheck size={14} />,
  Dispatched: <Send size={14} />,
  Acknowledged: <CheckCircle size={14} />
};

const truncateHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-6)}`;

export const OrdersPage: React.FC = () => {
  const { purchaseOrders, generatePO, acknowledgePO } = usePO();
  const { onFinalApproval } = useRequisitions();
  const { user } = useAuth();
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Auto-generate PO when a requisition is finally approved
  useEffect(() => {
    onFinalApproval((approvedReq) => {
      generatePO(approvedReq);
    });
  }, []);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const selected = selectedPO
    ? purchaseOrders.find(p => p.id === selectedPO.id) ?? selectedPO
    : null;

  const canAcknowledge = user?.role === 'Admin' || user?.role === 'Manager';

  return (
    <div className="animate-fade-in" style={{ padding: '20px', height: '100%' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Purchase Orders</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Formally issued POs with immutable blockchain records and real-time vendor dispatch status.
        </p>
      </header>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total POs', value: purchaseOrders.length, color: 'var(--primary)' },
          { label: 'On Blockchain', value: purchaseOrders.filter(p => p.status !== 'Generated').length, color: 'var(--accent-purple)' },
          { label: 'Dispatched', value: purchaseOrders.filter(p => p.status === 'Dispatched' || p.status === 'Acknowledged').length, color: 'var(--warning)' },
          { label: 'Acknowledged', value: purchaseOrders.filter(p => p.status === 'Acknowledged').length, color: 'var(--success)' },
        ].map(stat => (
          <div key={stat.label} className="glass-card" style={{ padding: '20px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px', height: 'calc(100vh - 320px)' }}>
        {/* PO List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>
            Orders ({purchaseOrders.length})
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {purchaseOrders.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Package size={48} style={{ margin: '0 auto 16px', opacity: 0.15 }} />
                <p>No purchase orders yet.</p>
                <p style={{ fontSize: '12px', marginTop: '8px' }}>POs are generated automatically when a requisition receives final approval.</p>
              </div>
            ) : (
              purchaseOrders.map(po => (
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
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '15px' }}>{po.id}</span>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: `${statusColors[po.status]}20`,
                      color: statusColors[po.status],
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {statusIcons[po.status]} {po.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>{po.vendor}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Ref: {po.requisitionId}</span>
                    <span style={{ fontWeight: 600 }}>₹{po.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PO Detail */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {selected ? (
            <>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px' }}>{selected.id}</h2>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Vendor: <strong style={{ color: 'var(--text-primary)' }}>{selected.vendor}</strong>
                    &nbsp;·&nbsp; Created: {new Date(selected.createdAt).toLocaleString()}
                  </div>
                </div>
                <div style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  background: `${statusColors[selected.status]}15`,
                  color: statusColors[selected.status],
                  border: `1px solid ${statusColors[selected.status]}40`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {statusIcons[selected.status]} {selected.status.replace('_', ' ')}
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>

                  {/* Left: Items + Terms */}
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={16} color="var(--primary)" /> Order Items
                    </h3>
                    <div style={{ marginBottom: '24px' }}>
                      {selected.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', marginBottom: '8px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', background: 'var(--surface-lighter)', flexShrink: 0 }}>
                            {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Qty: {item.quantity} × ₹{item.price.toLocaleString()}</div>
                          </div>
                          <div style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 12px', borderTop: '1px solid var(--border-color)', fontWeight: 700, fontSize: '16px', marginTop: '8px' }}>
                        <span>Total Value</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>₹{selected.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Terms & Conditions</h3>
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.8, border: '1px solid var(--border-color)', whiteSpace: 'pre-line' }}>
                      {selected.termsAndConditions}
                    </div>
                  </div>

                  {/* Right: Blockchain + Dispatch */}
                  <div>
                    {/* Blockchain Panel */}
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.25)', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}>
                        <ShieldCheck size={16} /> Blockchain Record
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                          { label: 'Network', value: selected.blockchain.network },
                          { label: 'Block #', value: selected.blockchain.blockNumber.toLocaleString() },
                          {
                            label: 'Tx Hash',
                            value: truncateHash(selected.blockchain.txHash),
                            action: (
                              <button
                                onClick={() => handleCopyHash(selected.blockchain.txHash)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '2px' }}
                              >
                                {copiedHash ? <CheckCircle size={14} color="var(--success)" /> : <Copy size={14} />}
                              </button>
                            )
                          },
                          { label: 'Contract', value: truncateHash(selected.blockchain.contractAddress) },
                          { label: 'Recorded At', value: new Date(selected.blockchain.timestamp).toLocaleTimeString() },
                        ].map(row => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                            <span style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {row.value}{('action' in row) ? row.action : null}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dispatch Panel */}
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.25)', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--warning)' }}>
                        <Send size={16} /> Vendor Dispatch
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {selected.status === 'Generated' || selected.status === 'Blockchain_Recorded'
                            ? <Clock size={14} color="var(--text-secondary)" />
                            : <CheckCircle size={14} color="var(--success)" />}
                          <span>Email Dispatch to <strong>{selected.vendor}</strong></span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {selected.status === 'Acknowledged'
                            ? <CheckCircle size={14} color="var(--success)" />
                            : <Clock size={14} color="var(--text-secondary)" />}
                          <span>Vendor Portal Access</span>
                        </div>
                        {selected.dispatchedAt && (
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Dispatched: {new Date(selected.dispatchedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {canAcknowledge && selected.status === 'Dispatched' && (
                      <button
                        className="btn-primary"
                        onClick={() => acknowledgePO(selected.id)}
                        style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                      >
                        <CheckCircle size={18} /> Mark as Acknowledged
                      </button>
                    )}

                    <button
                      style={{ width: '100%', marginTop: '12px', padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
                    >
                      <ExternalLink size={14} /> View on Vendor Portal
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)' }}>
              <Link size={64} style={{ opacity: 0.1 }} />
              <p>Select a PO to view its blockchain record and dispatch status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
