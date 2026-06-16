export interface Flavor {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  bg: string
  initialVotes: number
}

export const FLAVORS: Flavor[] = [
  {
    id: 'choco-loca',
    name: 'Choco-Loca',
    tagline: 'Para los locos del cacao',
    description:
      'Una explosión de chocolate belga con trocitos crujientes y un corazón de crema de avellanas. La favorita de los que no se rinden.',
    image: '/cookies/galleta_choco.jpeg',
    bg: '#F4C542',
    initialVotes: 42,
  },
  {
    id: 'fresa-magica',
    name: 'Fresa Mágica',
    tagline: 'Dulce como un hechizo',
    description:
      'Galleta de fresa silvestre con chispas de azúcar perlado y un toque secreto de vainilla. Cada mordisco es pura fantasía.',
    image: '/cookies/galleta_fresa.jpeg',
    bg: '#F4A2B3',
    initialVotes: 35,
  },
  {
    id: 'vainilla-retro',
    name: 'Vainilla Retro',
    tagline: 'El clásico que nunca falla',
    description:
      'Vainilla de Madagascar con virutas de caramelo salado y un acabado crujiente que sabe a los años dorados. Simple, perfecta, inolvidable.',
    image: '/cookies/galleta_penaut.jpeg',
    bg: '#7EC8A4',
    initialVotes: 28,
  },
]
