import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  let menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'catalog', icon: Package, label: 'Catalog' },
    { id: 'rfqs', icon: FileText, label: 'My RFQs' },
    { id: 'suppliers', icon: Users, label: 'Suppliers' },
    { id: 'orders', icon: ShoppingCart, label: 'My Orders' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  if (useAuth().user?.role === 'Vendor') {
    menuItems = [
      { id: 'vendor_portal', icon: Package, label: 'Vendor Portal' },
      { id: 'settings', icon: Settings, label: 'Settings' }
    ];
  }

  return (
    <div className="glass-card" style={{
      height: 'calc(100vh - 40px)',
      width: '260px',
      margin: '20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed'
    }}>
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Package size={24} color="white" />
        </div>
        <h2 className="gradient-text" style={{ fontSize: '20px', margin: 0 }}>Nexura</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {activeTab === item.id && <ChevronRight size={16} />}
          </div>
        ))}
      </nav>

      <div
        className="sidebar-item"
        onClick={logout}
        style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}
      >
        <LogOut size={20} />
        <span>Logout</span>
      </div>
    </div>
  );
};
