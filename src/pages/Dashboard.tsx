import React from 'react';
import { IndianRupee, FileCheck, Truck, Users } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Executive Overview</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's what's happening in your procurement pipeline today.</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
        <StatCard 
          title="Total Spend" 
          value="₹1.2Cr" 
          trend={12} 
          icon={IndianRupee} 
          color="#3b82f6" 
        />
        <StatCard 
          title="Active RFQs" 
          value="48" 
          trend={-5} 
          icon={FileCheck} 
          color="#a855f7" 
        />
        <StatCard 
          title="Open Orders" 
          value="156" 
          trend={8} 
          icon={Truck} 
          color="#10b981" 
        />
        <StatCard 
          title="Vendors" 
          value="342" 
          trend={2} 
          icon={Users} 
          color="#22d3ee" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px' }}>Recent RFQs</h3>
            <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '14px' }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <th style={{ padding: '12px' }}>RFQ ID</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Quotes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'RFQ-001', desc: 'Precision Bearings for Industrial Robots', status: 'Active', count: 12 },
                { id: 'RFQ-002', desc: 'Raw Material - Carbon Steel Grade A', status: 'Pending', count: 5 },
                { id: 'RFQ-003', desc: 'Cloud Infrastructure Services FY27', status: 'Evaluating', count: 8 },
              ].map((rfq, i) => (
                <tr key={i} style={{ background: 'var(--surface-dark)', borderRadius: '8px' }}>
                  <td style={{ padding: '12px', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>{rfq.id}</td>
                  <td style={{ padding: '12px' }}>{rfq.desc}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      fontSize: '12px',
                      background: rfq.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: rfq.status === 'Active' ? 'var(--success)' : 'var(--warning)'
                    }}>{rfq.status}</span>
                  </td>
                  <td style={{ padding: '12px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>{rfq.count} RECEIVED</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Top Suppliers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Apex Logistics', score: 98, level: 'Premium' },
              { name: 'Tech Solutions Inc', score: 95, level: 'Reliable' },
              { name: 'Global Manufacturing', score: 92, level: 'Premium' },
              { name: 'EcoPack Specialists', score: 89, level: 'Active' },
            ].map((supplier, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--surface-lighter)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '12px'
                }}>{supplier.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{supplier.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Score: {supplier.score}/100</div>
                </div>
                <div style={{ fontSize: '12px', color: supplier.level === 'Premium' ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                  {supplier.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
