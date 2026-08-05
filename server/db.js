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

    // Crear admin inicial si no existe
    const resUsers = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(resUsers.rows[0].count, 10) === 0) {
      const hashedPass = await bcrypt.hash('admin123', 10);
      await client.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Sergio Luis Pérez', 'admin@slp.com', hashedPass, 'admin']
      );
      console.log('✅ Usuario administrador predeterminado creado: admin@slp.com / admin123');
    }

    // Insertar artículos iniciales si la tabla posts está vacía
    const resPosts = await client.query('SELECT COUNT(*) FROM posts');
    if (parseInt(resPosts.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO posts (slug, category, category_label, featured, published, cover_url, title, date_str, read_time, author, author_role, summary, highlights, metrics_table, sections, recommendation, accent, accent_bg)
        VALUES 
        (
          'ciberseguridad-ransomware-2026',
          'ciberseguridad',
          'Ciberseguridad',
          true,
          true,
          '/blog1.png',
          'Blindaje Antifraude 2026: Cómo Proteger la Infraestructura Empresarial contra el Ransomware y Phishing',
          '15 Jul 2026',
          '7 min lectura',
          'Ing. Sergio Luis Pérez C.',
          'Director de Ingeniería & Seguridad TI',
          'Estrategias de arquitectura defensiva multicapa, copias de seguridad inmutables Regla 3-2-1 y políticas MFA para prevenir secuestros de datos y fugas financieras en Pymes.',
          '["Copias de Seguridad 3-2-1 Inmutables", "Autenticación MFA Obligatoria", "Segmentación por VLANs & Firewalls"]'::jsonb,
          '[{"metric": "Ataques Neutralizados con MFA", "value": "99.4%"}, {"metric": "Tiempo Promedio de Recuperación", "value": "< 2 Horas"}, {"metric": "Pérdida de Datos Garantizada", "value": "0% con Backup 3-2-1"}]'::jsonb,
          '[{"heading": "1. El Panorama Actual del Secuestro Digital", "body": "El ransomware busca paralizar las operaciones de su empresa cifrando bases de datos. En Latinoamérica, el 68% de los ataques afectan a Pymes."}, {"heading": "2. La Regla de Oro: Respaldos Inmutables (3-2-1)", "body": "3 copias de los datos críticos, 2 medios físicos distintos y 1 copia fuera de la ubicación física (Nube cifrada inmutable)."}]'::jsonb,
          'Realice una auditoría de seguridad preventiva en su infraestructura perimetral antes de que se produzca una falla crítica o vector de ataque.',
          '#20c997',
          'rgba(32,201,151,0.10)'
        ),
        (
          'asistentes-virtuales-ia-whatsapp',
          'ia',
          'Inteligencia Artificial',
          false,
          true,
          '/blog2.png',
          'Asistentes Virtuales con IA: Cómo Multiplicar las Ventas y Respuestas 24/7 en WhatsApp',
          '02 Ago 2026',
          '6 min lectura',
          'Ing. Sergio Luis Pérez C.',
          'Especialista en IA & Automatización',
          'Guía práctica para conectar modelos como OpenAI y Gemini a los canales comerciales de su empresa, reduciendo tiempos de espera y automatizando cotizaciones.',
          '["Atención Comercial 24/7", "Calificación de Leads por IA", "Integración Directa con CRM & Web"]'::jsonb,
          '[{"metric": "Tasa de Respuesta Inicial", "value": "Instantánea (< 3s)"}, {"metric": "Aumento en Conversión Comercial", "value": "+35%"}, {"metric": "Reducción de Carga Administrativa", "value": "-60%"}]'::jsonb,
          '[{"heading": "1. Automatización Inteligente de Canales de Atención", "body": "Conecte la IA directamente con su catálogo de productos y CRM empresarial para atender prospectos en tiempo real."}]'::jsonb,
          'Implemente asistentes con IA supervisada para canalizar prospectos calificados directamente hacia su equipo comercial.',
          '#f37021',
          'rgba(243,112,33,0.10)'
        );
      `);
      console.log('✅ Artículos de ejemplo inicializados en PostgreSQL.');
    }
  } catch (err) {
    console.error('❌ Error al inicializar PostgreSQL:', err);
  } finally {
    client.release();
  }
}
