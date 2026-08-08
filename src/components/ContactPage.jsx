import React from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';
import Contact from './Contact';

export default function ContactPage({ onBack, onOpenQuote, onOpenAbout, onOpenServices, onOpenBlog, onOpenPortfolio, onOpenProcess, onOpenWhyChooseUs, onOpenFAQ, onOpenContact }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body">
      <PageHeader
        title="Contacto"
        breadcrumb="CONTACTO"
        badgeText="Atención Directa & Cotizaciones"
        bgImage="/banner-contact.png"
        subtitle="Asesoría directa y presupuestos claros en menos de 24 horas. Hablemos de su próximo proyecto TI."
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
        <Contact onOpenQuote={onOpenQuote} />
      </main>
      <Footer onOpenQuote={() => onOpenQuote()} onOpenAdmin={() => {}} />
    </div>
  );
}
