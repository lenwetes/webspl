import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import SLPLogo from '../SLPLogo';

export default function ResetPassword({ token, onSuccess }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // Validar token al montar
  useEffect(() => {
    if (!token) { setValidating(false); return; }
    fetch(`/api/auth/reset-password/${token}`)
      .then(r => r.json())
      .then(d => { setTokenValid(!!d.ok); })
      .catch(() => setTokenValid(false))
      .finally(() => setValidating(false));
  }, [token]);

  const strength = (() => {
    if (password.length === 0) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Débil', 'Regular', 'Buena', 'Excelente'][strength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Las contraseñas no coinciden');
    if (password.length < 8) return setError('Mínimo 8 caracteres');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al restablecer');
      setDone(true);
      setTimeout(onSuccess, 3000);
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
            Nueva Contraseña
          </h2>
          <p style={{ fontSize: 12.5, color: '#64748b', margin: 0 }}>
            Elige una contraseña segura para tu cuenta
          </p>
        </div>

        {validating && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <Loader2 style={{ width: 36, height: 36, color: '#f37021', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 12 }}>Validando enlace...</p>
          </div>
        )}

        {!validating && !tokenValid && (
          <div style={{
            background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 16,
            padding: '24px 20px', textAlign: 'center',
          }}>
            <AlertCircle style={{ width: 40, height: 40, color: '#dc2626', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', margin: '0 0 6px' }}>
              Enlace inválido o expirado
            </p>
            <p style={{ fontSize: 12.5, color: '#b91c1c', margin: '0 0 20px' }}>
              Solicita un nuevo enlace de recuperación desde el inicio de sesión.
            </p>
          </div>
        )}

        {!validating && tokenValid && !done && (
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
              {/* Nueva contraseña */}
              <div style={{ marginBottom: 16 }}>
                <label style={{
                  display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
                }}>
                  Nueva Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#94a3b8' }} />
                  <input
                    type={showPass ? 'text' : 'password'} required value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    style={{
                      width: '100%', padding: '12px 42px 12px 42px',
                      borderRadius: 12, border: '1.5px solid #cbd5e1',
                      fontSize: 13, color: '#0f1e33', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)}
                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                    {showPass ? <EyeOff style={{ width: 17, height: 17 }} /> : <Eye style={{ width: 17, height: 17 }} />}
                  </button>
                </div>
                {/* Barra de fortaleza */}
                {password.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                          flex: 1, height: 4, borderRadius: 4,
                          background: i <= strength ? strengthColor : '#e2e8f0',
                          transition: 'background 0.3s',
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: strengthColor }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              {/* Confirmar contraseña */}
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155',
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
                }}>
                  Confirmar Contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <ShieldCheck style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: confirm && confirm === password ? '#22c55e' : '#94a3b8' }} />
                  <input
                    type={showPass ? 'text' : 'password'} required value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Repite la contraseña"
                    style={{
                      width: '100%', padding: '12px 14px 12px 42px',
                      borderRadius: 12,
                      border: `1.5px solid ${confirm && confirm !== password ? '#fca5a5' : '#cbd5e1'}`,
                      fontSize: 13, color: '#0f1e33', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: 13, borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #f37021, #dc5c10)',
                color: '#ffffff', fontSize: 13, fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 8px 20px rgba(243,112,33,0.3)', opacity: loading ? 0.8 : 1,
              }}>
                {loading && <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />}
                <span>{loading ? 'Guardando...' : 'Establecer Nueva Contraseña'}</span>
              </button>
            </form>
          </>
        )}

        {done && (
          <div style={{
            background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 16,
            padding: '28px 20px', textAlign: 'center',
          }}>
            <CheckCircle style={{ width: 44, height: 44, color: '#16a34a', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 15, fontWeight: 800, color: '#15803d', margin: '0 0 8px' }}>
              ¡Contraseña actualizada!
            </p>
            <p style={{ fontSize: 12.5, color: '#166534', margin: 0 }}>
              Redirigiendo al inicio de sesión...
            </p>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
