import { Category } from './category'

export type Instrument = {
  id: string
  name: string
  brand: string
  price: number | string
  year: number | string
  image: string
  amount: number
  category?: Category
}
