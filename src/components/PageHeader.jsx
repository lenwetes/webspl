import React from 'react';
import Navbar from './Navbar';
import { Home, Sparkles } from 'lucide-react';

export default function PageHeader({
  title,
  subtitle = '',
  breadcrumb,
  bgImage = '/banner-services.png',
  badgeText = 'Soluciones Tecnológicas Integrales',
  onGoHome,
  onOpenQuote,
  onOpenAbout,
  onOpenServices,
  onOpenBlog,
  onOpenPortfolio,
  onOpenProcess,
  onOpenWhyChooseUs,
  onOpenFAQ,
  onOpenContact,
}) {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden font-body">
      {/* Main Corporate Navbar */}
      <Navbar
        onOpenQuote={onOpenQuote}
        onOpenBlog={onOpenBlog}
        onOpenAbout={onOpenAbout}
        onOpenServices={onOpenServices}
        onGoHome={onGoHome}
        onOpenPortfolio={onOpenPortfolio}
        onOpenProcess={onOpenProcess}
        onOpenWhyChooseUs={onOpenWhyChooseUs}
        onOpenFAQ={onOpenFAQ}
        onOpenContact={onOpenContact}
      />

      {/* Hero Banner Area */}
      <div className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        
        {/* Background Ambient Glows */}
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

        {/* 2-Column Responsive Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Typography & Breadcrumbs */}
          <div className="lg:col-span-7 relative z-10">
            
            {/* Optional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-orange-500/10 border border-orange-500/30 text-amber-400">
              <Sparkles className="w-3.5 h-3.5 text-hostdime-orange" />
              <span>{badgeText}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 capitalize drop-shadow-md leading-tight">
              {title}
            </h1>

            {/* Breadcrumb: HOME » PAGE */}
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-4">
              <button
                onClick={onGoHome}
                className="hover:text-hostdime-orange transition-colors flex items-center gap-1.5 bg-transparent border-0 cursor-pointer p-0 text-slate-300 font-bold"
              >
                <Home className="w-3.5 h-3.5 text-hostdime-orange" />
                <span>HOME</span>
              </button>
              <span className="text-hostdime-orange font-bold">»</span>
              <span className="text-white font-extrabold">{breadcrumb || title}</span>
            </div>

            {subtitle && (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Side: Representative High-Res Graphic Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative group w-full max-w-md lg:max-w-none">
              
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-hostdime-orange/30 via-amber-500/20 to-hostdime-teal/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card Container with Image */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src={bgImage}
                  alt={title}
                  className="w-full h-56 sm:h-72 object-cover object-center select-none"
                />
                
                {/* Subtle Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* Bottom Graphic Caption */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-slate-200 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/50">
                  <span className="truncate">{title} — SLP Informática</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0 ml-2" />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Gradient Separator Line */}
      <div className="h-1 bg-gradient-to-r from-hostdime-orange via-amber-400 to-hostdime-teal" />
    </div>
  );
}
