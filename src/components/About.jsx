import React from 'react';
import { Target, Eye, Compass, CheckCircle2, Award, Zap, Shield, Cpu } from 'lucide-react';

/* ── Paleta extraída del logo ── */
// Gold:    #c59b46 / #e8c96a
// Purple:  #6b3fa0 / #9b59d4
// Teal:    #20aa96 / #0d9488
// Orange:  #e07020

const GOLD   = '#c59b46';
const GOLD2  = '#e8c96a';
const PURPLE = '#7c3aed';
const TEAL   = '#0d9488';
const ORANGE = '#e07020';

function StatPill({ value, label, color }) {
  return (
    <div className="group flex flex-col items-center px-6 py-4 rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-default"
      style={{ background: '#fff', border: `1.5px solid ${color}30`, boxShadow: `0 4px 20px ${color}15` }}>
      <span className="text-2xl font-black transition-transform duration-300 group-hover:scale-110" style={{ color }}>{value}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wide mt-0.5 transition-colors duration-300 group-hover:text-slate-900" style={{ color: '#64748b' }}>{label}</span>
    </div>
  );
}

function ValueBadge({ icon: Icon, label, color }) {
  return (
    <div className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 cursor-default"
      style={{ background: `${color}12`, border: `1px solid ${color}40`, color }}>
      <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125" />
      {label}
    </div>
  );
}

