import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const DOMAIN = 'https://fisiom-org.github.io/fisiom-osteopatia'

export default defineConfig({
  base: '/fisiom-osteopatia/',
  resolve: {
    dedupe: ['react', 'react-dom', 'react-helmet-async'],
  },
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
