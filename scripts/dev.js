import { spawn } from 'child_process';

console.log('\x1b[36m%s\x1b[0m', '🚀 Iniciando entorno de desarrollo completo SLP (Backend + Frontend)...');

// 1. Iniciar Servidor Backend Express (Puerto 4000)
const backend = spawn('node', ['server/server.js'], {
  stdio: 'inherit',
  shell: true,
});

// 2. Iniciar Servidor Frontend Vite (Puerto 3000)
const frontend = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\n\x1b[33m%s\x1b[0m', '🛑 Cerrando servidores Backend y Frontend...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
