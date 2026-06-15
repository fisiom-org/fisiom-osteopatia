# Fisiom Osteopatia — Vite Project + GitHub Pages + SEO Completo

**Data:** 2026-06-15  
**Repositório:** https://github.com/fisiom-org/fisiom-osteopatia  
**Responsável clínica:** Cleo Scherer — CREFITO 82530-F  
**Localização:** Florianópolis, Santa Catarina  

---

## 1. Objetivo

Transformar o arquivo único `fisiom_osteopatia_website.tsx` em um projeto Vite completo com:
- Pré-renderização SSG (HTML estático por rota) via `vite-ssg`
- SEO completo: meta tags, JSON-LD, sitemap, robots.txt, Open Graph
- Deploy automatizado via GitHub Actions → GitHub Pages
- Domínio customizado (a definir após compra)

---

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Build | Vite 5 |
| UI | React 18 + TypeScript |
| Estilo | Tailwind CSS 3 |
| Roteamento | react-router-dom v6 |
| SSG | vite-ssg |
| Meta tags | react-helmet-async |
| Sitemap | vite-plugin-sitemap |
| Ícones | lucide-react |
| Runtime | Node 20 LTS (vfox — `.tool-versions`) |
| Deploy | GitHub Actions + GitHub Pages (branch `gh-pages`) |

---

## 3. Arquitetura

### 3.1 Estrutura de Pastas

```
fisiom-osteopatia/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── CNAME                  # placeholder — preencher com domínio real
│   ├── robots.txt
│   └── favicon.ico            # favicon a criar/adicionar
├── src/
│   ├── main.tsx               # entry point vite-ssg (useRoutes)
│   ├── App.tsx                # RouterProvider wrapper
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Osteopatia.tsx
│   │   ├── AlinhamentoAtivo.tsx
│   │   └── Agendamentos.tsx
│   ├── components/
│   │   ├── Layout.tsx         # Header + Footer + Outlet
│   │   ├── FisiomLogo.tsx     # SVG logo vetorizado
│   │   ├── FontImport.tsx     # Google Fonts inline style
│   │   └── SEO.tsx            # react-helmet-async wrapper
│   ├── hooks/
│   │   └── useWhatsApp.ts     # getGenericWhatsAppLink, getSpecificWhatsAppLink
│   ├── data/
│   │   └── bodyPoints.ts      # dados do simulador biomecânico
│   └── styles/
│       └── index.css          # @tailwind directives
├── .tool-versions             # nodejs 20.17.0
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

### 3.2 Rotas

| Path | Componente | Descrição |
|---|---|---|
| `/` | `Home` | Hero, manifesto, CTA simulador |
| `/osteopatia` | `Osteopatia` | 3 esferas, indicações clínicas |
| `/alinhamento-ativo` | `AlinhamentoAtivo` | Simulador biomecânico interativo |
| `/agendamentos` | `Agendamentos` | Formulário WhatsApp, mapa, QR code |

### 3.3 vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginSitemap } from 'vite-plugin-sitemap'

export default defineConfig({
  base: '/',  // '/' com domínio customizado
  plugins: [
    react(),
    VitePluginSitemap({
      hostname: 'https://DOMINIO_AQUI',  // substituir após compra
      routes: ['/', '/osteopatia', '/alinhamento-ativo', '/agendamentos'],
    }),
  ],
})
```

---

## 4. Migração do Código Existente

O TSX original (~1200 linhas) será **extraído sem reescrita** de lógica:

| Origem (monolito) | Destino |
|---|---|
| `FisiomLogo` component | `src/components/FisiomLogo.tsx` |
| `FontImport` component | `src/components/FontImport.tsx` |
| `colors` object | inline nos componentes (já são classes Tailwind) |
| `handleAlign`, `resetTension`, simulator state | `src/pages/AlinhamentoAtivo.tsx` |
| `bodyPoints` data object | `src/data/bodyPoints.ts` |
| `getGenericWhatsAppLink`, `getSpecificWhatsAppLink` | `src/hooks/useWhatsApp.ts` |
| `activeTab === 'home'` block | `src/pages/Home.tsx` |
| `activeTab === 'osteopatia'` block | `src/pages/Osteopatia.tsx` |
| `activeTab === 'clinica'` block | `src/pages/AlinhamentoAtivo.tsx` |
| `activeTab === 'contato'` block | `src/pages/Agendamentos.tsx` |
| Header + nav (botões `setActiveTab`) | `src/components/Layout.tsx` (com `<Link>` do router) |
| Footer | `src/components/Layout.tsx` |

A navegação por `setActiveTab` → `useState` é trocada por `<Link to="/rota">` do React Router. Estado local do simulador permanece em `AlinhamentoAtivo.tsx`.

---

## 5. Estratégia SEO

### 5.1 Componente SEO

`src/components/SEO.tsx` — wrapper de `react-helmet-async` que aceita:
- `title` — título da página
- `description` — meta description (150–160 chars)
- `canonical` — URL canônica absoluta
- `jsonLd` — objeto JSON-LD opcional

### 5.2 Meta Tags por Página

