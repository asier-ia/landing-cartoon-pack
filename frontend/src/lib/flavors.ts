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
    id: 'arcoiris-saltarin',
    name: 'Arcoíris Saltarín',
    tagline: 'Un carnaval de colores',
    description:
      'Helado de arcoíris con chispas saltarinas y un corazón de crema de fresa. Cada cucharada es pura fantasía y alegría.',
    image: '/helados/helado_arcoiris.jpeg',
    bg: '#F4A2B3',
    initialVotes: 42,
  },
  {
    id: 'menta-glaciar',
    name: 'Menta Glaciar',
    tagline: 'El frescor polar',
    description:
      'Menta polar con pepitas de chocolate negro y una cremosidad que corta el calor. Refrescante como una brisa de invierno.',
    image: '/helados/helado_menta.jpeg',
    bg: '#7EC8A4',
    initialVotes: 35,
  },
  {
    id: 'tarta-abuela',
    name: 'Tarta de la Abuela',
    tagline: 'El clásico que nunca falla',
    description:
      'Vainilla cremosa con trocitos de bizcocho, caramelo salado y ese secreto familiar que solo la abuela conoce. Un abrazo en forma de helado.',
    image: '/helados/helado_tarta.jpeg',
    bg: '#F4C542',
    initialVotes: 28,
  },
]
