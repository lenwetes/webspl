import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Code2, Bot, Network, Video, Wrench, CheckCircle2, Play, Pause, Headphones, Database, Activity, Radio, Cpu, Zap } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-14px) scale(1.03)`;
  };

  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  const slides = [
    {
      id: 'software-ia',
      badge: 'Software & Inteligencia Artificial',
      title: 'Desarrollo de Software a Medida e IA Integrada',
      description: 'Impulsamos la transformación tecnológica de su empresa con aplicaciones web, sistemas móviles, automatización de procesos, chatbots 24/7 y soluciones predictivas.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
      tag: 'Especialidad SLP',
    },
    {
      id: 'redes-cctv',
      badge: 'Telecomunicaciones & Seguridad',
      title: 'Infraestructura de Redes & Videovigilancia CCTV',
      description: 'Diseño, cableado estructurado Cat6A/Fibra, instalación de cámaras IP con grabación NVR/DVR, switches administrables y soporte de seguridad física.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1920&q=80',
      tag: 'Ingeniería de Redes',
    },
    {
      id: 'soporte-consultoria',
      badge: 'Soporte TI 24/7',
      title: 'Mantenimiento de Cómputo & Asistencia Técnica',
      description: 'Servicio técnico preventivo y correctivo de hardware/software, diagnóstico de fallas en sitio o remoto, formateo y venta de equipos de cómputo.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80',
      tag: 'Garantía Directa',
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="inicio" className="relative z-20 hostdime-hero-bg text-white pt-28 pb-36 border-b border-slate-800">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 hostdime-hero-grid opacity-40 pointer-events-none overflow-hidden" />

      {/* BACKGROUND SLIDER IMAGES WITH TRANSITION */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-30 scale-105 transition-transform duration-10000' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80" />
          </div>
        ))}
      </div>

      {/* HERO SLIDER CONTENT OVERLAY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Top Controls Overlay */}
        <div className="flex items-center justify-end mb-8 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-slate-900/70 hover:bg-slate-800 text-amber-400 border border-slate-700 backdrop-blur-md transition-colors"
              title={isPlaying ? 'Pausar Carrusel' : 'Reproducir Carrusel'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Slide Content */}
        <div className="min-h-[380px] flex flex-col justify-center max-w-3xl">
          
          {/* Animated Badge */}
          <div key={`badge-${currentSlide}`} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white font-extrabold text-xs tracking-wider uppercase mb-5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>{slides[currentSlide].badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-1" />
          </div>

          {/* Animated Main Title */}
          <h1 key={`title-${currentSlide}`} className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {slides[currentSlide].title}
          </h1>

          {/* Animated Description */}
          <p key={`desc-${currentSlide}`} className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 font-normal max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            {slides[currentSlide].description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenQuote(slides[currentSlide].title)}
              className="btn-hostdime-orange px-8 py-4 text-xs uppercase tracking-widest flex items-center gap-3 shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
            >
              <span>Solicitar Cotización Inmediata</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#servicios"
              className="px-6 py-4 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs uppercase font-bold tracking-wider backdrop-blur-md transition-colors"
            >
              Explorar Todos los Servicios
            </a>
          </div>

        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-800/80">
          
          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-10 bg-hostdime-orange shadow-lg shadow-orange-500/50'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Ir al slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md transition-all active:scale-95"
              aria-label="Anterior Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md transition-all active:scale-95"
              aria-label="Siguiente Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* 3D DARK-TECH OVERLAPPING MODULE CARDS AT THE BOTTOM (FLOATING OVERLAPPED ON BOTH SECTIONS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative -mb-44 mt-12 z-40 perspective-1000">
          
          {/* Card 1: Software & IA */}
          <div 
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="hostdime-card-dark card-glow-purple flex flex-col justify-between group cursor-pointer"
          >
            <div className="p-7">
              
              {/* Header with Graphic Micro-Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0 card-icon-3d">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold uppercase text-white tracking-tight">
                      SOFTWARE & IA
                    </h3>
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Desarrollo a Medida</span>
                  </div>
                </div>

                {/* Animated Graphic Indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-[9px] font-bold text-purple-300">
                  <Cpu className="w-3 h-3 text-purple-400 animate-pulse" />
                  <span>IA READY</span>
                </div>
              </div>

              {/* Decorative Tech Graphic Line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-purple-500/50 via-purple-500/20 to-transparent mb-5" />

              {/* Items List with Custom Icons */}
              <ul className="space-y-3 text-xs text-slate-300 mb-2">
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Desarrollo Web & Apps Móviles</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Chatbots & Integración de IA</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Automatización & Bases de Datos</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button Ribbon */}
            <button
              onClick={() => onOpenQuote('Desarrollo de Software')}
              className="hostdime-ribbon-purple py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all group-hover:px-7"
            >
              <span>Cotización a Medida</span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] underline">Ver Más</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Card 2: Redes & CCTV */}
          <div 
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="hostdime-card-dark card-glow-orange flex flex-col justify-between group cursor-pointer"
          >
            <div className="p-7">
              
              {/* Header with Graphic Micro-Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-hostdime-orange border border-orange-500/30 flex items-center justify-center flex-shrink-0 card-icon-3d">
                    <Network className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold uppercase text-white tracking-tight">
                      REDES & CCTV
                    </h3>
                    <span className="text-[10px] font-bold text-hostdime-orange uppercase tracking-wider">Infraestructura TI</span>
                  </div>
                </div>

                {/* Animated Graphic Indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-[9px] font-bold text-orange-300">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>REC 4K LIVE</span>
                </div>
              </div>

              {/* Decorative Tech Graphic Line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-orange-500/50 via-orange-500/20 to-transparent mb-5" />

              {/* Items List with Custom Icons */}
              <ul className="space-y-3 text-xs text-slate-300 mb-2">
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Network className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Cableado Estructurado Cat6A</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Cámaras IP & NVR / DVR</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-orange-950/80 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Switches, Routers & Firewalls</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button Ribbon */}
            <button
              onClick={() => onOpenQuote('Videovigilancia (CCTV)')}
              className="hostdime-ribbon-orange py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all group-hover:px-7"
            >
              <span>Haz tu Cotización</span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] underline">Consultar</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Card 3: Soporte & Consultoría */}
          <div 
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            className="hostdime-card-dark card-glow-teal flex flex-col justify-between group cursor-pointer"
          >
            <div className="p-7">
              
              {/* Header with Graphic Micro-Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-hostdime-teal border border-teal-500/30 flex items-center justify-center flex-shrink-0 card-icon-3d">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-extrabold uppercase text-white tracking-tight">
                      SOPORTE TI 24/7
                    </h3>
                    <span className="text-[10px] font-bold text-hostdime-teal uppercase tracking-wider">Asistencia Técnica</span>
                  </div>
                </div>

                {/* Animated Graphic Indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-teal-500/30 text-[9px] font-bold text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>24/7 ACTIVE</span>
                </div>
              </div>

              {/* Decorative Tech Graphic Line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-teal-500/50 via-teal-500/20 to-transparent mb-5" />

              {/* Items List with Custom Icons */}
              <ul className="space-y-3 text-xs text-slate-300 mb-2">
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Soporte Remoto & Presencial</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Mantenimiento Preventivo Físico</span>
                </li>
                <li className="flex items-center gap-2.5 group/item">
                  <div className="w-6 h-6 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-slate-200">Venta & Configuración de Equipos</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button Ribbon */}
            <button
              onClick={() => onOpenQuote('Soporte Técnico Especializado')}
              className="hostdime-ribbon-teal py-3.5 px-6 font-extrabold text-xs uppercase tracking-wider flex items-center justify-between transition-all group-hover:px-7"
            >
              <span>Garantía Explícita</span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] underline">Ver Detalles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
