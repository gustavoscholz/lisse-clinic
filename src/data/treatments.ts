import bodyContouring from '../assets/treatments/body-contouring.png'
import facialHarmonization from '../assets/treatments/facial-harmonization.png'
import generalAesthetics from '../assets/treatments/general-aesthetics.png'
import phaloplasty from '../assets/treatments/phaloplasty.png'
import weightLoss from '../assets/treatments/weight-loss.png'
import type { Treatment } from '../types/content'

export const treatments: readonly Treatment[] = [
  {
    id: 'harmonizacao-corporal',
    eyebrow: 'Harmonização Corporal',
    title: 'Equilíbrio e definição em cada detalhe do seu corpo.',
    highlights: ['Glúteos', 'Panturrilhas', 'Membros superiores'],
    description:
      'Protocolos personalizados para melhorar volume, proporção, firmeza e contorno corporal.',
    tags: ['Volume', 'Proporção', 'Firmeza', 'Definição'],
    image: bodyContouring,
    tone: 'dark-gradient',
    imageSide: 'left',
    hasMedallion: true,
  },
  {
    id: 'faloplastia',
    eyebrow: 'Faloplastia',
    title: 'Aumento peniano com discrição e cuidado.',
    highlights: ['Volume', 'Circunferência', 'Proporção'],
    description:
      'Avaliação individual e atendimento reservado para homens que buscam mais confiança e segurança.',
    tags: ['Avaliação individual', 'Sigilo', 'Orientação médica'],
    image: phaloplasty,
    tone: 'cream',
    imageSide: 'right',
  },
  {
    id: 'harmonizacao-facial',
    eyebrow: 'Harmonização Facial',
    title: 'Naturalidade para valorizar seus traços faciais.',
    highlights: ['Botox', 'Preenchimento labial', 'Bioestimuladores'],
    description:
      'Cuidados para linhas de expressão, olheiras, flacidez, manchas e falta de luminosidade.',
    tags: ['Harmonia facial', 'Suavização de linhas', 'Firmeza'],
    image: facialHarmonization,
    tone: 'white',
    imageSide: 'left',
  },
  {
    id: 'emagrecimento',
    eyebrow: 'Emagrecimento',
    title: 'Uma jornada completa, acompanhada de verdade.',
    highlights: ['Nutricionista', 'Endocrinologista', 'Avaliação hormonal'],
    description:
      'Acompanhamento multiprofissional para emagrecimento, saúde metabólica e construção de novos hábitos.',
    tags: ['Plano individual', 'Evolução', 'Saúde metabólica'],
    image: weightLoss,
    tone: 'gold',
    imageSide: 'right',
  },
  {
    id: 'estetica-em-geral',
    eyebrow: 'Estética em Geral',
    title: 'Cuidado completo para a sua pele e bem-estar.',
    highlights: ['Limpeza de pele', 'Massoterapia', 'Camuflagem de estrias'],
    description:
      'Protocolos para acne, poros, manchas, hidratação, estrias e cicatrizes.',
    tags: ['Textura', 'Bem-estar', 'Firmeza'],
    image: generalAesthetics,
    tone: 'dark',
    imageSide: 'left',
    hasMedallion: true,
  },
]
