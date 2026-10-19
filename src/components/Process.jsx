import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  PenTool,
  Code,
  Rocket,
  Headphones,
  ArrowRight,
  Clock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Check,
  ShieldCheck,
  Layers,
  Cpu
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
    image: "/process_step1.jpg",
    icon: Search,
    accent: "#20c997",
    accentBg: "rgba(32,201,151,0.12)",
    accentBorder: "rgba(32,201,151,0.35)",
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
    image: "/process_step2.jpg",
    icon: PenTool,
    accent: "#f37021",
    accentBg: "rgba(243,112,33,0.12)",
    accentBorder: "rgba(243,112,33,0.35)",
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
    image: "/process_step3.jpg",
    icon: Code,
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.12)",
    accentBorder: "rgba(32,130,246,0.35)",
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
    image: "/process_step4.jpg",
    icon: Rocket,
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.12)",
    accentBorder: "rgba(139,92,246,0.35)",
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
    image: "/process_step5.jpg",
    icon: Headphones,
    accent: "#0ea5e9",
    accentBg: "rgba(14,165,233,0.12)",
    accentBorder: "rgba(14,165,233,0.35)",
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

export default function Process({ onOpenQuote, compact = false, onViewFull }) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [headerRef, headerVisible] = useReveal(0.1);
  const touchStartX = useRef(null);

  // Auto-play timeline loop with progress bar (always active)
  useEffect(() => {
    const duration = 6000;
    const intervalTime = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalTime;
      setProgress(Math.min((elapsed / duration) * 100, 100));

      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStep]);

  const current = PROCESS_STEPS[activeStep];
  const CurrentIcon = current.icon;

  const handlePrev = () => {
    setProgress(0);
    setActiveStep((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);
  };

  const handleNext = () => {
    setProgress(0);
    setActiveStep((prev) => (prev + 1) % PROCESS_STEPS.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="proceso"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)",
        padding: "80px 0 96px",
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden"
      }}
    >
      {/* Background ambient lighting */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${current.accent}12 0%, transparent 70%)`,
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "background 0.8s ease"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(15,30,51,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <style>{`
        .process-slider-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .process-nav-btn {
          transition: all 0.25s ease;
        }
        .process-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .step-pill-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .step-pill-btn:hover {
          transform: translateY(-2px);
        }
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-fade-in {
          animation: fadeInSlide 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 960px) {
          .process-grid-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .process-image-box {
            height: 280px !important;
          }
          .process-tabs-row {
            overflow-x: auto;
            justify-content: flex-start !important;
            padding-bottom: 12px;
            scrollbar-width: none;
          }
          .process-tabs-row::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto 40px",
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
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f37021",
              padding: "5px 16px",
              borderRadius: 20,
              background: "rgba(243,112,33,0.08)",
              border: "1px solid rgba(243,112,33,0.22)",
              marginBottom: 12
            }}
          >
            <Sparkles style={{ width: 12, height: 12 }} />
            Metodología & Flujo de Ejecución
          </span>

          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#0f1e33", margin: "8px 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Cómo Convertimos Ideas en Sistemas de Alto Rendimiento
          </h2>

          <p style={{ fontSize: 14.5, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            Proceso ágil, predecible y transparente en 5 fases secuenciales con entregables técnicos garantizados y monitoreo continuo.
          </p>
        </div>

        {/* STEPPER TABS NAVIGATION */}
        <div
          className="process-tabs-row"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 28,
            position: "relative"
          }}
        >
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => {
                  setProgress(0);
                  setActiveStep(idx);
                }}
                className="step-pill-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 16,
                  border: `1.5px solid ${isActive ? step.accent : "#e2e8f0"}`,
                  background: isActive
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(8px)",
                  boxShadow: isActive
                    ? `0 10px 24px -6px ${step.accent}35, 0 2px 6px rgba(0,0,0,0.04)`
                    : "0 2px 6px rgba(0,0,0,0.02)",
                  cursor: "pointer",
                  flexShrink: 0,
                  outline: "none"
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: isActive ? step.accent : "#f1f5f9",
                    color: isActive ? "#ffffff" : "#64748b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease"
                  }}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: isActive ? step.accent : "#94a3b8",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase"
                    }}
                  >
                    Fase {step.number}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: isActive ? "#0f1e33" : "#475569",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {step.title.split("&")[0].trim()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* PROGRESS BAR TIMER */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto 20px",
            height: 3,
            background: "#e2e8f0",
            borderRadius: 6,
            overflow: "hidden",
            position: "relative"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: current.accent,
              transition: "width 0.05s linear",
              borderRadius: 6
            }}
          />
        </div>

        {/* MAIN SLIDER SHOWCASE CARD */}
        <div
          key={current.id}
          className="process-slider-card slide-fade-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: 24,
            border: `1.5px solid ${current.accentBorder}`,
            boxShadow: `0 24px 60px -15px ${current.accent}25, 0 8px 30px rgba(15,30,51,0.06)`,
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Top highlight bar */}
          <div
            style={{
              height: 4,
              width: "100%",
              background: `linear-gradient(90deg, ${current.accent}, #0f1e33)`
            }}
          />

          <div
            className="process-grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 36,
              padding: "36px 36px 32px",
              alignItems: "center"
            }}
          >
            {/* Visual Side: AI Image with HUD badges */}
            <div
              className="process-image-box"
              style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                height: 380,
                background: "#0f1e33",
                boxShadow: "0 12px 32px rgba(15, 30, 51, 0.12)"
              }}
            >
              <img
                src={current.image}
                alt={current.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease"
                }}
              />
              {/* Gradient Overlay for contrast */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(15,30,51,0.2) 0%, rgba(15,30,51,0.65) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* Floating Badge: Phase */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 30,
                  background: "rgba(15, 30, 51, 0.75)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${current.accent}60`,
                  color: "#ffffff"
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: current.accent,
                    boxShadow: `0 0 10px ${current.accent}`
                  }}
                />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {current.phase} // NODO {current.number}
                </span>
              </div>

              {/* Floating Badge: Duration */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 30,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  color: "#0f1e33",
                  fontSize: 11,
                  fontWeight: 800
                }}
              >
                <Clock style={{ width: 13, height: 13, color: current.accent }} />
                <span>{current.duration}</span>
              </div>

              {/* Floating Bottom Deliverable pill */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(15, 30, 51, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff"
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: current.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 2
                  }}
                >
                  Entregable Garantizado
                </span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#f8fafc", lineHeight: 1.3, display: "block" }}>
                  {current.deliverable}
                </span>
              </div>
            </div>

            {/* Content Side: Explanation & Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: current.accent,
                      background: current.accentBg,
                      padding: "3px 10px",
                      borderRadius: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em"
                    }}
                  >
                    {current.subtitle}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    fontWeight: 900,
                    color: "#0f1e33",
                    margin: "0 0 10px",
                    lineHeight: 1.2
                  }}
                >
                  {current.title}
                </h3>

                <p
                  style={{
                    fontSize: 13.5,
                    color: "#475569",
                    lineHeight: 1.65,
                    margin: "0 0 20px"
                  }}
                >
                  {current.desc}
                </p>

                {/* Key Activities Checklist */}
                <div style={{ marginBottom: 20 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      display: "block",
                      marginBottom: 10
                    }}
                  >
                    Actividades de la fase:
                  </span>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8
                    }}
                  >
                    {current.activities.map((act, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 12.5,
                          color: "#1e293b",
                          lineHeight: 1.45
                        }}
                      >
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
                            flexShrink: 0,
                            marginTop: 1
                          }}
                        >
                          <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                        </div>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Team synergy row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    marginBottom: 20
                  }}
                >
                  <div>
                    <span style={{ display: "block", fontSize: 9.5, fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                      Equipo SPL
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0f1e33" }}>
                      {current.slpRole}
                    </span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: 9.5, fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                      Rol del Cliente
                    </span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: "#334155" }}>
                      {current.clientRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenQuote && onOpenQuote(`Fase: ${current.title}`)}
                className="process-nav-btn"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: current.accent,
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  boxShadow: `0 6px 18px ${current.accent}45`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                <span>Cotizar Proyecto // Fase {current.number}</span>
                <ArrowRight style={{ width: 15, height: 15 }} />
              </button>
            </div>
          </div>

          {/* SLIDER CONTROLS FOOTER */}
          <div
            style={{
              padding: "14px 36px",
              background: "#f8fafc",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12
            }}
          >
            {/* Step Counter Indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: current.accent,
                  background: current.accentBg,
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${current.accentBorder}`,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase"
                }}
              >
                Fase {activeStep + 1} de {PROCESS_STEPS.length}
              </span>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {PROCESS_STEPS.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setProgress(0);
                      setActiveStep(idx);
                    }}
                    style={{
                      height: 8,
                      width: isActive ? 24 : 8,
                      borderRadius: 4,
                      background: isActive ? current.accent : "#cbd5e1",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.25s ease"
                    }}
                    aria-label={`Ir a fase ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={handlePrev}
                className="process-nav-btn"
                style={{
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: 10,
                  padding: "7px 14px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <ChevronLeft style={{ width: 14, height: 14 }} />
                <span>Anterior</span>
              </button>

              <button
                onClick={handleNext}
                className="process-nav-btn"
                style={{
                  background: current.accent,
                  border: "none",
                  borderRadius: 10,
                  padding: "7px 16px",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: `0 4px 12px ${current.accent}40`
                }}
              >
                <span>Siguiente</span>
                <ChevronRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>

        {/* CTA en caso de modo compacto */}
        {compact && onViewFull && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button
              onClick={onViewFull}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #f37021 0%, #d95d13 100%)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 8px 24px rgba(243,112,33,0.3)",
                transition: "all 0.25s ease"
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px) scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0) scale(1)")}
            >
              <span>Ver Metodología Completa & Entregables</span>
              <ArrowRight style={{ width: 15, height: 15 }} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
