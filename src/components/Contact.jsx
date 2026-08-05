import React, { useState } from 'react';
import { Phone, Mail, User, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact({ onOpenQuote }) {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    servicio: 'Desarrollo de Software',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contacto" className="py-24 bg-hostdime-navy text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-hostdime-orange uppercase tracking-wider block mb-2">
            Atención Directa & Cotizaciones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Hablemos de su Próximo Proyecto TI
          </h2>
          <p className="text-slate-300 text-sm">
            Asesoría directa y presupuestos claros en menos de 24 horas.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-800/90 p-8 rounded-xl border border-slate-700 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-hostdime-orange to-amber-600 flex items-center justify-center font-extrabold text-lg text-white shadow-md">
                  SL
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white uppercase">
                    Sergio Luis Pérez C.
                  </h3>
                  <span className="text-xs font-semibold text-hostdime-teal uppercase block">
                    Ingeniero de Sistemas
                  </span>
                  <span className="text-[11px] text-slate-400">Director SLP Soluciones</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-6">
                Le atendemos de manera personalizada para resolver sus inquietudes sobre software a medida, redes empresarial, cámaras IP o soporte.
              </p>

              <div className="space-y-3 text-xs">
                <a
                  href="tel:3214451817"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-white transition-colors border border-slate-600"
                >
                  <Phone className="w-4 h-4 text-hostdime-orange" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Llámanos a PBX</span>
                    <span className="font-bold text-sm">321 445 1817</span>
                  </div>
                </a>

                <a
                  href="mailto:slps.soluciones.informaticas@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-white transition-colors border border-slate-600 truncate"
                >
                  <Mail className="w-4 h-4 text-hostdime-teal flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Correo Electrónico</span>
                    <span className="font-bold text-xs truncate block">slps.soluciones.informaticas@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-hostdime-teal" />
                <span>Respuesta comercial garantizada en el mismo día.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-hostdime-orange" />
                <span>Atención directamente gestionada por Ingeniero titular.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 rounded-xl shadow-xl border border-slate-200">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 uppercase">
                  ¡Mensaje Recibido!
                </h3>
                <p className="text-slate-600 text-xs mb-6">
                  El Ing. Sergio Pérez revisará su consulta y se comunicará con usted vía WhatsApp o correo.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-hostdime-navy px-5 py-2.5 text-xs font-bold bg-slate-900 text-white rounded-lg"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-lg font-bold text-slate-900 mb-1 uppercase">
                  Formulario de Contacto Directo
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Complete sus datos para ponernos en contacto inmediato.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-hostdime-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Empresa / Negocio</label>
                    <input
                      type="text"
                      placeholder="Ej. Comercializadora SLP"
                      value={formData.empresa}
                      onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-hostdime-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Teléfono / Celular *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 300 123 4567"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-hostdime-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      placeholder="correo@empresa.com"
                      value={formData.correo}
                      onChange={(e) => setFormData({...formData, correo: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-hostdime-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Servicio Requerido</label>
                  <select
                    value={formData.servicio}
                    onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800"
                  >
                    <option>Desarrollo de Software</option>
                    <option>Software con Inteligencia Artificial</option>
                    <option>Soporte Técnico Especializado</option>
                    <option>Videovigilancia (CCTV)</option>
                    <option>Redes LAN y WLAN</option>
                    <option>Consultoría Tecnológica</option>
                    <option>Venta de Equipos & Periféricos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Detalles del Requerimiento *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Escriba aquí los detalles..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-hostdime-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-hostdime-orange py-3.5 text-xs uppercase flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Formulario</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
