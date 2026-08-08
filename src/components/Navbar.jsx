import React, { useState, useEffect } from 'react';
import { Cpu, Phone, Mail, MessageCircle, Menu, X, ArrowRight, User } from 'lucide-react';
import SLPLogo from './SLPLogo';

export default function Navbar({ onOpenQuote, onOpenBlog, onOpenAbout, onOpenServices, onGoHome, onOpenPortfolio, onOpenProcess, onOpenWhyChooseUs, onOpenFAQ, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['inicio', 'nosotros', 'servicios', 'porque-slp', 'proceso', 'portafolio', 'faq', 'blog', 'contacto'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros', handler: onOpenAbout },
    { id: 'servicios', label: 'Servicios', handler: onOpenServices },
    { id: 'porque-slp', label: '¿Por qué SLP?', handler: onOpenWhyChooseUs },
    { id: 'proceso', label: 'Proceso', handler: onOpenProcess },
    { id: 'portafolio', label: 'Portafolio', handler: onOpenPortfolio },
    { id: 'faq', label: 'FAQ', handler: onOpenFAQ },
    { id: 'blog', label: 'Blog', handler: onOpenBlog },
    { id: 'contacto', label: 'Contacto', handler: onOpenContact },
  ];

  const handleLinkClick = (link) => {
    setMobileMenuOpen(false);
    if (link.handler) {
      link.handler();
    } else {
      if (onGoHome) onGoHome();
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      
      {/* Top HostDime Corporate Bar */}
      <div className="bg-hostdime-navy text-slate-300 text-xs py-2 px-4 border-b border-slate-700/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-hostdime-orange" />
              <span>Llámanos a ventas y soporte: <strong className="text-white">PBX: 321 445 1817</strong></span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-hostdime-teal" />
              <span className="text-slate-300">slps.soluciones.informaticas@gmail.com</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-300">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Atención 24/7 Disponible
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div className={`bg-white border-b border-slate-200 transition-shadow ${
        scrolled ? 'shadow-md py-3' : 'py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* HostSLP Official Brand Logo */}
            <button onClick={() => { if (onGoHome) onGoHome(); else window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center group bg-transparent border-0 cursor-pointer">
              <SLPLogo size="medium" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className={`text-xs font-bold transition-colors relative py-1 bg-transparent border-0 cursor-pointer ${
                    activeSection === link.id
                      ? 'text-hostdime-orange border-b-2 border-hostdime-orange'
                      : 'text-slate-700 hover:text-hostdime-navy'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right Quick Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="btn-hostdime-orange px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Contáctanos</span>
              </button>

              <a
                href="https://wa.me/573214451817"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                title="WhatsApp Directo"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="tel:3214451817"
                className="p-2.5 rounded-lg bg-slate-100 text-hostdime-navy hover:bg-hostdime-navy hover:text-white transition-colors"
                title="Llamada Directa"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenQuote}
                className="btn-hostdime-orange px-3.5 py-1.5 text-xs uppercase font-bold sm:hidden"
              >
                Cotizar
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className={`py-2 text-sm font-bold border-b border-slate-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer text-left ${
                  activeSection === link.id ? 'text-hostdime-orange' : 'text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full btn-hostdime-orange py-3 text-xs uppercase"
              >
                Solicitar Cotización
              </button>
              <a
                href="tel:3214451817"
                className="w-full py-3 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-hostdime-orange" />
                <span>321 445 1817</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
