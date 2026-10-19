import React, { useState } from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import {
  UtensilsCrossed,
  ChefHat,
  TrendingUp,
  ShieldCheck,
  QrCode,
  Smartphone,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Monitor,
  Printer,
  Tablet,
  Check,
  ChevronRight,
  Users,
  Sparkles,
  Percent,
  FileSpreadsheet
} from 'lucide-react';

export default function RestoSLPPage({
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
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeAudience, setActiveAudience] = useState('dueno');

  const features = [
    {
      id: 'food-cost',
      title: 'Control de Costos (Food Cost en Tiempo Real)',
      shortTitle: 'Food Cost en Vivo',
      icon: DollarSign,
      image: '/restoslp/carrusel_food_cost.jpg',
      badge: 'Margen +68% Garantizado',
      color: '#20c997',
      copy: '¿Sabes cuánto ganaste en este plato hoy? RestoSLP calcula el food cost por porción exacta al instante.',
      highlights: [
        'Descuento automático de inventario por gramaje exacto de receta.',
        'Alertas tempranas de fluctuación de costos de materia prima.',
        'Margen de contribución neto calculado por plato en tiempo real.'
      ]
    },
    {
      id: 'kds-cocina',
      title: 'Cocina Eficiente (KDS con Semáforo SLA)',
      shortTitle: 'KDS Cocina SLA',
      icon: ChefHat,
      image: '/restoslp/carrusel_kds_cocina.jpg',
      badge: 'Cero Comandas Perdidas',
      color: '#f37021',
      copy: 'Cero comandas perdidas. Tiempos controlados por estación con KDS inteligente.',
      highlights: [
        'Semáforo visual SLA: Verde (En tiempo 4m), Ámbar (Atención 8m), Rojo (Urgente 14m).',
        'Separación modular automática por partidas: parrilla, freidora, barra y fríos.',
        'Eliminación de impresoras térmicas atascadas y ruido en la línea de despacho.'
      ]
    },
    {
      id: 'arqueo-ciego',
      title: 'Seguridad Financiera (Arqueo Ciego de Caja)',
      shortTitle: 'Arqueo Ciego',
      icon: ShieldCheck,
      image: '/restoslp/carrusel_arqueo_ciego.jpg',
      badge: 'Auditoría Inmutable',
      color: '#3b82f6',
      copy: 'Control sin confrontación. El cajero ingresa el dinero físico; el sistema detecta sobrantes y faltantes de forma automática.',
      highlights: [
        'El cajero desconoce el total del sistema hasta registrar el conteo físico.',
        'Bitácora inalterable de aperturas de cajón, cancelaciones y descuentos.',
        'Cierres de turno transparentes en menos de 3 minutos sin discusiones.'
      ]
    },
    {
      id: 'menu-qr',
      title: 'Menú QR Propio y Libre de Comisiones',
      shortTitle: 'Menú QR 0% Comisiones',
      icon: QrCode,
      image: '/restoslp/carrusel_menu_qr.jpg',
      badge: '0% Comisiones a Terceros',
      color: '#10b981',
      copy: 'Tu carta, tus clientes, tu margen. Olvídate del 30% de comisiones por pedidos digitales.',
      highlights: [
        'El cliente escanea, explora fotos reales en alta definición y pide directo a cocina.',
        'Actualización inmediata de precios, disponibilidad de platos y sugerencias.',
        'Ahorro directo de hasta el 30% de comisiones de plataformas intermediarias.'
      ]
    },
    {
      id: 'movilidad-meseros',
      title: 'Movilidad de Sala (Meseros con Interfaz Mobile-First)',
      shortTitle: 'Comandas Móviles',
      icon: Smartphone,
      image: '/restoslp/carrusel_movilidad_meseros.jpg',
      badge: 'Comandas en 3 Toques',
      color: '#8b5cf6',
      copy: 'Tomar comanda en 3 toques. Botones táctiles optimizados para servicio de alta velocidad.',
      highlights: [
        'Plano de mesas gráfico interactivo con estados (libre, ocupada, por cobrar).',
        'Modificadores rápidos en un toque: términos de carne, guarniciones y alérgenos.',
        'Transmisión instantánea por Wi-Fi de alta densidad directo a la estación de cocina.'
      ]
    },
    {
      id: 'copiloto-ia',
      title: 'Inteligencia de Negocio (Copiloto IA)',
      shortTitle: 'Copiloto IA',
      icon: Bot,
      image: '/restoslp/carrusel_copiloto_ia.jpg',
      badge: 'Decisiones Basadas en Datos',
      color: '#0ea5e9',
      copy: 'Tu gerente de operaciones con IA. Pregunta directo y toma decisiones con datos en tiempo real.',
      highlights: [
        'Consultas en lenguaje natural: "¿Cuál fue el plato con mayor margen este mes?".',
        'Detección predictiva de compras semanales para evitar quiebres de stock.',
        'Sugerencias automatizadas de combos y menú engineering rentable.'
      ]
    }
  ];

  const currentFeature = features[activeFeature];

  const audiences = [
    {
      id: 'dueno',
      role: 'Dueño / Inversionista',
      headline: 'Rentabilidad, métricas financieras en vivo y tranquilidad total de inversión.',
      image: '/restoslp/audiencia_dueno.jpg',
      desc: 'Monitorea las ventas de tu negocio desde cualquier lugar. Detecta en segundos el margen neto real, controla las fugas de dinero y supervisa la ocupación de mesas en tiempo real.',
      points: [
        'Métricas de EBITDA y ganancia neta en tu smartphone.',
        'Protección total contra desfalcos gracias al arqueo ciego.',
        'Ahorro del 30% de comisiones mediante pedidos QR propios.'
      ]
    },
    {
      id: 'chef',
      role: 'Chef / Jefe de Cocina',
      headline: 'Eficiencia extrema bajo presión, orden en el pase y control de tiempos SLA.',
      image: '/restoslp/audiencia_chef.jpg',
      desc: 'Despacha sin gritos ni papeles térmicos mojados. El KDS organiza automáticamente los pedidos por partidas y mide los tiempos de preparación por plato con semáforo SLA.',
      points: [
        'Pantallas táctiles KDS resistentes a calor, vapor y grasa.',
        'Priorización automática de órdenes por tiempo de espera.',
        'Control estricto de recetas y gramaje para mantener el sabor y costo.'
      ]
    },
    {
      id: 'administrador',
      role: 'Administrador / Contador',
      headline: 'Conciliación contable inmediata, bitácora inmutable y cuentas 100% claras.',
      image: '/restoslp/audiencia_administrador.jpg',
      desc: 'Olvídate de cuadrar facturas y hojas de cálculo a fin de mes. RestoSLP concilia automáticamente inventarios, compras de proveedores, métodos de pago y ventas.',
      points: [
        'Descarga de reportes contables e inventario en 1 clic.',
        'Auditoría inmutable de cancelaciones, cortesías y devoluciones.',
        'Integración con facturación electrónica y medios de pago.'
      ]
    }
  ];

  const currentAudience = audiences.find((a) => a.id === activeAudience) || audiences[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body">
      <PageHeader
        title="RestoSLP"
        breadcrumb="SOLUCIÓN GASTRONÓMICA // RESTOSLP"
        badgeText="Software Especializado para Restaurantes & Bares"
        bgImage="/restoslp/banner_ecosistema.jpg"
        subtitle="Sistema integral de gestión para restaurantes y gastro-bars. Del pedido en mesa al cuadre contable: cero fricción, cero fugas de dinero."
        onGoHome={onBack}
        onOpenQuote={() => onOpenQuote('RestoSLP Demo')}
        onOpenAbout={onOpenAbout}
        onOpenServices={onOpenServices}
        onOpenBlog={onOpenBlog}
        onOpenPortfolio={onOpenPortfolio}
        onOpenProcess={onOpenProcess}
        onOpenWhyChooseUs={onOpenWhyChooseUs}
        onOpenFAQ={onOpenFAQ}
        onOpenContact={onOpenContact}
      />

      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* MÓDULO 1: BANNER PRINCIPAL / INFOGRAFÍA DE ECOSISTEMA    */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-50 text-hostdime-orange border border-orange-200 mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ecosistema Integral Unificado
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-hostdime-navy leading-tight tracking-tight mb-4 font-display">
                  RestoSLP: La operación de tu restaurante en perfecta sincronía.
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                  Del pedido en mesa al cuadre contable: cero fricción, cero fugas de dinero. Conecta comanda móvil, cocina KDS, inventario por receta, delivery y caja en una sola plataforma en tiempo real.
                </p>

                {/* Stations pill list */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {[
                    'Comedor & Meseros Móviles',
                    'Cocina KDS con Semáforo SLA',
                    'Caja con Arqueo Ciego',
                    'Almacén con Food Cost en Vivo',
                    'Menú QR sin Comisiones',
                    'Copiloto de Gerencia con IA'
                  ].map((station, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{station}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenQuote('Demostración RestoSLP')}
                    className="btn-hostdime-orange py-3.5 px-7 text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    <span>Solicitar Demostración en Vivo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#carrusel-bondades"
                    className="btn-hostdime-navy py-3.5 px-6 text-xs uppercase flex items-center justify-center gap-2"
                  >
                    Explorar Módulos
                  </a>
                </div>
              </div>

              {/* Diagram Right */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-2xl bg-slate-900 group">
                  <img
                    src="/restoslp/banner_ecosistema.jpg"
                    alt="RestoSLP Diagrama Operativo de Ecosistema Integral"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-extrabold block">
                        Arquitectura Unificada
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-100">
                        RestoSLP Núcleo Central: Sincronización instantánea de cada estación
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      100% en Vivo
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MÓDULO 2: CARRUSEL DE BONDES OPERATIVAS (6 ACTIVOS)       */}
        {/* ========================================================= */}
        <section id="carrusel-bondades" className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
                Suite Operativa Especializada
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-hostdime-navy font-display tracking-tight mb-3">
                6 Bondades Operativas Diseñadas para tu Rentabilidad
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Herramientas creadas específicamente para resolver las pérdidas, demoras y desórdenes diarios en el sector gastronómico.
              </p>
            </div>

            {/* Feature Selectors Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {features.map((feat, idx) => {
                const isActive = activeFeature === idx;
                const Icon = feat.icon;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeature(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-hostdime-navy text-white shadow-md scale-105'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? '#f37021' : feat.color }} />
                    <span>{feat.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Feature Detail Showcase Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10 transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Square Asset (1:1) */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg w-full max-w-[480px] aspect-square bg-slate-900 group">
                    <img
                      src={currentFeature.image}
                      alt={currentFeature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-900/85 backdrop-blur-md text-white border border-white/20">
                      {currentFeature.badge}
                    </div>
                  </div>
                </div>

                {/* Content Breakdown */}
                <div className="lg:col-span-6">
                  <span
                    className="inline-block text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                    style={{ background: `${currentFeature.color}18`, color: currentFeature.color }}
                  >
                    Módulo Operativo {activeFeature + 1} de {features.length}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mb-3">
                    {currentFeature.title}
                  </h3>

                  <blockquote className="p-4 rounded-xl bg-orange-50 border-l-4 border-hostdime-orange text-slate-800 text-sm font-semibold mb-6">
                    "{currentFeature.copy}"
                  </blockquote>

                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">
                    Impacto Operativo Comprobado:
                  </h4>

                  <ul className="space-y-3 mb-8">
                    {currentFeature.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${currentFeature.color}20`, color: currentFeature.color }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onOpenQuote(`RestoSLP Módulo: ${currentFeature.title}`)}
                      className="btn-hostdime-orange py-3 px-6 text-xs uppercase flex items-center justify-center gap-2"
                    >
                      <span>Cotizar este Módulo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveFeature((prev) => (prev + 1) % features.length)}
                      className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold uppercase transition-all"
                    >
                      Siguiente Módulo
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* MÓDULO 3: INFOGRAFÍA COMPARATIVA (RESTOSLP VS TRADICIONAL)*/}
        {/* ========================================================= */}
        <section className="py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
                Diferenciación Radical
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-hostdime-navy font-display tracking-tight mb-3">
                RestoSLP vs. Sistemas Tradicionales
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                ¿Por qué los restaurantes líderes están migrando de sistemas anticuados con cobros ocultos por terminal a la arquitectura unificada de RestoSLP?
              </p>
            </div>

            {/* Split Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Traditional Systems (Left) */}
              <div className="rounded-3xl border-2 border-red-100 bg-red-50/30 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-100">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 block">
                        Soluciones Anticuadas
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-display">
                        Sistemas Tradicionales
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      Caos & Fugas
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      { title: 'Costos abusivos por terminal', desc: 'Cobros recurrentes por cada tablet o computador conectado en tu local.' },
                      { title: 'Inventario desfasado', desc: 'Conteo manual que no descuenta ingredientes al momento de la venta.' },
                      { title: 'Reportes solo a fin de mes', desc: 'Te enteras de si ganaste o perdiste semanas después de ocurrido el gasto.' },
                      { title: 'Comandas de papel extraviadas', desc: 'Papeles térmicos borrosos, demoras en cocina y reclamos de clientes en sala.' },
                      { title: 'Descuadre recurrente de caja', desc: 'El cajero ve el saldo del sistema y manipula faltantes o sobrantes antes del cierre.' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs font-bold text-slate-900 block">{item.title}</strong>
                          <span className="text-xs text-slate-600 leading-relaxed">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-red-100/60 text-red-900 text-xs font-bold text-center">
                  Resultado: Pérdida silenciosa de hasta el 8% de las ventas en mermas y fuga de dinero.
                </div>
              </div>

              {/* RestoSLP (Right) */}
              <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50/20 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-6 py-1 rounded-bl-xl tracking-wider">
                  Recomendado
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-emerald-200">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 block">
                        Ingeniería SLP
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-display">
                        RestoSLP Core
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Control Total
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {[
                      { title: 'Arquitectura unificada sin cobro por terminal', desc: 'Conecta todas las tablets, KDS y cajas de tu restaurante sin cargos extras.' },
                      { title: 'Descuento automático por receta', desc: 'Cada venta deduce gramo a gramo la materia prima de tu almacén en tiempo real.' },
                      { title: 'Auditoría y finanzas en tiempo real', desc: 'EBITDA, food cost y ventas consultables minuto a minuto desde tu móvil.' },
                      { title: 'KDS digital con semáforos SLA', desc: 'Tiempos controlados en cocina: pedidos organizados sin errores ni papeles.' },
                      { title: 'Arqueo ciego inmutable', desc: 'El cajero cuenta a ciegas; el sistema audita diferencias sin margen de trampa.' }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs font-bold text-slate-900 block">{item.title}</strong>
                          <span className="text-xs text-slate-600 leading-relaxed">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center shadow-md">
                  Resultado: Retorno de inversión en menos de 45 días y rentabilidad blindada.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MÓDULO 4: MENSAJES POR AUDIENCIA (SEGMENTACIÓN B2B)       */}
        {/* ========================================================= */}
        <section className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
                Impacto para tu Equipo
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-hostdime-navy font-display tracking-tight mb-3">
                Diseñado para Cada Rol Estratégico
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Desde la junta directiva hasta la línea de fuego en cocina y el cierre contable.
              </p>
            </div>

            {/* Audience Tabs */}
            <div className="flex justify-center gap-3 mb-10">
              {audiences.map((aud) => (
                <button
                  key={aud.id}
                  onClick={() => setActiveAudience(aud.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all ${
                    activeAudience === aud.id
                      ? 'bg-hostdime-orange text-white shadow-lg shadow-orange-500/25 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {aud.role}
                </button>
              ))}
            </div>

            {/* Audience Card Display */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12">
                
                {/* Photo Left */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-video bg-slate-900">
                    <img
                      src={currentAudience.image}
                      alt={currentAudience.role}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-hostdime-navy/90 text-white text-xs font-bold border border-white/20">
                      {currentAudience.role}
                    </span>
                  </div>
                </div>

                {/* Content Right */}
                <div className="lg:col-span-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-hostdime-navy font-display mb-4">
                    {currentAudience.headline}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {currentAudience.desc}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {currentAudience.points.map((pt, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onOpenQuote(`RestoSLP para ${currentAudience.role}`)}
                    className="btn-hostdime-navy py-3 px-6 text-xs uppercase flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Asesoría para {currentAudience.role.split('/')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* MÓDULO 5: HARDWARE GASTRONÓMICO & SOFTWARE EN SITUACIÓN REAL */}
        {/* ========================================================= */}
        <section className="py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
                Equipamiento & Compatibilidad
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-hostdime-navy font-display tracking-tight mb-3">
                Hardware Robusto + Software Intuitivo
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                RestoSLP opera sobre hardware comercial estándar sin atarte a marcas exclusivas ni rentas forzosas de equipos.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Hardware List (Left) */}
              <div className="lg:col-span-5 space-y-4">
                {[
                  {
                    icon: Monitor,
                    title: 'Terminal All-in-One POS 15"',
                    desc: 'Pantallas táctiles capacitivas de grado comercial para caja rápida y despacho.'
                  },
                  {
                    icon: Tablet,
                    title: 'Tablets Android / iOS para Meseros',
                    desc: 'Cualquier tablet de 8" a 10" para comandas inalámbricas ultra rápidas.'
                  },
                  {
                    icon: ChefHat,
                    title: 'Monitores KDS Industriales para Cocina',
                    desc: 'Displays de 21" a 24" con soporte VESA resistentes al vapor y temperatura.'
                  },
                  {
                    icon: Printer,
                    title: 'Impresoras Térmicas ESC/POS (80mm/58mm)',
                    desc: 'Conexión directa por red Ethernet, Wi-Fi o USB para comandas y facturas.'
                  },
                  {
                    icon: QrCode,
                    title: 'Stands QR de Acrílico o Madera para Mesas',
                    desc: 'Códigos QR grabados en alta durabilidad vinculados a la carta digital interactiva.'
                  }
                ].map((hw, idx) => {
                  const Icon = hw.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-hostdime-orange flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold uppercase text-slate-900 mb-1">
                          {hw.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {hw.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hardware Photo Right */}
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 shadow-2xl bg-slate-900 group">
                  <img
                    src="/restoslp/mockup_hardware_software.jpg"
                    alt="Mockup de Hardware y Software RestoSLP"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white">
                    <span className="text-[10px] uppercase font-extrabold text-orange-400 tracking-wider block">
                      Instalación Llave en Mano
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-100">
                      Proveemos el hardware instalado y configurado con red estructurada o adaptamos tus equipos existentes.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* CTA FINAL: DEMOSTRACIÓN & COTIZACIÓN                      */}
        {/* ========================================================= */}
        <section className="py-20 bg-gradient-to-br from-hostdime-navy via-slate-900 to-slate-950 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Empieza Hoy Mismo
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight mb-6">
              Transforma la Operación de tu Restaurante con RestoSLP
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Agenda una demostración personalizada de 20 minutos con nuestros consultores gastronómicos. Te mostraremos cómo blindar tus márgenes y eliminar pérdidas desde la primera semana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onOpenQuote('RestoSLP Demo Completa')}
                className="btn-hostdime-orange py-4 px-9 text-xs sm:text-sm uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-orange-500/30"
              >
                <span>Agendar Demo Personalizada</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onBack}
                className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold uppercase transition-all"
              >
                Volver al Sitio Principal
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenQuote={() => onOpenQuote('RestoSLP')} onOpenAdmin={() => {}} />
    </div>
  );
}
