import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgres://webspl_user:webspl_pass@localhost:5432/webspl_db';

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' && !connectionString.includes('localhost') && !connectionString.includes('db')
    ? { rejectUnauthorized: false }
    : false,
});

const DEFAULT_ARTICLES = [
  {
    slug: 'ciberseguridad-ransomware-2026',
    category: 'ciberseguridad',
    category_label: 'Ciberseguridad',
    featured: true,
    published: true,
    cover_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    title: 'Blindaje Antifraude 2026: Cómo Proteger la Infraestructura Empresarial contra el Ransomware y Phishing',
    date_str: '15 Jul 2026',
    read_time: '7 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    author_role: 'Director de Ingeniería & Seguridad TI',
    summary: 'Estrategias de arquitectura defensiva multicapa, copias de seguridad inmutables Regla 3-2-1 y políticas MFA para prevenir secuestros de datos y fugas financieras en Pymes.',
    highlights: JSON.stringify(["Copias de Seguridad 3-2-1 Inmutables", "Autenticación MFA Obligatoria", "Segmentación por VLANs & Firewalls"]),
    metrics_table: JSON.stringify([
      { metric: "Ataques Neutralizados con MFA", value: "99.4%" },
      { metric: "Tiempo Promedio de Recuperación", value: "< 2 Horas" },
      { metric: "Pérdida de Datos Garantizada", value: "0% con Backup 3-2-1" }
    ]),
    sections: JSON.stringify([
      { heading: "1. El Panorama Actual del Secuestro Digital", body: "El ransomware busca paralizar las operaciones de su empresa cifrando bases de datos. En Latinoamérica, el 68% de los ataques afectan a Pymes." },
      { heading: "2. La Regla de Oro: Respaldos Inmutables (3-2-1)", body: "3 copias de los datos críticos, 2 medios físicos distintos y 1 copia fuera de la ubicación física (Nube cifrada inmutable)." }
    ]),
    recommendation: 'Realice una auditoría de seguridad preventiva en su infraestructura perimetral antes de que se produzca una falla crítica o vector de ataque.',
    accent: '#20c997',
    accent_bg: 'rgba(32,201,151,0.10)'
  },
  {
    slug: 'asistentes-virtuales-ia-whatsapp',
    category: 'ia',
    category_label: 'Inteligencia Artificial',
    featured: false,
    published: true,
    cover_url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    title: 'Asistentes Virtuales con IA: Cómo Multiplicar las Ventas y Respuestas 24/7 en WhatsApp',
    date_str: '02 Ago 2026',
    read_time: '6 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    author_role: 'Especialista en IA & Automatización',
    summary: 'Guía práctica para conectar modelos como OpenAI y Gemini a los canales comerciales de su empresa, reduciendo tiempos de espera y automatizando cotizaciones.',
    highlights: JSON.stringify(["Atención Comercial 24/7", "Calificación de Leads por IA", "Integración Directa con CRM & Web"]),
    metrics_table: JSON.stringify([
      { metric: "Tasa de Respuesta Inicial", value: "Instantánea (< 3s)" },
      { metric: "Aumento en Conversión Comercial", value: "+35%" },
      { metric: "Reducción de Carga Administrativa", value: "-60%" }
    ]),
    sections: JSON.stringify([
      { heading: "1. Por Qué la Inmediatez Decide la Venta", body: "El 75% de los clientes potenciales en canales digitales abandona la compra si no recibe respuesta en 5 minutos. Conecte la IA a sus canales comerciales." }
    ]),
    recommendation: 'Implemente asistentes con IA supervisada para canalizar prospectos calificados directamente hacia su equipo comercial.',
    accent: '#f37021',
    accent_bg: 'rgba(243,112,33,0.10)'
  },
  {
    slug: 'redes-lan-wan-empresariales',
    category: 'redes',
    category_label: 'Redes & CCTV',
    featured: false,
    published: true,
    cover_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    title: 'Cableado Estructurado Cat6A vs Wi-Fi 6: Optimizando la Conectividad Corporativa Cero Caídas',
    date_str: '28 Jul 2026',
    read_time: '8 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    author_role: 'Consultor de Infraestructura & Telecomunicaciones',
    summary: 'Comparativa de arquitectura física e inalámbrica para eliminar cuellos de botella, congelamientos en videollamadas y cortes en sistemas de videovigilancia.',
    highlights: JSON.stringify(["Cableado Cat6A Certificado 10 Gbps", "Wi-Fi 6 Mesh con Roaming sin Cortes", "Switches Administrables PoE+"]),
    metrics_table: JSON.stringify([
      { metric: "Velocidad Cableada Cat6A", value: "Hasta 10 Gbps" },
      { metric: "Latencia en Puestos Fijos", value: "< 1 ms" },
      { metric: "Disponibilidad de Red SLA", value: "99.9%" }
    ]),
    sections: JSON.stringify([
      { heading: "1. La Arquitectura Híbrida Ideal para Oficinas", body: "El cableado Cat6A garantiza transmisión libre de interferencias para servidores, mientras Wi-Fi 6 ofrece cobertura móvil total." }
    ]),
    recommendation: 'Diseñar una red estructurada profesional extiende la vida útil de su infraestructura tecnológica por más de 10 años.',
    accent: '#3b82f6',
    accent_bg: 'rgba(59,130,246,0.10)'
  },
  {
    slug: 'mantenimiento-preventivo-equipos-computo',
    category: 'software',
    category_label: 'Software a Medida',
    featured: false,
    published: true,
    cover_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    title: '¿Software Comercial Licenciado o Sistema a Medida? El Análisis de Retorno de Inversión',
    date_str: '20 Jul 2026',
    read_time: '7 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    author_role: 'Arquitecto Principal de Software',
    summary: 'Descubra por qué desarrollar una aplicación empresarial a la medida elimina costos recurrentes de licenciamiento por usuario y acelera los procesos internos.',
    highlights: JSON.stringify(["Propiedad Total del Código Fuente", "Sin Tarifas de Licencia Mensuales", "Integración Total con ERP & IA"]),
    metrics_table: JSON.stringify([
      { metric: "Ahorro a 3 Años en Licencias", value: "Hasta 65%" },
      { metric: "Adaptación a Procesos Internos", value: "100%" },
      { metric: "Tiempo de Retorno (ROI)", value: "6 - 12 Meses" }
    ]),
    sections: JSON.stringify([
      { heading: "1. El Costo Oculto de las Suscripciones", body: "Un desarrollo a medida se convierte en un activo propio de la compañía, permitiendo crear accesos ilimitados sin pagar cargos adicionales por licencias." }
    ]),
    recommendation: 'Elegir software a medida le otorga ventaja competitiva y autonomía tecnológica frente a competidores atrapados en programas genéricos.',
    accent: '#8b5cf6',
    accent_bg: 'rgba(139,92,246,0.10)'
  },
  {
    slug: 'desarrollo-software-a-medida-vs-plantillas',
    category: 'redes',
    category_label: 'Redes & CCTV',
    featured: false,
    published: true,
    cover_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    title: 'Videovigilancia IP con Análisis por IA: Prevención de Pérdidas y Control Móvil en Tiempo Real',
    date_str: '10 Jul 2026',
    read_time: '6 min lectura',
    author: 'Ing. Sergio Luis Pérez C.',
    author_role: 'Ingeniero de Sistemas & CCTV',
    summary: 'Análisis de tecnología de cámaras IP con detección de intrusos, visión nocturna a color y monitoreo remoto seguro desde teléfonos celulares.',
    highlights: JSON.stringify(["Detección de Movimiento e Intrusión", "Monitoreo Cifrado en Móvil & Web", "Respaldo de Grabación en NVR & Nube"]),
    metrics_table: JSON.stringify([
      { metric: "Resolución de Video HD", value: "4K / 8MP" },
      { metric: "Visión Nocturna Ultra Nítida", value: "Hasta 50 Metros" },
      { metric: "Disponibilidad de Grabación", value: "24/7 Continuo" }
    ]),
    sections: JSON.stringify([
      { heading: "1. De la Grabación Pasiva a la Prevención Activa", body: "Los sistemas de cámaras IP modernos integran algoritmos inteligentes que detectan intrusiones fuera de horario y envían alertas inmediatas al celular." }
    ]),
    recommendation: 'Un sistema CCTV profesional con alimentación por UPS garantiza protección ininterrumpida incluso durante cortes de fluido eléctrico.',
    accent: '#f37021',
    accent_bg: 'rgba(243,112,33,0.10)'
  }
];

