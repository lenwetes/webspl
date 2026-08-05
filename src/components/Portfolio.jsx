import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, FolderGit2, ArrowRight } from 'lucide-react';

export default function Portfolio({ onOpenQuote }) {
  const [filter, setFilter] = useState('todos');

  const projects = [
    {
      id: 1,
      category: 'software',
      title: 'Plataforma Web ERP & Automatización Empresarial',
      client: 'Distribuidora Comercial Regional',
      desc: 'Desarrollo de software a medida para gestión de inventarios, facturación, reportes en tiempo real e integración de base de datos relacional.',
      metrics: '35% de incremento en productividad operativa.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      id: 2,
      category: 'ia',
      title: 'Asistente IA para Reservas & Atención 24/7',
      client: 'Red de Servicios de Salud',
      desc: 'Implementación de agente conversacional inteligente integrado con WhatsApp y API web para programación automática de citas y consultas.',
      metrics: 'Reducción del 70% en tiempo de respuesta.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['OpenAI API', 'Chatbot', 'WhatsApp Cloud API']
    },
    {
      id: 3,
      category: 'redes',
      title: 'Infraestructura de Red Mesh & Cableado Cat6A',
      client: 'Complejo de Oficinas Corporativas',
      desc: 'Diseño e instalación de cableado estructurado, switches administrables VLAN y puntos de acceso Wi-Fi 6 de alta densidad sin zonas muertas.',
      metrics: 'Disponibilidad de red del 99.9%.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
      tags: ['Cableado Cat6A', 'Switches VLAN', 'Wi-Fi 6']
    },
    {
      id: 4,
      category: 'videovigilancia',
      title: 'Sistema de Videovigilancia IP & Monitoreo Móvil',
      client: 'Centro Logístico & Almacén',
      desc: 'Instalación de 24 cámaras IP de alta resolución con visión nocturna infrarroja, servidor NVR de 8TB y monitoreo remoto seguro.',
      metrics: 'Cobertura 100% perimetral en tiempo real.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      tags: ['Cámaras IP HD', 'DVR/NVR', 'Monitoreo App']
    }
  ];

  const filteredProjects = filter === 'todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portafolio" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
            Casos de Éxito
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-hostdime-navy tracking-tight mb-3">
            Portafolio de Proyectos Ejecutados
          </h2>
          <p className="text-slate-600 text-sm">
            Proyectos reales de ingeniería de software, infraestructura de redes y seguridad.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'software', label: 'Software' },
            { id: 'ia', label: 'Inteligencia Artificial' },
            { id: 'redes', label: 'Redes LAN/WLAN' },
            { id: 'videovigilancia', label: 'Videovigilancia' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                filter === btn.id
                  ? 'bg-hostdime-navy text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="hostdime-card flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-hostdime-navy text-white font-extrabold text-[10px] uppercase">
                    {project.client}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2 uppercase">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {project.desc}
                  </p>

                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2 mb-4 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Resultado: {project.metrics}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-7 pt-0">
                <button
                  onClick={() => onOpenQuote(project.title)}
                  className="w-full btn-hostdime-orange py-3 text-xs uppercase"
                >
                  Solicitar Proyecto Similar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
