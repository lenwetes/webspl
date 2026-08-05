import React from 'react';
import { Phone, Mail, ArrowUp, ShieldCheck } from 'lucide-react';
import SLPLogo from './SLPLogo';

export default function Footer({ onOpenQuote, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-hostdime-navy text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-4">
              <SLPLogo size="medium" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-sm">
              Ingeniería en infraestructura TI, servidores de alto rendimiento, ciberseguridad avanzada y soluciones tecnológicas a la medida para empresas en Colombia y Latinoamérica.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ingeniero a cargo: Sergio Luis Pérez Contreras</span>
              </span>
            </div>
          </div>

          {/* Col 1 - Servicios */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Servicios TI
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><a href="#servicios" className="hover:text-hostdime-orange transition-colors">Servidores & Hosting</a></li>
              <li><a href="#servicios" className="hover:text-hostdime-orange transition-colors">Redes & Cableado Cat6A</a></li>
              <li><a href="#servicios" className="hover:text-hostdime-orange transition-colors">Ciberseguridad & Firewalls</a></li>
              <li><a href="#servicios" className="hover:text-hostdime-orange transition-colors">Software Empresarial a Medida</a></li>
              <li><a href="#servicios" className="hover:text-hostdime-orange transition-colors">CCTV & Videovigilancia IP</a></li>
            </ul>
          </div>

          {/* Col 2 - Ventas & Soporte */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Ventas & Soporte
            </h4>

            <div className="space-y-2.5 text-xs">
              <a href="tel:3214451817" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-hostdime-orange" />
                <span>PBX: 321 445 1817</span>
              </a>

              <a href="mailto:slps.soluciones.informaticas@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors truncate">
                <Mail className="w-4 h-4 text-hostdime-teal flex-shrink-0" />
                <span className="truncate">slps.soluciones.informaticas@gmail.com</span>
              </a>
            </div>

            <button
              onClick={onOpenQuote}
              className="w-full btn-hostdime-orange py-2.5 text-xs uppercase font-bold"
            >
              Solicitar Cotización
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SLP Soluciones Informáticas. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-slate-500 hover:text-hostdime-orange transition-colors text-[11px] font-semibold bg-transparent border-0 cursor-pointer"
              >
                Acceso Admin CMS
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-2"
            >
              <span>Ir Arriba</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

