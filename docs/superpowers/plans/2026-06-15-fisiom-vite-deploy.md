# Fisiom Osteopatia — Vite + SSG + GitHub Pages + SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o monolito `fisiom_osteopatia_website.tsx` em projeto Vite com SSG, SEO completo e deploy automatizado no GitHub Pages via GitHub Actions.

**Architecture:** O site usa `vite-react-ssg` para pré-renderizar 4 rotas em HTML estático no build. O código do monolito é extraído sem reescrita de lógica — apenas movido para arquivos focados. Deploy disparado automaticamente a cada push na `main` via GitHub Actions usando o PAT da conta `fisiom.org@gmail.com` (disponível localmente em `~/Development/creds/fisiom-pat.txt` — NUNCA commitar esse arquivo).

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS 3, react-router-dom v6, vite-react-ssg, react-helmet-async, vite-plugin-sitemap, lucide-react, Node 20 LTS (vfox)

**Diretório de trabalho:** `/Users/klebertiko/Development/src/fisiom-osteopatia/`

---

## Mapa de Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Build, SSG, sitemap plugin |
| `tsconfig.json` | TypeScript config |
| `tailwind.config.js` | Cores, fontes, animações customizadas |
| `postcss.config.js` | Autoprefixer |
| `index.html` | Entry point HTML |
| `.gitignore` | Exclui node_modules, dist, .env, creds |
| `.tool-versions` | Node 20 para vfox |
| `src/main.tsx` | Entry vite-react-ssg |
| `src/router.tsx` | Definição das 4 rotas |
| `src/styles/index.css` | Tailwind directives |
| `src/components/FisiomLogo.tsx` | SVG logo vetorizado |
| `src/components/FontImport.tsx` | Google Fonts inline |
| `src/components/SEO.tsx` | react-helmet-async wrapper |
| `src/components/Layout.tsx` | Header + Footer + Outlet |
| `src/hooks/useWhatsApp.ts` | Geradores de link WhatsApp |
| `src/data/bodyPoints.ts` | Dados do simulador biomecânico |
| `src/pages/Home.tsx` | Rota `/` |
| `src/pages/Osteopatia.tsx` | Rota `/osteopatia` + FAQ JSON-LD |
| `src/pages/AlinhamentoAtivo.tsx` | Rota `/alinhamento-ativo` + estado do simulador |
| `src/pages/Agendamentos.tsx` | Rota `/agendamentos` + formulário WhatsApp |
| `public/robots.txt` | Allow all + sitemap ref |
| `public/CNAME` | Placeholder domínio customizado |
| `.github/workflows/deploy.yml` | GitHub Actions → gh-pages |

---

## Task 1: Configuração do Projeto

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `.gitignore`
- Create: `.tool-versions`

- [ ] **Step 1: Criar `.gitignore`**

```
# Dependências
node_modules/
.pnp
.pnp.js

# Build
dist/
dist-ssr/

# Env e secrets — NUNCA commitar
.env
.env.local
.env.*.local
*.pem
**/creds/
*-pat.txt

# Editor
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

- [ ] **Step 2: Criar `.tool-versions`**

```
nodejs 20.17.0
```

- [ ] **Step 3: Criar `package.json`**

```json
{
  "name": "fisiom-osteopatia",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite-react-ssg build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.400.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^6.26.0",
    "vite-react-ssg": "^0.5.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.3",
    "vite": "^5.4.2",
    "vite-plugin-sitemap": "^0.6.1"
  }
}
```

- [ ] **Step 4: Criar `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

const DOMAIN = 'https://PLACEHOLDER_DOMINIO'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    Sitemap({
      hostname: DOMAIN,
      dynamicRoutes: ['/', '/osteopatia', '/alinhamento-ativo', '/agendamentos'],
    }),
  ],
})
```

- [ ] **Step 5: Criar `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Criar `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fadeIn': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        'editorial': ['Cormorant Garamond', 'serif'],
        'sans-clean': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 7: Criar `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 8: Criar `index.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#2C4242" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Fisiom Osteopatia</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Instalar dependências**

```bash
cd /Users/klebertiko/Development/src/fisiom-osteopatia
npm install
```

Esperado: `node_modules/` criado, sem erros de peer dependency.

- [ ] **Step 10: Commitar**

```bash
git add package.json vite.config.ts tsconfig.json tailwind.config.js postcss.config.js index.html .gitignore .tool-versions
git commit -m "chore: scaffold Vite project config"
```

---

## Task 2: Estilos e Entry Point

**Files:**
- Create: `src/styles/index.css`
- Create: `src/main.tsx`

- [ ] **Step 1: Criar `src/styles/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #FAF9F6; }
::-webkit-scrollbar-thumb { background: #799797; border-radius: 3px; }

.premium-transition { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }

@keyframes pulseSoft {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.08); }
}
.pulse-soft { animation: pulseSoft 3s infinite ease-in-out; }

@keyframes floatGentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.float-gentle { animation: floatGentle 4s infinite ease-in-out; }
```

- [ ] **Step 2: Criar `src/main.tsx`**

```tsx
import { ViteReactSSG } from 'vite-react-ssg'
import routes from './router'
import './styles/index.css'

export const createRoot = ViteReactSSG({ routes })
```

- [ ] **Step 3: Commitar**

```bash
git add src/styles/index.css src/main.tsx
git commit -m "chore: add styles entry point and SSG root"
```

---

## Task 3: Componentes Compartilhados

**Files:**
- Create: `src/components/FisiomLogo.tsx`
- Create: `src/components/FontImport.tsx`

- [ ] **Step 1: Criar `src/components/FisiomLogo.tsx`**

```tsx
interface FisiomLogoProps {
  className?: string
  mainColor?: string
  subColor?: string
}

export default function FisiomLogo({
  className = 'w-40 h-auto',
  mainColor = '#2C4242',
  subColor = '#C2B67A',
}: FisiomLogoProps) {
  return (
    <svg viewBox="20 0 380 185" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 128,0 C 168,26 248,26 288,0 C 248,32 168,32 128,0 Z" fill={mainColor} />
      <path d="M 128,35 C 168,9 248,9 288,35 C 248,3 168,3 128,35 Z" fill={subColor} opacity="0.95" />
      <g fill={mainColor}>
        <path d="M 46,140 L 60,140 L 60,103 L 74,103 L 74,91 L 60,91 L 60,81 C 60,72 66,66 75,66 L 80,66 L 80,54 L 75,54 C 57,54 46,65 46,83 L 46,91 L 32,91 L 32,103 L 46,103 Z" />
        <path d="M 96,140 L 110,140 L 110,76 L 96,76 Z" />
        <path d="M 164,97 L 150,97 C 150,91 146,87 140,87 C 134,87 131,90 131,94 C 131,98 134,100 141,103 C 155,107 165,111 165,122 C 165,132 153,140 139,140 C 123,140 113,132 112,120 L 126,120 C 127,126 132,129 139,129 C 145,129 150,126 150,122 C 150,117 146,115 139,113 C 125,109 115,105 115,94 C 115,83 126,76 139,76 C 154,76 163,83 164,97 Z" />
        <path d="M 180,140 L 194,140 L 194,76 L 180,76 Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M 240,76 C 257.67,76 272,90.33 272,108 C 272,125.67 257.67,140 240,140 C 222.33,140 208,125.67 208,108 C 208,90.33 222.33,76 240,76 Z M 240,90 C 230.06,90 222,98.06 222,108 C 222,117.94 230.06,126 240,126 C 249.94,126 258,117.94 258,108 C 258,98.06 249.94,90 240,90 Z" />
        <path d="M 286,140 L 300,140 L 300,99 C 300,92 306,87 314,87 C 322,87 328,92 328,99 L 328,140 L 342,140 L 342,99 C 342,92 348,87 356,87 C 364,87 370,92 370,99 L 370,140 L 384,140 L 384,94 C 384,82 370,76 359,76 C 348,76 337,81 335,86 C 333,81 322,76 311,76 C 300,76 286,82 286,94 Z" />
      </g>
      <text x="208" y="173" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="17.5" letterSpacing="14" textAnchor="middle" fill={subColor}>OSTEOPATIA</text>
    </svg>
  )
}
```

- [ ] **Step 2: Criar `src/components/FontImport.tsx`**

As fontes e animações globais foram migradas para `src/styles/index.css`. Este componente não é mais necessário — remover qualquer `<FontImport />` durante a migração das páginas.

- [ ] **Step 3: Commitar**

```bash
git add src/components/FisiomLogo.tsx
git commit -m "feat: add FisiomLogo SVG component"
```

---

## Task 4: Componente SEO

**Files:**
- Create: `src/components/SEO.tsx`

- [ ] **Step 1: Criar `src/components/SEO.tsx`**

```tsx
import { Helmet } from 'react-helmet-async'

