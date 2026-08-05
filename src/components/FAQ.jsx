import React, { useState, useEffect, useRef } from "react";
import { HelpCircle, ChevronDown, Search, PhoneCall, Sparkles, MessageSquare, ShieldCheck, Mail, ArrowRight } from "lucide-react";

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

const FAQ_DATA = [
  {
    id: 1,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Realizan soporte técnico remoto?",
    a: "Sí. Prestamos soporte remoto inmediato para resolver incidencias de software, redes, configuración de sistemas y optimización sin necesidad de esperar desplazamiento físico."
  },
  {
    id: 2,
    category: "software",
    categoryLabel: "Desarrollo & IA",
    q: "¿Desarrollan software personalizado?",
    a: "Sí. Creamos soluciones completamente adaptadas a las necesidades de cada empresa: desde sistemas web empresariales y apps móviles hasta automatización de procesos y bases de datos con IA."
  },
  {
    id: 3,
    category: "infraestructura",
    categoryLabel: "Redes & CCTV",
    q: "¿Instalan cámaras de seguridad?",
    a: "Sí. Instalamos, configuramos y damos mantenimiento preventivo a sistemas de videovigilancia CCTV con cámaras IP HD, grabadores DVR/NVR y monitoreo remoto en el celular."
  },
  {
    id: 4,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Trabajan con empresas pequeñas?",
    a: "Sí. Atendemos desde emprendedores y negocios locales hasta grandes organizaciones. Adaptamos nuestras soluciones al presupuesto y escala de cada cliente."
  },
  {
    id: 5,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Ofrecen mantenimiento preventivo?",
    a: "Sí. Contamos con planes preventivos periódicos para optimizar el rendimiento de la infraestructura tecnológica, evitando caídas inesperadas de equipos o red."
  },
  {
    id: 6,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Brindan garantía por escrito?",
    a: "Sí. Todos nuestros proyectos de software, redes e instalaciones de seguridad incluyen garantía explícita sobre el trabajo realizado y soporte posterior."
  },
  {
    id: 7,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Cuánto tarda un proyecto?",
    a: "El tiempo depende del alcance específico. Tras la fase inicial de análisis, entregamos un cronograma detallado con fechas de entrega claras por etapas."
  },
  {
    id: 8,
    category: "software",
    categoryLabel: "Desarrollo & IA",
    q: "¿Pueden mejorar un software existente?",
    a: "Sí, siempre que sea técnicamente viable. Auditamos el código o sistema actual para refactorizarlo, agregarle nuevas funciones o integrarle Inteligencia Artificial."
  },
  {
    id: 9,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Atienden fuera de su ciudad?",
    a: "Sí. Combinamos soporte remoto continuo con visitas presenciales programadas según las exigencias del proyecto."
  },
  {
    id: 10,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Cómo solicitar una cotización?",
    a: "Puede comunicarse directamente por teléfono al 321 445 1817, por correo a slps.soluciones.informaticas@gmail.com o hacer clic en nuestro botón de 'Solicitar Cotización'."
  }
];

const CATEGORIES = [
  { id: "todos", label: "Todas las Preguntas" },
  { id: "soporte", label: "Soporte & Equipos" },
  { id: "software", label: "Software & IA" },
  { id: "infraestructura", label: "Redes & CCTV" },
  { id: "comercial", label: "Comercial & Garantía" }
];

