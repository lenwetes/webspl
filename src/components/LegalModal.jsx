import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-hostdime-orange/10 border border-hostdime-orange/20 flex items-center justify-center text-hostdime-orange">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                Marco Legal & Protección de Datos
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                SLP Soluciones Informáticas · Cumplimiento Ley 1581 de 2012
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-100/60 px-4 pt-2 gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 cursor-pointer ${activeTab === 'privacy'
              ? 'bg-white text-hostdime-orange border-hostdime-orange shadow-sm'
              : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Tratamiento de Datos (Habeas Data)</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 cursor-pointer ${activeTab === 'terms'
              ? 'bg-white text-hostdime-orange border-hostdime-orange shadow-sm'
              : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Términos y Condiciones</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 cursor-pointer ${activeTab === 'cookies'
              ? 'bg-white text-hostdime-orange border-hostdime-orange shadow-sm'
              : 'text-slate-600 border-transparent hover:text-slate-900'
              }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Política de Cookies</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">

          {/* TAB 1: PRIVACIDAD Y DATOS PERSONALES */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs">
                <strong>Aviso de Privacidad y Habeas Data:</strong> En cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong>, el <strong>Decreto Reglamentario 1377 de 2013</strong> y demás normas concordantes de la República de Colombia, <strong>SLP Soluciones Informáticas</strong> le informa que los datos personales suministrados en este sitio web serán tratados conforme a nuestra Política de Tratamiento de Información.
              </div>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">1. Responsable del Tratamiento</h3>
                <p>
                  <strong>Denominación:</strong> SLP Soluciones Informáticas.<br />
                  <strong>Líder de Tratamiento:</strong> Ing. Sergio Pérez.<br />
                  <strong>Canal oficial de atención Habeas Data:</strong> <a href="mailto:slps.soluciones.informaticas@gmail.com" className="text-hostdime-orange font-bold underline">slps.soluciones.informaticas@gmail.com</a><br />
                  <strong>Línea telefónica / WhatsApp:</strong> +57 321 445 1817.<br />
                  <strong>Ámbito de cobertura:</strong> Todo el territorio nacional.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">2. Finalidades de la Recolección</h3>
                <p>Los datos solicitados en los formularios de contacto, cotización y soporte (nombre, correo electrónico, teléfono, empresa y detalles del requerimiento) se recopilan con las siguientes finalidades exclusivas:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Atender, estructurar y remitir propuestas técnico-comerciales y cotizaciones solicitadas por el usuario.</li>
                  <li>Establecer contacto directo vía WhatsApp, llamada telefónica o correo electrónico para asesoría técnica.</li>
                  <li>Gestionar la relación contractual, soporte técnico, desarrollo de software, instalación de infraestructura o consultoría.</li>
                  <li>Cumplir con las obligaciones legales, tributarias y comerciales vigentes en Colombia.</li>
                  <li><strong>SLP Soluciones Informáticas NO vende, cede ni comercializa sus datos personales con terceros para fines publicitarios.</strong></li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">3. Derechos del Titular (Derechos ARCO)</h3>
                <p>De conformidad con el artículo 8 de la Ley 1581 de 2012, usted tiene derecho a:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a información parcial, inexacta o incompleta.</li>
                  <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento.</li>
                  <li><strong>Ser informado</strong> sobre el uso que se le ha dado a sus datos personales.</li>
                  <li><strong>Revocar la autorización o solicitar la supresión</strong> de sus datos cuando no medie un deber legal o contractual de permanecer en la base de datos.</li>
                  <li><strong>Acceder en forma gratuita</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">4. Procedimiento para Ejercer sus Derechos</h3>
                <p>
                  El titular puede remitir su solicitud de consulta o reclamo al correo electrónico <strong>slps.soluciones.informaticas@gmail.com</strong> indicando su nombre completo, documento de identificación, descripción de los hechos y pretensión. La respuesta se emitirá dentro de los <strong>diez (10) días hábiles</strong> siguientes en caso de consultas y <strong>quince (15) días hábiles</strong> para reclamos.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">5. Seguridad de la Información</h3>
                <p>
                  Implementamos protocolos de cifrado SSL/TLS (HTTPS), políticas de control de acceso y almacenamiento seguro para salvaguardar sus datos y mitigar riesgos de alteración, pérdida, acceso o uso no autorizado.
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: TÉRMINOS Y CONDICIONES */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">1. Aceptación de los Términos</h3>
                <p>
                  El acceso, navegación y uso del portal web <strong>slpsoluciones.cloud</strong> implica la aceptación plena de los presentes Términos y Condiciones. Si no está de acuerdo con alguna cláusula, le recomendamos abstenerse de utilizar el sitio.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">2. Naturaleza de los Servicios</h3>
                <p>
                  SLP Soluciones Informáticas ofrece servicios profesionales de: desarrollo de software a medida, inteligencia artificial aplicada, redes y cableado estructurado, circuitos cerrados de televisión (CCTV), soporte técnico TI, consultoría tecnológica y licenciamiento de software especializado (incluyendo soluciones como RestoSLP para gastronomía).
                </p>
                <p>
                  Las cotizaciones suministradas a través de la web son de carácter <strong>informativo y preliminar</strong>, y se formalizan mediante propuesta comercial técnica definitiva y contrato o acuerdo de servicios.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">3. Propiedad Intelectual</h3>
                <p>
                  Todos los contenidos, logotipos, marcas, diseños, código fuente, interfaces y piezas gráficas publicadas en este portal son propiedad de SLP Soluciones Informáticas o de sus respectivos licenciantes, protegidos por las leyes de propiedad intelectual y derechos de autor en Colombia y a nivel internacional. Queda prohibida su reproducción o distribución no autorizada.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">4. Uso Adecuado del Sitio</h3>
                <p>
                  El usuario se compromete a no suministrar información fraudulenta, no realizar ataques de denegación de servicio, inyecciones de código malicioso o conductas que vulneren la estabilidad e integridad de la infraestructura de SLP Soluciones Informáticas.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">5. Legislación Aplicable y Jurisdicción</h3>
                <p>
                  Estos términos se rigen e interpretan conforme a las leyes de la <strong>República de Colombia</strong>. Cualquier controversia será resuelta prioritariamente por mecanismos de arreglo directo o ante la jurisdicción ordinaria de los juzgados de San José de Cúcuta, Norte de Santander.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: POLÍTICA DE COOKIES */}
          {activeTab === 'cookies' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">1. ¿Qué son las Cookies?</h3>
                <p>
                  Las cookies y tecnologías de almacenamiento local (como <code>localStorage</code>) son pequeños archivos de texto que se alojan en su navegador web cuando visita nuestro portal para garantizar el correcto funcionamiento técnico de la aplicación.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">2. Tipos de Cookies y Almacenamiento Utilizados</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-xs">Cookies Técnicas y Estrictamente Necesarias:</strong>
                    <span className="text-xs text-slate-600">
                      Permiten la navegación fluida, la seguridad contra CSRF, la autenticación en el panel administrativo del CMS y recordar sus preferencias de consentimiento. No se pueden desactivar.
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-xs">Almacenamiento Local de Preferencias:</strong>
                    <span className="text-xs text-slate-600">
                      Guarda el estado de aceptación del banner de cookies (<code>slp_cookie_consent</code>) y la sesión del usuario administrador en caso de inicio de sesión legítimo.
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block text-xs">Cookies de Rendimiento / Terceros:</strong>
                    <span className="text-xs text-slate-600">
                      Servicios de entrega de activos (CDN) y mapas embebidos de Google Maps para ubicación geográfica.
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">3. ¿Cómo Gestionar o Desactivar las Cookies?</h3>
                <p>
                  Usted puede configurar su navegador en cualquier momento para bloquear o eliminar las cookies. Tenga en cuenta que restringir las cookies esenciales puede limitar algunas funcionalidades interactivas del sitio web:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
                  <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies y datos del sitio.</li>
                  <li><strong>Safari / Edge:</strong> Preferencias → Privacidad → Bloquear cookies.</li>
                </ul>
              </section>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Versión 2.0 actualizada y vigente · 2026</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Entendido y Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}
