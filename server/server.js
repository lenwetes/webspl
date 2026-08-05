import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool, initDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'slp_jwt_secret_key_2026';

app.use(cors());
app.use(express.json());

// Middleware de Autenticación JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });
    req.user = user;
    next();
  });
}

/* ════════ API ENDPOINTS ════════ */

// Login Admin
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
  }
});

// Obtener posts públicos
app.get('/api/posts', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
  try {
    let queryStr = 'SELECT * FROM posts WHERE published = true ORDER BY id DESC';
    const params = [];
    if (limit) {
      queryStr += ' LIMIT $1';
      params.push(limit);
    }
    const result = await pool.query(queryStr, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar publicaciones' });
  }
});

// Obtener post por slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts WHERE slug = $1 AND published = true', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Publicación no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar publicación' });
  }
});

// Admin: Obtener todos los posts
app.get('/api/posts/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar panel admin' });
  }
});

// Admin: Crear o Editar post
app.post('/api/posts', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO posts (slug, category, category_label, featured, published, cover_url, title, date_str, read_time, author, author_role, summary, highlights, metrics_table, sections, recommendation, accent, accent_bg)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
      [
        p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        p.category || 'general',
        p.category_label || p.categoryLabel || 'General',
        !!p.featured,
        p.published !== undefined ? p.published : true,
        p.cover_url || p.cover || '/blog1.png',
        p.title,
        p.date_str || p.date || 'Reciente',
        p.read_time || p.readTime || '5 min lectura',
        p.author || 'Ing. Sergio Luis Pérez C.',
        p.author_role || p.authorRole || 'Especialista TI',
        p.summary,
        JSON.stringify(p.highlights || []),
        JSON.stringify(p.metrics_table || p.metricsTable || []),
        JSON.stringify(p.sections || []),
        p.recommendation || '',
        p.accent || '#20c997',
        p.accent_bg || p.accentBg || 'rgba(32,201,151,0.10)',
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
});

app.put('/api/posts/:id', authenticateToken, async (req, res) => {
  const p = req.body;
  try {
    const result = await pool.query(
      `UPDATE posts SET 
        title = $1, category = $2, category_label = $3, featured = $4, published = $5,
        cover_url = $6, summary = $7, highlights = $8, metrics_table = $9, sections = $10,
        recommendation = $11, accent = $12, accent_bg = $13
       WHERE id = $14 RETURNING *`,
      [
        p.title, p.category, p.category_label || p.categoryLabel, !!p.featured, !!p.published,
        p.cover_url || p.cover, p.summary, JSON.stringify(p.highlights || []),
        JSON.stringify(p.metrics_table || p.metricsTable || []), JSON.stringify(p.sections || []),
        p.recommendation, p.accent, p.accent_bg || p.accentBg, req.params.id
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar publicación' });
  }
});

// Admin: Cambiar estado publicado
app.patch('/api/posts/:id/publish', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE posts SET published = $1 WHERE id = $2 RETURNING *',
      [req.body.published, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al cambiar estado' });
  }
});

// Admin: Eliminar post
app.delete('/api/posts/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    res.json({ message: 'Publicación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar publicación' });
  }
});

// Admin: Usuarios
app.get('/api/auth/users', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

app.post('/api/auth/users', authenticateToken, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPass, role || 'admin']
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear usuario o email ya registrado' });
  }
});

app.delete('/api/auth/users/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

/* ════════ SERVIR FRONTEND ════════ */
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

/* ════════ INICIALIZACIÓN ════════ */
async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend ejecutándose en puerto ${PORT}`);
  });
}

startServer();
