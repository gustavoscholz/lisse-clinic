export type SiteMode = 'inicio' | 'harmonizacao'

export const navigationItems = [
  {
    label: 'Início',
    href: '#inicio',
    mode: 'inicio',
    targetId: 'inicio',
    activeFor: 'inicio',
  },
  {
    label: 'Harmonização',
    href: '?modo=harmonizacao#inicio',
    mode: 'harmonizacao',
    targetId: 'inicio',
    activeFor: 'harmonizacao',
  },
  {
    label: 'Faloplastia',
    href: '#tratamentos',
    mode: 'inicio',
    targetId: 'tratamentos',
    activeFor: undefined,
  },
  {
    label: 'Emagrecimento',
    href: '#tratamentos',
    mode: 'inicio',
    targetId: 'tratamentos',
    activeFor: undefined,
  },
] as const

export const specialties = [
  'Harmonização Corporal',
  'Harmonização Facial',
  'Emagrecimento',
  'Estética e Bem-estar',
  'Estética Íntima',
] as const

export const treatmentSpecialties = [
  'Harmonização Corporal',
  'Harmonização Facial',
  'Faloplastia',
  'Emagrecimento',
  'Estética em Geral',
] as const

export const externalLinks = {
  whatsapp:
    'https://api.whatsapp.com/message/FQ6YGEHPMXHSM1?autoload=1&app_absent=0&utm_source=ig',
  googleReviews:
    'https://www.google.com/search?q=Lisse+Clinic+avalia%C3%A7%C3%B5es',
  googleMaps:
    'https://www.google.com/maps/place/Castelo,+Belo+Horizonte+-+MG/@-19.8858158,-44.0019741,16z/data=!4m6!3m5!1s0xa691398c04648f:0xf376faf11efebb19!8m2!3d-19.8822196!4d-43.9996134!16s%2Fg%2F1ymtf0ts1?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D',
  mapEmbed:
    'https://www.google.com/maps?q=-19.8822196,-43.9996134&z=16&output=embed',
} as const
