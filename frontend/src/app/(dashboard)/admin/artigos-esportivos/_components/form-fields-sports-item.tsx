'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import { Category } from '@/types/category'
import { useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { api } from '@/services/api'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
}: FormFieldsSportsItemProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      const { response } = await api<Category[]>('GET', '/category')
      if (response) setCategories(response)
    }
    loadCategories()
  }, [])

  const imageSrc = updateImage ?? (sportsItem?.image ?? undefined)

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && (
          <Input defaultValue={sportsItem.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="name" required={!sportsItem}>
            Nome
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={sportsItem?.name}
            placeholder="Nome do instrumento"
            readOnly={readOnly}
            minLength={3}
            maxLength={40}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="brand" required={!sportsItem}>
            Marca
          </Label>
          <Input
            id="brand"
            name="brand"
            defaultValue={sportsItem?.brand}
            placeholder="Marca"
            readOnly={readOnly}
            minLength={3}
            maxLength={40}
            error={error?.errors?.brand}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!sportsItem}>
            Preço
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={sportsItem?.price}
            placeholder="0.00"
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required={!sportsItem}>
            Ano
          </Label>
          <Input
            id="year"
            name="year"
            defaultValue={sportsItem?.year}
            placeholder="Ex: 2024"
            readOnly={readOnly}
            minLength={4}
            maxLength={4}
            error={error?.errors?.year}
          />
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!sportsItem}>
            Quantidade em estoque
          </Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            min={0}
            defaultValue={sportsItem?.amount}
            placeholder="0"
            readOnly={readOnly}
            error={error?.errors?.amount}
          />
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!sportsItem}>
            Categoria
          </Label>
          <select
            id="category_id"
            name="category_id"
            disabled={readOnly}
            defaultValue={sportsItem?.category_id ?? ''}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {error?.errors?.category_id && (
            <p className="text-sm text-destructive col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        {!readOnly && (
          <FormField>
            <Label htmlFor="image">Imagem</Label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setUpdateImage)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
            />
            {error?.errors?.image && (
              <p className="text-sm text-destructive col-start-2 col-end-5">
                {error.errors.image}
              </p>
            )}
          </FormField>
        )}
        {readOnly && imageSrc && (
          <FormField>
            <Label>Imagem</Label>
            <ImageForm src={imageSrc} alt={sportsItem?.name} className="h-32 w-32" />
          </FormField>
        )}
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
