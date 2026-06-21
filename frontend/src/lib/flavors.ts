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
    id: 'chorizo-endiablado',
    name: 'Chorizo Endiablado',
    tagline: 'El infierno sabe mejor de lo que crees',
    description:
      'Tortilla de chorizo picante con un toque diabólico. Nuestro diablillo rojo le da ese punto rebelde que engancha.',
    image: '/tortillas/t_chorizo.jpeg',
    bg: '#E87A6A',
    initialVotes: 42,
  },
  {
    id: 'la-cabra',
    name: 'La Cabra',
    tagline: 'La más cabra... y la más cremosa',
    description:
      'Queso de cabra fundido en una tortilla sedosa. Tan buena que es "la cabra" de la familia. Literalmente.',
    image: '/tortillas/t_cabra.jpeg',
    bg: '#F0C040',
    initialVotes: 35,
  },
  {
    id: 'boletus-del-bosque',
    name: 'Boletus del Bosque',
    tagline: 'Un bosque en cada bocado',
    description:
      'Boletus salteados que huelen a tierra mojada y otoño. Una seta feliz corona esta maravilla silvestre.',
    image: '/tortillas/t_boletus.jpeg',
    bg: '#B5C8A0',
    initialVotes: 28,
  },
]
