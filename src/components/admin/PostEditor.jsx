import React, { useState } from 'react';
import { ArrowLeft, Save, Sparkles, Plus, Trash2, CheckCircle2, Image, BarChart2, Lightbulb } from 'lucide-react';
import { savePostAdmin } from '../../services/api';

export default function PostEditor({ token, post, onBack, onSaved }) {
  const [formData, setFormData] = useState({
    id: post?.id || null,
    title: post?.title || '',
    slug: post?.slug || '',
    summary: post?.summary || '',
    cover_url: post?.cover_url || '/blog1.png',
    category: post?.category || 'ciberseguridad',
    category_label: post?.category_label || 'Ciberseguridad',
    accent: post?.accent || '#20c997',
    accent_bg: post?.accent_bg || 'rgba(32,201,151,0.10)',
    author: post?.author || 'Ing. Sergio Luis Pérez C.',
    author_role: post?.author_role || 'Director de Ingeniería & Seguridad TI',
    read_time: post?.read_time || '5 min lectura',
    featured: post?.featured || false,
    published: post?.published || false,
    recommendation: post?.recommendation || '',
    highlights: Array.isArray(post?.highlights) ? post.highlights : (post?.highlights ? JSON.parse(post.highlights) : []),
    metrics_table: Array.isArray(post?.metrics_table) ? post.metrics_table : (post?.metrics_table ? JSON.parse(post.metrics_table) : []),
    sections: Array.isArray(post?.sections) ? post.sections : (post?.sections ? JSON.parse(post.sections) : []),
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.id ? prev.slug : generatedSlug
    }));
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    let label = 'General';
    let accent = '#20c997';
    let accent_bg = 'rgba(32,201,151,0.10)';

    if (val === 'ciberseguridad') { label = 'Ciberseguridad'; accent = '#20c997'; accent_bg = 'rgba(32,201,151,0.10)'; }
    else if (val === 'ia') { label = 'Inteligencia Artificial'; accent = '#f37021'; accent_bg = 'rgba(243,112,33,0.10)'; }
    else if (val === 'redes') { label = 'Redes & CCTV'; accent = '#3b82f6'; accent_bg = 'rgba(59,130,246,0.10)'; }
    else if (val === 'software') { label = 'Software a Medida'; accent = '#8b5cf6'; accent_bg = 'rgba(139,92,246,0.10)'; }

    setFormData(prev => ({ ...prev, category: val, category_label: label, accent, accent_bg }));
  };

  // Highlights handlers
  const addHighlight = () => setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ''] }));
  const updateHighlight = (index, val) => {
    const list = [...formData.highlights];
    list[index] = val;
    setFormData(prev => ({ ...prev, highlights: list }));
  };
  const removeHighlight = (index) => setFormData(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));

  // Metrics handlers
  const addMetric = () => setFormData(prev => ({ ...prev, metrics_table: [...prev.metrics_table, { metric: '', value: '' }] }));
  const updateMetric = (index, field, val) => {
    const list = [...formData.metrics_table];
    list[index][field] = val;
    setFormData(prev => ({ ...prev, metrics_table: list }));
  };
  const removeMetric = (index) => setFormData(prev => ({ ...prev, metrics_table: prev.metrics_table.filter((_, i) => i !== index) }));

  // Sections handlers
  const addSection = () => setFormData(prev => ({ ...prev, sections: [...prev.sections, { heading: '', body: '' }] }));
  const updateSection = (index, field, val) => {
    const list = [...formData.sections];
    list[index][field] = val;
    setFormData(prev => ({ ...prev, sections: list }));
  };
  const removeSection = (index) => setFormData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));

  const handleSubmit = async (isPublishedStatus) => {
    setError('');
    setSaving(true);
    const dataToSend = { ...formData, published: isPublishedStatus !== undefined ? isPublishedStatus : formData.published };

    try {
      await savePostAdmin(token, dataToSend);
      onSaved();
    } catch (err) {
      setError(err.message || 'Error al guardar la publicación');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto', fontFamily: 'inherit' }}>
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#64748b', fontSize: 13, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
        <ArrowLeft style={{ width: 16, height: 16 }} /> Volver al Dashboard
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0f1e33', margin: 0 }}>
          {formData.id ? 'Editar Publicación' : 'Crear Nueva Publicación'}
        </h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => handleSubmit(false)} disabled={saving} style={{ padding: '10px 18px', borderRadius: 10, border: '1.5px solid #cbd5e1', background: '#fff', color: '#475569', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}>
            Guardar Borrador
          </button>
          <button onClick={() => handleSubmit(true)} disabled={saving} style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #20c997, #12b886)', color: '#fff', fontSize: 12.5, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 14px rgba(32,201,151,0.3)' }}>
            <Save style={{ width: 16, height: 16 }} /> {saving ? 'Guardando...' : 'Publicar Ahora'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 14, marginBottom: 24, color: '#991b1b', fontSize: 13, fontWeight: 600 }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
        
        {/* Título & Slug */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Título Principal</label>
          <input type="text" value={formData.title} onChange={handleTitleChange} placeholder="ej. Blindaje Antifraude 2026..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 14, fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>URL Slug</label>
            <input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="blindaje-antifraude-2026" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Categoría</label>
            <select value={formData.category} onChange={handleCategoryChange} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
              <option value="ciberseguridad">Ciberseguridad</option>
              <option value="ia">Inteligencia Artificial</option>
              <option value="redes">Redes & CCTV</option>
              <option value="software">Software a Medida</option>
            </select>
          </div>
        </div>

        {/* Resumen */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Resumen de Tarjeta</label>
          <textarea rows={3} value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} placeholder="Breve descripción que se muestra en las tarjetas de la portada..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Portada & Opciones */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Imagen de Portada (Ruta / URL)</label>
            <input type="text" value={formData.cover_url} onChange={e => setFormData({ ...formData, cover_url: e.target.value })} placeholder="/blog1.png" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 12.5, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Tiempo Lectura</label>
            <input type="text" value={formData.read_time} onChange={e => setFormData({ ...formData, read_time: e.target.value })} placeholder="6 min lectura" style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Destacado</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700 }}>
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} style={{ width: 18, height: 18, accentColor: '#f37021' }} />
              <span>Hero Card</span>
            </label>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '32px 0' }} />

        {/* Highlights */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: '#0f1e33', textTransform: 'uppercase' }}>Puntos Clave (Highlights)</label>
            <button type="button" onClick={addHighlight} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#0f1e33', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Plus style={{ width: 14, height: 14 }} /> Agregar Punto
            </button>
          </div>
          {formData.highlights.map((h, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input type="text" value={h} onChange={e => updateHighlight(idx, e.target.value)} placeholder="ej. Copias de Seguridad 3-2-1" style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5 }} />
              <button type="button" onClick={() => removeHighlight(idx)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', padding: '0 12px', borderRadius: 8, cursor: 'pointer' }}><Trash2 style={{ width: 14, height: 14 }} /></button>
            </div>
          ))}
        </div>

        {/* Métricas */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: '#0f1e33', textTransform: 'uppercase' }}>Métricas Técnicas</label>
            <button type="button" onClick={addMetric} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#0f1e33', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Plus style={{ width: 14, height: 14 }} /> Agregar Métrica
            </button>
          </div>
          {formData.metrics_table.map((m, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 40px', gap: 10, marginBottom: 8 }}>
              <input type="text" value={m.metric} onChange={e => updateMetric(idx, 'metric', e.target.value)} placeholder="Métrica (ej. Ataques Neutralizados)" style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5 }} />
              <input type="text" value={m.value} onChange={e => updateMetric(idx, 'value', e.target.value)} placeholder="Valor (ej. 99.4%)" style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5 }} />
              <button type="button" onClick={() => removeMetric(idx)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', borderRadius: 8, cursor: 'pointer' }}><Trash2 style={{ width: 14, height: 14 }} /></button>
            </div>
          ))}
        </div>

        {/* Secciones de Contenido */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: '#0f1e33', textTransform: 'uppercase' }}>Secciones de Contenido</label>
            <button type="button" onClick={addSection} style={{ background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#0f1e33', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Plus style={{ width: 14, height: 14 }} /> Agregar Sección
            </button>
          </div>
          {formData.sections.map((sec, idx) => (
            <div key={idx} style={{ background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b' }}>Sección {idx + 1}</span>
                <button type="button" onClick={() => removeSection(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 style={{ width: 14, height: 14 }} /></button>
              </div>
              <input type="text" value={sec.heading} onChange={e => updateSection(idx, 'heading', e.target.value)} placeholder="Título de la sección (ej. 1. El Panorama Actual...)" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13, fontWeight: 700, marginBottom: 10, boxSizing: 'border-box' }} />
              <textarea rows={4} value={sec.body} onChange={e => updateSection(idx, 'body', e.target.value)} placeholder="Contenido del cuerpo..." style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12.5, boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>

        {/* Recomendación */}
        <div>
          <label style={{ display: 'block', fontSize: 11.5, fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: 6 }}>Recomendación de Ingeniería SLP</label>
          <textarea rows={2} value={formData.recommendation} onChange={e => setFormData({ ...formData, recommendation: e.target.value })} placeholder="Mensaje destacado al final del artículo..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid #cbd5e1', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>

      </div>
    </div>
  );
}
