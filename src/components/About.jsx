import React from 'react';
import { Target, Eye, Compass, CheckCircle2, Award, Zap, Shield, Cpu, ArrowRight } from 'lucide-react';

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

export default function About({ onOpenAbout }) {
  return (
    <section id="nosotros" className="relative py-20 overflow-hidden" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(197,155,70,0.07) 0%, transparent 70%)' }} />

      {/* Gold top rule */}
      <div className="absolute top-0 inset-x-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${GOLD} 30%, ${GOLD2} 50%, ${GOLD} 70%, transparent 100%)` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ════ HERO LOGO BLOCK (Summary) ════ */}
        <div className="flex flex-col items-center text-center mb-12">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6 transition-transform duration-300 hover:scale-105"
            style={{ borderColor: `${GOLD}55`, background: `${GOLD}0d`, color: '#9a7730' }}>
            <Zap className="w-3.5 h-3.5" />
            <span>Identidad Corporativa</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatPill value="+10"  label="Años de exp."     color={GOLD}   />
          <StatPill value="+80"  label="Clientes activos" color={PURPLE} />
          <StatPill value="100%" label="Compromiso"       color={TEAL}   />
          <StatPill value="+300" label="Proyectos"        color={ORANGE} />
        </div>

        {/* Action Button to Full About Page */}
        <div className="text-center">
          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)` }}
          >
            <span>Conocer más sobre nosotros</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bottom teal rule */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${TEAL}55, transparent)` }} />
    </section>
  );
}
