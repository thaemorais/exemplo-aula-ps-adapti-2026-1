// Marca o arquivo como Server Actions do Next.js (rodam apenas no servidor)
'use server'

// Cliente HTTP configurado com autenticação e base URL da API
import { api } from '@/services/api'
// Invalida cache do Next.js para atualizar dados em cache após mutações
import { revalidatePath } from 'next/cache'

/** Cria uma nova categoria no backend. */
export async function createCategory(form: FormData) {
  // Envia POST para /category com os campos do formulário (ex.: name)
  const res = await api('POST', '/category', { data: form })

  // Se não houve erro, invalida a página de listagem para mostrar a nova categoria
  if (!res.error) {
    revalidatePath('/admin/categorias')
  }

  // Retorna o resultado serializado para o cliente tratar sucesso/erro
  return JSON.stringify(res)
}

/** Atualiza uma categoria existente no backend. */
export async function updateCategory(form: FormData) {
  // Pega o id da categoria enviado no formulário (campo hidden)
  const id = form.get('id') as string
  // Envia PUT para /category/:id com os campos atualizados
  const res = await api('PUT', `/category/${id}`, { data: form })

  // Se não houve erro, invalida a listagem para refletir a alteração
  if (!res.error) {
    revalidatePath('/admin/categorias')
  }

  return JSON.stringify(res)
}

/** Remove uma categoria no backend. */
export async function destroyCategory(id: string) {
  // Envia DELETE para /category/:id
  const res = await api('DELETE', `/category/${id}`)

  // Se não houve erro, invalida a listagem para remover a categoria da UI
  if (!res.error) {
    revalidatePath('/admin/categorias')
  }

  return JSON.stringify(res)
}
