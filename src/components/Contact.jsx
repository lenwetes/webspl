import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle2, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact({ onOpenQuote, compact = false, onViewFull }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    servicio: 'Desarrollo de Software',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contacto" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)', padding: '96px 0 80px', position: 'relative', overflow: 'hidden', borderTop: '1px solid #e2e8f0' }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(243,112,33,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,201,151,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #f37021, #20c997, #0f1e33)' }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f37021', padding: '4px 14px', borderRadius: 20, background: 'rgba(243,112,33,0.08)', border: '1px solid rgba(243,112,33,0.2)', marginBottom: 12 }}>
            <MessageCircle style={{ width: 11, height: 11 }} />
            Atención Directa & Cotizaciones
          </span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: '#0f1e33', margin: '8px 0 12px', lineHeight: 1.15 }}>
            Hablemos de su Próximo Proyecto TI
          </h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>
            Asesoría directa y presupuestos claros en menos de 24 horas.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 32, alignItems: 'start' }} className="contact-grid-home">
          <style>{`
            @media (max-width: 900px) { .contact-grid-home { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Left Column: Direct Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#ffffff', padding: 32, borderRadius: 20, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 24px rgba(15,30,51,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg, #f37021, #e85d04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: '#fff', boxShadow: '0 4px 14px rgba(243,112,33,0.3)' }}>SL</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: '#0f1e33', margin: 0, textTransform: 'uppercase' }}>Sergio Luis Pérez C.</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#20c997', display: 'block' }}>Ingeniero de Sistemas</span>
                  <span style={{ fontSize: 10, color: '#94a3b8' }}>Director SLP Soluciones</span>
                </div>
              </div>

              <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                Le atendemos de manera personalizada para resolver sus inquietudes sobre software a medida, redes empresarial, cámaras IP o soporte.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="tel:3214451817" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: '#f8fafc', border: '1.5px solid #e2e8f0', textDecoration: 'none', color: '#0f1e33', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f37021'; e.currentTarget.style.background = 'rgba(243,112,33,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(243,112,33,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone style={{ width: 16, height: 16, color: '#f37021' }} />
                  </div>
                  <div>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Llámanos a PBX</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: '#0f1e33' }}>321 445 1817</span>
                  </div>
                </a>

                <a href="mailto:slps.soluciones.informaticas@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, background: '#f8fafc', border: '1.5px solid #e2e8f0', textDecoration: 'none', color: '#0f1e33', transition: 'all 0.2s ease', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#20c997'; e.currentTarget.style.background = 'rgba(32,201,151,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#f8fafc'; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(32,201,151,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail style={{ width: 16, height: 16, color: '#20c997' }} />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>Correo Electrónico</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#0f1e33', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>slps.soluciones.informaticas@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div style={{ padding: 20, borderRadius: 16, background: '#ffffff', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#475569', fontWeight: 600 }}>
                <Clock style={{ width: 15, height: 15, color: '#20c997' }} />
                <span>Respuesta comercial garantizada en el mismo día.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#475569', fontWeight: 600 }}>
                <ShieldCheck style={{ width: 15, height: 15, color: '#f37021' }} />
                <span>Atención directamente gestionada por Ingeniero titular.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div style={{ background: '#ffffff', padding: 36, borderRadius: 20, boxShadow: '0 8px 40px rgba(15,30,51,0.08)', border: '1.5px solid #e2e8f0' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <CheckCircle2 style={{ width: 48, height: 48, color: '#20c997', margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#0f1e33', marginBottom: 8, textTransform: 'uppercase' }}>¡Mensaje Recibido!</h3>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>El Ing. Sergio Pérez revisará su consulta y se comunicará con usted vía WhatsApp o correo.</p>
                <button onClick={() => setSubmitted(false)} style={{ padding: '12px 24px', borderRadius: 12, background: '#0f1e33', color: '#fff', fontSize: 12, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', marginBottom: 4, textTransform: 'uppercase' }}>
                  Formulario de <span style={{ color: '#f37021' }}>Contacto Directo</span>
                </h3>
                <p style={{ fontSize: 12, color: '#94a3b8', marginBottom: 24 }}>Complete sus datos para ponernos en contacto inmediato.</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="contact-form-grid">
                  <style>{`@media (max-width: 600px) { .contact-form-grid { grid-template-columns: 1fr !important; } }`}</style>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Nombre Completo *</label>
                    <input type="text" required placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Empresa / Negocio</label>
                    <input type="text" placeholder="Ej. Comercializadora SLP" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="contact-form-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Teléfono / Celular *</label>
                    <input type="tel" required placeholder="Ej. 300 123 4567" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Correo Electrónico *</label>
                    <input type="email" required placeholder="correo@empresa.com" value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Servicio Requerido</label>
                  <select value={formData.servicio} onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 700, color: '#0f1e33', outline: 'none', boxSizing: 'border-box' }}>
                    <option>Desarrollo de Software</option>
                    <option>Software con Inteligencia Artificial</option>
                    <option>Soporte Técnico Especializado</option>
                    <option>Videovigilancia (CCTV)</option>
                    <option>Redes LAN y WLAN</option>
                    <option>Consultoría Tecnológica</option>
                    <option>Venta de Equipos & Periféricos</option>
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Detalles del Requerimiento *</label>
                  <textarea required rows={3} placeholder="Escriba aquí los detalles..." value={formData.mensaje} onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 12, background: '#f8fafc', border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 600, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ width: '100%', padding: '14px 24px', borderRadius: 14, background: 'linear-gradient(135deg, #f37021 0%, #e85d04 100%)', color: '#fff', fontSize: 12, fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: '0 6px 20px rgba(243,112,33,0.35)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(243,112,33,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(243,112,33,0.35)'; }}
                >
                  <Send style={{ width: 15, height: 15 }} />
                  <span>Enviar Formulario</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CTA para ver página completa */}
        {compact && onViewFull && (
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button onClick={onViewFull}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px', borderRadius: 14, background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)', color: '#fff', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(15,30,51,0.18)', letterSpacing: '0.04em', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span>Ir a Formulario de Contacto Completo</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
