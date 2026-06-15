import { useState, useEffect } from 'react'
import { Activity, Info, RefreshCw, Zap, ShieldAlert } from 'lucide-react'
import SEO from '../components/SEO'
import { bodyPoints, type BodyPartKey } from '../data/bodyPoints'

const DOMAIN = 'https://fisiom-org.github.io/fisiom-osteopatia'

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: `${DOMAIN}/` },
    { '@type': 'ListItem', position: 2, name: 'Alinhamento Ativo', item: `${DOMAIN}/alinhamento-ativo` },
  ],
}

type Step = 'before' | 'aligning' | 'after'

export default function AlinhamentoAtivo() {
  const [alignmentTarget, setAlignmentTarget] = useState<BodyPartKey>('lumbar')
  const [adjustedPoints, setAdjustedPoints] = useState<Record<BodyPartKey, boolean>>({
    cervical: false, thoracic: false, lumbar: false, pelvis: false,
  })
  const [currentStep, setCurrentStep] = useState<Step>('before')

  const handleAlign = (part: BodyPartKey) => {
    setCurrentStep('aligning')
    setTimeout(() => {
      setAdjustedPoints(prev => ({ ...prev, [part]: true }))
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
                      <Activity className="w-4 h-4 text-[#C2B67A] animate-pulse" />
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
