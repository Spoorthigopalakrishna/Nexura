import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff, Package } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      login(email || 'demo@nexura.com');
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top left, #1e293b, #020617)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      {/* Decorative blobs */}
      <div style={{ 
        position: 'absolute', 
        width: '500px', 
        height: '500px', 
        background: 'var(--primary-glow)', 
        filter: 'blur(120px)', 
        top: '-100px', 
        right: '-100px',
        opacity: 0.3
      }}></div>
      <div style={{ 
        position: 'absolute', 
        width: '400px', 
        height: '400px', 
        background: 'rgba(168, 85, 247, 0.3)', 
        filter: 'blur(100px)', 
        bottom: '-100px', 
        left: '-100px',
        opacity: 0.2
      }}></div>

      <div className="glass-card animate-fade-in" style={{ 
        width: '420px', 
        padding: '48px',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            <Package size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Enter your credentials to access Nexura
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <div className="glass-card" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 16px', 
              gap: '12px',
              background: 'rgba(255,255,255,0.03)'
            }}>
              <Mail size={18} color="var(--text-secondary)" />
              <input 
                type="email" 
                placeholder="name@company.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'white', 
                  outline: 'none', 
                  width: '100%',
                  fontSize: '14px'
                }} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: 500 }}>Password</label>
              <a href="#" style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <div className="glass-card" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 16px', 
              gap: '12px',
              background: 'rgba(255,255,255,0.03)'
            }}>
              <Lock size={18} color="var(--text-secondary)" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'white', 
                  outline: 'none', 
                  width: '100%',
                  fontSize: '14px'
                }} 
              />
              <div 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              padding: '14px',
              fontSize: '16px'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Contact Sales</a>
        </div>
      </div>
    </div>
  );
};
