import React, { useState } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import { Phone, Mail, Send, CheckCircle2, Clock, ShieldCheck, MessageCircle, MapPin, Headphones, Zap, ArrowRight, Briefcase, Cpu, Network, Code2, MonitorSmartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

const SERVICES_QUICK = [
  { icon: Code2, label: 'Software a Medida', color: '#8b5cf6', desc: 'Aplicaciones web y móviles diseñadas fielmente para su negocio.' },
  { icon: Cpu, label: 'Inteligencia Artificial', color: '#f37021', desc: 'Chatbots, asistentes IA y automatización comercial con RAG.' },
  { icon: Network, label: 'Redes & Cableado', color: '#3b82f6', desc: 'Cableado Cat6A, Wi-Fi 6, switches PoE+ y VLANs.' },
  { icon: MonitorSmartphone, label: 'CCTV & Vigilancia', color: '#20c997', desc: 'Videovigilancia IP 4K con analítica IA y monitoreo móvil.' },
  { icon: Headphones, label: 'Soporte Técnico', color: '#e11d48', desc: 'Mesa de ayuda, mantenimiento preventivo y correctivo.' },
  { icon: Briefcase, label: 'Consultoría TI', color: '#0ea5e9', desc: 'Auditorías, diseño de arquitectura y planes de continuidad.' },
];

export default function ContactPage({ onBack, onOpenQuote, onOpenAbout, onOpenServices, onOpenBlog, onOpenPortfolio, onOpenProcess, onOpenWhyChooseUs, onOpenFAQ, onOpenContact }) {
  const [formData, setFormData] = useState({
    nombre: '', empresa: '', telefono: '', correo: '', servicio: 'Desarrollo de Software', mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 14, background: '#f8fafc',
    border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 600, outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s ease',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Contacto"
        breadcrumb="CONTACTO"
        badgeText="Atención Directa & Cotizaciones"
        bgImage="/banner-contact.png"
        subtitle="Asesoría directa y presupuestos claros en menos de 24 horas. Hablemos de su próximo proyecto TI."
        onGoHome={onBack}
        onOpenQuote={() => onOpenQuote()}
        onOpenAbout={onOpenAbout}
        onOpenServices={onOpenServices}
        onOpenBlog={onOpenBlog}
        onOpenPortfolio={onOpenPortfolio}
        onOpenProcess={onOpenProcess}
        onOpenWhyChooseUs={onOpenWhyChooseUs}
        onOpenFAQ={onOpenFAQ}
        onOpenContact={onOpenContact}
      />

      <main style={{ flex: 1 }}>
        <style>{`
          @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
          .cp-fade { animation: fadeInUp 0.5s ease both; }
          .cp-input:focus { border-color: #f37021 !important; box-shadow: 0 0 0 3px rgba(243,112,33,0.1); }
          @media (max-width: 900px) { .cp-main-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 700px) { .cp-services-grid { grid-template-columns: 1fr !important; } .cp-form-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {/* ══ Section 1: Services Quick Pick ══ */}
        <section style={{ background: '#ffffff', padding: '72px 0 64px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 44px' }} className="cp-fade">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f37021', padding: '4px 14px', borderRadius: 20, background: 'rgba(243,112,33,0.08)', border: '1px solid rgba(243,112,33,0.2)', marginBottom: 12 }}>
                <Zap style={{ width: 11, height: 11 }} /> Seleccione su Área de Interés
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 900, color: '#0f1e33', margin: '8px 0 12px', lineHeight: 1.15 }}>
                ¿En Qué Podemos Ayudarle?
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>
                Explore nuestras áreas de especialización y contáctenos para una cotización personalizada.
              </p>
            </div>

            <div className="cp-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {SERVICES_QUICK.map((svc, i) => {
                const Icon = svc.icon;
                const isHovered = hoveredService === i;
                return (
                  <div key={i}
                    onMouseEnter={() => setHoveredService(i)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setFormData(prev => ({ ...prev, servicio: svc.label }))}
                    className="cp-fade"
                    style={{
                      animationDelay: `${i * 0.08}s`,
                      background: isHovered ? `linear-gradient(135deg, ${svc.color}08, ${svc.color}15)` : '#ffffff',
                      border: `1.5px solid ${isHovered ? svc.color + '40' : '#e2e8f0'}`,
                      borderRadius: 20, padding: '28px 24px', cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
                      transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                      boxShadow: isHovered ? `0 16px 40px ${svc.color}20` : '0 2px 12px rgba(15,30,51,0.04)',
                    }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${svc.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon style={{ width: 22, height: 22, color: svc.color }} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f1e33', margin: '0 0 6px' }}>{svc.label}</h3>
                    <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{svc.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12, fontSize: 11, fontWeight: 700, color: svc.color }}>
                      <span>Seleccionar</span>
                      <ArrowRight style={{ width: 12, height: 12 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ Section 2: Contact Form + Info Panel ══ */}
        <section style={{ background: 'linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%)', padding: '80px 0', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #f37021, #20c997, #3b82f6, #8b5cf6)' }} />

          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
            <div className="cp-main-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 36, alignItems: 'start' }}>

              {/* Left: Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="cp-fade">
                {/* Engineer Card */}
                <div style={{ background: '#ffffff', borderRadius: 24, padding: 32, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 24px rgba(15,30,51,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #f37021, #20c997)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f37021, #e85d04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#fff', boxShadow: '0 6px 20px rgba(243,112,33,0.3)' }}>SL</div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 900, color: '#0f1e33', margin: 0 }}>Sergio Luis Pérez C.</h3>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#20c997', display: 'block' }}>Ingeniero de Sistemas</span>
                      <span style={{ fontSize: 10, color: '#94a3b8' }}>Director SLP Soluciones Informáticas</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.75, margin: '0 0 24px' }}>
                    Con más de 15 años de experiencia en ingeniería de sistemas, le atendemos personalmente para diseñar la solución tecnológica exacta que necesita su empresa.
                  </p>

                  {/* Contact Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <a href="tel:3214451817" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(243,112,33,0.06), rgba(243,112,33,0.12))', border: '1.5px solid rgba(243,112,33,0.2)', textDecoration: 'none', color: '#0f1e33', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: '#f37021', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(243,112,33,0.3)' }}>
                        <Phone style={{ width: 18, height: 18, color: '#fff' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>PBX Directo</span>
                        <span style={{ fontSize: 16, fontWeight: 900, color: '#0f1e33' }}>321 445 1817</span>
                      </div>
                    </a>

                    <a href="mailto:slps.soluciones.informaticas@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(32,201,151,0.06), rgba(32,201,151,0.12))', border: '1.5px solid rgba(32,201,151,0.2)', textDecoration: 'none', color: '#0f1e33', transition: 'all 0.25s ease', overflow: 'hidden' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: '#20c997', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(32,201,151,0.3)' }}>
                        <Mail style={{ width: 18, height: 18, color: '#fff' }} />
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>Correo Corporativo</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: '#0f1e33', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>slps.soluciones.informaticas@gmail.com</span>
                      </div>
                    </a>

                    <a href="https://wa.me/573214451817" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, background: 'linear-gradient(135deg, rgba(37,211,102,0.06), rgba(37,211,102,0.12))', border: '1.5px solid rgba(37,211,102,0.2)', textDecoration: 'none', color: '#0f1e33', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      <div style={{ width: 42, height: 42, borderRadius: 12, background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}>
                        <MessageCircle style={{ width: 18, height: 18, color: '#fff' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>WhatsApp Business</span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: '#0f1e33' }}>Chat en Vivo</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Guarantees */}
                <div style={{ background: '#ffffff', borderRadius: 20, padding: 24, border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 800, color: '#0f1e33', margin: 0, textTransform: 'uppercase' }}>Nuestro Compromiso</h4>
                  {[
                    { icon: Clock, text: 'Respuesta comercial garantizada en el mismo día.', color: '#20c997' },
                    { icon: ShieldCheck, text: 'Atención directa del Ingeniero titular del proyecto.', color: '#f37021' },
                    { icon: CheckCircle2, text: 'Cotización detallada con alcance técnico incluido.', color: '#3b82f6' },
                    { icon: MapPin, text: 'Cobertura en Cúcuta, Área Metropolitana y Norte de Santander.', color: '#8b5cf6' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: '#475569', fontWeight: 600 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon style={{ width: 15, height: 15, color: item.color }} />
                        </div>
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Form */}
              <div className="cp-fade" style={{ animationDelay: '0.15s' }}>
                <div style={{ background: '#ffffff', borderRadius: 24, padding: 40, boxShadow: '0 8px 48px rgba(15,30,51,0.08)', border: '1.5px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #f37021, #e85d04)' }} />

                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '56px 0' }}>
                      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(32,201,151,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <CheckCircle2 style={{ width: 40, height: 40, color: '#20c997' }} />
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f1e33', marginBottom: 8 }}>¡Mensaje Enviado Exitosamente!</h3>
                      <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28, maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.7 }}>
                        El Ing. Sergio Pérez revisará su consulta y se comunicará con usted vía WhatsApp o correo electrónico en las próximas horas.
                      </p>
                      <button onClick={() => setSubmitted(false)}
                        style={{ padding: '13px 28px', borderRadius: 14, background: 'linear-gradient(135deg, #0f1e33, #162a45)', color: '#fff', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 4px 16px rgba(15,30,51,0.2)' }}>
                        Enviar Otro Mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: 28 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f1e33', margin: '0 0 4px' }}>
                          Formulario de <span style={{ color: '#f37021' }}>Contacto Directo</span>
                        </h3>
                        <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Complete sus datos y le responderemos en menos de 24 horas.</p>
                      </div>

                      <div className="cp-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Nombre Completo *</label>
                          <input className="cp-input" type="text" required placeholder="Ej. Juan Pérez" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Empresa / Negocio</label>
                          <input className="cp-input" type="text" placeholder="Ej. Comercializadora SLP" value={formData.empresa} onChange={(e) => setFormData({...formData, empresa: e.target.value})} style={inputStyle} />
                        </div>
                      </div>

                      <div className="cp-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Teléfono / Celular *</label>
                          <input className="cp-input" type="tel" required placeholder="Ej. 300 123 4567" value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Correo Electrónico *</label>
                          <input className="cp-input" type="email" required placeholder="correo@empresa.com" value={formData.correo} onChange={(e) => setFormData({...formData, correo: e.target.value})} style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 18 }}>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Servicio Requerido</label>
                        <select className="cp-input" value={formData.servicio} onChange={(e) => setFormData({...formData, servicio: e.target.value})} style={{ ...inputStyle, fontWeight: 700, color: '#0f1e33' }}>
                          <option>Desarrollo de Software</option>
                          <option>Software con Inteligencia Artificial</option>
                          <option>Soporte Técnico Especializado</option>
                          <option>Videovigilancia (CCTV)</option>
                          <option>Redes LAN y WLAN</option>
                          <option>Consultoría Tecnológica</option>
                          <option>Venta de Equipos & Periféricos</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: 24 }}>
                        <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Detalles del Requerimiento *</label>
                        <textarea className="cp-input" required rows={4} placeholder="Describa su proyecto, necesidad o consulta técnica..." value={formData.mensaje} onChange={(e) => setFormData({...formData, mensaje: e.target.value})} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>

                      <button type="submit"
                        style={{ width: '100%', padding: '16px 24px', borderRadius: 16, background: 'linear-gradient(135deg, #f37021 0%, #e85d04 100%)', color: '#fff', fontSize: 14, fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, textTransform: 'uppercase', letterSpacing: '0.06em', boxShadow: '0 8px 28px rgba(243,112,33,0.35)', transition: 'all 0.25s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(243,112,33,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(243,112,33,0.35)'; }}
                      >
                        <Send style={{ width: 17, height: 17 }} />
                        <span>Enviar Solicitud de Cotización</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Section 3: Location / Map ══ */}
        <section style={{ background: '#ffffff', padding: '64px 0 72px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }} className="cp-fade">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3b82f6', padding: '4px 14px', borderRadius: 20, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', marginBottom: 12 }}>
                <MapPin style={{ width: 11, height: 11 }} /> Nuestra Ubicación
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#0f1e33', margin: '8px 0 8px' }}>Cúcuta, Norte de Santander — Colombia</h2>
              <p style={{ fontSize: 13, color: '#64748b' }}>Atención presencial y remota en toda el área metropolitana.</p>
            </div>
            <div style={{ borderRadius: 24, overflow: 'hidden', border: '2px solid #e2e8f0', boxShadow: '0 8px 32px rgba(15,30,51,0.06)', height: 360 }}>
              <iframe
                title="Ubicación SLP Soluciones"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124838.06497383566!2d-72.55098!3d7.89391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6645abc3d4b0a9%3A0x6c2c2a84ae1a9b5f!2sC%C3%BAcuta%2C%20Norte%20de%20Santander!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
