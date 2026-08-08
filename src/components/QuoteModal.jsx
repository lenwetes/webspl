import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Send, Calculator, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuoteModal({ isOpen, onClose, initialService = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService || 'Desarrollo de Software',
    scale: 'Mediana Empresa (10-50 personas)',
    urgency: 'Normal (1-2 meses)',
    budget: 'Estándar',
    nombre: '',
    telefono: '',
    email: '',
    detalles: ''
  });
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleFinish = (e) => {
    e.preventDefault();
    setCompleted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const servicesList = [
    'Desarrollo de Software a Medida',
    'Software con Inteligencia Artificial',
    'Soporte Técnico Especializado',
    'Sistemas de Videovigilancia (CCTV)',
    'Redes LAN y WLAN Empresariales',
    'Consultoría Tecnológica',
    'Venta & Configuración de Equipos'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-slate-100 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header con Logo de la Compañía */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shadow-lg flex-shrink-0 group">
                <img
                  src="/logo-bulb.png"
                  alt="SLP Soluciones Informáticas"
                  className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-hostdime-orange uppercase tracking-widest block">
                  Paso {step} de 3
                </span>
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  Solicitud de Cotización Interactiva
                </h3>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-600 to-brand-cyan h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>

            {/* Step 1: Select Service & Scale */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    1. Seleccione el servicio principal requerimiento *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map((srv, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: srv })}
                        className={`p-3.5 rounded-2xl text-left text-xs font-bold transition-all border ${
                          formData.service === srv
                            ? 'bg-brand-50 border-brand-600 text-brand-700 shadow-sm ring-1 ring-brand-600'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Alcance del Negocio / Empresa
                  </label>
                  <select
                    value={formData.scale}
                    onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <option>Emprendedor / Negocio Personal</option>
                    <option>Pequeña Empresa (1-10 personas)</option>
                    <option>Mediana Empresa (10-50 personas)</option>
                    <option>Gran Organización (+50 personas)</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center gap-2"
                  >
                    <span>Siguiente Paso</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Urgency & Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tiempo Estimado de Ejecución
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 mb-4"
                  >
                    <option>Urgente (Menos de 15 días)</option>
                    <option>Normal (1-2 meses)</option>
                    <option>Planificado (3+ meses)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Detalles o especificaciones requeridas *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describa requerimientos técnicos, cantidad de cámaras, módulos del software o puntos de red..."
                    value={formData.detalles}
                    onChange={(e) => setFormData({ ...formData, detalles: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center gap-2"
                  >
                    <span>Siguiente Paso</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <form onSubmit={handleFinish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="300 000 0000"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="correo@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs">
                  <span className="font-bold block mb-1 text-slate-900">Resumen del Pedido:</span>
                  <p>• Servicio: {formData.service}</p>
                  <p>• Alcance: {formData.scale}</p>
                  <p>• Tiempo: {formData.urgency}</p>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    Anterior
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-hostdime-orange to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
              ¡Cotización Recibida!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              El equipo de <strong className="text-slate-900">SLP Soluciones Informáticas</strong> evaluará su proyecto y le enviará la cotización formal a {formData.email}.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              Cerrar Ventana
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
