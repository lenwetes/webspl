import React from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import Portfolio from './Portfolio';

export default function PortfolioPage({ onBack, onOpenQuote, onOpenAbout, onOpenServices, onOpenBlog, onOpenPortfolio, onOpenProcess, onOpenWhyChooseUs, onOpenFAQ, onOpenContact }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body">
      <PageHeader
        title="Portafolio"
        breadcrumb="PORTAFOLIO"
        badgeText="Casos de Éxito & Proyectos"
        bgImage="/banner-portfolio.png"
        subtitle="Proyectos reales ejecutados en ingeniería de software, infraestructura de redes, videovigilancia e inteligencia artificial."
        onGoHome={onBack}
        onOpenQuote={() => onOpenQuote()}
        onOpenAbout={onOpenAbout}
        onOpenServices={onOpenServices}
        onOpenBlog={onOpenBlog}
        onOpenPortfolio={onOpenPortfolio}
        onOpenProcess={onOpenProcess}
        onOpenWhyChooseUs={onOpenWhyChooseUs}
        onOpenFAQ={onOpenFAQ}
        onOpenContact={onOpenContact}
      />
      <main className="flex-grow">
        <Portfolio onOpenQuote={onOpenQuote} />
      </main>
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
