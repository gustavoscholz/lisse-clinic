export interface Treatment {
  id: string
  eyebrow: string
  title: string
  highlights: string[]
  description: string
  tags: string[]
  image: string
  tone: 'dark-gradient' | 'cream' | 'white' | 'gold' | 'dark'
  imageSide: 'left' | 'right'
  hasMedallion?: boolean
}

export interface TeamMember {
  id: string
  name: string
  area: string
  specialty: string
  biography: string
  tags: string[]
  image?: string
}

export interface ResultCase {
  id: string
  image: string
  alt: string
  crop?: {
    width: number
    height: number
    left: number
    top: number
  }
  fit?: 'cover'
}

export interface Review {
  id: string
  author: string
  rating: number
  relativeDate: string
  quote: string
  procedure: string
  avatar?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface HarmonizationProcedure {
  id: string
  eyebrow: string
  title: string
  highlights: string[]
  description: string
  indications: string[]
  image: string
  imageAlt: string
  imageSide: 'left' | 'right'
}

export interface HarmonizationBenefit {
  id: string
  title: string
  description: string
  icon: string
}
