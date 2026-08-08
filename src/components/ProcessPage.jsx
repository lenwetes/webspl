import React from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import Process from './Process';

export default function ProcessPage({ onBack, onOpenQuote, onOpenAbout, onOpenServices, onOpenBlog, onOpenPortfolio, onOpenProcess, onOpenWhyChooseUs, onOpenFAQ, onOpenContact }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body">
      <PageHeader
        title="Proceso"
        breadcrumb="PROCESO"
        badgeText="Metodología de Trabajo SLP"
        bgImage="/banner-process.png"
        subtitle="Mapa conceptual interactivo de nuestra metodología de ejecución: desde el análisis hasta el soporte continuo."
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
        <Process onOpenQuote={onOpenQuote} />
      </main>
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
