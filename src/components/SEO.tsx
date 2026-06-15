import { Head } from 'vite-react-ssg'

const DOMAIN = 'https://fisiom-org.github.io/fisiom-osteopatia'
const OG_IMAGE = `${DOMAIN}/og-image.svg`

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
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Fisiom Osteopatia" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Head>
  )
}
