import React, { useState } from 'react';
import { 
  Code2, Server, Cpu, Network, ShieldCheck, Database, 
  Video, Laptop, HardDrive, Wifi, Smartphone, Layers, 
  Sparkles, Monitor, Zap, Globe
} from 'lucide-react';

export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);

  // Row 1: Software, Web, Mobile, IA & Databases
  const softwareTechs = [
    { name: 'React / Next.js', category: 'Frontend Web', icon: Code2, color: 'text-sky-500 bg-sky-50 border-sky-200' },
    { name: 'Python & Node.js', category: 'Backend APIs', icon: Server, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
    { name: 'OpenAI / ChatGPT', category: 'IA Generativa', icon: Cpu, color: 'text-purple-500 bg-purple-50 border-purple-200' },
    { name: 'Google Gemini', category: 'IA & Automations', icon: Sparkles, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { name: 'Flutter & React Native', category: 'Apps Móviles', icon: Smartphone, color: 'text-cyan-500 bg-cyan-50 border-cyan-200' },
    { name: 'PostgreSQL & MySQL', category: 'Bases de Datos', icon: Database, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { name: 'Tailwind & TypeScript', category: 'Diseño Web Pro', icon: Layers, color: 'text-teal-500 bg-teal-50 border-teal-200' },
    { name: 'Docker & AWS Cloud', category: 'Infraestructura', icon: Globe, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  ];

  // Row 2: Redes, CCTV, Cableado & Hardware que vendemos
  const hardwareTechs = [
    { name: 'Mikrotik & Cisco', category: 'Switches & Routers', icon: Network, color: 'text-orange-500 bg-orange-50 border-orange-200' },
    { name: 'Hikvision & Dahua', category: 'Cámaras IP & NVR 4K', icon: Video, color: 'text-red-500 bg-red-50 border-red-200' },
    { name: 'Ubiquiti / UniFi', category: 'Wi-Fi Corporativo', icon: Wifi, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { name: 'Panduit & Furukawa', category: 'Cableado Cat6A', icon: Zap, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
    { name: 'Dell & HP Enterprise', category: 'Servidores & PCs', icon: Laptop, color: 'text-slate-700 bg-slate-100 border-slate-300' },
    { name: 'Lenovo & ASUS Pro', category: 'Laptops & Equipos', icon: Monitor, color: 'text-indigo-500 bg-indigo-50 border-indigo-200' },
    { name: 'Kingston & Western Digital', category: 'Almacenamiento NVMe', icon: HardDrive, color: 'text-rose-500 bg-rose-50 border-rose-200' },
    { name: 'Fortinet & Firewalls', category: 'Ciberseguridad', icon: ShieldCheck, color: 'text-teal-500 bg-teal-50 border-teal-200' },
  ];

  // Duplicar arrays para bucle infinito suave
  const row1 = [...softwareTechs, ...softwareTechs];
  const row2 = [...hardwareTechs, ...hardwareTechs];

  return (
    <section className="relative z-10 pt-48 pb-20 bg-gradient-to-b from-slate-50 via-slate-100/70 to-slate-50 border-b border-slate-200 overflow-hidden">
      
      {/* ANIMATED TECH BACKGROUND ELEMENTS */}
      
      {/* 1. Cybernetic Grid Mesh Pattern */}
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />

      {/* 2. Floating Animated Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-tr from-amber-400/20 to-orange-500/10 rounded-full blur-3xl pointer-events-none animate-orb-1" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-gradient-to-br from-teal-400/20 to-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-orb-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-orb-3" />

      {/* 3. Animated Digital Circuit Node Network Overlay SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f37021" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#20c997" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Animated Circuit Node Paths */}
        <path d="M 50 120 Q 200 40 400 120 T 750 120 T 1100 120 T 1500 120" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="6,6" className="animate-pulse" />
        <path d="M 100 280 Q 300 360 600 280 T 1000 280 T 1400 280" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="8,8" />
        <path d="M 0 450 Q 400 380 800 450 T 1600 450" fill="none" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="4,4" className="animate-pulse" />

        {/* Animated Nodes / Pulsing Dots */}
        <circle cx="200" cy="94" r="4" fill="#f37021" className="animate-ping" />
        <circle cx="600" cy="280" r="4" fill="#20c997" className="animate-ping" />
        <circle cx="1000" cy="280" r="4" fill="#a855f7" className="animate-ping" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-20">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hostdime-orange/10 border border-hostdime-orange/30 text-hostdime-orange font-extrabold text-xs tracking-wider uppercase mb-4 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5" />
          <span>Ecosistema Tecnológico & Marcas Líderes</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          La mejor tecnología para impulsar su empresa
        </h2>

        <p className="text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Desarrollamos soluciones con lenguajes de programación modernos, IA avanzada, componentes de red industrial y comercializamos hardware de marcas globales certificadas.
        </p>

      </div>

      {/* MARQUEE CAROUSEL CONTAINER WITH GRADIENT FADE EDGES */}
      <div className="relative w-full overflow-hidden space-y-6 z-20">
        
        {/* Left & Right Fade Shadows */}
        <div className="absolute top-0 bottom-0 left-0 w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-20 pointer-events-none" />

        {/* ROW 1: Software, Web, Mobile & IA (Moves Left) */}
        <div className="flex w-full overflow-hidden py-2">
          <div className={`animate-marquee flex items-center gap-6 ${isPaused ? 'paused-marquee' : ''}`}>
            {row1.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r1-${idx}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="tech-marquee-card px-6 py-4 flex items-center gap-4 flex-shrink-0 min-w-[260px] group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-slate-900 group-hover:text-hostdime-orange transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Redes, CCTV, Cableado & Hardware (Moves Right) */}
        <div className="flex w-full overflow-hidden py-2">
          <div className={`animate-marquee-reverse flex items-center gap-6 ${isPaused ? 'paused-marquee' : ''}`}>
            {row2.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r2-${idx}`}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="tech-marquee-card px-6 py-4 flex items-center gap-4 flex-shrink-0 min-w-[260px] group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-slate-900 group-hover:text-hostdime-orange transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
