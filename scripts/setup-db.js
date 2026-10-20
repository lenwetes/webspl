import pg from 'pg';

const { Pool } = pg;

async function setup() {
  const adminPool = new Pool({
    connectionString: 'postgres://postgres:admin@localhost:5432/postgres'
  });

  try {
    console.log('Conectando a PostgreSQL con usuario postgres...');
    const checkRole = await adminPool.query("SELECT 1 FROM pg_roles WHERE rolname = 'webspl_user'");
    if (checkRole.rows.length === 0) {
      await adminPool.query("CREATE ROLE webspl_user WITH LOGIN PASSWORD 'webspl_pass' SUPERUSER");
      console.log('✅ Rol webspl_user creado.');
    } else {
      await adminPool.query("ALTER ROLE webspl_user WITH PASSWORD 'webspl_pass' SUPERUSER");
      console.log('✅ Rol webspl_user actualizado.');
    }

    const checkDb = await adminPool.query("SELECT 1 FROM pg_database WHERE datname = 'webspl_db'");
    if (checkDb.rows.length === 0) {
      await adminPool.query("CREATE DATABASE webspl_db OWNER webspl_user");
      console.log('✅ Base de datos webspl_db creada.');
    } else {
      console.log('✅ Base de datos webspl_db ya existe.');
    }

    await adminPool.end();

    // Probar conexión con webspl_user
    const userPool = new Pool({
      connectionString: 'postgres://webspl_user:webspl_pass@localhost:5432/webspl_db'
    });
    const testRes = await userPool.query('SELECT current_user, current_database()');
    console.log('✅ Conexión exitosa como:', testRes.rows[0]);
    await userPool.end();
  } catch (err) {
    console.error('❌ Error configurando Postgres:', err.message);
  }
}

setup();