const DOMAIN = 'https://PLACEHOLDER_DOMINIO'
const OG_IMAGE = `${DOMAIN}/og-image.jpg`

interface SEOProps {
  title: string
  description: string
  path: string
  jsonLd?: object | object[]
}

export default function SEO({ title, description, path, jsonLd }: SEOProps) {
  const canonical = `${DOMAIN}${path}`
  const fullTitle = `${title} | Fisiom Osteopatia`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Fisiom Osteopatia" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/components/SEO.tsx
git commit -m "feat: add SEO component with Helmet, OG and JSON-LD"
```

---

## Task 5: Hooks e Dados

**Files:**
- Create: `src/hooks/useWhatsApp.ts`
- Create: `src/data/bodyPoints.ts`

- [ ] **Step 1: Criar `src/hooks/useWhatsApp.ts`**

```ts
const PHONE = '5548991146017'

export function getGenericWhatsAppLink(): string {
  const message = 'Olá! Visitei o site da fisiom Osteopatia e gostaria de saber mais informações sobre os atendimentos e consultar os horários disponíveis.'
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

export function getSpecificWhatsAppLink(
  clientName: string,
  selectedService: string,
  selectedDay: string,
  selectedPeriod: string
): string {
  const introduction = clientName ? `Olá, me chamo ${clientName}.` : 'Olá!'
  const message = `${introduction} Gostaria de solicitar um agendamento para *${selectedService}* na *${selectedDay}* no período da *${selectedPeriod}*. Vi o site da fisiom Osteopatia e gostaria de confirmar a disponibilidade de vocês.`
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}
```

- [ ] **Step 2: Criar `src/data/bodyPoints.ts`**

```ts
export interface BodyPoint {
  name: string
  desc: string
  symptoms: string
  restriction: { anatomia: string; postura: string; fluxo: string }
  restoration: { anatomia: string; postura: string; sintoma: string }
}

export type BodyPartKey = 'cervical' | 'thoracic' | 'lumbar' | 'pelvis'

export const bodyPoints: Record<BodyPartKey, BodyPoint> = {
  cervical: {
    name: 'Cervical & Articulação Têmporo-Mandibular (DTM)',
    desc: 'Dores de cabeça, tensões suboccipitais intensas e limitação de rotação do pescoço ligadas à postura laboral.',
    symptoms: 'Cefaleia tensional, bruxismo, estalidos ao abrir a boca e tonturas de origem cervical.',
    restriction: {
      anatomia: 'Espasmo protetor agudo dos músculos suboccipitais (retos posteriores da cabeça), compressão facetária em C1-C2-C3 e diminuição local do fluxo da artéria vertebral.',
      postura: 'Projeção anterior da cabeça (eixo mecânico avançado), aumentando o peso real sobre a base cervical até 15kg.',
      fluxo: 'Retenção de drenagem linfática suboccipital, compressão da bainha dural anterior e fadiga muscular constante.',
    },
    restoration: {
      anatomia: 'Descompressão suboccipital manual, libertação das suturas cranio-sacrais e normalização do tónus do nervo acessório.',
      postura: 'Recuo do eixo de gravidade da cabeça, posicionando o crânio de forma equilibrada sob a linha dos ombros.',
      sintoma: 'Alívio imediato da pressão craniana, ganho rotacional instantâneo de até 45% e fim da sensação de aperto nos olhos.',
    },
  },
  thoracic: {
    name: 'Região Torácica & Respiração',
    desc: 'Bloqueios posturais graves, rigidez costal e dores interescapulares agravadas por ansiedade e stress.',
    symptoms: 'Sensação de opressão ao respirar fundo, rigidez dorsal ao rodar o tronco e fadiga postural escapular.',
    restriction: {
      anatomia: 'Fixação articular em flexão das vértebras T4 a T8, espasmo defensivo dos músculos romboides e bloqueio mecânico em inspiração da 3ª e 4ª costelas.',
      postura: 'Cifose dorsal rígida (perda de retração escapular saudável), projetando os ombros para a frente.',
      fluxo: 'Restrição da excursão do tendão central do diafragma, diminuindo a oxigenação sistémica geral.',
    },
    restoration: {
      anatomia: 'Manipulação articular específica para restabelecer o deslizamento costovertebral e relaxamento manual das fáscias torácicas profundas.',
      postura: 'Abertura imediata do gradil costal, facilitando o alinhamento plano das escápulas e postura ereta natural.',
      sintoma: 'Desbloqueio respiratório completo (respiração fluida), alívio do peso entre os ombros e relaxamento geral.',
    },
  },
  lumbar: {
    name: 'Coluna Lombar & Nervo Ciático',
    desc: 'A queixa clínica mais comum. Compressões discais, rigidez facetária lombar e inflamação do trajeto ciático.',
    symptoms: 'Dor aguda ao levantar pesos, rigidez matinal intensa e dor irradiada para as pernas.',
    restriction: {
      anatomia: 'Subluxação/fixação rotacional de L4-L5 com compressão discal posterior, gerando espasmo protetor do quadrado lombar e do músculo psoas.',
      postura: 'Retificação da lordose lombar fisiológica, sobrecarregando os discos intervertebrais de forma assimétrica.',
      fluxo: 'Isquemia muscular local devido à compressão vascular e irritação constante das raízes do plexo lombar.',
    },
    restoration: {
      anatomia: 'Descompressão manual do espaço intervertebral L4-L5, bombeamento discal para reidratação tecidual e libertação da fáscia toracolombar.',
      postura: 'Restabelecimento da lordose fisiológica saudável, distribuindo o peso do tronco de forma equilibrada.',
      sintoma: 'Eliminação da dor de pinçamento ciático, liberdade para flectir o tronco e retorno seguro às atividades físicas.',
    },
  },
  pelvis: {
    name: 'Pélvis & Articulação Sacroilíaca',
    desc: 'A base de sustentação do corpo humano. Desalinhamentos aqui causam compensações ascendentes em toda a coluna.',
    symptoms: 'Dor unilateral na bacia, desconforto crónico ao sentar e assimetria ao caminhar.',
    restriction: {
      anatomia: 'Bloqueio de torção do osso ilíaco (anteriorizado ou posteriorizado) em relação ao sacro, gerando espasmo reativo do músculo piriforme com aprisionamento do nervo isquiático.',
      postura: 'Falsa perna curta (discrepância funcional de membros por báscula da bacia), gerando desgaste assimétrico.',
      fluxo: 'Congestão venosa pélvica e tensão assimétrica nos ligamentos sacro-tuberosos.',
    },
    restoration: {
      anatomia: 'Técnicas de energia muscular e bombeamento articular sacroilíaco para devolver a mobilidade simétrica à bacia.',
      postura: 'Nivelamento horizontal das cristas ilíacas, corrigindo instantaneamente a discrepância funcional das pernas.',
      sintoma: 'Base de apoio sólida e simétrica ao caminhar, alívio da pressão glútea profunda e facilidade na rotação da anca.',
    },
  },
}
```

- [ ] **Step 3: Commitar**

```bash
git add src/hooks/useWhatsApp.ts src/data/bodyPoints.ts
git commit -m "feat: add WhatsApp hook and body points data"
```

---

## Task 6: Layout (Header + Footer)

**Files:**
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Criar `src/components/Layout.tsx`**

```tsx
import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ArrowRight, Phone, MessageSquare, Heart, Menu, X } from 'lucide-react'
import FisiomLogo from './FisiomLogo'
import { getGenericWhatsAppLink } from '../hooks/useWhatsApp'

const navItems = [
  { path: '/', label: 'Início' },
  { path: '/osteopatia', label: 'Osteopatia' },
  { path: '/alinhamento-ativo', label: 'Alinhamento Ativo' },
  { path: '/agendamentos', label: 'Agendamentos' },
]

function Header() {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappLink = getGenericWhatsAppLink()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF9F6]/95 border-b border-[#799797]/10 premium-transition">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <FisiomLogo className="w-36 h-auto transition-transform group-hover:scale-105 premium-transition" />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm tracking-widest uppercase premium-transition relative py-2 ${
                pathname === path
                  ? 'text-[#2C4242] font-medium'
                  : 'text-[#423F2C]/60 hover:text-[#2C4242]'
              }`}
            >
              {label}
              {pathname === path && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C2B67A]" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2C4242] text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#C2B67A] hover:text-[#2C4242] premium-transition shadow-sm flex items-center gap-2 font-semibold"
          >
            <span>Marcar Consulta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          className="md:hidden text-[#2C4242] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#799797]/10 px-6 py-8 flex flex-col gap-6 animate-fadeIn">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-left text-lg font-editorial tracking-wider ${
                pathname === path ? 'text-[#2C4242] font-semibold' : 'text-[#423F2C]/70'
              }`}
            >
              {label}
            </Link>
          ))}
          <hr className="border-[#799797]/20" />
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#799797] uppercase tracking-widest">Segunda a Sexta — 07h às 18h</span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#2C4242] text-white py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-[#C2B67A] hover:text-[#2C4242] transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Telemóvel: (48) 99114-6017</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#2C4242] text-white pt-16 pb-8 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <FisiomLogo className="w-28 h-auto" mainColor="#FFFFFF" subColor="#C2B67A" />
          <p className="text-xs text-white/60 font-light leading-relaxed">
            Tratamentos integrativos de osteopatia e fisioterapia manual para alívio de tensões, equilíbrio postural e restauração de bem-estar integral.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Mapa do Site</h4>
          <ul className="text-xs space-y-2.5 font-light text-white/70">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link to={path} className="hover:text-[#C2B67A] transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Responsabilidade Técnica</h4>
          <div className="text-xs text-white/70 space-y-1.5 font-light">
            <p className="text-white font-medium">Cleo Scherer</p>
            <p>Fisioterapeuta Osteopata</p>
            <p className="text-[#799797] font-medium">CREFITO 82530-F</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#C2B67A] font-bold">Contatos Rápidos</h4>
          <div className="text-xs text-white/70 space-y-1.5 font-light">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C2B67A]" />
              <span>(48) 99114-6017</span>
            </p>
            <p className="text-[#799797]">Atendimento das 07h às 18h</p>
            <p className="text-white/40 mt-2">Florianópolis — SC</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 tracking-wider">
        <p>© {new Date().getFullYear()} fisiom Osteopatia. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          <span>Desenvolvido com carinho e precisão</span>
          <Heart className="w-3 h-3 text-[#C2B67A]" fill="#C2B67A" />
        </p>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <HelmetProvider>
      <div className="min-h-screen font-sans-clean text-[#423F2C] bg-[#FAF9F6] selection:bg-[#799797]/30 flex flex-col justify-between">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/components/Layout.tsx
