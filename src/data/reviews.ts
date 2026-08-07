import type { Review } from '../types/content'

const provisionalReview: Omit<Review, 'id'> = {
  author: 'Nome do cliente',
  rating: 5,
  relativeDate: 'há 1 mês • Avaliação no Google',
  quote:
    '“É um fato conhecido de todos que um leitor se distrairá com o conteúdo de texto legível de uma página quando estiver examinando sua diagramação”',
  procedure: 'Harmonização de glúteos',
}

export const reviews: readonly Review[] = [
  { id: 'avaliacao-provisoria-1', ...provisionalReview },
  { id: 'avaliacao-provisoria-2', ...provisionalReview },
  { id: 'avaliacao-provisoria-3', ...provisionalReview },
  { id: 'avaliacao-provisoria-4', ...provisionalReview },
  { id: 'avaliacao-provisoria-5', ...provisionalReview },
]
