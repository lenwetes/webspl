import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner({ onOpenPolicy }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('slp_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('slp_cookie_consent', 'all');
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('slp_cookie_consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Aviso de Cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900/95 text-white backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-slate-700/60 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-xl bg-hostdime-orange/20 text-hostdime-orange flex-shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
            <span>Uso de Cookies y Privacidad</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mt-1">
            Utilizamos cookies técnicas para garantizar el funcionamiento seguro y optimizar su experiencia en nuestro portal. Cumplimos con la <strong>Ley 1581 de 2012</strong> de Colombia.
          </p>
        </div>
        <button
          onClick={handleEssentialOnly}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          title="Cerrar y aceptar solo necesarias"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={() => onOpenPolicy && onOpenPolicy('cookies')}
          className="text-[11px] font-bold text-slate-400 hover:text-white underline text-left sm:text-center py-1 sm:mr-auto transition-colors cursor-pointer"
        >
          Ver Política de Cookies
        </button>

        <button
          onClick={handleEssentialOnly}
          className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer border border-slate-700"
        >
          Solo Necesarias
        </button>

        <button
          onClick={handleAcceptAll}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-hostdime-orange to-amber-600 hover:from-amber-600 hover:to-hostdime-orange text-white font-extrabold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
        >
          Aceptar Todas
        </button>
      </div>
    </aside>
  );
}