git commit -m "feat: add Layout with Header, Footer and HelmetProvider"
```

---

## Task 7: Página Home

**Files:**
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Criar `src/pages/Home.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { Compass, Clock, Sparkles, Activity, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { getGenericWhatsAppLink } from '../hooks/useWhatsApp'

const DOMAIN = 'https://PLACEHOLDER_DOMINIO'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'Physician'],
  name: 'Fisiom Osteopatia',
  description: 'Clínica de osteopatia e fisioterapia manual em Florianópolis. Tratamento de dores, lesões, postura e bem-estar com Cleo Scherer.',
  url: DOMAIN,
  telephone: '+55-48-99114-6017',
  medicalSpecialty: 'Osteopathic',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Florianópolis',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
  employee: {
    '@type': 'Physician',
    name: 'Cleo Scherer',
    jobTitle: 'Fisioterapeuta Osteopata',
    identifier: 'CREFITO 82530-F',
  },
  sameAs: [`https://wa.me/5548991146017`],
}

export default function Home() {
  const whatsappLink = getGenericWhatsAppLink()

  return (
    <>
      <SEO
        title="Fisiom Osteopatia • Clínica em Florianópolis | Cleo Scherer CREFITO 82530-F"
        description="Osteopatia em Florianópolis com Cleo Scherer. Tratamento de dores na coluna, ciático, lesões esportivas, postura e qualidade de vida. Agende pelo WhatsApp."
        path="/"
        jsonLd={localBusinessJsonLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden py-16 lg:py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#799797]/10 text-[#2C4242] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#C2B67A]" />
              <span>Saúde Integral & Alinhamento Biomecânico</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-editorial font-light text-[#2C4242] leading-[1.1] tracking-tight">
              Equilíbrio que flui de <br />
              <span className="italic text-[#799797]">dentro para fora.</span>
            </h1>

            <p className="text-lg text-[#423F2C]/80 font-light max-w-xl leading-relaxed">
              A osteopatia enxerga o corpo como uma unidade indivisível. Através de toques manuais precisos, devolvemos a mobilidade natural às suas articulações, tecidos e sistema nervoso, eliminando a dor na sua real origem, devolvendo mobilidade e qualidade de vida geral.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/agendamentos"
                className="bg-[#2C4242] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#C2B67A] hover:text-[#2C4242] premium-transition flex items-center justify-center gap-3 shadow-md font-semibold"
              >
                <span>Marcar Consulta</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/osteopatia"
                className="border border-[#2C4242]/20 text-[#2C4242] px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#2C4242]/5 premium-transition flex items-center justify-center gap-2 font-medium"
              >
                <span>Como Funciona</span>
              </Link>
            </div>

            <div className="pt-10 border-t border-[#799797]/20 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <span className="block text-3xl font-editorial text-[#2C4242]">Cleo Scherer</span>
                <span className="text-xs text-[#799797] uppercase tracking-wider">Fisioterapeuta Osteopata</span>
              </div>
              <div>
                <span className="block text-3xl font-editorial text-[#2C4242]">CREFITO</span>
                <span className="text-xs text-[#799797] uppercase tracking-wider">82530-F</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-3xl font-editorial text-[#C2B67A]">(48) 99114-6017</span>
                <span className="text-xs text-[#799797] uppercase tracking-wider">Florianópolis & Região</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full bg-[#2C4242] rounded-3xl overflow-hidden shadow-2xl p-8 flex flex-col gap-12 text-white">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none">
                  <path d="M-100 100 C 100 150, 200 50, 500 200" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-100 150 C 100 200, 250 100, 500 250" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-100 200 C 100 250, 300 150, 500 300" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-100 250 C 100 300, 350 200, 500 350" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M-100 300 C 100 350, 400 250, 500 400" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#C2B67A]">
                  <Compass className="w-5 h-5 animate-spin-slow" />
                </div>
                <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase">fisiom osteopatia</span>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-3xl font-editorial font-light leading-snug">
                    "O papel da Osteopatia é encontrar a saúde. Qualquer um pode encontrar a doença."
                  </p>
                  <p className="text-xs text-[#C2B67A] tracking-widest uppercase">— Dr. Andrew Taylor Still (Fundador)</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-white/50 tracking-wider">Atendimento Integrado</p>
                    <p className="text-sm font-medium">Segunda a Sexta — 07h às 18h</p>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#C2B67A] animate-ping" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C2B67A] rounded-2xl -z-10 opacity-30 blur-xl" />
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="bg-[#2C4242] text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          <span className="text-[#C2B67A] text-xs font-bold tracking-[0.4em] uppercase block">Filosofia de Tratamento</span>
          <h2 className="text-3xl md:text-5xl font-editorial font-light max-w-4xl mx-auto leading-relaxed">
            Não tratamos apenas a dor. <br className="hidden md:inline" />
            Buscamos entender quais <span className="italic text-[#799797]">histórias biomecânicas</span> o seu corpo conta e por que ele escolheu compensar dessa forma.
          </h2>
          <div className="w-16 h-[1px] bg-[#C2B67A] mx-auto" />
          <p className="text-white/70 max-w-2xl mx-auto text-base font-light leading-relaxed">
            Na clínica de Osteopatia com <strong>Cleo Scherer</strong>, cada consulta dura o tempo necessário para mapear seu histórico de estilo de vida, traumas antigos, postura laboral e tensões emocionais somatizadas. O toque suave e firme reconecta o fluxo de vitalidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#799797]/20 flex items-center justify-center text-[#799797]">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-[#C2B67A]">Sem Medicamentos</h3>
              <p className="text-xs text-white/60 font-light">Ativação do sistema de autocura natural do próprio corpo humano.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#C2B67A]/20 flex items-center justify-center text-[#C2B67A]">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-[#C2B67A]">Visão de Cadeia</h3>
              <p className="text-xs text-white/60 font-light">Uma dor no ombro pode ter origem num bloqueio pélvico ou no diafragma.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-left space-y-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-editorial text-lg text-[#C2B67A]">Horário Alargado</h3>
              <p className="text-xs text-white/60 font-light">Atendimentos flexíveis das 07h às 18h de segunda a sexta para a sua rotina.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SIMULADOR */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[#799797]/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[#2C4242] text-xs font-bold tracking-widest uppercase block">Exploração Biomecânica</span>
            <h3 className="text-3xl md:text-4xl font-editorial text-[#2C4242]">Onde reside a sua dor hoje?</h3>
            <p className="text-sm md:text-base text-[#423F2C]/80 font-light max-w-xl">
              Desenvolvemos um mapa interativo de alinhamento tensional para ajudar você a entender de que forma a Osteopatia atua nas principais regiões do corpo.
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-end">
            <Link
              to="/alinhamento-ativo"
              className="bg-[#2C4242] hover:bg-[#C2B67A] text-white hover:text-[#2C4242] px-8 py-4 rounded-xl text-xs uppercase tracking-widest premium-transition flex items-center gap-3 w-full sm:w-auto justify-center font-semibold"
            >
              <span>Abrir Simulador de Alinhamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/pages/Home.tsx
git commit -m "feat: add Home page with LocalBusiness JSON-LD"
```

---

## Task 8: Página Osteopatia

**Files:**
- Create: `src/pages/Osteopatia.tsx`

- [ ] **Step 1: Criar `src/pages/Osteopatia.tsx`**

```tsx
import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://PLACEHOLDER_DOMINIO/' },
    { '@type': 'ListItem', position: 2, name: 'Osteopatia', item: 'https://PLACEHOLDER_DOMINIO/osteopatia' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é osteopatia?',
      acceptedAnswer: { '@type': 'Answer', text: 'Osteopatia é uma terapia manual que trata o corpo como uma unidade indivisível, buscando restaurar a mobilidade de articulações, fáscias e tecidos para eliminar a causa raiz da dor, sem uso de medicamentos.' },
    },
    {
      '@type': 'Question',
      name: 'Qual a diferença entre osteopatia e quiropraxia?',
      acceptedAnswer: { '@type': 'Answer', text: 'A osteopatia trabalha com toda a cadeia fascial, visceral e craniana do corpo, enquanto a quiropraxia foca principalmente nos ajustes da coluna vertebral. A osteopatia tem uma visão mais global do organismo.' },
    },
    {
      '@type': 'Question',
      name: 'Osteopatia é indicada para crianças?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sim. A osteopatia pediátrica usa técnicas extremamente suaves, indicadas para cólicas, assimetrias cranianas (plagiocefalia), problemas posturais e atrasos motores em bebês e crianças.' },
    },
    {
      '@type': 'Question',
      name: 'Osteopatia ajuda idosos com mobilidade?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sim. Para a melhor idade, a osteopatia melhora a mobilidade articular, reduz dores crônicas, melhora o equilíbrio e previne quedas, contribuindo significativamente para a qualidade de vida.' },
    },
    {
      '@type': 'Question',
      name: 'Osteopatia serve para atletas e lesões esportivas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sim. Atletas se beneficiam da osteopatia tanto na recuperação de lesões musculares, entorses e sobrecargas, quanto na otimização da performance mecânica e prevenção de novas lesões.' },
    },
    {
      '@type': 'Question',
      name: 'Quantas sessões de osteopatia são necessárias?',
      acceptedAnswer: { '@type': 'Answer', text: 'Depende da condição. Dores agudas podem melhorar em 2 a 4 sessões. Condições crônicas geralmente requerem entre 6 e 10 sessões com acompanhamento. O plano é definido na avaliação inicial.' },
    },
    {
      '@type': 'Question',
      name: 'Osteopatia trata dor ciática e hérnia de disco?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sim. A osteopatia estrutural descomprime as raízes nervosas, libera a fáscia toracolombar e restabelece a mobilidade discal, aliviando a dor ciática e complementando o tratamento de hérnias discais.' },
    },
  ],
}

export default function Osteopatia() {
  return (
    <>
      <SEO
        title="Osteopatia Estrutural, Visceral e Craniana • Fisiom Florianópolis"
        description="Conheça as três abordagens da osteopatia: estrutural para coluna e lesões, visceral para digestão, craniana para stress e DTM. Indicada para atletas, idosos e crianças."
        path="/osteopatia"
        jsonLd={[breadcrumb, faqJsonLd]}
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <span className="text-[#C2B67A] text-xs font-bold tracking-[0.4em] uppercase block">Profundo & Integrativo</span>
          <h1 className="text-4xl md:text-6xl font-editorial text-[#2C4242]">A Ciência por trás do Toque</h1>
          <p className="text-base text-[#423F2C]/70 font-light max-w-2xl mx-auto">
            Diferente da abordagem convencional que apenas medica o sintoma, a Osteopatia busca o ponto de partida do bloqueio mecânico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="bg-[#2C4242] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden space-y-6">
            <div className="text-4xl font-editorial text-[#C2B67A]">01</div>
            <h2 className="text-2xl font-editorial text-white">Osteopatia Estrutural</h2>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Focada no restabelecimento de ossos, ligamentos, fáscias e músculos. Essencial para tratar disfunções de mobilidade na coluna vertebral, hérnias de disco, entorses, dores ciáticas e desequilíbrios posturais.
            </p>
            <ul className="text-xs space-y-2 pt-4 border-t border-white/10 text-[#C2B67A]">
              <li>• Ajustes articulares precisos de alta e baixa velocidade</li>
              <li>• Liberação miofascial profunda</li>
              <li>• Alongamentos terapêuticos específicos</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#799797]/20 relative overflow-hidden space-y-6">
            <div className="text-4xl font-editorial text-[#799797]">02</div>
            <h2 className="text-2xl font-editorial text-[#2C4242]">Osteopatia Visceral</h2>
            <p className="text-sm text-[#423F2C]/80 font-light leading-relaxed">
              Todas as nossas vísceras possuem movimentos naturais. Restrições nesses tecidos podem causar dores referidas na coluna e problemas digestivos crónicos por interligações nervosas e fasciais.
            </p>
            <ul className="text-xs space-y-2 pt-4 border-t border-[#799797]/15 text-[#799797]">
              <li>• Tratamento complementar de refluxo gastroesofágico</li>
              <li>• Alívio de obstipação e tensões abdominais</li>
              <li>• Harmonização das tensões do diafragma</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#799797]/20 relative overflow-hidden space-y-6">
            <div className="text-4xl font-editorial text-[#C2B67A]">03</div>
            <h2 className="text-2xl font-editorial text-[#2C4242]">Osteopatia Craniana</h2>
            <p className="text-sm text-[#423F2C]/80 font-light leading-relaxed">
              Avalia a micromobilidade dos ossos do crânio e a flutuação do líquido cefalorraquidiano. Indicada para stress profundo, insónia, DTM, sinusite e cefaleias tensionais.
            </p>
            <ul className="text-xs space-y-2 pt-4 border-t border-[#799797]/15 text-[#799797]">
              <li>• Ajuste suave das suturas cranianas</li>
              <li>• Equilíbrio do sistema nervoso autónomo (simpático/parassimpático)</li>
              <li>• Redução de tensões originadas pelo stress e ansiedade</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#FAF9F6] border border-[#799797]/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-editorial text-[#2C4242] mb-8 text-center">Para quem a Osteopatia é indicada?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Profissionais de Escritório', desc: 'Dores provocadas por longas jornadas em posição sentada e stress acumulado.' },
              { title: 'Atletas e Desportistas', desc: 'Otimização da performance mecânica e prevenção de lesões musculares recorrentes.' },
              { title: 'Pessoas com Dores Crónicas', desc: 'Pacientes que sofrem de fibromialgia, hérnias discais e cefaleias persistentes.' },
              { title: 'Qualidade de Vida Geral', desc: 'Quem procura apenas check-ups preventivos regulares de mobilidade corporal.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-[#C2B67A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[#2C4242]">{title}</h3>
                  <p className="text-xs text-[#423F2C]/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/pages/Osteopatia.tsx
git commit -m "feat: add Osteopatia page with FAQ JSON-LD and breadcrumb"
```

---

## Task 9: Página Alinhamento Ativo (Simulador)

**Files:**
- Create: `src/pages/AlinhamentoAtivo.tsx`

- [ ] **Step 1: Criar `src/pages/AlinhamentoAtivo.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { Activity, Info, RefreshCw, Zap, ShieldAlert } from 'lucide-react'
import SEO from '../components/SEO'
import { bodyPoints, type BodyPartKey } from '../data/bodyPoints'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://PLACEHOLDER_DOMINIO/' },
    { '@type': 'ListItem', position: 2, name: 'Alinhamento Ativo', item: 'https://PLACEHOLDER_DOMINIO/alinhamento-ativo' },
  ],
}

type Step = 'before' | 'aligning' | 'after'

export default function AlinhamentoAtivo() {
  const [alignmentTarget, setAlignmentTarget] = useState<BodyPartKey>('lumbar')
  const [adjustedPoints, setAdjustedPoints] = useState<Record<BodyPartKey, boolean>>({
    cervical: false, thoracic: false, lumbar: false, pelvis: false,
  })
  const [isAligning, setIsAligning] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('before')

  const handleAlign = (part: BodyPartKey) => {
    setIsAligning(true)
    setCurrentStep('aligning')
    setTimeout(() => {
      setAdjustedPoints(prev => ({ ...prev, [part]: true }))
      setIsAligning(false)
      setCurrentStep('after')
    }, 1800)
  }

  const resetTension = () => {
    setAdjustedPoints({ cervical: false, thoracic: false, lumbar: false, pelvis: false })
    setCurrentStep('before')
  }

  useEffect(() => {
    setCurrentStep(adjustedPoints[alignmentTarget] ? 'after' : 'before')
  }, [alignmentTarget])

  const FlowIcon = Activity

  return (
    <>
      <SEO
        title="Simulador de Alinhamento Postural Interativo • Fisiom Osteopatia"
        description="Explore o mapa da sua coluna. Cervical, torácica, lombar e pélvis — entenda como a osteopatia atua em cada segmento e elimina dores posturais de escritório e movimento."
        path="/alinhamento-ativo"
        jsonLd={breadcrumb}
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#799797] text-xs font-bold tracking-[0.4em] uppercase block">Tecnologia Clínica Interativa</span>
          <h1 className="text-4xl md:text-6xl font-editorial text-[#2C4242]">Monitor de Correção Postural</h1>
          <p className="text-sm md:text-base text-[#423F2C]/70 font-light max-w-xl mx-auto">
            Explore a coluna anatómica em 3D vetorial. Clique num segmento para analisar a disfunção e experimente a libertação mecânica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Coluna vertebral vetorial */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#799797]/15 shadow-xl flex flex-col items-center justify-center min-h-[550px] relative overflow-hidden">
            <div className="absolute inset-0 pulse-soft bg-[#799797]/5 rounded-3xl pointer-events-none" />
            <div className="absolute left-1/2 top-10 bottom-10 w-[2px] bg-neutral-200 transform -translate-x-1/2" />

            <div className="relative w-full max-w-[240px] h-[450px] flex flex-col justify-between py-4 z-10">

              {/* Cervical */}
              <div
                onClick={() => setAlignmentTarget('cervical')}
                className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl premium-transition ${alignmentTarget === 'cervical' ? 'bg-[#799797]/10 border border-[#799797]/25' : 'hover:bg-neutral-50'}`}
              >
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#799797] mb-2">Cervical (C1-C7)</span>
                <div className="flex gap-1.5 items-center justify-center">
                  {[1,2,3,4,5].map(idx => (
                    <div key={idx} className="premium-transition" style={{ transform: !adjustedPoints.cervical ? `rotate(${idx % 2 === 0 ? '7deg' : '-7deg'}) translateX(${idx % 2 === 0 ? '2px' : '-2px'})` : 'rotate(0deg) translateX(0px)' }}>
                      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                        <rect x="1" y="1" width="20" height="10" rx="3" fill={adjustedPoints.cervical ? '#799797' : alignmentTarget === 'cervical' ? '#422C3C' : '#2C4242'} stroke={alignmentTarget === 'cervical' ? '#C2B67A' : 'transparent'} strokeWidth="1" />
                        <circle cx="11" cy="6" r="2.5" fill="#FAF9F6" />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${adjustedPoints.cervical ? 'bg-[#799797]' : 'bg-orange-500 animate-pulse'}`} />
                  <span className="text-[10px] font-medium text-[#423F2C]/70">{adjustedPoints.cervical ? 'Alinhado' : 'Bloqueio Ativo'}</span>
                </div>
              </div>

              {/* Torácico */}
              <div
                onClick={() => setAlignmentTarget('thoracic')}
                className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl premium-transition ${alignmentTarget === 'thoracic' ? 'bg-[#799797]/10 border border-[#799797]/25' : 'hover:bg-neutral-50'}`}
              >
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#799797] mb-2">Torácico (T1-T12)</span>
                <div className="flex gap-1 items-center justify-center">
                  {[1,2,3,4,5,6].map(idx => (
                    <div key={idx} className="premium-transition" style={{ transform: !adjustedPoints.thoracic ? `rotate(${idx % 2 === 0 ? '-5deg' : '5deg'}) translateY(${idx % 2 === 0 ? '1px' : '-1px'})` : 'rotate(0deg) translateY(0px)' }}>
                      <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                        <rect x="1" y="1" width="22" height="12" rx="4" fill={adjustedPoints.thoracic ? '#799797' : alignmentTarget === 'thoracic' ? '#422C3C' : '#2C4242'} stroke={alignmentTarget === 'thoracic' ? '#C2B67A' : 'transparent'} strokeWidth="1" />
                        <line x1="6" y1="7" x2="18" y2="7" stroke="#FAF9F6" strokeWidth="1.5" />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${adjustedPoints.thoracic ? 'bg-[#799797]' : 'bg-orange-500 animate-pulse'}`} />
                  <span className="text-[10px] font-medium text-[#423F2C]/70">{adjustedPoints.thoracic ? 'Alinhado' : 'Bloqueio Ativo'}</span>
                </div>
              </div>

              {/* Lombar */}
              <div
                onClick={() => setAlignmentTarget('lumbar')}
                className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl premium-transition ${alignmentTarget === 'lumbar' ? 'bg-[#799797]/10 border border-[#799797]/25' : 'hover:bg-neutral-50'}`}
              >
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#799797] mb-2">Lombar (L1-L5)</span>
                <div className="flex gap-1.5 items-center justify-center">
                  {[1,2,3,4].map(idx => (
                    <div key={idx} className="premium-transition" style={{ transform: !adjustedPoints.lumbar ? `rotate(${idx % 2 === 0 ? '8deg' : '-8deg'}) translateX(${idx % 2 === 0 ? '4px' : '-4px'})` : 'rotate(0deg) translateX(0px)' }}>
                      <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                        <rect x="1" y="1" width="26" height="14" rx="4" fill={adjustedPoints.lumbar ? '#799797' : alignmentTarget === 'lumbar' ? '#422C3C' : '#2C4242'} stroke={alignmentTarget === 'lumbar' ? '#C2B67A' : 'transparent'} strokeWidth="1" />
                        <circle cx="14" cy="8" r="3.5" fill="#FAF9F6" />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${adjustedPoints.lumbar ? 'bg-[#799797]' : 'bg-orange-500 animate-pulse'}`} />
                  <span className="text-[10px] font-medium text-[#423F2C]/70">{adjustedPoints.lumbar ? 'Alinhado' : 'Bloqueio Ativo'}</span>
                </div>
              </div>

              {/* Pélvis */}
              <div
                onClick={() => setAlignmentTarget('pelvis')}
                className={`cursor-pointer flex flex-col items-center p-3 rounded-2xl premium-transition ${alignmentTarget === 'pelvis' ? 'bg-[#799797]/10 border border-[#799797]/25' : 'hover:bg-neutral-50'}`}
              >
                <span className="text-[10px] tracking-widest uppercase font-semibold text-[#799797] mb-1">Anca & Sacro</span>
                <div className="premium-transition" style={{ transform: !adjustedPoints.pelvis ? 'rotate(-6deg) translateY(2px)' : 'rotate(0deg) translateY(0px)' }}>
                  <svg width="60" height="35" viewBox="0 0 60 35" fill="none">
                    <path d="M5 10 C 10 2, 25 2, 30 15 C 35 2, 50 2, 55 10 C 58 18, 50 32, 30 32 C 10 32, 2 18, 5 10 Z" fill={adjustedPoints.pelvis ? '#799797' : alignmentTarget === 'pelvis' ? '#422C3C' : '#2C4242'} stroke={alignmentTarget === 'pelvis' ? '#C2B67A' : '#799797'} strokeWidth="1.5" opacity="0.9" />
                    <polygon points="25,12 35,12 30,28" fill="#C2B67A" />
                  </svg>
                </div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${adjustedPoints.pelvis ? 'bg-[#799797]' : 'bg-orange-500 animate-pulse'}`} />
                  <span className="text-[10px] font-medium text-[#423F2C]/70">{adjustedPoints.pelvis ? 'Alinhado' : 'Bloqueio Ativo'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Painel de diagnóstico */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#2C4242] text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Activity className="w-40 h-40" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#C2B67A] text-xs font-semibold tracking-widest uppercase">Análise Biomecânica</span>
                <span className="text-[10px] tracking-[0.2em] text-[#799797] font-semibold bg-white/5 px-3 py-1 rounded-full uppercase">{alignmentTarget}</span>
              </div>

              <h2 className="text-3xl font-editorial leading-tight">{bodyPoints[alignmentTarget].name}</h2>
              <p className="text-sm font-light text-white/80 leading-relaxed">{bodyPoints[alignmentTarget].desc}</p>

              <div className="pt-4 border-t border-white/10">
                {currentStep === 'before' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold tracking-wider uppercase bg-orange-400/10 px-3 py-1.5 rounded-lg w-fit">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Estado Atual: Bloqueio Postural Ativo</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Disfunção Articular', text: bodyPoints[alignmentTarget].restriction.anatomia },
                        { label: 'Compensação do Eixo', text: bodyPoints[alignmentTarget].restriction.postura },
                        { label: 'Perda Circulatória', text: bodyPoints[alignmentTarget].restriction.fluxo },
                      ].map(({ label, text }) => (
                        <div key={label} className="bg-white/[0.03] p-4 rounded-xl border border-white/5">
                          <h3 className="text-xs text-[#C2B67A] uppercase tracking-wider font-semibold mb-1">{label}</h3>
                          <p className="text-xs text-white/70 leading-relaxed font-light">{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#422C3C]/50 p-4 rounded-2xl border border-[#422C3C] space-y-1">
                      <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">Sintomatologia Reportada pelo Paciente:</span>
                      <p className="text-xs text-white/90 font-light italic">"{bodyPoints[alignmentTarget].symptoms}"</p>
                    </div>
                  </div>
                )}

                {currentStep === 'aligning' && (
                  <div className="py-12 flex flex-col items-center justify-center gap-4 text-center animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-[#C2B67A] border-t-transparent animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-[#C2B67A] uppercase tracking-widest">Executando Descompressão Osteopática</p>
                      <p className="text-xs text-white/60 font-light">Devolvendo o deslizamento fisiológico às facetas...</p>
                    </div>
                  </div>
                )}

                {currentStep === 'after' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-2 text-[#799797] text-xs font-semibold tracking-wider uppercase bg-[#799797]/15 px-3 py-1.5 rounded-lg w-fit">
                      <FlowIcon className="w-4 h-4 text-[#C2B67A] animate-pulse" />
                      <span>Estado Restaurado: Equilíbrio Biomecânico</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Efeito Fisiológico', text: bodyPoints[alignmentTarget].restoration.anatomia, color: 'text-[#799797]' },
                        { label: 'Ajuste Postural', text: bodyPoints[alignmentTarget].restoration.postura, color: 'text-[#799797]' },
                        { label: 'Ganho de Fluxo', text: bodyPoints[alignmentTarget].restoration.sintoma, color: 'text-[#C2B67A]' },
                      ].map(({ label, text, color }) => (
                        <div key={label} className="bg-[#799797]/10 p-4 rounded-xl border border-[#799797]/25">
                          <h3 className={`text-xs ${color} uppercase tracking-wider font-semibold mb-1`}>{label}</h3>
                          <p className="text-xs text-white/90 leading-relaxed font-light">{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#FAF9F6]/5 p-4 rounded-2xl border border-white/10 space-y-2">
                      <span className="text-[10px] text-[#799797] font-bold uppercase tracking-widest block">Benefícios de Longo Prazo Obtidos:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-white/80">
                        <p>✓ Eliminação da sobrecarga ligamentar</p>
                        <p>✓ Reabsorção de edema inflamatório</p>
                        <p>✓ Recuperação da amplitude livre</p>
                        <p>✓ Redução da fadiga neuromuscular</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                {currentStep === 'before' && (
                  <button onClick={() => handleAlign(alignmentTarget)} className="flex-1 bg-[#C2B67A] hover:bg-white text-[#2C4242] px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-md">
                    <Zap className="w-4 h-4 fill-[#2C4242] text-[#2C4242]" />
                    <span>Aplicar Ajuste Osteopático</span>
                  </button>
                )}
                {currentStep === 'after' && (
                  <div className="flex-1 flex gap-3">
                    <button disabled className="flex-1 bg-[#799797] text-white px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                      Segmento Ajustado ✓
                    </button>
                    <button onClick={() => { setAdjustedPoints(prev => ({ ...prev, [alignmentTarget]: false })); setCurrentStep('before') }} className="border border-white/20 hover:border-white px-4 py-4 rounded-xl text-xs text-white/80 hover:text-white">
                      Simular Bloqueio
                    </button>
                  </div>
                )}
                <button onClick={resetTension} className="border border-white/20 hover:border-white px-6 py-4 rounded-xl text-xs uppercase tracking-widest text-white/80 hover:text-white transition-all flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resetar Coluna
                </button>
              </div>
            </div>

            <div className="bg-[#799797]/10 rounded-2xl p-6 border border-[#799797]/20 flex gap-4 items-start">
              <Info className="w-5 h-5 text-[#2C4242] shrink-0 mt-0.5" />
              <p className="text-xs text-[#423F2C]/80 leading-relaxed font-light">
                <strong>Abordagem de Cleo Scherer:</strong> A osteopatia age de forma global. Ao libertar a anca ou a lombar, reajustamos as tensões da fáscia muscular ascendente, eliminando muitas vezes cefaleias e bloqueios cervicais distantes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/pages/AlinhamentoAtivo.tsx
git commit -m "feat: add AlinhamentoAtivo page with interactive spine simulator"
```

---

## Task 10: Página Agendamentos

**Files:**
- Create: `src/pages/Agendamentos.tsx`

- [ ] **Step 1: Criar `src/pages/Agendamentos.tsx`**

```tsx
import { useState } from 'react'
import { MapPin, Clock, MessageSquare, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { getGenericWhatsAppLink, getSpecificWhatsAppLink } from '../hooks/useWhatsApp'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://PLACEHOLDER_DOMINIO/' },
    { '@type': 'ListItem', position: 2, name: 'Agendamentos', item: 'https://PLACEHOLDER_DOMINIO/agendamentos' },
  ],
}

const services = [
  'Avaliação de Osteopatia Clínica',
  'Sessão de Acompanhamento / Retorno',
  'Tratamento de Dor Aguda (Coluna / Ciático)',
  'Osteopatia Craniana & Tratamento de DTM',
]

const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']
const periods = ['Manhã (07:00 - 12:00)', 'Tarde (12:00 - 18:00)', 'Qualquer horário do dia']

export default function Agendamentos() {
  const [selectedDay, setSelectedDay] = useState('Segunda-feira')
  const [selectedPeriod, setSelectedPeriod] = useState('Manhã (07:00 - 12:00)')
  const [selectedService, setSelectedService] = useState(services[0])
  const [clientName, setClientName] = useState('')

  const genericLink = getGenericWhatsAppLink()
  const specificLink = getSpecificWhatsAppLink(clientName, selectedService, selectedDay, selectedPeriod)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(genericLink)}&color=2C4242`

  const selectClass = "w-full bg-[#FAF9F6] border border-[#799797]/30 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#799797] text-[#2C4242]"

  return (
    <>
      <SEO
        title="Agende sua Consulta de Osteopatia em Florianópolis • Fisiom"
        description="Marque sua sessão de avaliação osteopática com Cleo Scherer. Atendimento de segunda a sexta, das 07h às 18h. Florianópolis, SC. Contato via WhatsApp."
        path="/agendamentos"
        jsonLd={breadcrumb}
      />

      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[#C2B67A] text-xs font-bold tracking-[0.3em] uppercase block">Agendamento & Localização</span>
              <h1 className="text-4xl md:text-5xl font-editorial text-[#2C4242] leading-tight">Vamos desenhar seu plano de alívio?</h1>
              <p className="text-sm md:text-base text-[#423F2C]/80 font-light leading-relaxed">
                Entre em contato para agendar sua sessão de avaliação clínica completa. Os atendimentos são realizados de forma individualizada, visando a resolução duradoura dos seus desconfortos.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { Icon: MapPin, title: 'Clínica de Atendimento', desc: 'Florianópolis, Santa Catarina', sub: 'Consulte as opções de endereço no WhatsApp.' },
                { Icon: Clock, title: 'Horários de Funcionamento', desc: 'Segunda a Sexta — 07:00 às 18:00', sub: 'Atendimento exclusivamente mediante agendamento prévio.' },
                { Icon: MessageSquare, title: 'Contato Direto', desc: '(48) 99114-6017', sub: 'Disponível para chamadas e mensagens de texto.' },
              ].map(({ Icon, title, desc, sub }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#2C4242] text-[#C2B67A] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#2C4242]">{title}</h3>
                    <p className="text-xs text-[#423F2C]/70">{desc}</p>
                    <p className="text-xs text-[#799797] font-medium mt-1">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#2C4242] text-white p-6 rounded-3xl border border-[#799797]/20 flex items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-xl p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                <img src={qrUrl} alt="QR Code WhatsApp Fisiom" loading="lazy" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#C2B67A] uppercase block">Agendamento via Celular</span>
                <h3 className="font-editorial text-lg text-white">Escaneie para iniciar</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mt-1">Aponte a câmera do celular para abrir o contato no aplicativo com uma mensagem rápida.</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-[#799797]/15 shadow-xl space-y-6">
            <h2 className="text-2xl font-editorial text-[#2C4242]">Monte sua mensagem de agendamento</h2>
            <p className="text-xs text-[#423F2C]/70 font-light">Selecione suas preferências abaixo para preparar o texto do seu WhatsApp de forma automatizada.</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#2C4242] uppercase tracking-wider block">Seu Nome (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className={selectClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#2C4242] uppercase tracking-wider block">Serviço Desejado</label>
                <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className={selectClass}>
                  {services.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#2C4242] uppercase tracking-wider block">Melhor dia para você</label>
                  <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)} className={selectClass}>
                    {days.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#2C4242] uppercase tracking-wider block">Período Preferencial</label>
                  <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)} className={selectClass}>
                    {periods.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#799797]/20 p-5 rounded-2xl space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#799797]">Visualização da Mensagem:</span>
              <p className="text-xs italic text-[#423F2C]/80 leading-relaxed font-light">
                "{clientName ? `Olá, me chamo ${clientName}.` : 'Olá!'} Gostaria de solicitar um agendamento para {selectedService} na {selectedDay} no período da {selectedPeriod}. Vi o site da fisiom..."
              </p>
            </div>

            <a
              href={specificLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#2C4242] hover:bg-[#422C3C] text-white py-4 rounded-xl text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-3 shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#C2B67A]" />
              <span>Enviar via WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#799797] uppercase tracking-wider">
              Ao clicar, você será redirecionado com a mensagem pronta.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Commitar**

```bash
git add src/pages/Agendamentos.tsx
git commit -m "feat: add Agendamentos page with WhatsApp form"
```

---

## Task 11: Router

**Files:**
- Create: `src/router.tsx`

- [ ] **Step 1: Criar `src/router.tsx`**

```tsx
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Osteopatia from './pages/Osteopatia'
import AlinhamentoAtivo from './pages/AlinhamentoAtivo'
import Agendamentos from './pages/Agendamentos'

const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'osteopatia', element: <Osteopatia /> },
      { path: 'alinhamento-ativo', element: <AlinhamentoAtivo /> },
      { path: 'agendamentos', element: <Agendamentos /> },
    ],
  },
]

export default routes
```

- [ ] **Step 2: Commitar**

```bash
git add src/router.tsx
git commit -m "feat: add React Router routes"
```

---

## Task 12: Assets Públicos

**Files:**
- Create: `public/robots.txt`
- Create: `public/CNAME`
- Create: `public/favicon.svg`

- [ ] **Step 1: Criar `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://PLACEHOLDER_DOMINIO/sitemap.xml
```

- [ ] **Step 2: Criar `public/CNAME`**

```
PLACEHOLDER_DOMINIO
```

> **Nota:** Substituir `PLACEHOLDER_DOMINIO` pelo domínio real após a compra (ex: `fisiomosteopatia.com.br`). Este arquivo diz ao GitHub Pages qual domínio customizado usar.

- [ ] **Step 3: Criar `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 0 380 185" width="32" height="32">
  <rect width="380" height="185" fill="#FAF9F6"/>
  <path d="M 128,0 C 168,26 248,26 288,0 C 248,32 168,32 128,0 Z" fill="#2C4242"/>
  <path d="M 128,35 C 168,9 248,9 288,35 C 248,3 168,3 128,35 Z" fill="#C2B67A" opacity="0.95"/>
</svg>
```

- [ ] **Step 4: Commitar**

```bash
git add public/robots.txt public/CNAME public/favicon.svg
git commit -m "chore: add public assets — robots.txt, CNAME placeholder, favicon"
```

---

## Task 13: GitHub Actions Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Criar `.github/workflows/deploy.yml`**

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
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build SSG
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: PLACEHOLDER_DOMINIO
```

> **Nota de segurança:** O `GITHUB_TOKEN` é fornecido automaticamente pelo GitHub Actions — nunca commitar tokens ou PATs no código. O PAT em `~/Development/creds/fisiom-pat.txt` é usado apenas para o `git push` inicial abaixo.

- [ ] **Step 2: Commitar**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow to gh-pages"
```

---

## Task 14: Verificar Build Local

- [ ] **Step 1: Testar o build SSG**

```bash
npm run build
```

Esperado: pasta `dist/` criada com subpastas `osteopatia/`, `alinhamento-ativo/`, `agendamentos/` — cada uma com seu `index.html` pré-renderizado. Também deve aparecer `dist/sitemap.xml`.

- [ ] **Step 2: Verificar arquivos gerados**

```bash
ls dist/
ls dist/osteopatia/
```

Esperado:
```
dist/
├── index.html
├── osteopatia/index.html
├── alinhamento-ativo/index.html
├── agendamentos/index.html
├── sitemap.xml
├── robots.txt
├── CNAME
├── favicon.svg
└── assets/
```

- [ ] **Step 3: Prévia local**

```bash
npm run preview
```

Abrir `http://localhost:4173` e verificar:
- Navegação entre páginas funciona
- Logo aparece no header e footer
- Simulador biomecânico funciona (clicar nos segmentos)
- Formulário de agendamento gera preview da mensagem
- Links WhatsApp abrem com mensagem correta

- [ ] **Step 4: Verificar ausência de secrets no build**

```bash
grep -r "GITHUB_TOKEN\|fisiom-pat\|password\|secret" dist/ || echo "OK — sem secrets"
```

Esperado: `OK — sem secrets`

---

## Task 15: Push e Deploy

- [ ] **Step 1: Adicionar remote origin**

```bash
git remote add origin https://github.com/fisiom-org/fisiom-osteopatia.git
```

- [ ] **Step 2: Configurar credenciais com PAT**

Ler o token do arquivo local e configurar autenticação:

```bash
git remote set-url origin https://$(cat ~/Development/creds/fisiom-pat.txt)@github.com/fisiom-org/fisiom-osteopatia.git
```

> **Segurança:** O PAT entra apenas na URL do remote em memória — não é commitado em nenhum arquivo.

- [ ] **Step 3: Push para main**

```bash
git push -u origin main
```

- [ ] **Step 4: Verificar GitHub Actions**

Acessar `https://github.com/fisiom-org/fisiom-osteopatia/actions` e aguardar o workflow `Deploy Fisiom Osteopatia` completar (≈ 2 minutos).

- [ ] **Step 5: Configurar GitHub Pages**

No GitHub:
1. Settings → Pages
2. Source: **Deploy from branch `gh-pages`**
3. Salvar

- [ ] **Step 6: Verificar site no ar**

Acessar `https://fisiom-org.github.io/fisiom-osteopatia/` (temporário até domínio customizado ser configurado).

Verificar:
- Página inicial carrega
- Navegação funciona
- Meta tags no `<head>` (via DevTools → Elements)
- `view-source:` mostra HTML pré-renderizado (não apenas `<div id="app"></div>`)

---

## Após Compra do Domínio

Quando o domínio for adquirido, fazer estes 3 ajustes e um novo push:

1. **`public/CNAME`** — trocar `PLACEHOLDER_DOMINIO` pelo domínio real
2. **`.github/workflows/deploy.yml`** — trocar `PLACEHOLDER_DOMINIO` no campo `cname`
3. **`vite.config.ts`** — trocar `PLACEHOLDER_DOMINIO` pelo domínio real
4. **`src/components/SEO.tsx`** — trocar `PLACEHOLDER_DOMINIO`
5. **`src/pages/Home.tsx`, `Osteopatia.tsx`, `AlinhamentoAtivo.tsx`, `Agendamentos.tsx`** — trocar `PLACEHOLDER_DOMINIO` em todos os JSON-LD
6. **`public/robots.txt`** — trocar `PLACEHOLDER_DOMINIO`

```bash
# Substituição global rápida (macOS):
grep -rl "PLACEHOLDER_DOMINIO" src/ public/ .github/ vite.config.ts | xargs sed -i '' 's/PLACEHOLDER_DOMINIO/seudominio.com.br/g'
git add -A
git commit -m "chore: set production domain seudominio.com.br"
git push
```

No registrador DNS, apontar:
```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
CNAME www fisiom-org.github.io
```
