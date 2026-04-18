import { useState } from 'react';
import { Sidebar } from './components';
import { Dashboard, CatalogPage, RequisitionPage, LoginPage } from './pages';
import { Search, Bell, User, CheckCircle } from 'lucide-react';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handlePrSubmit = () => {
    setShowSuccess(true);
    setActiveTab('dashboard');
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <Sidebar activeTab={activeTab === 'requisition' ? 'catalog' : activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ 
        flex: 1, 
        marginLeft: '300px', 
        padding: '20px 40px 40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '10px 0',
          marginBottom: '20px'
        }}>
          <div className="glass-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '8px 16px',
            width: '400px',
            gap: '12px'
          }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search Nexura..." 
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {showSuccess && (
              <div className="glass-card" style={{ padding: '8px 16px', border: '1px solid var(--success)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontSize: '14px', animation: 'fadeIn 0.3s' }}>
                <CheckCircle size={18} /> Requisition Submitted Successfully!
              </div>
            )}
            <div className="glass-card" style={{ padding: '8px', position: 'relative', cursor: 'pointer' }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--error)', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></div>
            </div>
            <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} color="white" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{user?.email?.split('@')[0] || 'User'}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Account Executive</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'catalog' && <CatalogPage onProceed={() => setActiveTab('requisition')} />}
        {activeTab === 'requisition' && <RequisitionPage onBack={() => setActiveTab('catalog')} onSubmit={handlePrSubmit} />}
        
        {['rfqs', 'suppliers', 'orders', 'settings'].includes(activeTab) && (
          <div className="animate-fade-in glass-card" style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px' }}>{activeTab.toUpperCase()} Module</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px' }}>This module is currently being optimized for Nexura. Check back soon.</p>
            <button className="btn-primary" onClick={() => setActiveTab('dashboard')}>Return to Dashboard</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
