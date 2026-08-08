import React, { useState } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import {
  HelpCircle,
  ChevronDown,
  Search,
  PhoneCall,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Mail,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Phone,
  MessageCircle,
  X
} from 'lucide-react';

const FAQ_FULL_DATA = [
  {
    id: 1,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Realizan soporte técnico remoto e in situ?",
    a: "Sí. Prestamos soporte remoto inmediato para resolver incidencias de software, redes, configuración de sistemas y optimización sin necesidad de esperar desplazamiento físico. Además, para problemas de hardware o infraestructura de red, programamos visitas presenciales prioritarias.",
    badge: "Soporte 24/7",
    helpfulCount: 24
  },
  {
    id: 2,
    category: "software",
    categoryLabel: "Desarrollo & IA",
    q: "¿Desarrollan software personalizado e integración de IA?",
    a: "Sí. Creamos soluciones completamente adaptadas a las necesidades de cada empresa: desde sistemas web empresariales (ERP/CRM) y apps móviles hasta automatización de procesos operativos e integración de inteligencia artificial (OpenAI / Gemini / Bots WhatsApp).",
    badge: "Código a Medida",
    helpfulCount: 31
  },
  {
    id: 3,
    category: "infraestructura",
    categoryLabel: "Redes & CCTV",
    q: "¿Instalan cámaras de seguridad y cableado estructurado?",
    a: "Sí. Instalamos, configuramos y brindamos mantenimiento a sistemas de videovigilancia CCTV con cámaras IP HD/4K, servidores NVR y monitoreo móvil remoto en tiempo real. También realizamos cableado estructurado Cat6/Cat6A certificado.",
    badge: "CCTV & Redes",
    helpfulCount: 19
  },
  {
    id: 4,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Trabajan con pequeñas, medianas y grandes empresas?",
    a: "Sí. Atendemos desde emprendedores y negocios locales hasta grandes organizaciones corporativas. Adaptamos nuestras soluciones al presupuesto, escala y complejidad específica de cada cliente.",
    badge: "Escalable",
    helpfulCount: 28
  },
  {
    id: 5,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Ofrecen planes de mantenimiento preventivo mensual?",
    a: "Sí. Contamos con pólizas preventivas periódicas para optimizar el rendimiento de la infraestructura tecnológica, realizar limpieza profunda de malware/polvo, copias de seguridad de datos y evitar caídas inesperadas.",
    badge: "Mantenimiento",
    helpfulCount: 15
  },
  {
    id: 6,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Brindan garantía por escrito en sus trabajos?",
    a: "Sí. Todos nuestros proyectos de desarrollo de software, instalaciones de red y sistemas de seguridad electrónica incluyen garantía explícita por escrito, actas de conformidad técnica y acompañamiento post-entrega.",
    badge: "Garantía Escrita",
    helpfulCount: 42
  },
  {
    id: 7,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Cuánto tiempo toma el desarrollo de un proyecto?",
    a: "El tiempo depende del alcance específico. Tras la fase inicial de análisis y levantamiento de requerimientos, entregamos un cronograma detallado con entregas modulares (Demos en vivo) y fechas claras de lanzamiento.",
    badge: "Cronograma Claro",
    helpfulCount: 17
  },
  {
    id: 8,
    category: "software",
    categoryLabel: "Desarrollo & IA",
    q: "¿Pueden mejorar o refactorizar un software existente?",
    a: "Sí. Auditamos el código o sistema actual para refactorizarlo, corregir errores de arquitectura, mejorar la velocidad de carga, agregarle nuevas funcionalidades o integrarle modelos de Inteligencia Artificial.",
    badge: "Refactorización",
    helpfulCount: 22
  },
  {
    id: 9,
    category: "soporte",
    categoryLabel: "Soporte Técnico",
    q: "¿Atienden solicitudes fuera de su ciudad de origen?",
    a: "Sí. Combinamos soporte remoto en tiempo real vía software especializado con visitas presenciales programadas en la región según los requerimientos del proyecto.",
    badge: "Cobertura Nacional",
    helpfulCount: 12
  },
  {
    id: 10,
    category: "comercial",
    categoryLabel: "Comercial & Proyectos",
    q: "¿Cómo solicitar una cotización formal?",
    a: "Puede comunicarse directamente por teléfono al PBX 321 445 1817, enviarnos un mensaje de WhatsApp o utilizar nuestro formulario interactivo de cotización para recibir presupuesto en menos de 24 horas.",
    badge: "Cotización Inmediata",
    helpfulCount: 39
  }
];