export default function FAQ({ onOpenQuote }) {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [headerRef, headerVisible] = useReveal(0.1);
  const [gridRef, gridVisible] = useReveal(0.1);

  const filtered = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Split items into 2 horizontal balanced columns
  const midPoint = Math.ceil(filtered.length / 2);
  const col1 = filtered.slice(0, midPoint);
  const col2 = filtered.slice(midPoint);

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #0a1628 0%, #0f1e33 50%, #0d1a2e 100%)",
        padding: "100px 0",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}
    >
      {/* Background ambient glowing spheres & subtle grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(32,201,151,0.08) 0%, transparent 70%)",
            top: "-100px",
            right: "-100px"
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 550,
            height: 550,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,112,33,0.06) 0%, transparent 70%)",
            bottom: "-100px",
            left: "-100px"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      <style>{`
        .faq-card {
          transition: all 0.3s ease;
        }
        .faq-card:hover {
          border-color: rgba(32,201,151,0.4) !important;
          box-shadow: 0 12px 30px -8px rgba(32,201,151,0.18) !important;
        }
        .faq-cat-btn {
          transition: all 0.22s ease;
        }
        .faq-cat-btn:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .faq-horizontal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto 48px",
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
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#f37021",
              padding: "5px 14px",
              borderRadius: 20,
              background: "rgba(243,112,33,0.10)",
              border: "1px solid rgba(243,112,33,0.25)",
              marginBottom: 14
            }}
          >
            <Sparkles style={{ width: 11, height: 11 }} />
            Centro de Respuestas Rápidas
          </span>

          <h2
            style={{
              fontSize: "clamp(26px,4vw,40px)",
              fontWeight: 900,
              color: "#ffffff",
              margin: "0 0 14px",
              lineHeight: 1.18
            }}
          >
            Preguntas Frecuentes (FAQ)
          </h2>

          <p style={{ fontSize: 13.5, color: "rgba(203,213,225,0.75)", lineHeight: 1.7, margin: "0 0 28px" }}>
            Respuestas directas y transparentes sobre nuestro modelo de trabajo, soporte continuo, desarrollo e infraestructura.
          </p>

          {/* Dark Glass Search Bar */}
          <div style={{ position: "relative", maxWidth: 480, margin: "0 auto" }}>
            <Search
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 18,
                height: 18,
                color: "#20c997"
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar (ej. soporte remoto, desarrollo, cámaras, cotización)..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 48px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.14)",
                color: "#ffffff",
                fontSize: 13,
                outline: "none",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
                transition: "all 0.25s ease"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#20c997")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
            />
          </div>
        </div>

        {/* Category Filters Pill Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 44 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="faq-cat-btn"
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 18px",
                borderRadius: 30,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                border: activeCategory === cat.id ? "1.5px solid #20c997" : "1.5px solid rgba(255,255,255,0.12)",
                background: activeCategory === cat.id ? "rgba(32,201,151,0.15)" : "rgba(255,255,255,0.04)",
                color: activeCategory === cat.id ? "#20c997" : "#cbd5e1",
                boxShadow: activeCategory === cat.id ? "0 4px 14px rgba(32,201,151,0.2)" : "none",
                backdropFilter: "blur(8px)"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* HORIZONTAL 2-COLUMN GRID OF DARK FAQ CARDS */}
        <div
          ref={gridRef}
          className="faq-horizontal-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 52,
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.65s cubic-bezier(.22,1,.36,1)"
          }}
        >
          {/* Column 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {col1.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="faq-card"
                  style={{
                    background: isOpen
                      ? "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                      : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${isOpen ? "#20c99780" : "rgba(255,255,255,0.10)"}`,
                    borderRadius: 18,
                    overflow: "hidden",
                    backdropFilter: "blur(12px)",
                    boxShadow: isOpen ? "0 12px 32px -8px rgba(32,201,151,0.2)" : "none"
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    style={{
                      width: "100%",
                      padding: "20px 22px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 800,
                          color: "#20c997",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          display: "block",
                          marginBottom: 4
                        }}
                      >
                        {faq.categoryLabel}
                      </span>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", margin: 0, lineHeight: 1.35 }}>
                        {faq.q}
                      </h3>
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: isOpen ? "#20c997" : "rgba(255,255,255,0.08)",
                        color: isOpen ? "#ffffff" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <ChevronDown
                        style={{
                          width: 16,
                          height: 16,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 22px 20px",
                        fontSize: 12.5,
                        color: "rgba(203,213,225,0.85)",
                        lineHeight: 1.65,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        paddingTop: 14
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {col2.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="faq-card"
                  style={{
                    background: isOpen
                      ? "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
                      : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${isOpen ? "#f3702180" : "rgba(255,255,255,0.10)"}`,
                    borderRadius: 18,
                    overflow: "hidden",
                    backdropFilter: "blur(12px)",
                    boxShadow: isOpen ? "0 12px 32px -8px rgba(243,112,33,0.2)" : "none"
                  }}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    style={{
                      width: "100%",
                      padding: "20px 22px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 800,
                          color: "#f37021",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          display: "block",
                          marginBottom: 4
                        }}
                      >
                        {faq.categoryLabel}
                      </span>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", margin: 0, lineHeight: 1.35 }}>
                        {faq.q}
                      </h3>
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: isOpen ? "#f37021" : "rgba(255,255,255,0.08)",
                        color: isOpen ? "#ffffff" : "#94a3b8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <ChevronDown
                        style={{
                          width: 16,
                          height: 16,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 22px 20px",
                        fontSize: 12.5,
                        color: "rgba(203,213,225,0.85)",
                        lineHeight: 1.65,
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        paddingTop: 14
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Direct Support Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(243,112,33,0.12) 0%, rgba(32,201,151,0.08) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 20,
            padding: "28px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            backdropFilter: "blur(12px)"
          }}
        >
          <div>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#f37021", textTransform: "uppercase", letterSpacing: "0.12em", display: "block", marginBottom: 4 }}>
              ¿Necesita una solución personalizada?
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: 0 }}>
              ¿Tiene una consulta técnica o requiere diagnóstico?
            </h3>
            <p style={{ fontSize: 12.5, color: "rgba(203,213,225,0.75)", margin: "4px 0 0" }}>
              Llámenos directamente al PBX 321 445 1817 o envíenos sus requerimientos.
            </p>
          </div>

          <button
            onClick={() => onOpenQuote && onOpenQuote("Consulta desde FAQ")}
            style={{
              padding: "13px 28px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #f37021 0%, #d95d13 100%)",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              boxShadow: "0 8px 24px rgba(243,112,33,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease"
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span>Solicitar Cotización</span>
            <ArrowRight style={{ width: 15, height: 15 }} />
          </button>
        </div>

      </div>
    </section>
  );
}
