import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  server: {
    port: 3001,
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // optional: helps with debugging in production
  },
});
