import React, { useState, useEffect, useRef } from "react";
import PageHeader from "./PageHeader";
import Footer from "./Footer";
import { Code2, Bot, Wrench, Video, Network, LineChart, Laptop, KeyRound, GraduationCap, X, Check, ChevronRight, Sparkles } from "lucide-react";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const SERVICES = [
  {
    id: "desarrollo-software", category: "software",
    icon: Code2, accent: "#20c997", accentBg: "rgba(32,201,151,0.10)",
    title: "Desarrollo de Software", subtitle: "Sistemas Empresariales & Web",
    shortDesc: "Software empresarial, apps web y móviles, automatización e integración de sistemas.",
    details: ["Desarrollo Web (React, Node.js, Python)", "Aplicaciones Móviles Multiplataforma",
      "Bases de Datos & Integración de APIs", "Automatización de Procesos Administrativos",
      "Integración con Sistemas Existentes"],
    priceTag: "Solución a Medida",
  },
  {
    id: "software-ia", category: "software",
    icon: Bot, accent: "#f37021", accentBg: "rgba(243,112,33,0.10)",
    title: "Software con IA", subtitle: "Chatbots & Asistentes Virtuales",
    shortDesc: "Chatbots inteligentes, análisis de datos y sistemas predictivos con IA.",
    details: ["Chatbots Integrados a WhatsApp & Web", "Asistentes Virtuales 24/7",
      "Análisis Predictivo de Datos", "Procesamiento de Documentos con IA",
      "Integración OpenAI / Gemini Cloud"],
    priceTag: "Integración Inteligente",
  },
  {
    id: "soporte-tecnico", category: "soporte",
    icon: Wrench, accent: "#3b82f6", accentBg: "rgba(59,130,246,0.10)",
    title: "Soporte Técnico", subtitle: "Asistencia Remota & Presencial",
    shortDesc: "Mantenimiento preventivo, correctivo, instalación y optimización de equipos.",
    details: ["Mantenimiento Preventivo & Correctivo", "Diagnóstico & Optimización de Equipos",
      "Instalación & Licenciamiento TI", "Limpieza de Malware & Seguridad",
      "Soporte Inmediato por PBX / WhatsApp"],
    priceTag: "Planes Preventivos",
  },
  {
    id: "videovigilancia", category: "infraestructura",
    icon: Video, accent: "#ef4444", accentBg: "rgba(239,68,68,0.10)",
    title: "Videovigilancia CCTV", subtitle: "Cámaras IP & Monitoreo Remoto",
    shortDesc: "Instalación de cámaras IP, DVR/NVR y monitoreo seguro en tiempo real.",
    details: ["Cámaras IP HD con Visión Nocturna", "Grabadores DVR / NVR & Servidores",
      "Monitoreo Móvil en Tiempo Real", "Mantenimiento de Cableado & Fuentes",
      "Configuración de Alertas por Detección"],
    priceTag: "Seguridad 24/7",
  },
  {
    id: "redes-lan-wlan", category: "infraestructura",
    icon: Network, accent: "#10b981", accentBg: "rgba(16,185,129,0.10)",
    title: "Redes LAN & WLAN", subtitle: "Cableado Cat6 & Wi-Fi Mesh",
    shortDesc: "Cableado estructurado, routers, switches y configuración de firewall empresarial.",
    details: ["Cableado Estructurado Cat6 / Cat6A", "Redes Wi-Fi Empresariales",
      "Switches Administrables & VLANs", "Seguridad de Red & Firewalls",
      "Auditoría & Certificación de Puntos"],
    priceTag: "Conectividad Robusta",
  },
  {
    id: "consultoria", category: "consultoria",
    icon: LineChart, accent: "#8b5cf6", accentBg: "rgba(139,92,246,0.10)",
    title: "Consultoría TI", subtitle: "Transformación Digital",
    shortDesc: "Asesoría estratégica, migración a la nube y optimización de infraestructura.",
    details: ["Diagnóstico & Inventario Tecnológico", "Estrategias de Migración a la Nube",
      "Optimización de Costos TI", "Planes de Contingencia & Backups",
      "Asesoría en Hardware & Software"],
    priceTag: "Asesoría Especializada",
  },
  {
    id: "licenciamiento-cloud", category: "soporte",
    icon: KeyRound, accent: "#ec4899", accentBg: "rgba(236,72,153,0.10)",
    title: "Licenciamiento & Cloud", subtitle: "Microsoft 365, Antivirus & Nube",
    shortDesc: "Venta, activación y gestión corporativa de licencias de software, antivirus y servicios en la nube.",
    details: ["Suscripciones Microsoft 365 & Office", "Licencias de Windows Server & SQL",
      "Antivirus Corporativo & Ciberseguridad", "Servidores VPS & Cloud (AWS/Azure)",
      "Gestión & Auditoría de Software"],
    priceTag: "Licencias Oficiales",
  },
  {
    id: "capacitaciones-ti", category: "consultoria",
    icon: GraduationCap, accent: "#f59e0b", accentBg: "rgba(245,158,11,0.10)",
    title: "Capacitaciones TI", subtitle: "Entrenamiento & Ciberseguridad",
    shortDesc: "Formación especializada para equipos de trabajo en ciberseguridad, herramientas cloud y software.",
    details: ["Prevención de Phishing & Ciberseguridad", "Entrenamiento en Microsoft 365 & Nube",
      "Uso Eficiente de Software Empresarial", "Talleres de Soporte Técnico Básico",
      "Buenas Prácticas de Manejo de Datos"],
    priceTag: "Formación a Medida",
  },
  {
    id: "venta-equipos", category: "soporte",
    icon: Laptop, accent: "#0ea5e9", accentBg: "rgba(14,165,233,0.10)",
    title: "Venta de Equipos", subtitle: "Hardware & Accesorios",
    shortDesc: "Computadores, servidores, periféricos y accesorios de marcas líderes.",
    details: ["Computadores Empresariales & Laptops", "Servidores & Unidades NAS",
      "Periféricos (Monitores, UPS, Switches)", "Componentes & Accesorios de Red",
      "Garantía Oficial Directa"],
    priceTag: "Marcas Líderes",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos los Servicios" },
  { id: "software", label: "Software & IA" },
  { id: "infraestructura", label: "Redes & CCTV" },
  { id: "soporte", label: "Soporte & Licenciamiento" },
  { id: "consultoria", label: "Consultoría & Capacitaciones" },
];

function ServiceCard({ service, delay, onDetail, onHoverActive }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      onClick={() => onDetail(service)}
      onMouseEnter={() => {
        setHovered(true);
        if (onHoverActive) onHoverActive(service.accent);
      }}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        background: hovered ? `linear-gradient(145deg, #ffffff 0%, ${service.accentBg} 100%)` : "#ffffff",
        border: `1.5px solid ${hovered ? service.accent : "#e2e8f0"}`,
        borderRadius: 20,
        padding: "24px 22px 20px",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 20px 40px -10px ${service.accent}35, 0 4px 12px rgba(0,0,0,0.05)`
          : "0 2px 10px rgba(15,30,51,0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3.5,
        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      <div>
        <div style={{
          width: 50, height: 50, borderRadius: 14,
          background: service.accentBg, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(.175,.885,.32,1.275)",
        }}>
          <Icon style={{ color: service.accent, width: 22, height: 22 }} />
        </div>

        <span style={{ fontSize: 10, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {service.subtitle}
        </span>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f1e33", margin: "4px 0 8px", lineHeight: 1.25 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 16px" }}>
          {service.shortDesc}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
          {service.details.map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#475569" }}>
              <Check style={{ width: 13, height: 13, color: service.accent, flexShrink: 0 }} />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 20, paddingTop: 14, borderTop: "1px solid #f1f5f9",
      }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {service.priceTag}
        </span>
        <div style={{
          display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 800, color: service.accent,
          transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s ease",
        }}>
          <span>Ver Detalles</span>
          <ChevronRight style={{ width: 14, height: 14 }} />
        </div>
      </div>
    </div>
  );
}

function DetailModal({ service, onClose, onQuote }) {
  const Icon = service.icon;
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(15,30,51,0.65)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 24, maxWidth: 540, width: "100%",
          padding: "36px", position: "relative",
          border: `2px solid ${service.accent}40`,
          boxShadow: `0 32px 80px -16px ${service.accent}30, 0 8px 32px rgba(0,0,0,0.12)`,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 18, width: 34, height: 34, borderRadius: 10,
            background: "#f1f5f9", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b",
          }}
        ><X style={{ width: 18, height: 18 }} /></button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: service.accentBg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon style={{ color: service.accent, width: 28, height: 28 }} />
          </div>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {service.subtitle}
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#0f1e33", margin: "2px 0 0" }}>
              {service.title}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
          {service.shortDesc}
        </p>

        <p style={{ fontSize: 10.5, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
          Alcance del Servicio
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
          {service.details.map((d, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: 10, fontSize: 13,
              color: "#1e293b", background: service.accentBg,
              padding: "10px 14px", borderRadius: 10, border: `1px solid ${service.accent}25`,
            }}>
              <Check style={{ width: 16, height: 16, color: service.accent, flexShrink: 0 }} />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              padding: "11px 22px", borderRadius: 12, border: "1.5px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
            }}
          >Cerrar</button>
          <button
            onClick={() => { onClose(); onQuote(service.title); }}
            style={{
              padding: "11px 24px", borderRadius: 12, border: "none",
              background: service.accent, color: "#fff",
              fontSize: 12.5, fontWeight: 800, cursor: "pointer",
              boxShadow: `0 4px 18px ${service.accent}40`,
            }}
          >Solicitar Cotización</button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage(props) {
  const { onBack, onOpenQuote, onOpenAbout, onOpenBlog } = props;
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedService, setSelectedService] = useState(null);
  const [activeAccent, setActiveAccent] = useState("#20c997");

  const filtered = activeFilter === "todos"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body relative overflow-hidden">
      
      {/* ── Dynamic Animated Blurred Aura Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full blur-[130px] opacity-25 transition-all duration-700 ease-out"
          style={{ background: activeAccent }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[650px] h-[550px] rounded-full blur-[140px] opacity-20 transition-all duration-1000 ease-out"
          style={{ background: activeAccent }}
        />
        <div
          className="absolute bottom-10 -left-20 w-[600px] h-[500px] rounded-full blur-[120px] opacity-20 transition-all duration-1000 ease-out"
          style={{ background: activeAccent }}
        />
      </div>

      {/* Corporate Page Banner Header */}
      <PageHeader
        {...props}
        title="Servicios TI"
        breadcrumb="SERVICIOS"
        badgeText="Infraestructura & Software 360°"
        bgImage="/banner-services.png"
        subtitle="Explora nuestra oferta integral en desarrollo de software, Inteligencia Artificial, CCTV, redes y soporte técnico."
        onGoHome={onBack || props.onGoHome}
        onOpenQuote={() => onOpenQuote("Servicio Personalizado")}
        onOpenAbout={onOpenAbout}
        onOpenServices={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenBlog={onOpenBlog}
      />

      {/* Main Content */}
      <main className="flex-grow py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  if (f.id === 'software') setActiveAccent('#20c997');
                  else if (f.id === 'infraestructura') setActiveAccent('#10b981');
                  else if (f.id === 'soporte') setActiveAccent('#3b82f6');
                  else if (f.id === 'consultoria') setActiveAccent('#8b5cf6');
                  else setActiveAccent('#20c997');
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === f.id
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Symmetrical 3x3 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                delay={i * 60}
                onDetail={setSelectedService}
                onHoverActive={setActiveAccent}
              />
            ))}
          </div>

          {/* Custom Service CTA Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                ¿Necesitas un proyecto o requerimiento especial?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Diseñamos arquitecturas de software, infraestructura y soporte adaptadas al 100% de tus objetivos corporativos.
              </p>
              <button
                onClick={() => onOpenQuote("Servicio Personalizado")}
                className="btn-hostdime-orange px-8 py-3.5 text-xs uppercase tracking-wider font-extrabold shadow-lg hover:scale-105 transition-transform"
              >
                Solicitar Cotización Personalizada
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Modal */}
      {selectedService && (
        <DetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onQuote={(title) => { setSelectedService(null); onOpenQuote(title); }}
        />
      )}

      {/* Footer */}
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
