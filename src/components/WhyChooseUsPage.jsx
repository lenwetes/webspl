import React, { useState, useEffect } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import {
  Award,
  Sliders,
  Cpu,
  Headset,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Zap,
  Check,
  Clock,
  Shield,
  FileCheck,
  ChevronRight,
  TrendingUp,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const GOLD   = '#c59b46';
const PURPLE = '#7c3aed';
const TEAL   = '#0d9488';
const ORANGE = '#e07020';

const DETAILED_BENEFITS = [
  {
    id: "experiencia",
    icon: Award,
    accent: TEAL,
    title: "Experiencia Profesional Certificada",
    badge: "Ingeniería de Sistemas",
    shortDesc: "Años de trayectoria resolviendo problemas complejos de TI para empresas y emprendedores.",
    longDesc: "Contamos con dirección técnica liderada por el Ing. Sergio Pérez, combinando formación universitaria rigurosa, certificaciones de la industria y más de una década en el diseño de soluciones tecnológicas críticas.",
    capabilities: [
      "Auditoría y diagnóstico de infraestructura existente",
      "Arquitectura de software empresarial escalable",
      "Gestión de proyectos bajo metodologías ágiles",
      "Cumplimiento de estándares de seguridad y normativas TI"
    ],
    metrics: [
      { label: "Experiencia", value: "+10 Años" },
      { label: "Proyectos", value: "+300 Exitosos" },
      { label: "Satisfacción", value: "99.8%" }
    ]
  },
  {
    id: "personalizadas",
    icon: Sliders,
    accent: ORANGE,
    title: "Soluciones A La Medida Exacta",
    badge: "Cero Plantillas Genéricas",
    shortDesc: "Analizamos las necesidades únicas de su negocio y diseñamos la arquitectura exacta requerida.",
    longDesc: "No creemos en soluciones 'talla única'. Cada empresa posee procesos únicos; por ello, diseñamos cada módulo de software, red o sistema CCTV adaptado 100% a sus flujos operativos.",
    capabilities: [
      "Levantamiento de requerimientos personalizado",
      "Desarrollo de módulos a medida para su industria",
      "Integración fluida con bases de datos y software previo",
      "Escalabilidad garantizada para el crecimiento futuro"
    ],
    metrics: [
      { label: "Adaptabilidad", value: "100% Custom" },
      { label: "Integración", value: "API REST / GraphQL" },
      { label: "Flexibilidad", value: "Modular" }
    ]
  },
  {
    id: "innovacion",
    icon: Cpu,
    accent: '#0ea5e9',
    title: "Innovación Tecnológica & IA",
    badge: "Stack de Vanguardia",
    shortDesc: "Utilizamos stacks modernos de desarrollo, Inteligencia Artificial y redes preparadas para el futuro.",
    longDesc: "Implementamos tecnologías de última generación como React, Node.js, Python e integración con modelos de Inteligencia Artificial (OpenAI / Gemini) para automatizar procesos y optimizar decisiones.",
    capabilities: [
      "Integración de agentes conversacionales IA (WhatsApp / Web)",
      "Procesamiento de datos en tiempo real y automatización",
      "Redes preparadas para Wi-Fi 6 y alto tráfico de datos",
      "Seguridad perimetral y encriptación de extremo a extremo"
    ],
    metrics: [
      { label: "Tecnología", value: "Modern Stack" },
      { label: "Inteligencia", value: "IA Nactiva" },
      { label: "Disponibilidad", value: "High Uptime" }
    ]
  },
  {
    id: "soporte",
    icon: Headset,
    accent: PURPLE,
    title: "Soporte Permanente & Prioritario",
    badge: "Respuesta < 30 Minutos",
    shortDesc: "Acompañamiento continuo remoto y presencial con respuesta oportuna para resolver cualquier incidencia.",
    longDesc: "Le garantizamos que ante cualquier eventualidad no estará solo. Nuestro equipo brinda atención inmediata vía PBX, WhatsApp y soporte remoto de primera línea sin demoras excesivas.",
    capabilities: [
      "Mesa de ayuda directa por teléfono y WhatsApp",
      "Diagnóstico remoto inmediato y asistencia en sitio",
      "Mantenimiento preventivo programado periódico",
      "Pólizas de soporte ajustadas al tamaño de su empresa"
    ],
    metrics: [
      { label: "Tiempo PBX", value: "< 30 Min" },
      { label: "Atención", value: "24/7 Disponible" },
      { label: "Modalidad", value: "Remoto & In Situ" }
    ]
  },
  {
    id: "garantia",
    icon: ShieldCheck,
    accent: GOLD,
    title: "Calidad & Garantía Por Escrito",
    badge: "Respaldo Contractual",
    shortDesc: "Todos nuestros proyectos incluyen garantía explícita por escrito sobre el trabajo realizado.",
    longDesc: "Transparencia absoluta. Entregamos actas de conformidad, documentación técnica completa y póliza de garantía explícita en cada instalación de software, red o seguridad electrónica.",
    capabilities: [
      "Garantía contractual escrita por cada entregable",
      "Actas de entrega con pruebas de funcionamiento",
      "Capacitación guiada al personal usuario",
      "Soporte post-entrega sin costos ocultos"
    ],
    metrics: [
      { label: "Garantía", value: "100% Escrita" },
      { label: "Documentación", value: "Completa" },
      { label: "Transparencia", value: "Sin Sorpresas" }
    ]
  }
];

const COMPARISON_ITEMS = [
  {
    factor: "Garantía de Servicio",
    slp: "100% Garantía por escrito con actas de entrega",
    traditional: "Garantía limitada de palabra o sin contrato",
    highlight: true
  },
  {
    factor: "Tiempo de Respuesta",
    slp: "Atención directa < 30 min por PBX y WhatsApp",
    traditional: "Respuesta en 24 a 48 horas mediante sistema de tickets",
    highlight: true
  },
  {
    factor: "Soluciones de Software",
    slp: "Desarrollo a medida con arquitectura moderna y limpia",
    traditional: "Plantillas prehechas genéricas difíciles de adaptar",
    highlight: false
  },
  {
    factor: "Inteligencia Artificial",
    slp: "Integración nativa de IA (OpenAI / Gemini / Bots)",
    traditional: "Sin capacidades ni experiencia en integración de IA",
    highlight: false
  },
  {
    factor: "Atención Profesional",
    slp: "Directamente gestionada por Ingeniero de Sistemas titular",
    traditional: "Atención delegada a pasantes o intermediarios",
    highlight: true
  },
  {
    factor: "Infraestructura & Redes",
    slp: "Cableado estructurado Cat6A certificado y Wi-Fi 6 Mesh",
    traditional: "Instalaciones de red informales sin certificación ANSI/TIA",
    highlight: false
  }
];

function BenefitDetailModal({ benefit, onClose, onQuote }) {
  if (!benefit) return null;
  const IconComponent = benefit.icon;

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-200 p-6 sm:p-8"
        style={{ borderTop: `4px solid ${benefit.accent}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
            style={{ background: benefit.accent }}
          >
            <IconComponent className="w-7 h-7" />
          </div>
          <div>
            <span
              className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border mb-1 inline-block"
              style={{ background: `${benefit.accent}12`, borderColor: `${benefit.accent}40`, color: benefit.accent }}
            >
              {benefit.badge}
            </span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {benefit.title}
            </h3>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {benefit.longDesc}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {benefit.metrics.map((m, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{m.label}</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 mt-0.5 block">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Capabilities List */}
        <div className="mb-6">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
            Alcance del Pilar:
          </h4>
          <div className="space-y-2.5">
            {benefit.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: benefit.accent }} />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            Cerrar Ventana
          </button>
          <button
            onClick={() => { onClose(); onQuote(`Consulta Pilar: ${benefit.title}`); }}
            className="w-full sm:w-auto px-7 py-3 rounded-xl text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
            style={{ background: benefit.accent }}
          >
            <span>Solicitar Asesoría de este Pilar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default function WhyChooseUsPage({
  onBack,
  onOpenQuote,
  onOpenAbout,
  onOpenServices,
  onOpenBlog,
  onOpenPortfolio,
  onOpenProcess,
  onOpenWhyChooseUs,
  onOpenFAQ,
  onOpenContact
}) {
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body relative overflow-hidden">
      
      {/* Background Animated Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 right-10 w-[650px] h-[550px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -left-20 w-[600px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-20 right-1/4 w-[550px] h-[450px] bg-teal-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Page Header */}
      <PageHeader
        title="¿Por qué SLP?"
        breadcrumb="¿POR QUÉ SLP?"
        badgeText="Respaldo & Garantía TI"
        bgImage="/banner-whychooseus.png"
        subtitle="Pilares estratégicos que diferencian nuestros servicios tecnológicos en el mercado regional."
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

      {/* Main Content (Light Theme) */}
      <main className="flex-grow py-12 md:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Description Block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 inline-block">
              Valores Diferenciadores
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
              Ingeniería de Sistemas Orientada a Resultados Reales
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Haz clic en cualquiera de nuestros pilares para explorar en detalle cómo garantizamos la calidad, disponibilidad y protección de tu empresa.
            </p>
          </div>

          {/* 5 Symmetrical Interactive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {DETAILED_BENEFITS.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  onClick={() => setSelectedBenefit(benefit)}
                  className="group bg-white rounded-3xl p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
                    style={{ background: benefit.accent }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                        style={{ background: benefit.accent }}
                      >
                        <IconComponent className="w-7 h-7" />
                      </div>

                      <span
                        className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border"
                        style={{ background: `${benefit.accent}12`, borderColor: `${benefit.accent}30`, color: benefit.accent }}
                      >
                        {benefit.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {benefit.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {benefit.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black" style={{ color: benefit.accent }}>
                    <span className="flex items-center gap-1">
                      <span>Ver Detalles & Alcance</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              );
            })}

            {/* Diagnostic CTA Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-2">
                  Diagnóstico Gratuito
                </span>
                <h3 className="text-xl font-black text-white mb-3">
                  ¿Necesitas evaluar tu infraestructura actual?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Auditamos tu parque informático, estado de red o requerimientos de software y entregamos un diagnóstico inicial.
                </p>
              </div>

              <button
                onClick={() => onOpenQuote("Diagnóstico Inicial de Infraestructura")}
                className="btn-hostdime-orange w-full py-3.5 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                <span>Solicitar Diagnóstico</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ════ COMPARISON TABLE SECTION ════ */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700">
                Comparativa de Valor
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 mb-2">
                ¿Por qué las Empresas Eligen a SLP?
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Compara las ventajas de nuestro modelo de ingeniería frente a proveedores tradicionales.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-4 px-4 text-xs font-black uppercase text-slate-400 tracking-wider">Factor de Evaluación</th>
                    <th className="py-4 px-4 text-xs font-black uppercase text-teal-700 bg-teal-500/10 rounded-t-xl">SLP Soluciones Informáticas</th>
                    <th className="py-4 px-4 text-xs font-black uppercase text-slate-500">Proveedores Tradicionales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ITEMS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 text-xs sm:text-sm font-bold text-slate-900">
                        {item.factor}
                      </td>
                      <td className="py-4 px-4 text-xs sm:text-sm font-extrabold text-teal-700 bg-teal-500/5">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{item.slp}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs sm:text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <X className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{item.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ════ GUARANTEE BADGE BANNER ════ */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-xl flex-shrink-0">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">Compromiso & Garantía Total</h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Si buscas un socio tecnológico confiable que respalde tus operaciones por escrito y responda sin rodeos, estamos para servirte.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenQuote()}
              className="btn-hostdime-orange px-8 py-4 text-xs uppercase tracking-wider font-black whitespace-nowrap shadow-xl hover:scale-105 transition-transform relative z-10"
            >
              Hablar con un Especialista
            </button>
          </div>

        </div>
      </main>

      {/* Benefit Detail Modal */}
      {selectedBenefit && (
        <BenefitDetailModal
          benefit={selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
          onQuote={(pilarTitle) => { setSelectedBenefit(null); onOpenQuote(pilarTitle); }}
        />
      )}

      {/* Footer */}
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
