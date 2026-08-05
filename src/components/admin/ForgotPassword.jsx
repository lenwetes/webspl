import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SLPLogo from '../SLPLogo';

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar');
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'inherit',
    }}>
      <div style={{
        background: '#ffffff', borderRadius: 24, maxWidth: 440, width: '100%',
        padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', marginBottom: 16 }}>
            <SLPLogo size="medium" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0f1e33', margin: '4px 0' }}>
            Recuperar Contraseña
          </h2>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>
            Ingresa tu correo y te enviaremos un enlace de recuperación
          </p>
        </div>

        {sent ? (
          <div style={{
            background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 16,
            padding: '24px 20px', textAlign: 'center',
          }}>
            <CheckCircle style={{ width: 40, height: 40, color: '#16a34a', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', margin: '0 0 6px' }}>
              ¡Correo enviado!
            </p>
            <p style={{ fontSize: 12.5, color: '#166534', margin: '0 0 20px' }}>
              Revisa tu bandeja de entrada (y spam). El enlace expira en 30 minutos.
            </p>
            <button
              onClick={onBack}
              style={{
                background: 'transparent', border: '1.5px solid #86efac',
                borderRadius: 10, padding: '9px 20px',
                color: '#15803d', fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
              }}
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div style={{
                background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12,
                padding: '12px 14px', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 10,
                color: '#991b1b', fontSize: 12.5, fontWeight: 600,
              }}>
                <AlertCircle style={{ width: 18, height: 18, flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 22 }}>
                <label style={{
                  display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
                }}>
                  Correo Electrónico
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{
                    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                    width: 18, height: 18, color: '#94a3b8',
                  }} />
                  <input
                    type="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    style={{
                      width: '100%', padding: '12px 14px 12px 42px',
                      borderRadius: 12, border: '1.5px solid #cbd5e1',
                      fontSize: 13, color: '#0f1e33', outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                style={{
                  width: '100%', padding: 13, borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg, #f37021, #dc5c10)',
                  color: '#ffffff', fontSize: 13, fontWeight: 800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 8px 20px rgba(243,112,33,0.3)',
                  opacity: loading ? 0.8 : 1,
                }}
              >
                {loading && <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />}
                <span>{loading ? 'Enviando...' : 'Enviar enlace de recuperación'}</span>
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button
                onClick={onBack}
                style={{
                  background: 'transparent', border: 'none',
                  color: '#64748b', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}
              >
                <ArrowLeft style={{ width: 14, height: 14 }} /> Volver al inicio de sesión
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
