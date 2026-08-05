import React, { useState, useEffect, useRef } from "react";
import { Award, Sliders, Cpu, Headset, ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const BENEFITS = [
  {
    icon: Award, accent: "#20c997",
    title: "Experiencia Profesional",
    desc: "Ingenieria de sistemas certificada y anos de trayectoria resolviendo problemas complejos de TI para empresas y emprendedores.",
    badge: "Certificados",
  },
  {
    icon: Sliders, accent: "#f37021",
    title: "Soluciones Personalizadas",
    desc: "Analizamos las necesidades unicas de su negocio y disenamos la arquitectura de software o red a la medida exacta.",
    badge: "A tu medida",
  },
  {
    icon: Cpu, accent: "#38bdf8",
    title: "Innovacion Tecnologica",
    desc: "Utilizamos stacks modernos de desarrollo, integracion de Inteligencia Artificial y redes preparadas para el futuro.",
    badge: "Stack moderno",
  },
  {
    icon: Headset, accent: "#a78bfa",
    title: "Soporte Permanente",
    desc: "Acompanamiento continuo remoto y presencial con respuesta oportuna para resolver cualquier incidencia con prioridad.",
    badge: "24/7 disponible",
  },
  {
    icon: ShieldCheck, accent: "#34d399",
    title: "Calidad Garantizada",
    desc: "Todos nuestros proyectos incluyen garantia explicita por escrito sobre el trabajo realizado y soporte posterior.",
    badge: "Garantia escrita",
  },
];

function CircuitBgDark() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <svg width="100%" height="100%" viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <defs>
          <style>{`
            .dc { fill: none; stroke: rgba(32,201,151,0.22); stroke-width: 1.2; }
            .do { fill: none; stroke: rgba(243,112,33,0.18); stroke-width: 1.2; }
            .db { fill: none; stroke: rgba(56,189,248,0.15); stroke-width: 1.2; }
            .dn { fill: rgba(32,201,151,0.30); }
            .dno { fill: rgba(243,112,33,0.28); }
            .dnb { fill: rgba(56,189,248,0.25); }
            @keyframes dpulse1 {
              0% { stroke-dashoffset: 450; opacity:0; }
              8% { opacity:1; }
              92% { opacity:1; }
              100% { stroke-dashoffset: 0; opacity:0; }
            }
            @keyframes dpulse2 {
              0% { stroke-dashoffset: 380; opacity:0; }
              8% { opacity:1; }
              92% { opacity:1; }
              100% { stroke-dashoffset: 0; opacity:0; }
            }
            @keyframes dpulse3 {
              0% { stroke-dashoffset: 520; opacity:0; }
              8% { opacity:1; }
              92% { opacity:1; }
              100% { stroke-dashoffset: 0; opacity:0; }
            }
            @keyframes dblinkN {
              0%,100% { opacity:0.15; }
              50% { opacity:1; }
            }
            .dp1 { stroke-dasharray:22 428; animation: dpulse1 4.5s linear infinite; }
            .dp2 { stroke-dasharray:18 362; animation: dpulse2 6s linear infinite 1.4s; }
            .dp3 { stroke-dasharray:20 500; animation: dpulse3 5.5s linear infinite 0.8s; }
            .dp4 { stroke-dasharray:16 364; animation: dpulse1 7s linear infinite 2.2s; }
            .dp5 { stroke-dasharray:22 498; animation: dpulse2 5s linear infinite 3.2s; }
            .dbn1 { animation: dblinkN 2.8s ease-in-out infinite; }
            .dbn2 { animation: dblinkN 3.5s ease-in-out infinite 0.9s; }
            .dbn3 { animation: dblinkN 2.2s ease-in-out infinite 1.6s; }
          `}</style>
        </defs>

        {/* grid lines */}
        <line x1="0" y1="100" x2="250" y2="100" className="dc" />
        <line x1="250" y1="100" x2="250" y2="220" className="dc" />
        <line x1="250" y1="220" x2="550" y2="220" className="dc" />
        <line x1="550" y1="220" x2="550" y2="100" className="dc" />
        <line x1="550" y1="100" x2="850" y2="100" className="dc" />
        <line x1="850" y1="100" x2="850" y2="300" className="dc" />
        <line x1="850" y1="300" x2="1400" y2="300" className="dc" />

        <line x1="0" y1="380" x2="160" y2="380" className="do" />
        <line x1="160" y1="380" x2="160" y2="520" className="do" />
        <line x1="160" y1="520" x2="420" y2="520" className="do" />
        <line x1="420" y1="520" x2="420" y2="380" className="do" />
        <line x1="420" y1="380" x2="700" y2="380" className="do" />
        <line x1="700" y1="380" x2="700" y2="620" className="do" />
        <line x1="700" y1="620" x2="1400" y2="620" className="do" />

        <line x1="1050" y1="0" x2="1050" y2="300" className="db" />
        <line x1="1050" y1="480" x2="1050" y2="700" className="db" />
        <line x1="1220" y1="0" x2="1220" y2="620" className="db" />

        <line x1="60" y1="0" x2="60" y2="220" className="dc" />
        <line x1="60" y1="220" x2="250" y2="220" className="dc" />

        <line x1="380" y1="0" x2="380" y2="100" className="do" />
        <line x1="680" y1="0" x2="680" y2="100" className="dc" />
        <line x1="500" y1="380" x2="500" y2="520" className="db" />
        <line x1="500" y1="520" x2="700" y2="520" className="db" />
        <line x1="1020" y1="300" x2="1020" y2="480" className="dc" />
        <line x1="1020" y1="480" x2="1400" y2="480" className="dc" />

        {/* nodes */}
        <circle cx="250" cy="100" r="3" className="dn" />
        <circle cx="250" cy="220" r="3" className="dn" />
        <circle cx="550" cy="100" r="3" className="dn" />
        <circle cx="550" cy="220" r="3" className="dn" />
        <circle cx="850" cy="100" r="3" className="dn" />
        <circle cx="850" cy="300" r="3" className="dn" />
        <circle cx="160" cy="380" r="3" className="dno" />
        <circle cx="160" cy="520" r="3" className="dno" />
        <circle cx="420" cy="380" r="3" className="dno" />
        <circle cx="420" cy="520" r="3" className="dno" />
        <circle cx="700" cy="380" r="3" className="dno" />
        <circle cx="700" cy="620" r="3" className="dno" />
        <circle cx="1050" cy="300" r="3" className="dnb" />
        <circle cx="1050" cy="480" r="3" className="dnb" />
        <circle cx="1020" cy="300" r="3" className="dn" />
        <circle cx="1020" cy="480" r="3" className="dn" />
        <circle cx="500" cy="380" r="3" className="dnb" />
        <circle cx="500" cy="520" r="3" className="dnb" />
        <circle cx="60" cy="220" r="3" className="dn" />
        <circle cx="380" cy="100" r="3" className="dno" />

        {/* blinking */}
        <circle cx="550" cy="100" r="3.5" className="dn dbn1" />
        <circle cx="850" cy="300" r="3.5" className="dno dbn2" />
        <circle cx="1050" cy="480" r="3.5" className="dnb dbn3" />
        <circle cx="420" cy="520" r="3.5" className="dno dbn1" />
        <circle cx="700" cy="380" r="3.5" className="dn dbn2" />

        {/* pulses */}
        <path d="M0,100 H250 V220 H550 V100 H850" fill="none"
          stroke="rgba(32,201,151,0.8)" strokeWidth="2" className="dp1" />
        <path d="M850,100 H1050 V300 H1400" fill="none"
          stroke="rgba(56,189,248,0.7)" strokeWidth="2" className="dp2" />
        <path d="M0,380 H160 V520 H420 V380 H700" fill="none"
          stroke="rgba(243,112,33,0.75)" strokeWidth="2" className="dp3" />
        <path d="M700,380 V620 H1400" fill="none"
          stroke="rgba(32,201,151,0.5)" strokeWidth="2" className="dp4" />
        <path d="M1020,300 V480 H1400" fill="none"
          stroke="rgba(56,189,248,0.6)" strokeWidth="2" className="dp5" />
      </svg>
    </div>
  );
}

