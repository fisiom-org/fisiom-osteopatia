# Fisiom Osteopatia

Site institucional da clínica Fisiom Osteopatia, com Cleo Scherer (CREFITO 82530-F), em Florianópolis, SC.

**URL de produção:** https://fisiom-org.github.io/fisiom-osteopatia/

---

## Sobre o Projeto

Quatro páginas estáticas pré-renderizadas (SSG), com SEO estruturado, roteamento via URL real e deploy automático no GitHub Pages. O conteúdo é 100% estático após o build — sem servidor, sem banco de dados.

**Páginas:**
- `/` — Hero, manifesto e CTA para o simulador de alinhamento
- `/osteopatia` — Três abordagens (estrutural, visceral, craniana) + FAQ estruturado
- `/alinhamento-ativo` — Simulador interativo de tensão corporal por região da coluna
- `/agendamentos` — Formulário de agendamento via WhatsApp + QR Code

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + Vite 5 |
| SSG | vite-react-ssg |
| Roteamento | React Router DOM v6 |
| Estilo | Tailwind CSS 3 |
| Metadados / SEO | react-helmet-async |
| Sitemap | vite-plugin-sitemap |
| Deploy | GitHub Actions → GitHub Pages (`gh-pages` branch) |

**Tipografia:** Cormorant Garamond (editorial) + Plus Jakarta Sans (corpo)

---

## SEO

Cada página exporta meta tags completas (title, description, canonical, Open Graph, Twitter Card) e dados estruturados JSON-LD:

- **Home** — `MedicalBusiness` + `Physician` (Schema.org)
- **Osteopatia** — `FAQPage` com 7 perguntas + `BreadcrumbList`
- **Alinhamento Ativo** — `BreadcrumbList`
- **Agendamentos** — `BreadcrumbList`

Clusters de palavras-chave cobertos: dores na coluna, ciática, hérnia de disco, lesões esportivas, atletas, postura, qualidade de vida, bem-estar, fisioterapia manual, quiropraxia, profissionais de escritório, idosos, crianças, DTM, osteopatia craniana e visceral.

---

## Desenvolvimento Local

**Requisito:** Node 24 via [vfox](https://vfox.lhan.me/)

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (HMR)
npm run dev

# Build SSG (gera /dist com HTML pré-renderizado)
npm run build

# Preview do build local
npm run preview
```

---

## Deploy

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na branch `main`:

1. Instala dependências com `npm ci`
2. Executa `vite-react-ssg build` (gera `/dist`)
3. Publica `/dist` na branch `gh-pages` via `peaceiris/actions-gh-pages`

**Configuração inicial do repositório:** GitHub → Settings → Pages → Source: `gh-pages` branch, pasta `/ (root)`.

---

## Domínio Personalizado (futuro)

Quando um domínio próprio for adquirido:

1. Criar `public/CNAME` com o domínio (ex: `fisiom.com.br`)
2. Substituir `fisiom-org.github.io/fisiom-osteopatia` → domínio nos arquivos `src/` e `public/`
3. Atualizar `base` no `vite.config.ts` para `'/'`
4. Adicionar `cname:` no step de deploy em `.github/workflows/deploy.yml`
5. Apontar DNS: registro `A` para IPs do GitHub Pages ou `CNAME` para `fisiom-org.github.io`