export async function initDb() {
  const client = await pool.connect();
  try {
    // 1. Tabla de Usuarios Admin
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(180) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Tabla de Publicaciones del Blog
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(200) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL,
        category_label VARCHAR(100) NOT NULL,
        featured BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        cover_url TEXT NOT NULL,
        title VARCHAR(255) NOT NULL,
        date_str VARCHAR(50) NOT NULL,
        read_time VARCHAR(50) NOT NULL,
        author VARCHAR(120) NOT NULL,
        author_role VARCHAR(120) NOT NULL,
        summary TEXT NOT NULL,
        highlights JSONB DEFAULT '[]'::jsonb,
        metrics_table JSONB DEFAULT '[]'::jsonb,
        sections JSONB DEFAULT '[]'::jsonb,
        recommendation TEXT,
        accent VARCHAR(30) DEFAULT '#20c997',
        accent_bg VARCHAR(50) DEFAULT 'rgba(32,201,151,0.10)',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Tabla de Tokens de Recuperación de Contraseña
    await client.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(128) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Crear admin inicial si no existe
    const resUsers = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(resUsers.rows[0].count, 10) === 0) {
      const hashedPass = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Sergio Luis Pérez', 'admin@slp.com', hashedPass, 'admin']
      );
    }

    // Insertar/Asegurar nuevo admin: Luis Eduardo Zarate
    const resLuis = await client.query('SELECT * FROM users WHERE email = $1', ['lenwetes@gmail.com']);
    if (resLuis.rows.length === 0) {
      const hashedPassLuis = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Luis Eduardo Zarate', 'lenwetes@gmail.com', hashedPassLuis, 'admin']
      );
    }

    // Actualizar cover_url locales
    await client.query(`
      UPDATE posts SET cover_url = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
      WHERE cover_url LIKE '/blog1%' OR cover_url LIKE '/blog_cyber%';
    `);

    // Sincronizar automáticamente todos los artículos por defecto
    for (const art of DEFAULT_ARTICLES) {
      const exists = await client.query('SELECT id FROM posts WHERE slug = $1', [art.slug]);
      if (exists.rows.length === 0) {
        await client.query(`
          INSERT INTO posts (slug, category, category_label, featured, published, cover_url, title, date_str, read_time, author, author_role, summary, highlights, metrics_table, sections, recommendation, accent, accent_bg)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14::jsonb, $15::jsonb, $16, $17, $18)
        `, [
          art.slug, art.category, art.category_label, art.featured, art.published,
          art.cover_url, art.title, art.date_str, art.read_time, art.author,
          art.author_role, art.summary, art.highlights, art.metrics_table,
          art.sections, art.recommendation, art.accent, art.accent_bg
        ]);
        console.log(`✅ Artículo sembrado automáticamente: ${art.slug}`);
      }
    }

    console.log('✅ Base de datos inicializada y sincronizada.');
  } catch (err) {
    console.error('❌ Error al inicializar PostgreSQL:', err);
  } finally {
    client.release();
  }
}
