import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import { Target, Eye, Compass, CheckCircle2, Award, Zap, Shield, Cpu, Sparkles, Layers, Server, Monitor, Activity, X, ChevronRight, ArrowRight } from 'lucide-react';

const GOLD   = '#c59b46';
const GOLD2  = '#e8c96a';
const PURPLE = '#7c3aed';
const TEAL   = '#0d9488';
const ORANGE = '#e07020';

function StatPill({ value, label, color }) {
  return (
    <div className="group flex flex-col items-center px-6 py-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-2 cursor-default bg-white border border-slate-200/90 shadow-sm hover:shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5" style={{ background: color }} />
      <span className="text-3xl font-black transition-transform duration-300 group-hover:scale-110" style={{ color }}>{value}</span>
      <span className="text-[11px] font-bold uppercase tracking-wider mt-1 text-slate-500">{label}</span>
    </div>
  );
}

function ValueBadge({ icon: Icon, label, color }) {
  return (
    <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 hover:scale-105 cursor-default shadow-sm hover:shadow-md"
      style={{ background: `${color}12`, border: `1.5px solid ${color}40`, color }}>
      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125" />
      <span>{label}</span>
    </div>
  );
}

const GALLERY_ITEMS = [
  {
    id: "software",
    title: "Ingeniería & Software a Medida",
    subtitle: "Desarrollo web, móvil y arquitecturas cloud de alta disponibilidad.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    badge: "Desarrollo",
    icon: Layers,
    accent: GOLD,
    description: "Diseñamos y construimos sistemas de software a la medida con estándares de arquitectura moderna, bases de datos optimizadas, integración de APIs y soluciones impulsadas por Inteligencia Artificial.",
    capabilities: [
      "Plataformas Web Empresariales (React, Node.js, Python)",
      "Aplicaciones Móviles Nativas y Multiplataforma",
      "Arquitecturas de Microservicios & Nube (AWS/Azure)",
      "Integración de Modelos de Inteligencia Artificial (OpenAI/Gemini)",
      "Automatización de Procesos Operativos & Bots WhatsApp"
    ],
    highlights: [
      { label: "Metodología", value: "Scrum / Agile" },
      { label: "Seguridad", value: "Estándar OWASP" },
      { label: "Despliegue", value: "CI / CD Automático" },
    ]
  },
  {
    id: "datacenter",
    title: "Data Center & Servidores",
    subtitle: "Infraestructura crítica, cableado estructurado Cat6 y switches.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    badge: "Redes & Nube",
    icon: Server,
    accent: TEAL,
    description: "Implementamos infraestructura física y lógica de red de nivel corporativo, asegurando alta disponibilidad, ordenamiento ANSI/TIA y conectividad robusta sin interrupciones.",
    capabilities: [
      "Cableado Estructurado Certificado Cat6 / Cat6A",
      "Montaje y Configuración de Racks & Servidores NAS",
      "Switches Administrables, Router Board & VLANs",
      "Redes Wi-Fi Corporativas Mesh de Alta Cobertura",
      "Sistemas de Respaldo de Energía UPS & Tier Data Center"
    ],
    highlights: [
      { label: "Normativa", value: "ANSI / TIA / EIA" },
      { label: "Disponibilidad", value: "Uptime 99.9%" },
      { label: "Garantía", value: "Puntos Certificados" },
    ]
  },
  {
    id: "cctv",
    title: "Monitoreo & Videovigilancia CCTV",
    subtitle: "Cámaras IP HD, grabación NVR y monitoreo continuo 24/7.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    badge: "Seguridad CCTV",
    icon: Monitor,
    accent: ORANGE,
    description: "Sistemas integrales de seguridad electrónica y videovigilancia IP HD para empresas, bodegas, conjuntos y oficinas, con monitoreo remoto en tiempo real por dispositivos móviles.",
    capabilities: [
      "Cámaras IP HD con Visión Nocturna Infrarroja & Color",
      "Servidores y Grabadores DVR / NVR de Almacenamiento Masivo",
      "Monitoreo en Tiempo Real desde Smartphone y PC",
      "Alertas Inteligentes por Detección de Movimiento con IA",
      "Mantenimiento Preventivo de Fuentes, Baluns y Cableado"
    ],
    highlights: [
      { label: "Monitoreo", value: "Acceso Móvil 24/7" },
      { label: "Definición", value: "Full HD / 4K IP" },
      { label: "Respaldo", value: "Grabación NVR/Nube" },
    ]
  },
  {
    id: "soporte",
    title: "Soporte Técnico Especializado",
    subtitle: "Mantenimiento preventivo y asistencia presencial / remota.",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    badge: "Soporte 360°",
    icon: Activity,
    accent: PURPLE,
    description: "Servicio de mesa de ayuda TI, diagnóstico y optimización de equipos informáticos, protección antivirus y mantenimiento rutinario para garantizar la continuidad del negocio.",
    capabilities: [
      "Mantenimiento Preventivo & Correctivo de Equipos",
      "Diagnóstico Avanzado & Optimización de Hardware",
      "Limpieza Profunda de Malware, Virus y Ransomware",
      "Instalación & Licenciamiento Oficial de Software",
      "Atención Inmediata por Asistencia Remota o Presencial"
    ],
    highlights: [
      { label: "Respuesta", value: "< 30 Min PBX" },
      { label: "Planes", value: "Bolsa de Horas / Mes" },
      { label: "Cobertura", value: "Remota & In Situ" },
    ]
  },
];

