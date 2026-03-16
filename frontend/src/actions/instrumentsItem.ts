'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createInstrumentsItem(form: FormData) {
  const res = await api('POST', '/instruments', { data: form })

  if (!res.error) {
    revalidatePath('/admin/artigos-esportivos')
  }

  return JSON.stringify(res)
}

export async function updateInstrumentsItem(form: FormData) {
  const id = form.get('id') as string
  const res = await api('PUT', `/instruments/${id}`, { data: form })

  if (!res.error) {
    revalidatePath('/admin/artigos-esportivos')
  }

  return JSON.stringify(res)
}

export async function destroyInstrumentsItem(id: string) {
  const res = await api('DELETE', `/instruments/${id}`)

  if (!res.error) {
    revalidatePath('/admin/artigos-esportivos')
  }

  return JSON.stringify(res)
}

export async function buyInstrument(id: string) {
  const res = await api('POST', `/instruments/${id}/buy`)
  return JSON.stringify(res)
}

export const createSportsItem = createInstrumentsItem
export const updateSportsItem = updateInstrumentsItem
export const destroySportsItem = destroyInstrumentsItem
