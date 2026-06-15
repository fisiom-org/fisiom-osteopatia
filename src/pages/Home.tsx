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
  sameAs: ['https://wa.me/5548991146017'],
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
