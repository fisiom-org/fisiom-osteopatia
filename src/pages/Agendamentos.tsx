import { useState } from 'react'
import { MapPin, Clock, MessageSquare, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { getGenericWhatsAppLink, getSpecificWhatsAppLink } from '../hooks/useWhatsApp'

const DOMAIN = 'https://fisiom-org.github.io/fisiom-osteopatia'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Agendamentos', item: `${DOMAIN}/agendamentos` },
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

  const selectClass = 'w-full bg-[#FAF9F6] border border-[#799797]/30 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#799797] text-[#2C4242]'

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