export default function About() {
  return (
    <section id="nosotros" className="relative py-24 overflow-hidden" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(197,155,70,0.07) 0%, transparent 70%)' }} />

      {/* Gold top rule */}
      <div className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD2} 50%, ${GOLD} 70%, transparent 100%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ════ HERO LOGO BLOCK ════ */}
        <div className="flex flex-col items-center text-center mb-16">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-8 transition-transform duration-300 hover:scale-105"
            style={{ borderColor: `${GOLD}55`, background: `${GOLD}0d`, color: '#9a7730' }}>
            <Zap className="w-3.5 h-3.5" />
            <span>Identidad Corporativa</span>
          </div>

          {/* Logo as primary graphic */}
          <div className="relative flex items-center justify-center mb-8 group cursor-pointer">
            <div className="absolute w-80 h-80 rounded-full animate-pulse transition-transform duration-700 group-hover:scale-110"
              style={{ background: `radial-gradient(circle, ${GOLD}18 0%, transparent 65%)`, animationDuration: '3s' }} />
            <div className="absolute w-60 h-60 rounded-full transition-transform duration-700 group-hover:scale-125"
              style={{ background: `radial-gradient(circle, ${PURPLE}10 0%, transparent 65%)` }} />
            <div className="relative z-10 transition-transform duration-500 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 8px 32px rgba(197,155,70,0.35)) drop-shadow(0 2px 8px rgba(0,0,0,0.10))' }}>
              <img
                src="/logo-bulb.png"
                alt="SLP Soluciones Informáticas"
                className="w-72 sm:w-80 md:w-[420px] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: '#0f172a' }}>
            ¿Quiénes{' '}
            <span style={{ background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Somos?
            </span>
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: '#475569' }}>
            Somos una empresa especializada en <strong style={{ color: '#1e293b' }}>soluciones informáticas integrales</strong>,
            comprometida con ofrecer servicios profesionales que mejoren la productividad,
            la seguridad y la eficiencia operativa de nuestros clientes.
          </p>

          {/* Value badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <ValueBadge icon={Shield}       label="Seguridad"   color={PURPLE} />
            <ValueBadge icon={Cpu}          label="Innovación"  color={TEAL}   />
            <ValueBadge icon={Award}        label="Calidad"     color={GOLD}   />
            <ValueBadge icon={CheckCircle2} label="Confianza"   color={ORANGE} />
          </div>
        </div>

        {/* ════ STATS ROW ════ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          <StatPill value="+10"  label="Años de exp."     color={GOLD}   />
          <StatPill value="+80"  label="Clientes activos" color={PURPLE} />
          <StatPill value="100%" label="Compromiso"       color={TEAL}   />
          <StatPill value="+300" label="Proyectos"        color={ORANGE} />
        </div>

        {/* ════ CARDS GRID ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* About — 5 cols */}
          <div className="group lg:col-span-5 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-default"
            style={{ background: '#fff', border: `1.5px solid ${GOLD}35`, boxShadow: `0 4px 32px ${GOLD}12` }}>
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 opacity-60"
              style={{ background: `radial-gradient(circle at top right, ${GOLD}25 0%, transparent 70%)` }} />
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${ORANGE})` }}>
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase tracking-tight" style={{ color: '#0f172a' }}>
                  Empresa Especializada en TI
                </h3>
              </div>
              <div className="h-0.5 w-20 group-hover:w-36 rounded-full mb-5 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})` }} />
              <p className="text-sm leading-relaxed mb-4 transition-colors duration-300 group-hover:text-slate-700" style={{ color: '#475569' }}>
                Trabajamos bajo principios de responsabilidad, calidad, innovación y mejora continua
                para consolidarnos como el aliado tecnológico de confianza de empresas de todos los sectores.
              </p>
              <blockquote className="p-4 rounded-xl text-sm font-medium italic transition-all duration-300 group-hover:translate-x-1"
                style={{ background: `${GOLD}0d`, borderLeft: `4px solid ${GOLD}`, color: '#7a5c20' }}>
                "La tecnología debe ser un facilitador de resultados, no una fuente de complejidad."
              </blockquote>
            </div>
            <div className="mt-7 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${GOLD}22` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, ${ORANGE})` }}>
                  SL
                </div>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: '#0f172a' }}>Sergio Luis Pérez Contreras</h4>
                  <span className="text-[11px] font-semibold" style={{ color: GOLD }}>Ingeniero de Sistemas · Fundador</span>
                </div>
              </div>
              <Award className="w-5 h-5 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ color: GOLD }} />
            </div>
          </div>

          {/* Misión — 4 cols */}
          <div className="group lg:col-span-4 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-default"
            style={{ background: '#fff', border: `1.5px solid ${TEAL}35`, boxShadow: `0 4px 32px ${TEAL}12` }}>
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 opacity-60"
              style={{ background: `radial-gradient(circle, ${TEAL}25 0%, transparent 70%)` }} />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ background: `linear-gradient(135deg, ${TEAL}, #0a7a70)` }}>
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase" style={{ color: '#0f172a' }}>Nuestra Misión</h3>
              </div>
              <div className="h-0.5 w-16 group-hover:w-32 rounded-full mb-4 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${TEAL}, #0a7a70)` }} />
              <p className="text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-700" style={{ color: '#475569' }}>
                Brindar soluciones tecnológicas integrales mediante el desarrollo de software,
                implementación de infraestructura informática, automatización de procesos
                y soporte técnico especializado.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-xs font-bold transition-all duration-300 group-hover:translate-x-1"
              style={{ borderTop: `1px solid ${TEAL}20`, color: TEAL }}>
              <CheckCircle2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Desarrollo · Infraestructura · Soporte</span>
            </div>
          </div>

          {/* Visión — 3 cols */}
          <div className="group lg:col-span-3 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-default"
            style={{ background: '#fff', border: `1.5px solid ${PURPLE}35`, boxShadow: `0 4px 32px ${PURPLE}12` }}>
            <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 opacity-60"
              style={{ background: `radial-gradient(circle, ${PURPLE}22 0%, transparent 70%)` }} />
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `linear-gradient(135deg, ${PURPLE}, #6d28d9)` }}>
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-extrabold uppercase" style={{ color: '#0f172a' }}>Nuestra Visión</h3>
              </div>
              <div className="h-0.5 w-16 group-hover:w-28 rounded-full mb-4 transition-all duration-500" style={{ background: `linear-gradient(90deg, ${PURPLE}, #6d28d9)` }} />
              <p className="text-sm leading-relaxed transition-colors duration-300 group-hover:text-slate-700" style={{ color: '#475569' }}>
                Consolidarnos como empresa líder en soluciones tecnológicas, reconocida por la innovación,
                la calidad de nuestros servicios y el compromiso permanente con la transformación digital.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-xs font-bold transition-all duration-300 group-hover:translate-x-1"
              style={{ borderTop: `1px solid ${PURPLE}20`, color: PURPLE }}>
              <CheckCircle2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Liderazgo Digital</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom teal rule */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${TEAL}55, transparent)` }} />
    </section>
  );
}
