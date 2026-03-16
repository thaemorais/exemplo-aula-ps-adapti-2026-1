// Marca o arquivo como Server Actions do Next.js (rodam apenas no servidor)
'use server'

// Cliente HTTP configurado com autenticação e base URL da API
import { api } from '@/services/api'
// Invalida cache do Next.js para atualizar dados em cache após mutações
import { revalidatePath } from 'next/cache'

/** Cria um novo instrumento no backend. */
export async function createInstrumentsItem(form: FormData) {
  // Envia POST para /instruments com os campos do formulário (name, brand, price, year, image, amount, category_id)
  const res = await api('POST', '/instruments', { data: form })

  // Se não houve erro, invalida a página de listagem para mostrar o novo instrumento
  if (!res.error) {
    revalidatePath('/admin/instruments')
  }

  // Retorna o resultado serializado para o cliente tratar sucesso/erro
  return JSON.stringify(res)
}

/** Atualiza um instrumento existente no backend. */
export async function updateInstrumentsItem(form: FormData) {
  // Pega o id do instrumento enviado no formulário (campo hidden)
  const id = form.get('id') as string
  // Envia PUT para /instruments/:id com os campos atualizados
  const res = await api('PUT', `/instruments/${id}`, { data: form })

  // Se não houve erro, invalida a listagem para refletir a alteração
  if (!res.error) {
    revalidatePath('/admin/instruments')
  }

  return JSON.stringify(res)
}

/** Remove um instrumento no backend. */
export async function destroyInstrumentsItem(id: string) {
  // Envia DELETE para /instruments/:id
  const res = await api('DELETE', `/instruments/${id}`)

  // Se não houve erro, invalida a listagem para remover o instrumento da UI
  if (!res.error) {
    revalidatePath('/admin/instruments')
  }

  return JSON.stringify(res)
}

/** Registra a compra de uma unidade do instrumento (decrementa o estoque no backend). */
export async function buyInstrument(id: string) {
  // Envia POST para /instruments/:id/buy (não invalida cache; a listagem do site pode ser atualizada pelo usuário)
  const res = await api('POST', `/instruments/${id}/buy`)
  return JSON.stringify(res)
}
