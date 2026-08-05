import React, { useState, useEffect, useRef } from "react";
import { Code2, Bot, Wrench, Video, Network, LineChart, Laptop, X, Check, ChevronRight } from "lucide-react";

function useReveal(threshold = 0.12) {
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
    shortDesc: "Software empresarial, apps web y moviles, automatizacion e integracion de sistemas.",
    details: ["Desarrollo Web (React, Node.js, Python)", "Aplicaciones Moviles Multiplataforma",
      "Bases de Datos & Integracion de APIs", "Automatizacion de Procesos Administrativos",
      "Integracion con Sistemas Existentes"],
    priceTag: "Solucion a Medida",
  },
  {
    id: "software-ia", category: "software",
    icon: Bot, accent: "#f37021", accentBg: "rgba(243,112,33,0.10)",
    title: "Software con IA", subtitle: "Chatbots & Asistentes Virtuales",
    shortDesc: "Chatbots inteligentes, analisis de datos y sistemas predictivos con IA.",
    details: ["Chatbots Integrados a WhatsApp & Web", "Asistentes Virtuales 24/7",
      "Analisis Predictivo de Datos", "Procesamiento de Documentos con IA",
      "Integracion OpenAI / Gemini Cloud"],
    priceTag: "Integracion Inteligente", size: "normal",
  },
  {
    id: "soporte-tecnico", category: "soporte",
    icon: Wrench, accent: "#3b82f6", accentBg: "rgba(59,130,246,0.10)",
    title: "Soporte Tecnico", subtitle: "Asistencia Remota & Presencial",
    shortDesc: "Mantenimiento preventivo, correctivo, instalacion y optimizacion de equipos.",
    details: ["Mantenimiento Preventivo & Correctivo", "Diagnostico & Optimizacion de Equipos",
      "Instalacion & Licenciamiento TI", "Limpieza de Malware & Seguridad",
      "Soporte Inmediato por PBX / WhatsApp"],
    priceTag: "Planes Preventivos", size: "normal",
  },
  {
    id: "videovigilancia", category: "infraestructura",
    icon: Video, accent: "#f37021", accentBg: "rgba(243,112,33,0.10)",
    title: "Videovigilancia CCTV", subtitle: "Camaras IP & Monitoreo Remoto",
    shortDesc: "Instalacion de camaras IP, DVR/NVR y monitoreo seguro en tiempo real.",
    details: ["Camaras IP HD con Vision Nocturna", "Grabadores DVR / NVR & Servidores",
      "Monitoreo Movil en Tiempo Real", "Mantenimiento de Cableado & Fuentes",
      "Configuracion de Alertas por Deteccion"],
    priceTag: "Seguridad 24/7", size: "normal",
  },
  {
    id: "redes-lan-wlan", category: "infraestructura",
    icon: Network, accent: "#20c997", accentBg: "rgba(32,201,151,0.10)",
    title: "Redes LAN & WLAN", subtitle: "Cableado Cat6 & Wi-Fi Mesh",
    shortDesc: "Cableado estructurado, routers, switches y configuracion de firewall empresarial.",
    details: ["Cableado Estructurado Cat6 / Cat6A", "Redes Wi-Fi Empresariales",
      "Switches Administrables & VLANs", "Seguridad de Red & Firewalls",
      "Auditoria & Certificacion de Puntos"],
    priceTag: "Conectividad Robusta",
  },
  {
    id: "consultoria", category: "consultoria",
    icon: LineChart, accent: "#8b5cf6", accentBg: "rgba(139,92,246,0.10)",
    title: "Consultoria TI", subtitle: "Transformacion Digital",
    shortDesc: "Asesoria estrategica, migracion a la nube y optimizacion de infraestructura.",
    details: ["Diagnostico & Inventario Tecnologico", "Estrategias de Migracion a la Nube",
      "Optimizacion de Costos TI", "Planes de Contingencia & Backups",
      "Asesoria en Hardware & Software"],
    priceTag: "Asesoria Especializada", size: "normal",
  },
  {
    id: "venta-equipos", category: "soporte",
    icon: Laptop, accent: "#0ea5e9", accentBg: "rgba(14,165,233,0.10)",
    title: "Venta de Equipos", subtitle: "Hardware & Accesorios",
    shortDesc: "Computadores, servidores, perifericos y accesorios de marcas lideres.",
    details: ["Computadores Empresariales & Laptops", "Servidores & Unidades NAS",
      "Perifericos (Monitores, UPS, Switches)", "Componentes & Accesorios de Red",
      "Garantia Oficial Directa"],
    priceTag: "Marcas Lideres", size: "normal",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "software", label: "Software & IA" },
  { id: "infraestructura", label: "Redes & CCTV" },
  { id: "soporte", label: "Soporte & Equipos" },
  { id: "consultoria", label: "Consultoria TI" },
];

function CleanBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Soft ambient glows */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(32,201,151,0.06) 0%, transparent 70%)",
        top: "-150px", right: "-100px",
      }} />
      <div style={{
        position: "absolute", width: 550, height: 550, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(243,112,33,0.05) 0%, transparent 70%)",
        bottom: "-120px", left: "-100px",
      }} />
      {/* Elegant subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(15,30,51,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
    </div>
  );
}

function ServiceCard({ service, delay, onDetail }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      onClick={() => onDetail(service)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms, background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease`,
        background: hovered ? `linear-gradient(145deg, #ffffff 0%, ${service.accentBg} 100%)` : "#ffffff",
        border: `1.5px solid ${hovered ? service.accent : "#e2e8f0"}`,
        borderRadius: 18,
        padding: "22px 20px 18px",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 12px 32px -6px ${service.accent}30, 0 4px 12px rgba(0,0,0,0.05)`
          : "0 2px 10px rgba(15,30,51,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        borderRadius: "18px 18px 0 0",
      }} />

      <div style={{
        width: 46, height: 46, borderRadius: 13,
        background: service.accentBg, display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginBottom: 14,
        transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.35s cubic-bezier(.175,.885,.32,1.275)",
      }}>
        <Icon style={{ color: service.accent, width: 20, height: 20 }} />
      </div>

      <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {service.subtitle}
        </span>
        <h3 style={{ fontSize: 13.5, fontWeight: 800, color: "#0f1e33", margin: "3px 0 6px", lineHeight: 1.25 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
          {service.shortDesc}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: 4 }}>
          {service.details.slice(0, 3).map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#475569" }}>
              <Check style={{ width: 12, height: 12, color: service.accent, flexShrink: 0 }} />
              {d}
            </li>
          ))}
          {service.details.length > 3 && (
            <li style={{ fontSize: 10.5, color: service.accent, fontWeight: 700, marginTop: 2 }}>
              +{service.details.length - 3} mas...
            </li>
          )}
        </ul>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: service.accent,
        marginTop: 14, flexShrink: 0,
        opacity: hovered ? 1 : 0.45,
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.25s ease",
        alignSelf: "flex-end",
        whiteSpace: "nowrap",
      }}>
        <span style={{ textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 10 }}>{service.priceTag}</span>
        <ChevronRight style={{ width: 14, height: 14 }} />
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
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(15,30,51,0.55)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 24, maxWidth: 520, width: "100%",
          padding: "36px 36px 28px", position: "relative",
          border: `2px solid ${service.accent}30`,
          boxShadow: `0 32px 80px -16px ${service.accent}25, 0 8px 32px rgba(0,0,0,0.08)`,
          animation: "slideUp 0.3s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16, width: 32, height: 32, borderRadius: 8,
            background: "#f1f5f9", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b",
          }}
        ><X style={{ width: 16, height: 16 }} /></button>

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
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f1e33", margin: "2px 0 0" }}>
              {service.title}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
          {service.shortDesc}
        </p>

        <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>
          Incluye
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 8 }}>
          {service.details.map((d, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: 10, fontSize: 13,
              color: "#1e293b", background: service.accentBg,
              padding: "10px 14px", borderRadius: 10, border: `1px solid ${service.accent}20`,
            }}>
              <Check style={{ width: 15, height: 15, color: service.accent, flexShrink: 0 }} />
              {d}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: 12, fontWeight: 700, cursor: "pointer",
            }}
          >Cerrar</button>
          <button
            onClick={() => { onClose(); onQuote(service.title); }}
            style={{
              padding: "10px 22px", borderRadius: 10, border: "none",
              background: service.accent, color: "#fff",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 16px ${service.accent}40`,
            }}
          >Solicitar Cotizacion</button>
        </div>
      </div>
    </div>
  );
}

export default function Services({ onOpenQuote }) {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedService, setSelectedService] = useState(null);
  const [headerRef, headerVisible] = useReveal(0.1);

  const filtered = activeFilter === "todos"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter);

  return (
    <section id="servicios" style={{ position: "relative", background: "#ffffff", padding: "96px 0", borderBottom: "1px solid #e2e8f0", overflow: "hidden" }}>
      <CleanBg />

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity:0 } to { transform: translateY(0); opacity:1 } }
        .svc-filter-btn { transition: all 0.22s ease !important; }
        .svc-filter-btn:hover { transform: translateY(-2px) !important; }
        @media (max-width: 640px) {
          .svc-bento { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .svc-bento { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .svc-bento { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        <div
          ref={headerRef}
          style={{
            textAlign: "center", maxWidth: 600, margin: "0 auto 48px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <span style={{
            display: "inline-block", fontSize: 10, fontWeight: 800, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#f37021", marginBottom: 10,
            padding: "4px 14px", borderRadius: 20,
            background: "rgba(243,112,33,0.08)", border: "1px solid rgba(243,112,33,0.2)",
          }}>
            Catalogo de Servicios & Soluciones
          </span>
          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#0f1e33", margin: "8px 0 12px", lineHeight: 1.15 }}>
            Nuestros Servicios Informaticos
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            Soluciones estructuradas bajo estandares internacionales de ingenieria y soporte continuo.
          </p>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40,
          opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease 0.15s",
        }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              className="svc-filter-btn"
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: "8px 18px", borderRadius: 30, fontSize: 12, fontWeight: 700, cursor: "pointer",
                border: activeFilter === f.id ? "1.5px solid #0f1e33" : "1.5px solid #e2e8f0",
                background: activeFilter === f.id ? "#0f1e33" : "#ffffff",
                color: activeFilter === f.id ? "#ffffff" : "#475569",
                boxShadow: activeFilter === f.id ? "0 4px 12px rgba(15,30,51,0.2)" : "none",
              }}
            >{f.label}</button>
          ))}
        </div>

        <div
          className="svc-bento"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {filtered.map((s, i) => (
            <ServiceCard key={s.id} service={s} delay={i * 70} onDetail={setSelectedService} />
          ))}
        </div>

        <div style={{
          marginTop: 52, textAlign: "center",
          opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease 0.4s",
        }}>
          <p style={{ fontSize: 13.5, color: "#64748b", marginBottom: 16 }}>
            No encontras lo que buscas? Contamos con soluciones personalizadas.
          </p>
          <button
            onClick={() => onOpenQuote && onOpenQuote("Servicio Personalizado")}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            style={{
              padding: "13px 32px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #0f1e33 0%, #162a45 100%)",
              color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
              boxShadow: "0 8px 24px rgba(15,30,51,0.2)",
              transition: "all 0.25s ease",
            }}
          >
            Solicitar Cotizacion Personalizada
          </button>
        </div>
      </div>

      {selectedService && (
        <DetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onQuote={(title) => { setSelectedService(null); onOpenQuote && onOpenQuote(title); }}
        />
      )}
    </section>
  );
}
