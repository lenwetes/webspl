import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import StatsBanner from './components/StatsBanner';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState('');
  const [page, setPage] = useState('home'); // 'home' | 'blog' | 'admin' | 'admin-login'

  const [adminToken, setAdminToken] = useState(localStorage.getItem('slp_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('slp_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  const handleOpenQuote = (serviceTitle = '') => {
    setQuoteInitialService(serviceTitle);
    setIsQuoteOpen(true);
  };

  const goToBlog = () => {
    setPage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  /* ── Router simple ── */

  // 1. Panel CMS Admin Dashboard
  if (page === 'admin') {
    if (!adminToken) {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} onCancel={goHome} />;
    }
    return (
      <AdminDashboard
        token={adminToken}
        admin={adminUser}
        onLogout={handleLogout}
        onGoToSite={goHome}
      />
    );
  }

  // 2. Login Admin
  if (page === 'admin-login') {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onCancel={goHome} />;
  }

  // 3. Blog Page pública
  if (page === 'blog') {
    return (
      <>
        <BlogPage onBack={goHome} onOpenQuote={handleOpenQuote} />
        <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
        <a
          href="https://wa.me/573214451817?text=Hola%20SLP%20Soluciones%20Inform%C3%A1ticas,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">WhatsApp Directo</span>
        </a>
      </>
    );
  }

  /* 4. Homepage (Landing pública) */
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-hostdime-orange selection:text-white bg-hostdime-lightBg text-slate-800">
      <Navbar onOpenQuote={() => handleOpenQuote()} onOpenBlog={goToBlog} />
      <main className="flex-grow">
        <Hero onOpenQuote={() => handleOpenQuote()} />
        <Partners />
        <StatsBanner />
        <About />
        <Services onOpenQuote={(service) => handleOpenQuote(service)} />
        <WhyChooseUs onOpenQuote={() => handleOpenQuote()} />
        <Process onOpenQuote={() => handleOpenQuote()} />
        <Portfolio onOpenQuote={(service) => handleOpenQuote(service)} />
        <FAQ onOpenQuote={() => handleOpenQuote()} />
        <Blog onOpenQuote={handleOpenQuote} onViewAll={goToBlog} />
        <Contact onOpenQuote={() => handleOpenQuote()} />
      </main>

      {/* Acceso discreto Admin Footer */}
      <Footer onOpenQuote={() => handleOpenQuote()} onOpenAdmin={() => setPage(adminToken ? 'admin' : 'admin-login')} />
      
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} initialService={quoteInitialService} />
      <a
        href="https://wa.me/573214451817?text=Hola%20SLP%20Soluciones%20Inform%C3%A1ticas,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20sus%20servicios."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-bold transition-all duration-300">WhatsApp Directo</span>
      </a>
    </div>
  );
}


