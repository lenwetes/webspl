import React, { useState, useEffect, useRef } from "react";
import { Code2, Bot, Wrench, Video, Network, LineChart, Laptop, Check, ArrowRight } from "lucide-react";

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

const FEATURED_SERVICES = [
  {
    id: "desarrollo-software",
    icon: Code2, accent: "#20c997", accentBg: "rgba(32,201,151,0.10)",
    title: "Desarrollo de Software", subtitle: "Sistemas Empresariales & Web",
    shortDesc: "Software a medida, aplicaciones web y móviles, automatización e integración.",
    details: ["Desarrollo Web & Móvil", "Bases de Datos & APIs", "Automatización de Procesos"],
    priceTag: "Solución a Medida",
  },
  {
    id: "software-ia",
    icon: Bot, accent: "#f37021", accentBg: "rgba(243,112,33,0.10)",
    title: "Software con IA", subtitle: "Chatbots & Asistentes Virtuales",
    shortDesc: "Chatbots inteligentes para WhatsApp y web, análisis de datos y asistentes 24/7.",
    details: ["Chatbots IA en WhatsApp", "Asistentes Virtuales 24/7", "Integración OpenAI / Gemini"],
    priceTag: "Integración Inteligente",
  },
  {
    id: "redes-lan-wlan",
    icon: Network, accent: "#3b82f6", accentBg: "rgba(59,130,246,0.10)",
    title: "Redes LAN, WLAN & CCTV", subtitle: "Cableado Cat6 & Cámaras IP",
    shortDesc: "Cableado estructurado, Wi-Fi corporativo y monitoreo por videovigilancia CCTV.",
    details: ["Cableado Cat6 / Cat6A", "Wi-Fi Empresarial Mesh", "Cámaras IP & Monitoreo 24/7"],
    priceTag: "Conectividad Robusta",
  },
  {
    id: "soporte-tecnico",
    icon: Wrench, accent: "#8b5cf6", accentBg: "rgba(139,92,246,0.10)",
    title: "Soporte Técnico & Equipos", subtitle: "Asistencia & Hardware",
    shortDesc: "Mantenimiento preventivo, correctivo y licenciamiento de equipos informáticos.",
    details: ["Mantenimiento Preventivo", "Optimización de Equipos", "Venta de Hardware Líder"],
    priceTag: "Planes Preventivos",
  },
];

function CleanBg() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
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
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(15,30,51,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />
    </div>
  );
}

function ServiceCardSummary({ service, delay, onClick }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.5s cubic-bezier(.22,1,.36,1) ${delay}ms`,
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
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${service.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      <div>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: service.accentBg, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 14,
          transform: hovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(.175,.885,.32,1.275)",
        }}>
          <Icon style={{ color: service.accent, width: 20, height: 20 }} />
        </div>

        <span style={{ fontSize: 9.5, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {service.subtitle}
        </span>
        <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "#0f1e33", margin: "3px 0 6px", lineHeight: 1.25 }}>
          {service.title}
        </h3>
        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: "0 0 12px" }}>
          {service.shortDesc}
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {service.details.map((d, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#475569" }}>
              <Check style={{ width: 12, height: 12, color: service.accent, flexShrink: 0 }} />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 10, borderTop: "1px solid #f1f5f9",
      }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {service.priceTag}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 800, color: service.accent }}>
          <span>Saber más</span>
          <ArrowRight style={{ width: 12, height: 12 }} />
        </div>
      </div>
    </div>
  );
}

export default function Services({ onOpenServices, onOpenQuote }) {
  const [headerRef, headerVisible] = useReveal(0.1);

  return (
    <section id="servicios" style={{ position: "relative", background: "#ffffff", padding: "80px 0", borderBottom: "1px solid #e2e8f0", overflow: "hidden" }}>
      <CleanBg />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center", maxWidth: 600, margin: "0 auto 40px",
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
            Servicios Principales
          </span>
          <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 900, color: "#0f1e33", margin: "6px 0 10px", lineHeight: 1.15 }}>
            Soluciones Informáticas Integrales
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
            Ofrecemos ingeniería avanzada de software, arquitectura de redes, videovigilancia y soporte corporativo continuo.
          </p>
        </div>

        {/* Services Grid (4 Featured) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {FEATURED_SERVICES.map((s, i) => (
            <ServiceCardSummary key={s.id} service={s} delay={i * 70} onClick={onOpenServices} />
          ))}
        </div>

        {/* Action Button to Full Services Page */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onOpenServices}
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            style={{
              padding: "13px 32px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #0f1e33 0%, #162a45 100%)",
              color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
              letterSpacing: "0.04em", textTransform: "uppercase",
              boxShadow: "0 8px 24px rgba(15,30,51,0.2)",
              transition: "all 0.25s ease",
              display: "inline-flex", alignItems: "center", gap: 10
            }}
          >
            <span>Ver catálogo completo de servicios</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>

      </div>
    </section>
  );
}
