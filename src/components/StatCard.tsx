import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon: Icon, color }) => {
  const isPositive = trend > 0;

  return (
    <div className="glass-card" style={{ padding: '24px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ 
          padding: '10px', 
          borderRadius: '12px', 
          backgroundColor: `${color}20`,
          color: color
        }}>
          <Icon size={24} />
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          color: isPositive ? 'var(--success)' : 'var(--error)',
          fontSize: '14px',
          fontWeight: 600
        }}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>{title}</p>
        <h3 style={{ fontSize: '24px', margin: 0 }}>{value}</h3>
      </div>
    </div>
  );
};
