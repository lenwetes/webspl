import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, Clock, ArrowRight, X,
  Sparkles, CheckCircle2, BarChart2, Lightbulb,
} from 'lucide-react';
import { fetchPublicPosts } from '../services/api';
import { ARTICLES as FALLBACK_ARTICLES, CATEGORIES } from '../data/blogData';
import SLPLogo from './SLPLogo';
import PageHeader from './PageHeader';

/* ── Article Reader Modal ── */
function ArticleModal({ article, onClose, onOpenQuote }) {
  if (!article) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 70,
        background: 'rgba(15,30,51,0.75)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff', borderRadius: 24,
          maxWidth: 780, width: '100%', maxHeight: '92vh', overflowY: 'auto',
          position: 'relative',
          border: `2px solid ${article.accent}40`,
          boxShadow: `0 32px 90px -16px ${article.accent}35, 0 10px 40px rgba(0,0,0,0.15)`,
          animation: 'slideUp 0.3s cubic-bezier(.22,1,.36,1)',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 20, right: 20, zIndex: 10,
          width: 36, height: 36, borderRadius: 12,
          background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0f1e33', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <X style={{ width: 18, height: 18 }} />
        </button>

        {/* Hero image */}
        <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
          <img src={article.cover_url || article.cover} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15,30,51,0.9) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 32, right: 32, color: '#fff' }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: article.accent,
              background: 'rgba(255,255,255,0.92)', padding: '4px 12px', borderRadius: 14,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>{article.categoryLabel}</span>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '8px 0 4px', lineHeight: 1.25 }}>
              {article.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 36px' }}>
          {/* Author bar */}
          <div style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12,
            padding: '12px 16px', borderRadius: 14, background: '#f8fafc',
            marginBottom: 28, border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0f1e33', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>SLP</div>
              <div>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#0f1e33', display: 'block' }}>{article.author}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>{article.authorRole}</span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
              <Clock style={{ width: 14, height: 14, color: article.accent }} />
              <span>{article.date}</span><span>·</span><span>{article.readTime}</span>
            </div>
          </div>

          {/* Metrics */}
          {article.metricsTable && (
            <div style={{ marginBottom: 32, background: article.accentBg, borderRadius: 16, padding: 20, border: `1px solid ${article.accent}30` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: article.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                <BarChart2 style={{ width: 15, height: 15 }} />
                <span>Métricas & Indicadores Técnicos</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
                {article.metricsTable.map((m, i) => (
                  <div key={i} style={{ background: '#fff', padding: '12px 8px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', display: 'block' }}>{m.value}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', marginTop: 2, display: 'block' }}>{m.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {article.sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f1e33', margin: '0 0 10px', lineHeight: 1.3 }}>{sec.heading}</h3>
              <div style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{sec.body}</div>
            </div>
          ))}

          {/* Recommendation callout */}
          <div style={{ background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)', borderRadius: 16, padding: '22px 24px', color: '#fff', marginBottom: 32, boxShadow: '0 8px 24px rgba(15,30,51,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Lightbulb style={{ width: 16, height: 16, color: article.accent }} />
              <span style={{ fontSize: 10.5, fontWeight: 800, color: article.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Recomendación de Ingeniería SLP</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', margin: 0, lineHeight: 1.6 }}>"{article.recommendation}"</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={onClose} style={{ padding: '11px 22px', borderRadius: 10, border: '1.5px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
              Cerrar Lectura
            </button>
            {onOpenQuote && (
              <button onClick={() => { onClose(); onOpenQuote(`Asesoría: ${article.title}`); }}
                style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: article.accent, color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 18px ${article.accent}40` }}>
                <span>Solicitar Diagnóstico Técnico</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Article Card ── */
function ArticleCard({ art, onRead }) {
  return (
    <div className="blog-item-card" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px rgba(15,30,51,0.05)' }}>
      <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
        <img src={art.cover_url || art.cover} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 9.5, fontWeight: 800, color: art.accent, background: 'rgba(255,255,255,0.92)', padding: '4px 12px', borderRadius: 14, textTransform: 'uppercase', letterSpacing: '0.08em', backdropFilter: 'blur(4px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {art.categoryLabel}
        </span>
      </div>
      <div style={{ padding: '22px 22px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
            <Clock style={{ width: 12, height: 12, color: art.accent }} />
            <span>{art.readTime}</span><span>·</span><span>{art.date}</span>
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f1e33', margin: '0 0 10px', lineHeight: 1.35 }}>{art.title}</h3>
          <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.6, margin: '0 0 16px' }}>{art.summary}</p>
        </div>
        <div style={{ paddingTop: 14, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>SLP Ingeniería</span>
          <button onClick={() => onRead(art)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: art.accent, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <span>Leer Publicación</span>
            <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   BlogPage — Página independiente completa
══════════════════════════════════════ */
export default function BlogPage(props) {
  const { onBack, onOpenQuote, onOpenAbout, onOpenServices, onOpenBlog } = props;
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPublicPosts()
      .then(data => setArticles(data.length > 0 ? data : FALLBACK_ARTICLES))
      .catch(() => setArticles(FALLBACK_ARTICLES));
  }, []);

  const featuredArt = articles.find(a => a.featured) || articles[0];

  const filtered = articles.filter(art => {
    const matchCat = activeCategory === 'todos' || art.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const catLabel = art.category_label || art.categoryLabel || '';
    const matchSearch = !q || art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q) || catLabel.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'inherit' }}>
      <style>{`
        @keyframes fadeIn  { from { opacity:0 }             to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(24px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        .blog-item-card { transition: all 0.32s cubic-bezier(.22,1,.36,1); }
        .blog-item-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px -10px rgba(15,30,51,0.12) !important; border-color: rgba(32,201,151,0.4) !important; }
        .bp-hero-card { transition: all 0.32s cubic-bezier(.22,1,.36,1); }
        .bp-hero-card:hover { transform: translateY(-4px); box-shadow: 0 24px 60px -12px rgba(15,30,51,0.14) !important; }
        .bp-cat-pill { transition: all 0.2s ease; cursor: pointer; }
        .bp-cat-pill:hover { transform: translateY(-2px); }
        @media (max-width: 900px) {
          .bp-hero-grid { grid-template-columns: 1fr !important; }
          .bp-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 901px) and (max-width: 1200px) {
          .bp-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Corporate Page Banner Header */}
      <PageHeader
        {...props}
        title="Blog & Publicaciones"
        breadcrumb="BLOG"
        badgeText="Conocimiento & Transformación TI"
        bgImage="/banner-blog.png"
        subtitle="Artículos con métricas reales, guías de ciberseguridad, adopción de IA y recomendaciones de arquitectura TI."
        onGoHome={onBack || props.onGoHome}
      />

      {/* ── SEARCH BAR SUBSECTION ── */}
      <div style={{ background: '#0f1e33', padding: '24px 24px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#64748b' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar tema (ransomware, IA, cableado Cat6, software)..."
            style={{ width: '100%', padding: '14px 16px 14px 50px', borderRadius: 14, background: '#ffffff', border: '1.5px solid #cbd5e1', color: '#0f1e33', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── FEATURED HERO CARD ── */}
        {featuredArt && activeCategory === 'todos' && !searchQuery && (
          <div className="bp-hero-card" style={{ background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)', borderRadius: 24, overflow: 'hidden', marginBottom: 48, boxShadow: '0 16px 40px rgba(15,30,51,0.12)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
            <div className="bp-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', alignItems: 'center' }}>
              <div style={{ padding: '44px 48px', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: '#20c997', padding: '4px 12px', borderRadius: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ARTÍCULO DESTACADO</span>
                  <span style={{ fontSize: 11, color: 'rgba(203,213,225,0.8)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock style={{ width: 12, height: 12 }} />{featuredArt.readTime}
                  </span>
                </div>
                <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, margin: '0 0 14px', lineHeight: 1.25 }}>{featuredArt.title}</h2>
                <p style={{ fontSize: 13.5, color: 'rgba(203,213,225,0.85)', lineHeight: 1.7, margin: '0 0 24px' }}>{featuredArt.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {featuredArt.highlights.map((h, i) => (
                    <span key={i} style={{ fontSize: 11, fontWeight: 700, color: '#20c997', background: 'rgba(32,201,151,0.12)', border: '1px solid rgba(32,201,151,0.3)', padding: '4px 12px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 style={{ width: 12, height: 12 }} />{h}
                    </span>
                  ))}
                </div>
                <button onClick={() => setSelectedArticle(featuredArt)} style={{ padding: '13px 28px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #20c997 0%, #12b886 100%)', color: '#fff', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 8px 24px rgba(32,201,151,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span>Leer Publicación Completa</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
              <div style={{ height: '100%', minHeight: 340, overflow: 'hidden' }}>
                <img src={featuredArt.cover_url || featuredArt.cover} alt={featuredArt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORY FILTERS ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} className="bp-cat-pill" onClick={() => setActiveCategory(cat.id)}
              style={{ padding: '8px 20px', borderRadius: 30, fontSize: 12, fontWeight: 700, border: activeCategory === cat.id ? '1.5px solid #0f1e33' : '1.5px solid #e2e8f0', background: activeCategory === cat.id ? '#0f1e33' : '#fff', color: activeCategory === cat.id ? '#fff' : '#475569', boxShadow: activeCategory === cat.id ? '0 4px 12px rgba(15,30,51,0.2)' : 'none' }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── ARTICLES GRID ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: '#94a3b8' }}>
            <Search style={{ width: 40, height: 40, margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
            <p style={{ fontSize: 15, fontWeight: 600 }}>No se encontraron artículos para tu búsqueda.</p>
          </div>
        ) : (
          <div className="bp-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.map(art => (
              <ArticleCard key={art.id} art={art} onRead={setSelectedArticle} />
            ))}
          </div>
        )}

        {/* CTA bottom */}
        <div style={{ marginTop: 64, textAlign: 'center', padding: '40px 32px', borderRadius: 24, background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)', boxShadow: '0 16px 40px rgba(15,30,51,0.12)' }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '0 0 10px' }}>¿Necesitas asesoría técnica personalizada?</h3>
          <p style={{ fontSize: 13, color: 'rgba(203,213,225,0.8)', margin: '0 0 24px' }}>Nuestros ingenieros analizan tu caso específico sin costo.</p>
          {onOpenQuote ? (
            <button onClick={() => onOpenQuote()} style={{ padding: '13px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f37021, #dc5c10)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(243,112,33,0.35)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Solicitar Diagnóstico Gratuito <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          ) : (
            <button onClick={onBack} style={{ padding: '13px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #f37021, #dc5c10)', color: '#fff', fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Contáctanos <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>
      </div>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} onOpenQuote={onOpenQuote} />
    </div>
  );
}
