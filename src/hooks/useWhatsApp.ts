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
