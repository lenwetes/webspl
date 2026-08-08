import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import StatsBanner from './components/StatsBanner';
import About from './components/About';
import AboutPage from './components/AboutPage';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import WhyChooseUs from './components/WhyChooseUs';
import WhyChooseUsPage from './components/WhyChooseUsPage';
import Process from './components/Process';
import ProcessPage from './components/ProcessPage';
import Portfolio from './components/Portfolio';
import PortfolioPage from './components/PortfolioPage';
import FAQ from './components/FAQ';
import FAQPage from './components/FAQPage';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import Contact from './components/Contact';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ForgotPassword from './components/admin/ForgotPassword';
import ResetPassword from './components/admin/ResetPassword';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState('');

  // Detectar si la URL tiene ?token= para reset de contraseña
  const urlParams = new URLSearchParams(window.location.search);
  const resetToken = urlParams.get('token');
  const isResetPath = window.location.pathname === '/reset-password';

  const [page, setPage] = useState(() => {
    if (isResetPath && resetToken) return 'reset-password';
    return 'home'; // 'home' | 'about' | 'services' | 'blog' | 'portfolio' | 'process' | 'why-choose-us' | 'faq' | 'contact' | 'admin' | ...
  });

  const [adminToken, setAdminToken] = useState(localStorage.getItem('slp_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('slp_admin_user') || 'null'); }
    catch { return null; }
  });

  const handleOpenQuote = (serviceTitle = '') => {
    setQuoteInitialService(serviceTitle);
    setIsQuoteOpen(true);
  };

  const goToHome = () => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToAbout = () => { setPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToServices = () => { setPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToWhyChooseUs = () => { setPage('why-choose-us'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToProcess = () => { setPage('process'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToPortfolio = () => { setPage('portfolio'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToFAQ = () => { setPage('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToBlog = () => { setPage('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goToContact = () => { setPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleLoginSuccess = (token, user) => {
    setAdminToken(token);
    setAdminUser(user);
    setPage('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('slp_admin_token');
    localStorage.removeItem('slp_admin_user');
    setAdminToken('');
    setAdminUser(null);
    setPage('home');
  };

  const navProps = {
    onBack: goToHome,
    onOpenQuote: handleOpenQuote,
    onOpenAbout: goToAbout,
    onOpenServices: goToServices,
    onOpenWhyChooseUs: goToWhyChooseUs,
    onOpenProcess: goToProcess,
    onOpenPortfolio: goToPortfolio,
    onOpenFAQ: goToFAQ,
    onOpenBlog: goToBlog,
    onOpenContact: goToContact,
  };

  /* ── Router simple ── */

  if (page === 'reset-password') {
    return <ResetPassword token={resetToken} onSuccess={() => setPage('admin-login')} />;
  }

  if (page === 'forgot-password') {
    return <ForgotPassword onBack={() => setPage('admin-login')} />;
  }

  if (page === 'admin') {
    if (!adminToken) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} onCancel={goToHome} onForgotPassword={() => setPage('forgot-password')} />;
    }
    return (
      <AdminDashboard
        token={adminToken}
        admin={adminUser}
        onLogout={handleLogout}
        onGoToSite={goToHome}
      />
    );
  }

  if (page === 'admin-login') {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onCancel={goToHome} onForgotPassword={() => setPage('forgot-password')} />;
  }

  // 1. Página independiente "Nosotros"
  if (page === 'about') {
    return (
      <>
        <AboutPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 2. Página independiente "Servicios"
  if (page === 'services') {
    return (
      <>
        <ServicesPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 3. Página independiente "¿Por qué SLP?"
  if (page === 'why-choose-us') {
    return (
      <>
        <WhyChooseUsPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 4. Página independiente "Proceso"
  if (page === 'process') {
    return (
      <>
        <ProcessPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 5. Página independiente "Portafolio"
  if (page === 'portfolio') {
    return (
      <>
        <PortfolioPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 6. Página independiente "FAQ"
  if (page === 'faq') {
    return (
      <>
        <FAQPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 7. Página independiente "Blog"
  if (page === 'blog') {
    return (
      <>
        <BlogPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  // 8. Página independiente "Contacto"
  if (page === 'contact') {
    return (
      <>
        <ContactPage {...navProps} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <WhatsAppFAB />
      </>
    );
  }

  /* 9. Homepage (Landing pública con versiones resumidas) */
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-hostdime-orange selection:text-white bg-hostdime-lightBg text-slate-800">
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onGoHome={goToHome}
        onOpenAbout={goToAbout}
        onOpenServices={goToServices}
        onOpenWhyChooseUs={goToWhyChooseUs}
        onOpenProcess={goToProcess}
        onOpenPortfolio={goToPortfolio}
        onOpenFAQ={goToFAQ}
        onOpenBlog={goToBlog}
        onOpenContact={goToContact}
      />
      <main className="flex-grow">
        <Hero onOpenQuote={() => handleOpenQuote()} />
        <Partners />
        <StatsBanner />
        <About onOpenAbout={goToAbout} />
        <Services onOpenServices={goToServices} onOpenQuote={(service) => handleOpenQuote(service)} />
        <WhyChooseUs compact={true} onViewFull={goToWhyChooseUs} onOpenQuote={() => handleOpenQuote()} />
        <Process compact={true} onViewFull={goToProcess} onOpenQuote={() => handleOpenQuote()} />
        <Portfolio compact={true} onViewFull={goToPortfolio} onOpenQuote={(service) => handleOpenQuote(service)} />
        <FAQ compact={true} onViewFull={goToFAQ} onOpenQuote={() => handleOpenQuote()} />
        <Blog onOpenQuote={handleOpenQuote} onViewAll={goToBlog} />
        <Contact compact={true} onViewFull={goToContact} onOpenQuote={() => handleOpenQuote()} />
      </main>

      <Footer onOpenQuote={() => handleOpenQuote()} onOpenAdmin={() => setPage(adminToken ? 'admin' : 'admin-login')} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
      <WhatsAppFAB />
    </div>
  );
}

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/573214451817?text=Hola%20SLP%20Soluciones%20Inform%C3%A1ticas,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">WhatsApp Directo</span>
    </a>
  );
}
