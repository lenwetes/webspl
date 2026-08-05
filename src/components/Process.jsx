import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  PenTool,
  Code,
  Rocket,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Clock,
  UserCheck,
  Zap,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  FileCheck,
  Layers,
  Activity,
  Check,
  HelpCircle
} from "lucide-react";

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

const PROCESS_STEPS = [
  {
    id: "analisis",
    number: "01",
    phase: "FASE 1",
    title: "Descubrimiento & Análisis",
    subtitle: "Evaluación inicial y diagnóstico estratégico",
    image: "/step1.png",
    icon: Search,
    accent: "#20c997",
    accentBg: "rgba(32,201,151,0.12)",
    duration: "1 - 3 Días",
    desc: "Levantamiento riguroso de información técnica, auditoría de infraestructura previa y definición del alcance del proyecto.",
    activities: [
      "Entrevista técnica inicial y levantamiento detallado de requerimientos",
      "Auditoría de infraestructura, software o redes existentes",
      "Definición de KPIs técnicos, presupuesto y matriz de factibilidad"
    ],
    deliverable: "Documento de Especificación Técnica & Cotización Detallada",
    clientRole: "Proporcionar accesos de prueba e información del negocio",
    slpRole: "Líder de Proyecto & Consultor Senior de Diagnóstico"
  },
  {
    id: "diseno",
    number: "02",
    phase: "FASE 2",
    title: "Arquitectura & Diseño",
    subtitle: "Planificación estructural y prototipos UI/UX",
    image: "/step2.png",
    icon: PenTool,
    accent: "#f37021",
    accentBg: "rgba(243,112,33,0.12)",
    duration: "3 - 7 Días",
    desc: "Diseño de diagramas de arquitectura de software, APIs y esquemas de red o planos de videovigilancia CCTV antes del montaje.",
    activities: [
      "Diseño de prototipos interactivos UI/UX y wireframes de sistemas",
      "Esquema de base de datos, microservicios e integración de IA",
      "Planos de red estructurada Cat6, switches y videovigilancia IP"
    ],
    deliverable: "Blueprint Técnico Completo & Protótipo Visual Aprobado",
    clientRole: "Validación de flujos de usuario y aprobación de prototipos",
    slpRole: "Arquitecto de Software & Diseñador de Infraestructura"
  },
  {
    id: "desarrollo",
    number: "03",
    phase: "FASE 3",
    title: "Desarrollo & Montaje",
    subtitle: "Construcción modular y montaje físico",
    image: "/step3.png",
    icon: Code,
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.12)",
    duration: "1 - 3 Semanas",
    desc: "Programación con código limpio (React, Node, IA) o instalación física de cableado estructurado, servidores y cámaras IP.",
    activities: [
      "Desarrollo modular de software con versión en repositorio Git",
      "Montaje de cableado Cat6, racks, switches y cámaras de alta definición",
      "Integración de modelos de Inteligencia Artificial (Gemini / OpenAI)"
    ],
    deliverable: "Módulos de Software Compilados o Instalación Física Finalizada",
    clientRole: "Revisión periódica de demostraciones de avance (Demos en vivo)",
    slpRole: "Equipo Desarrollador & Técnicos de Campo Certificados"
  },
  {
    id: "despliegue",
    number: "04",
    phase: "FASE 4",
    title: "Despliegue & Pruebas QA",
    subtitle: "Control de calidad y puesta en marcha",
    image: "/step4.png",
    icon: Rocket,
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.12)",
    duration: "2 - 5 Días",
    desc: "Pruebas de estrés, seguridad y despliegue en entorno de producción junto con capacitación al personal de la empresa.",
    activities: [
      "Pruebas de penetración, seguridad de red y aseguramiento de calidad QA",
      "Puesta en producción en servidores Cloud/On-Premise y SSL",
      "Capacitación guiada al personal del cliente y entrega de manuales"
    ],
    deliverable: "Sistema 100% Operativo en Producción + Acta de Entrega",
    clientRole: "Pruebas de Aceptación del Usuario (UAT) y capacitación",
    slpRole: "Ingeniero QA & Especialista de Despliegue DevOps"
  },
  {
    id: "soporte",
    number: "05",
    phase: "FASE 5",
    title: "Soporte Continuo & IA",
    subtitle: "Garantía escrita y mantenimiento 24/7",
    image: "/step5.png",
    icon: Headphones,
    accent: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.12)",
    duration: "Soporte Activo / 24/7",
    desc: "Acompañamiento continuo, mantenimiento preventivo y atención prioritaria de incidencias vía PBX y WhatsApp.",
    activities: [
      "Monitoreo constante de salud de servidor e infraestructura de red",
      "Mantenimiento preventivo programado y limpieza de malware/equipos",
      "Soporte prioritario con atención directa por PBX / WhatsApp"
    ],
    deliverable: "Póliza de Soporte Técnico, Garantía Escrita y Reportes Mensuales",
    clientRole: "Reporte directo de requerimientos de mejora o incidencias",
    slpRole: "Mesa de Ayuda & Equipo de Soporte Técnico Especializado"
  }
];