const CATEGORIES = [
  { id: "todos", label: "Todas las Preguntas" },
  { id: "soporte", label: "Soporte Técnico" },
  { id: "software", label: "Desarrollo & IA" },
  { id: "infraestructura", label: "Redes & CCTV" },
  { id: "comercial", label: "Comercial & Garantía" }
];

export default function FAQPage({
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
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [helpfulFeedback, setHelpfulFeedback] = useState({});

  const filteredFaqs = FAQ_FULL_DATA.filter((item) => {
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFeedback = (id, type) => {
    setHelpfulFeedback(prev => ({ ...prev, [id]: type }));
  };

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
        title="Preguntas Frecuentes"
        breadcrumb="FAQ"
        badgeText="Centro de Respuestas Rápidas"
        bgImage="/banner-faq.png"
        subtitle="Respuestas directas y transparentes sobre nuestro modelo de trabajo, soporte continuo, desarrollo e infraestructura."
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
          
          {/* Header & Interactive Search Bar */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 mb-3 inline-block">
              Base de Conocimiento TI
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">
              ¿En Qué Podemos Ayudarte Hoy?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Encuentra soluciones rápidas sobre nuestros servicios, metodología, tiempos de entrega y pólizas de soporte.
            </p>

            {/* Interactive Search Field */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar (ej. soporte remoto, desarrollo, cámaras, cotización)..."
                className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium shadow-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = cat.id === "todos" ? FAQ_FULL_DATA.length : FAQ_FULL_DATA.filter(f => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQs Accordion Grid */}
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-12">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No se encontraron resultados</h3>
              <p className="text-slate-500 text-xs mb-6">Prueba buscando con otros términos como "soporte", "desarrollo" o "redes".</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("todos"); }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Limpiar Búsqueda
              </button>
            </div>
          ) : (
            <div className="space-y-4 mb-20 max-w-4xl mx-auto">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;
                const userFeedback = helpfulFeedback[faq.id];

                return (
                  <div
                    key={faq.id}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-emerald-500/80 shadow-lg ring-1 ring-emerald-500/20'
                        : 'border-slate-200/90 shadow-sm hover:border-slate-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 bg-transparent cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {faq.id}
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block mb-0.5">
                            {faq.categoryLabel} · {faq.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                            {faq.q}
                          </h3>
                        </div>
                      </div>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-in fade-in duration-200">
                        <p className="mb-4">{faq.a}</p>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">¿Te fue útil esta respuesta?</span>
                            <button
                              onClick={() => handleFeedback(faq.id, 'yes')}
                              className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                                userFeedback === 'yes'
                                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Sí ({faq.helpfulCount + (userFeedback === 'yes' ? 1 : 0)})</span>
                            </button>
                            <button
                              onClick={() => handleFeedback(faq.id, 'no')}
                              className={`p-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                                userFeedback === 'no'
                                  ? 'bg-rose-100 border-rose-300 text-rose-800 font-bold'
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>No</span>
                            </button>
                          </div>

                          <button
                            onClick={() => onOpenQuote(`Pregunta FAQ #${faq.id}: ${faq.q}`)}
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                          >
                            <span>Consultar sobre este tema</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════ INTERACTIVE DIRECT ASSISTANCE BANNER ════ */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-xl flex-shrink-0">
                <MessageSquare className="w-8 h-8 text-slate-950" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-white">¿No encontraste la respuesta a tu inquietud?</h4>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  Llámanos a nuestro PBX <strong>321 445 1817</strong> o escríbenos directamente por WhatsApp para recibir atención personalizada de un Ingeniero de Sistemas.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto relative z-10">
              <a
                href="https://wa.me/573214451817"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directo</span>
              </a>
              <button
                onClick={() => onOpenQuote()}
                className="btn-hostdime-orange px-6 py-3.5 text-xs uppercase tracking-wider font-black whitespace-nowrap shadow-xl hover:scale-105 transition-transform"
              >
                Solicitar Cotización
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
