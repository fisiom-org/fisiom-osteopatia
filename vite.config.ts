import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const DOMAIN = 'https://PLACEHOLDER_DOMINIO'

export default defineConfig({
  base: '/',
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  plugins: [
    react(),
    Sitemap({
      hostname: DOMAIN,
      dynamicRoutes: ['/', '/osteopatia', '/alinhamento-ativo', '/agendamentos'],
    }),
  ],
})
