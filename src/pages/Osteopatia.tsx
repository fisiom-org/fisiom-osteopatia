import { CheckCircle2 } from 'lucide-react'
import SEO from '../components/SEO'

const DOMAIN = 'https://PLACEHOLDER_DOMINIO'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Osteopatia', item: `${DOMAIN}/osteopatia` },
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