export default function Process({ onOpenQuote }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [headerRef, headerVisible] = useReveal(0.1);

  // Auto-play timeline loop
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const current = PROCESS_STEPS[activeStep];

  return (
    <section
      id="proceso"
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "96px 0",
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden"
      }}
    >
      {/* Background ambient accents */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${current.accent}08 0%, transparent 70%)`,
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "background 0.6s ease"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(15,30,51,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <style>{`
        @keyframes float3D {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -40; }
        }
        .concept-card {
          transition: all 0.35s cubic-bezier(.22,1,.36,1);
        }
        .concept-card:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .img-3d-float {
          animation: float3D 5s ease-in-out infinite;
        }
        @media (max-width: 900px) {
          .concept-map-container {
            grid-template-columns: 1fr !important;
          }
          .concept-svg-line {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: 660,
            margin: "0 auto 56px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.65s cubic-bezier(.22,1,.36,1)"
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f37021",
              padding: "4px 14px",
              borderRadius: 20,
              background: "rgba(243,112,33,0.08)",
              border: "1px solid rgba(243,112,33,0.2)",
              marginBottom: 12
            }}
          >
            <Sparkles style={{ width: 11, height: 11 }} />
            Mapa Conceptual Interactivo
          </span>

          <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#0f1e33", margin: "8px 0 12px", lineHeight: 1.15 }}>
            Flujo de Ejecución
          </h2>

          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            Haga clic en cualquier nodo del mapa para explorar en detalle cada fase secuencial de nuestra metodología de trabajo.
          </p>

          {/* Auto-Play Controller */}
          <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 10 }}>
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 800,
                color: isAutoPlay ? "#20c997" : "#475569",
                background: isAutoPlay ? "rgba(32,201,151,0.12)" : "#f1f5f9",
                border: `1.5px solid ${isAutoPlay ? "#20c99750" : "#cbd5e1"}`,
                padding: "6px 16px",
                borderRadius: 20,
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              {isAutoPlay ? <Pause style={{ width: 13, height: 13 }} /> : <Play style={{ width: 13, height: 13 }} />}
              {isAutoPlay ? "Pausar Animación" : "Iniciar Recorrido Animado"}
            </button>
          </div>
        </div>

        {/* CONCEPT MAP SVG CONNECTOR & 5 NODES */}
        <div style={{ position: "relative", marginBottom: 48 }}>

          {/* Animated Connecting SVG Wires */}
          <svg
            className="concept-svg-line"
            width="100%"
            height="120"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 50,
              left: 0,
              right: 0,
              zIndex: 0,
              pointerEvents: "none"
            }}
          >
            <path
              d="M 120 60 C 300 10, 300 110, 480 60 C 660 10, 660 110, 840 60 C 1020 10, 1020 110, 1080 60"
              stroke="#e2e8f0"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
            <path
              d="M 120 60 C 300 10, 300 110, 480 60 C 660 10, 660 110, 840 60 C 1020 10, 1020 110, 1080 60"
              stroke={current.accent}
              strokeWidth="3"
              strokeDasharray="12 28"
              style={{ animation: "dashFlow 2s linear infinite" }}
            />
          </svg>

          {/* 5 CONCEPT MAP NODES GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 14,
              position: "relative",
              zIndex: 1
            }}
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="concept-card"
                  style={{
                    background: isActive
                      ? `linear-gradient(145deg, #ffffff 0%, ${step.accentBg} 100%)`
                      : "#ffffff",
                    border: `2px solid ${isActive ? step.accent : isPassed ? "#20c99760" : "#e2e8f0"}`,
                    borderRadius: 20,
                    padding: "16px 12px 14px",
                    cursor: "pointer",
                    textAlign: "center",
                    boxShadow: isActive
                      ? `0 16px 36px -8px ${step.accent}35, 0 4px 16px rgba(0,0,0,0.06)`
                      : "0 2px 12px rgba(15,30,51,0.05)",
                    position: "relative"
                  }}
                >
                  {/* Step Number Badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: -10,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 10,
                      fontWeight: 800,
                      color: isActive ? "#ffffff" : isPassed ? "#20c997" : "#64748b",
                      background: isActive ? step.accent : isPassed ? "#20c997" : "#f1f5f9",
                      padding: "2px 10px",
                      borderRadius: 12,
                      border: `1px solid ${isActive ? step.accent : isPassed ? "#20c997" : "#cbd5e1"}`,
                      boxShadow: isActive ? `0 4px 10px ${step.accent}40` : "none"
                    }}
                  >
                    NODO {step.number}
                  </span>

                  {/* 3D Image Icon Container */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      margin: "12px auto 8px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: -4,
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${step.accent}40 0%, transparent 70%)`,
                          animation: "pulseRing 2.5s infinite"
                        }}
                      />
                    )}
                    <img
                      src={step.image}
                      alt={step.title}
                      className={isActive ? "img-3d-float" : ""}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: isActive ? `drop-shadow(0 8px 16px ${step.accent}40)` : "grayscale(20%) opacity(0.85)",
                        transition: "all 0.3s ease"
                      }}
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <h4
                    style={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: isActive ? "#0f1e33" : "#334155",
                      margin: "0 0 4px",
                      lineHeight: 1.25
                    }}
                  >
                    {step.title}
                  </h4>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: isActive ? step.accent : "#94a3b8",
                      display: "block",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}
                  >
                    {step.phase}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* EXPANDED 3D CONCEPT MAP DETAIL STAGE */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            border: `2px solid ${current.accent}40`,
            boxShadow: `0 24px 60px -12px ${current.accent}25, 0 8px 24px rgba(0,0,0,0.04)`,
            padding: "36px 40px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Top accent glow line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${current.accent}, #0f1e33)`
            }}
          />

          <div
            className="concept-map-container"
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr 300px",
              gap: 32,
              alignItems: "center"
            }}
          >
            {/* Left Col: 3D Illustration Showcase */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 180,
                  height: 180,
                  margin: "0 auto",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: -10,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${current.accent}30 0%, transparent 70%)`
                  }}
                />
                <img
                  src={current.image}
                  alt={current.title}
                  className="img-3d-float"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: `drop-shadow(0 12px 24px ${current.accent}50)`
                  }}
                />
              </div>

              <span
                style={{
                  display: "inline-block",
                  marginTop: 12,
                  fontSize: 10,
                  fontWeight: 800,
                  color: current.accent,
                  background: current.accentBg,
                  padding: "4px 14px",
                  borderRadius: 20,
                  border: `1px solid ${current.accent}40`,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase"
                }}
              >
                {current.duration}
              </span>
            </div>

            {/* Middle Col: Phase Concept Breakdown */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#ffffff",
                    background: current.accent,
                    padding: "3px 10px",
                    borderRadius: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  NODO {current.number}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: current.accent }}>
                  {current.subtitle}
                </span>
              </div>

              <h3 style={{ fontSize: 24, fontWeight: 900, color: "#0f1e33", margin: "0 0 10px" }}>
                {current.title}
              </h3>

              <p style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.7, margin: "0 0 20px" }}>
                {current.desc}
              </p>

              {/* Checklist */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 10
                }}
              >
                Acciones de la Fase:
              </span>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {current.activities.map((act, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "#1e293b" }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: current.accentBg,
                        color: current.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}
                    >
                      <Check style={{ width: 11, height: 11 }} />
                    </div>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Col: Deliverable & Action Button */}
            <div
              style={{
                background: "linear-gradient(145deg, #0f1e33 0%, #162a45 100%)",
                borderRadius: 20,
                padding: "24px 20px",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(15,30,51,0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: current.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    display: "block",
                    marginBottom: 8
                  }}
                >
                  Entregable del Nodo
                </span>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", margin: "0 0 10px", lineHeight: 1.4 }}>
                  {current.deliverable}
                </h4>

                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
                  <strong style={{ color: "#e2e8f0" }}>Rol del Cliente: </strong>
                  {current.clientRole}
                </div>
              </div>

              <button
                onClick={() => onOpenQuote && onOpenQuote(`Fase: ${current.title}`)}
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: "12px 0",
                  borderRadius: 10,
                  border: "none",
                  background: current.accent,
                  color: "#ffffff",
                  fontSize: 11.5,
                  fontWeight: 800,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow: `0 6px 18px ${current.accent}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6
                }}
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
            <button
              onClick={() => setActiveStep((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length)}
              style={{
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 11.5,
                fontWeight: 700,
                color: "#475569",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              <ChevronLeft style={{ width: 14, height: 14 }} />
              Nodo Anterior
            </button>

            <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>
              Explorando Nodo {activeStep + 1} de {PROCESS_STEPS.length}
            </span>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length)}
              style={{
                background: current.accentBg,
                border: `1px solid ${current.accent}40`,
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 11.5,
                fontWeight: 700,
                color: current.accent,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4
              }}
            >
              Siguiente Nodo
              <ChevronRight style={{ width: 14, height: 14 }} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
