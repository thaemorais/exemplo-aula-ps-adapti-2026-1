import { CategoryType } from './category'

export type InstrumentType = {
  id: string
  name: string
  brand: string
  price: number | string
  year: number | string
  image: string
  amount: number
  category?: CategoryType
}