#### Home `/`
```
title: "Fisiom Osteopatia • Clínica em Florianópolis | Cleo Scherer CREFITO 82530-F"
description: "Osteopatia em Florianópolis com Cleo Scherer. Tratamento de dores na coluna, ciático, lesões esportivas, postura e qualidade de vida. Agende pelo WhatsApp."
```

#### Osteopatia `/osteopatia`
```
title: "Osteopatia Estrutural, Visceral e Craniana • Fisiom Florianópolis"
description: "Conheça as três abordagens da osteopatia: estrutural para coluna e lesões, visceral para digestão, craniana para stress e DTM. Indicada para atletas, idosos e crianças."
```

#### Alinhamento Ativo `/alinhamento-ativo`
```
title: "Simulador de Alinhamento Postural Interativo • Fisiom Osteopatia"
description: "Explore o mapa da sua coluna. Cervical, torácica, lombar e pélvis — entenda como a osteopatia atua em cada segmento e elimina dores posturais de escritório e movimento."
```

#### Agendamentos `/agendamentos`
```
title: "Agende sua Consulta de Osteopatia em Florianópolis • Fisiom"
description: "Marque sua sessão de avaliação osteopática com Cleo Scherer. Atendimento de segunda a sexta, das 07h às 18h. Florianópolis, SC. Contato via WhatsApp."
```

### 5.3 Open Graph + Twitter Card

Todas as páginas incluem:
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Fisiom Osteopatia" />
<meta property="og:title" content="[title da página]" />
<meta property="og:description" content="[description da página]" />
<meta property="og:url" content="[canonical da página]" />
<meta property="og:image" content="[domínio]/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

Uma imagem `og-image.jpg` (1200×630px) com a identidade visual da Fisiom será necessária — pode ser gerada/criada durante a implementação.

### 5.4 JSON-LD Structured Data

#### `MedicalBusiness` + `Physician` — Home (`/`)
```json
{
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Physician"],
  "name": "Fisiom Osteopatia",
  "description": "Clínica de osteopatia e fisioterapia manual em Florianópolis",
  "url": "https://DOMINIO_AQUI",
  "telephone": "+55-48-99114-6017",
  "medicalSpecialty": "Osteopathic",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Florianópolis",
    "addressRegion": "SC",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "07:00",
    "closes": "18:00"
  },
  "employee": {
    "@type": "Physician",
    "name": "Cleo Scherer",
    "jobTitle": "Fisioterapeuta Osteopata",
    "identifier": "CREFITO 82530-F"
  }
}
```

#### `FAQPage` — Osteopatia (`/osteopatia`)
Perguntas cobrindo públicos-alvo diversos:
- "O que é osteopatia?"
- "Qual a diferença entre osteopatia e quiropraxia?"
- "Osteopatia é indicada para crianças?"
- "Osteopatia ajuda idosos com mobilidade?"
- "Osteopatia serve para atletas e lesões esportivas?"
- "Quantas sessões são necessárias?"
- "Osteopatia trata dor ciática e hérnia de disco?"

#### `BreadcrumbList` — todas as páginas internas
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://DOMINIO_AQUI/" },
    { "@type": "ListItem", "position": 2, "name": "[nome da página]", "item": "https://DOMINIO_AQUI/[rota]" }
  ]
}
```

### 5.5 robots.txt

```
User-agent: *
Allow: /

Sitemap: https://DOMINIO_AQUI/sitemap.xml
```

### 5.6 sitemap.xml

Gerado automaticamente pelo `vite-plugin-sitemap` no build com as 4 rotas, prioridades e `lastmod`.

---

## 6. Deploy

### 6.1 GitHub Actions (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Fisiom Osteopatia

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: PLACEHOLDER_DOMINIO
```

### 6.2 Configuração GitHub Pages (manual, única vez)

No repositório `fisiom-org/fisiom-osteopatia`:
- Settings → Pages → Source: **Deploy from branch `gh-pages`**

### 6.3 Domínio Customizado (após compra)

1. Substituir `PLACEHOLDER_DOMINIO` no `deploy.yml` pelo domínio real
2. Substituir `DOMINIO_AQUI` em `vite.config.ts` e nos JSON-LD
3. No registrador de domínio, criar registros DNS:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME www` → `fisiom-org.github.io`

---

## 7. Performance (Core Web Vitals)

- Fontes Google com `display=swap` (já presentes)
- Code splitting automático por rota via vite-ssg
- QR code via `api.qrserver.com` mantido com `loading="lazy"`
- Imagens com `loading="lazy"` e dimensões declaradas
- Tailwind purge remove CSS não utilizado no build

---

## 8. `.tool-versions` (vfox)

```
nodejs 20.17.0
```

---

## 9. Decisões Registradas

| Decisão | Motivo |
|---|---|
| vite-ssg em vez de SPA puro | HTML pré-renderizado = indexação imediata e confiável pelo Google |
| React Router em vez de manter `activeTab` | Rotas reais = URLs indexáveis por segmento de público |
| base `'/'` em vez de `'/fisiom-osteopatia/'` | Domínio customizado elimina subpath |
| vite-plugin-sitemap | Geração automática no build, sem manutenção manual |
| `peaceiris/actions-gh-pages@v4` | Action mais estável e usada para deploy em gh-pages |
| FAQ schema em `/osteopatia` | Maior potencial de rich snippet no Google (acordeão na SERP) |
