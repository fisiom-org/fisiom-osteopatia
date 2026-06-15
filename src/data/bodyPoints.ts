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
