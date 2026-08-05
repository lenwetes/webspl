import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Headphones, Wifi, Cpu, ArrowUpRight, Zap, Star, TrendingUp } from 'lucide-react';

const stats = [
  {
    number: 100,
    suffix: '%',
    label: 'Garantía',
    title: 'Proyectos con Garantía Escrita',
    desc: 'Todos nuestros desarrollos e instalaciones cuentan con respaldo técnico sobre la entrega.',
    icon: ShieldCheck,
    gradient: 'from-amber-500 via-orange-500 to-orange-600',
    glow: 'rgba(245,158,11,0.4)',
    border: 'border-amber-500/30',
    pulse: 'bg-amber-500/20',
    bar: 'from-amber-400 to-orange-500',
  },
  {
    number: '24',
    suffix: '/7',
    label: 'Siempre Activo',
    title: 'Soporte Remoto & Monitoreo',
    desc: 'Respuesta inmediata a incidencias para mantener sus sistemas en pleno rendimiento.',
    icon: Headphones,
    gradient: 'from-purple-500 via-violet-500 to-violet-600',
    glow: 'rgba(139,92,246,0.4)',
    border: 'border-violet-500/30',
    pulse: 'bg-violet-500/20',
    bar: 'from-purple-400 to-violet-500',
  },
  {
    number: 99.9,
    suffix: '%',
    label: 'Uptime',
    title: 'Uptime & Estabilidad en Redes',
    desc: 'Infraestructura de red estructurada diseñada para cero caídas operativas.',
    icon: Wifi,
    gradient: 'from-teal-400 via-emerald-500 to-green-500',
    glow: 'rgba(20,184,166,0.4)',
    border: 'border-teal-500/30',
    pulse: 'bg-teal-500/20',
    bar: 'from-teal-400 to-emerald-500',
  },
  {
    number: 100,
    suffix: '%',
    label: 'A Medida',
    title: 'Soluciones a Medida Exacta',
    desc: 'Software y redes configuradas según las necesidades específicas de su negocio.',
    icon: Cpu,
    gradient: 'from-sky-400 via-cyan-500 to-blue-500',
    glow: 'rgba(14,165,233,0.4)',
    border: 'border-cyan-500/30',
    pulse: 'bg-cyan-500/20',
    bar: 'from-sky-400 to-cyan-500',
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const numericTarget = typeof target === 'number' ? target : parseFloat(target);
        const duration = 1800;
        const steps = 50;
        const increment = numericTarget / steps;
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(current + increment, numericTarget);
          setCount(numericTarget % 1 !== 0 ? current.toFixed(1) : Math.round(current));
          if (current >= numericTarget) clearInterval(interval);
        }, duration / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = typeof target === 'string' ? target : count;

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export default function StatsBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      
      {/* PREMIUM DARK BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0d1b2e] to-slate-900" />
      
      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] rounded-full bg-teal-500/8 blur-[80px] pointer-events-none" />

      {/* Animated Horizontal Beam Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-5">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Cifras que Avalan Nuestro Trabajo</span>
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Resultados que <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">hablan por sí solos</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto">
            SLP Soluciones Informáticas — cifras verificadas con cada proyecto entregado.
          </p>
        </div>

        {/* 4-Column Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border ${item.border} bg-white/[0.04] backdrop-blur-sm p-7 flex flex-col gap-5 hover:bg-white/[0.07] transition-all duration-500 cursor-default overflow-hidden`}
                style={{ '--glow': item.glow }}
              >
                
                {/* Ambient glow on hover via pseudo (via box-shadow) */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  style={{ boxShadow: `inset 0 0 60px ${item.glow}` }} />

                {/* Top Row: Icon + Label Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${item.pulse} border ${item.border} text-[9px] font-black uppercase tracking-wider text-white`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.bar} animate-pulse`} />
                    {item.label}
                  </div>
                </div>

                {/* Counter */}
                <div className={`font-black text-5xl sm:text-6xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent leading-none tracking-tighter`}>
                  <AnimatedCounter target={item.number} suffix={item.suffix} />
                </div>

                {/* Divider Gradient Bar */}
                <div className={`h-0.5 rounded-full bg-gradient-to-r ${item.bar} opacity-60`} />

                {/* Title & Description */}
                <div>
                  <h3 className="font-display font-bold text-white text-sm mb-1.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* CTA Micro Link */}
                <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 -mt-1 transition-opacity duration-300`}>
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Ver detalles</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </div>

                {/* Corner Decorative Glow Node */}
                <div className={`absolute -top-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br ${item.gradient} opacity-20 blur-xl pointer-events-none`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
