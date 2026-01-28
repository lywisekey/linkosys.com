import auth1Img from '@/assets/images/auth/01.jpg'
import auth2Img from '@/assets/images/auth/02.jpg'
import auth3Img from '@/assets/images/auth/03.jpg'

const author = [
  {
    name: 'Jessey Lee',
    image: auth1Img
  },
  {
    name: 'Hoang Trinh',
    image: auth2Img
  },
  {
    name: 'Michael Darmawan',
    image: auth3Img
  }
]

type AuthorType = {
  name: string
  image: string
}

type SwiperType = {
  quote: string
  author: AuthorType
  position: string
}

export const swiperdata: SwiperType[] = [
  {
    quote:
      'Linkosys is our esteemed partner with a team of skilled, experienced, and accountable experts.',
    author: author[0],
    position: 'CHAIRMAN AND FOUNDER BRESATECH'
  },
  {
    quote:
      'When the day concluded, we were tasked with customer surveys and providing e-commerce site development quotes. Despite needing the information by the next afternoon, Linkosys promptly initiated the work upon my call.',
    author: author[1],
    position: 'CEO Advanced Network Consulting, Inc'
  },
  {
    quote:
      'Linkosys addresses our needs through diverse perspectives, listens attentively, and swiftly delivers innovative and efficient solutions.',
    author: author[2],
    position: 'President Eleganza Tiles'
  }
]
