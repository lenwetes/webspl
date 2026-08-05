import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Sparkles, X, CheckCircle2, BarChart2, Lightbulb } from 'lucide-react';
import { fetchPublicPosts } from '../services/api';
import { ARTICLES as FALLBACK_ARTICLES } from '../data/blogData';

/* ── Mini Article Reader Modal (reutilizado en homepage) ── */
function ArticleModal({ article, onClose, onOpenQuote }) {
  if (!article) return null;
  
  const highlights = Array.isArray(article.highlights) ? article.highlights : (article.highlights ? JSON.parse(article.highlights) : []);
  const metricsTable = Array.isArray(article.metrics_table) ? article.metrics_table : (article.metrics_table ? JSON.parse(article.metrics_table) : []);
  const sections = Array.isArray(article.sections) ? article.sections : (article.sections ? JSON.parse(article.sections) : []);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(15,30,51,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, animation: 'fadeInBlog 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#ffffff', borderRadius: 24, maxWidth: 780, width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative', border: `2px solid ${article.accent || '#20c997'}40`, boxShadow: `0 32px 90px -16px ${article.accent || '#20c997'}35, 0 10px 40px rgba(0,0,0,0.15)`, animation: 'slideUpBlog 0.3s cubic-bezier(.22,1,.36,1)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f1e33', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <X style={{ width: 18, height: 18 }} />
        </button>
        <div style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
          <img src={article.cover_url || article.cover} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15,30,51,0.9) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 32, right: 32, color: '#fff' }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: article.accent || '#20c997', background: 'rgba(255,255,255,0.92)', padding: '4px 12px', borderRadius: 14, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{article.category_label || article.categoryLabel}</span>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', margin: '8px 0 4px', lineHeight: 1.25 }}>{article.title}</h2>
          </div>
        </div>
        <div style={{ padding: '32px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, padding: '12px 16px', borderRadius: 14, background: '#f8fafc', marginBottom: 28, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0f1e33', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>SLP</div>
              <div>
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#0f1e33', display: 'block' }}>{article.author}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>{article.author_role || article.authorRole}</span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
              <Clock style={{ width: 14, height: 14, color: article.accent || '#20c997' }} />
              <span>{article.date || 'Reciente'}</span><span>·</span><span>{article.read_time || article.readTime}</span>
            </div>
          </div>
          {metricsTable.length > 0 && (
            <div style={{ marginBottom: 32, background: article.accent_bg || article.accentBg, borderRadius: 16, padding: 20, border: `1px solid ${article.accent || '#20c997'}30` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: article.accent || '#20c997', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                <BarChart2 style={{ width: 15, height: 15 }} /><span>Métricas & Indicadores Técnicos</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
                {metricsTable.map((m, i) => (
                  <div key={i} style={{ background: '#fff', padding: '12px 8px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: '#0f1e33', display: 'block' }}>{m.value}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', marginTop: 2, display: 'block' }}>{m.metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f1e33', margin: '0 0 10px', lineHeight: 1.3 }}>{sec.heading}</h3>
              <div style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{sec.body}</div>
            </div>
          ))}
          {article.recommendation && (
            <div style={{ background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)', borderRadius: 16, padding: '22px 24px', color: '#fff', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Lightbulb style={{ width: 16, height: 16, color: article.accent || '#20c997' }} />
                <span style={{ fontSize: 10.5, fontWeight: 800, color: article.accent || '#20c997', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Recomendación de Ingeniería SLP</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#f8fafc', margin: 0, lineHeight: 1.6 }}>"{article.recommendation}"</p>
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <button onClick={onClose} style={{ padding: '11px 22px', borderRadius: 10, border: '1.5px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Cerrar Lectura</button>
            {onOpenQuote && (
              <button onClick={() => { onClose(); onOpenQuote(`Asesoría: ${article.title}`); }}
                style={{ padding: '11px 24px', borderRadius: 10, border: 'none', background: article.accent || '#20c997', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 18px ${article.accent || '#20c997'}40` }}>
                <span>Solicitar Diagnóstico Técnico</span><ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   Blog — Preview compacto para homepage
   Muestra las últimas 3 publicaciones
══════════════════════════════════════ */
export default function Blog({ onOpenQuote, onViewAll }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchPublicPosts({ limit: 3 })
      .then(data => setArticles(data.length > 0 ? data : FALLBACK_ARTICLES.slice(0, 3)))
      .catch(() => setArticles(FALLBACK_ARTICLES.slice(0, 3)));
  }, []);

  return (
    <section id="blog" style={{ background: '#ffffff', padding: '96px 0', borderBottom: '1px solid #e2e8f0', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes fadeInBlog  { from { opacity:0 }                           to { opacity:1 } }
        @keyframes slideUpBlog { from { transform:translateY(24px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        .bp-card { transition: all 0.32s cubic-bezier(.22,1,.36,1); }
        .bp-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px -10px rgba(15,30,51,0.12) !important; border-color: rgba(32,201,151,0.4) !important; }
        @media (max-width: 900px) { .bp-preview-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 901px) and (max-width: 1100px) { .bp-preview-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>

      {/* Ambient light */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(32,201,151,0.05) 0%, transparent 70%)', top: -100, left: -100 }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(243,112,33,0.04) 0%, transparent 70%)', bottom: -100, right: -100 }} />
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f37021', padding: '4px 14px', borderRadius: 20, background: 'rgba(243,112,33,0.08)', border: '1px solid rgba(243,112,33,0.2)', marginBottom: 12 }}>
            <Sparkles style={{ width: 11, height: 11 }} />
            Publicaciones & Conocimiento
          </span>
          <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 900, color: '#0f1e33', margin: '8px 0 12px', lineHeight: 1.15 }}>
            Blog de Ingeniería &amp; Transformación TI
          </h2>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: '0 0 4px' }}>
            Artículos explicativos con métricas reales, guías de ciberseguridad y recomendaciones de infraestructura para empresas.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="bp-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {articles.map(art => {
            const highlights = Array.isArray(art.highlights) ? art.highlights : (art.highlights ? JSON.parse(art.highlights) : []);
            return (
              <div key={art.id} className="bp-card" style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px rgba(15,30,51,0.05)' }}>
                {/* Cover */}
                <div style={{ height: 190, position: 'relative', overflow: 'hidden' }}>
                  <img src={art.cover_url || art.cover} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 9.5, fontWeight: 800, color: art.accent || '#20c997', background: 'rgba(255,255,255,0.92)', padding: '4px 12px', borderRadius: 14, textTransform: 'uppercase', letterSpacing: '0.08em', backdropFilter: 'blur(4px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    {art.category_label || art.categoryLabel}
                  </span>
                  {art.featured && (
                    <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 800, color: '#fff', background: '#20c997', padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Destacado
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '20px 20px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>
                      <Clock style={{ width: 12, height: 12, color: art.accent || '#20c997' }} />
                      <span>{art.read_time || art.readTime}</span><span>·</span><span>{art.date || 'Reciente'}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f1e33', margin: '0 0 9px', lineHeight: 1.35 }}>{art.title}</h3>
                    <p style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.6, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{art.summary}</p>
                    {/* Highlights pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {highlights.slice(0, 2).map((h, i) => (
                        <span key={i} style={{ fontSize: 10, fontWeight: 700, color: art.accent || '#20c997', background: art.accent_bg || art.accentBg, padding: '3px 10px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 style={{ width: 10, height: 10 }} />{h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#475569' }}>SLP Ingeniería</span>
                    <button onClick={() => setSelectedArticle(art)}
                      style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 800, color: art.accent || '#20c997', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
                      <span>Leer Publicación</span><ArrowRight style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA — Ver Blog Completo */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onViewAll}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px', borderRadius: 14,
              background: 'linear-gradient(135deg, #0f1e33 0%, #162a45 100%)',
              color: '#fff', fontSize: 13, fontWeight: 800, border: 'none', cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(15,30,51,0.18)', letterSpacing: '0.04em',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(15,30,51,0.24)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,30,51,0.18)'; }}
          >
            <span>Ver Todas las Publicaciones</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>

      </div>

      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} onOpenQuote={onOpenQuote} />
    </section>
  );
}