function BenefitCard({ benefit, index }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = benefit.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 80}ms, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease`,
        background: hovered
          ? `linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? benefit.accent + "55" : "rgba(255,255,255,0.10)"}`,
        borderRadius: 20,
        padding: "28px 24px",
        backdropFilter: "blur(12px)",
        boxShadow: hovered
          ? `0 20px 48px -12px ${benefit.accent}25, inset 0 1px 0 rgba(255,255,255,0.12)`
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${benefit.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: `linear-gradient(135deg, ${benefit.accent}22, ${benefit.accent}10)`,
        border: `1px solid ${benefit.accent}35`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18,
        transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1)",
        transition: "transform 0.35s cubic-bezier(.175,.885,.32,1.275)",
        flexShrink: 0,
      }}>
        <Icon style={{ color: benefit.accent, width: 22, height: 22 }} />
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: 14, fontWeight: 800, color: "#f8fafc",
        marginBottom: 10, lineHeight: 1.3, textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}>
        {benefit.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontSize: 12.5, color: "rgba(203,213,225,0.80)",
        lineHeight: 1.65, margin: 0, flex: 1,
      }}>
        {benefit.desc}
      </p>

      {/* Badge */}
      <div style={{ marginTop: 20 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: benefit.accent,
          background: `${benefit.accent}18`,
          border: `1px solid ${benefit.accent}40`,
          borderRadius: 30,
          padding: "5px 12px",
          backdropFilter: "blur(4px)",
        }}>
          <CheckCircle2 style={{ width: 11, height: 11 }} />
          {benefit.badge}
        </span>
      </div>
    </div>
  );
}

export default function WhyChooseUs({ onOpenQuote }) {
  const [headerRef, headerVisible] = useReveal(0.1);
  const [ctaRef, ctaVisible] = useReveal(0.1);

  return (
    <section
      id="porque-slp"
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #0a1628 0%, #0f1e33 40%, #0d1a2e 100%)",
        padding: "100px 0",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <CircuitBgDark />

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(20px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .wcu-gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #94d2bd 40%, #20c997 70%, #f37021 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 6s linear infinite;
        }
        .wcu-cta-btn {
          transition: all 0.25s ease;
        }
        .wcu-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(243,112,33,0.45) !important;
        }
        @media (max-width: 640px) { .wcu-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 641px) and (max-width: 900px) { .wcu-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .wcu-grid { grid-template-columns: repeat(3,1fr) !important; } }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center", maxWidth: 620, margin: "0 auto 60px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.65s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 10, fontWeight: 800, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#f37021",
            padding: "5px 14px", borderRadius: 20,
            background: "rgba(243,112,33,0.10)",
            border: "1px solid rgba(243,112,33,0.25)",
            marginBottom: 14,
          }}>
            <Sparkles style={{ width: 11, height: 11 }} />
            Respaldo & Garantia
          </span>

          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.18 }}
            className="wcu-gradient-text">
            ¿Por que elegir SLP Soluciones Informaticas?
          </h2>

          <p style={{ fontSize: 13.5, color: "rgba(203,213,225,0.70)", lineHeight: 1.75, margin: 0 }}>
            Pilares estrategicos que diferencian nuestros servicios tecnologicos en el mercado.
          </p>
        </div>

        {/* Cards grid */}
        <div
          className="wcu-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 60 }}
        >
          {BENEFITS.map((b, i) => (
            <BenefitCard key={i} benefit={b} index={i} />
          ))}

          {/* CTA Card */}
          <div
            ref={ctaRef}
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
              transition: "all 0.55s cubic-bezier(.22,1,.36,1) 400ms",
              background: "linear-gradient(145deg, rgba(243,112,33,0.15) 0%, rgba(243,112,33,0.06) 100%)",
              border: "1px solid rgba(243,112,33,0.30)",
              borderRadius: 20,
              padding: "28px 24px",
              backdropFilter: "blur(12px)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, #f37021, #20c997, transparent)",
              borderRadius: "20px 20px 0 0",
            }} />

            <div>
              <span style={{
                fontSize: 9.5, fontWeight: 800, color: "#f37021",
                textTransform: "uppercase", letterSpacing: "0.16em",
                display: "block", marginBottom: 12,
              }}>
                Consulta Gratuita
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#f8fafc", margin: "0 0 12px", lineHeight: 1.35 }}>
                ¿Necesita evaluar su infraestructura actual?
              </h3>
              <p style={{ fontSize: 12, color: "rgba(203,213,225,0.72)", lineHeight: 1.65, margin: 0 }}>
                Auditamos su parque informatico, estado de red o requerimientos de software y entregamos un diagnostico inicial.
              </p>
            </div>

            <button
              onClick={onOpenQuote}
              className="wcu-cta-btn"
              style={{
                marginTop: 24, width: "100%",
                padding: "13px 0", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #f37021 0%, #d95d13 100%)",
                color: "#fff", fontSize: 11.5, fontWeight: 800,
                cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase",
                boxShadow: "0 6px 20px rgba(243,112,33,0.30)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              Solicitar Diagnostico
              <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
