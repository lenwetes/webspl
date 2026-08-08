import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import http from 'http';

// Plugin que reemplaza el proxy nativo de Vite para evitar logs ECONNREFUSED
function silentApiProxy() {
  return {
    name: 'silent-api-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) return next();

        const proxyReq = http.request({
          hostname: '127.0.0.1',
          port: 4000,
          path: req.url,
          method: req.method,
          headers: { ...req.headers, host: '127.0.0.1:4000' },
        }, (proxyRes) => {
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res);
        });

        proxyReq.on('error', () => {
          if (!res.headersSent) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([]));
          }
        });

        req.pipe(proxyReq);
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), silentApiProxy()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
  },
});