function PillarModal({ pillar, onClose, onQuote }) {
  if (!pillar) return null;
  const IconComponent = pillar.icon;

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-3xl maxWidth-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-slate-100 shadow-2xl animate-in zoom-in-95 duration-200"
        style={{ borderTop: `4px solid ${pillar.accent}` }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-2">
              <IconComponent className="w-3.5 h-3.5" style={{ color: pillar.accent }} />
              <span>{pillar.badge}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {pillar.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-slate-600 text-sm leading-relaxed">
            {pillar.description}
          </p>

          {/* Highlights Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            {pillar.highlights.map((h, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{h.label}</span>
                <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">{h.value}</span>
              </div>
            ))}
          </div>

          {/* Capabilities List */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Capacidades & Alcance Técnico
            </h4>
            <div className="space-y-2.5">
              {pillar.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: pillar.accent }} />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Cerrar Detalle
            </button>
            <button
              onClick={() => { onClose(); onQuote(`Pilar: ${pillar.title}`); }}
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
              style={{ background: pillar.accent }}
            >
              <span>Solicitar Cotización de este Pilar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AboutPage(props) {
  const { onBack, onOpenQuote, onOpenServices, onOpenBlog } = props;
  const [selectedPillar, setSelectedPillar] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body relative overflow-hidden">
      
      {/* Dynamic Keyframe Animations */}
      <style>{`
        @keyframes floatBulb {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes pulseAura {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.15); }
        }
        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-float-bulb {
          animation: floatBulb 4.5s ease-in-out infinite;
        }
        .anim-pulse-aura {
          animation: pulseAura 3.5s ease-in-out infinite;
        }
        .anim-rotate-glow {
          animation: rotateGlow 18s linear infinite;
        }
      `}</style>

      {/* Background Animated Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-10 w-[650px] h-[550px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-20 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 right-1/4 w-[550px] h-[450px] bg-teal-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Corporate Page Banner Header */}
      <PageHeader
        {...props}
        title="Nosotros"
        breadcrumb="NOSOTROS"
        badgeText="Identidad & Liderazgo TI"
        bgImage="/banner-about.png"
        subtitle="Conoce la trayectoria, valores corporativos y equipo directivo de SLP Soluciones Informáticas."
        onGoHome={onBack || props.onGoHome}
      />

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ════ HERO LOGO IDENTITY BLOCK WITH ADVANCED ANIMATIONS ════ */}
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-20"
              style={{ background: `radial-gradient(circle, ${GOLD} 0%, transparent 70%)` }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Animated Bulb Logo Stage */}
              <div className="lg:col-span-5 flex justify-center items-center py-6">
                <div className="relative group cursor-pointer flex items-center justify-center">
                  
                  {/* Rotating Conic Aura Glow */}
                  <div
                    className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full opacity-40 blur-2xl anim-rotate-glow pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, ${GOLD}, ${PURPLE}, ${TEAL}, ${ORANGE}, ${GOLD})`,
                    }}
                  />

                  {/* Pulsing Core Ambient Glow */}
                  <div
                    className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full anim-pulse-aura pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${GOLD2}45 0%, transparent 70%)` }}
                  />

                  {/* Floating Logo Container */}
                  <div className="relative z-10 anim-float-bulb filter drop-shadow-2xl">
                    <img
                      src="/logo-bulb.png"
                      alt="SLP Soluciones Informáticas"
                      className="w-72 sm:w-80 md:w-96 object-contain select-none transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Floating Sparkle Micro Badges */}
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-lg border border-white flex items-center gap-1 animate-bounce">
                    <Sparkles className="w-3 h-3 text-slate-900" />
                    <span>Innovación TI</span>
                  </div>

                </div>
              </div>

              {/* Text Description */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4"
                  style={{ background: `${GOLD}15`, color: '#9a7730', border: `1px solid ${GOLD}40` }}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Identidad Corporativa SLP</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                  Excelencia, Innovación y Compromiso Tecnológico
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Desde nuestros inicios, nos hemos dedicado a ofrecer soluciones informáticas de vanguardia adaptadas a las necesidades reales de pequeñas, medianas y grandes empresas. Nuestro enfoque se centra en optimizar la productividad, garantizar la seguridad de la información y reducir tiempos de inactividad operativa.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <ValueBadge icon={Shield} label="Seguridad Integral" color={PURPLE} />
                  <ValueBadge icon={Cpu} label="Innovación Continua" color={TEAL} />
                  <ValueBadge icon={Award} label="Calidad Garantizada" color={GOLD} />
                  <ValueBadge icon={CheckCircle2} label="Soporte 24/7" color={ORANGE} />
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border-l-4 border-amber-500 text-amber-950 text-sm font-semibold italic shadow-sm">
                  "Creemos que la tecnología debe ser una herramienta estratégica de crecimiento corporativo, no una fuente de complejidad."
                </div>
              </div>

            </div>
          </div>

          {/* ════ STATS GRID ════ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
            <StatPill value="+10" label="Años de Experiencia" color={GOLD} />
            <StatPill value="+80" label="Clientes Activos" color={PURPLE} />
            <StatPill value="100%" label="Compromiso TI" color={TEAL} />
            <StatPill value="+300" label="Proyectos Exitosos" color={ORANGE} />
          </div>

          {/* ════ INFRASTRUCTURE & OPERATIONS IMAGE GALLERY SHOWCASE WITH INTERACTIVE MODALS ════ */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700">
                Capacidad Técnica & Experiencia
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-3">
                Nuestros Pilares Operativos
              </h2>
              <p className="text-slate-600 text-sm">
                Haz clic en cualquiera de nuestras tarjetas para explorar en detalle el alcance técnico y las soluciones de cada pilar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPillar(item)}
                    className="group rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white backdrop-blur-md bg-slate-900/75 border border-white/20">
                        {item.badge}
                      </span>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-4 h-4" style={{ color: item.accent }} />
                          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold" style={{ color: item.accent }}>
                        <span className="flex items-center gap-1">
                          <span>Ver Información</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ════ MISIÓN Y VISIÓN CARDS ════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Misión */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ background: `linear-gradient(135deg, ${TEAL}, #0a7a70)` }}>
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Nuestra Misión</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Brindar soluciones tecnológicas integrales mediante el desarrollo de software a medida, implementación de infraestructura de red de alta disponibilidad, sistemas de videovigilancia y soporte técnico especializado, ayudando a nuestros clientes a transformar digitalmente sus operaciones de manera eficiente y segura.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-teal-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Desarrollo · Infraestructura · Soporte 360°</span>
              </div>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ background: `linear-gradient(135deg, ${PURPLE}, #6d28d9)` }}>
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Nuestra Visión</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Consolidarnos como una empresa referente en soluciones informáticas y desarrollo de software en la región, reconocida por la excelencia técnica, la calidad del servicio al cliente y el acompañamiento continuo en la adopción de tecnologías emergentes como la Inteligencia Artificial.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-purple-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Liderazgo Tecnológico & Transformación Digital</span>
              </div>
            </div>
          </div>

          {/* ════ LIDERAZGO Y FUNDADOR ════ */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-2xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${GOLD}, ${ORANGE})` }}>
                SL
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">Sergio Luis Pérez Contreras</h4>
                <p className="text-amber-400 text-sm font-bold mt-0.5">Ingeniero de Sistemas · Fundador & Director Técnico</p>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                  Líder de proyectos TI con más de una década de experiencia estructurando soluciones de software empresarial, seguridad informática y arquitectura de redes.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuote()}
              className="btn-hostdime-orange px-8 py-4 text-xs uppercase tracking-wider font-black whitespace-nowrap shadow-xl hover:scale-105 transition-transform relative z-10"
            >
              Contactar al Equipo
            </button>
          </div>

        </div>
      </main>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <PillarModal
          pillar={selectedPillar}
          onClose={() => setSelectedPillar(null)}
          onQuote={(pilarTitle) => { setSelectedPillar(null); onOpenQuote(pilarTitle); }}
        />
      )}

      {/* Footer */}
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
