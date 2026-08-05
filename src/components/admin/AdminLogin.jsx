import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../services/api';
import SLPLogo from '../SLPLogo';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [email, setEmail] = useState('postgres@slp.com');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      localStorage.setItem('slp_admin_token', data.token);
      localStorage.setItem('slp_admin_user', JSON.stringify(data.admin));
      onLoginSuccess(data.token, data.admin);
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: 'inherit'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: 24, maxWidth: 440, width: '100%',
        padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)', position: 'relative'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            <SLPLogo size="medium" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0f1e33', margin: '4px 0' }}>
            Acceso Panel CMS
          </h2>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>
            Gestión y publicación de contenidos para el Blog SLP
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 14px',
            marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, color: '#991b1b', fontSize: 12.5, fontWeight: 600
          }}>
            <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Correo Electrónico
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#94a3b8' }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@slp.com"
                style={{
                  width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, border: '1.5px solid #cbd5e1',
                  fontSize: 13, color: '#0f1e33', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#94a3b8' }} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12, border: '1.5px solid #cbd5e1',
                  fontSize: 13, color: '#0f1e33', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #f37021, #dc5c10)', color: '#ffffff',
              fontSize: 13, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: '0 8px 20px rgba(243, 112, 33, 0.3)'
            }}
          >
            <span>{loading ? 'Verificando...' : 'Ingresar al CMS'}</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button
            onClick={onCancel}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >
            ← Volver al sitio web
          </button>
        </div>
      </div>
    </div>
  );
}
