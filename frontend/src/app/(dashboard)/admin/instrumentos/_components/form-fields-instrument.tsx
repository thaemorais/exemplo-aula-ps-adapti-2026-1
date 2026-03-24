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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  } from '@/components/select'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { InstrumentType } from '@/types/instrument'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { CategoryType } from '@/types/category'

interface FormFieldsInstrumentProps {
  instrument?: InstrumentType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsInstrument({
  instrument,
  readOnly,
  error,
}: FormFieldsInstrumentProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    instrument?.category ?? null,
  )

  useEffect(() => {
    async function getCategories() {
        const { response, error } = await api('GET', '/category')
  
        if (response) {
            setCategories(response as CategoryType[])
        } else {
            console.error(error?.message)
        }
    }
  
    getCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {instrument && <Input defaultValue={instrument.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor="image" required={!instrument}>
            Imagem
          </Label>
          <Input name="image" id="image" type="file" accept="image/*" disabled={pending} hidden={readOnly} onChange={(e) => handleImageChange(e, setUpdateImage)} error={error?.errors?.image} />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || instrument?.image}
          />
        </FormField>
        <FormField>
          <Label htmlFor="name" required={!instrument}>
            Nome
          </Label>
          <Input name="name" id="name" placeholder="Insira o nome do instrumento" defaultValue={instrument?.name} disabled={pending} readOnly={readOnly} error={error?.errors?.name} />
        </FormField>
        <FormField>
          <Label htmlFor="brand" required={!instrument}>
            Marca
          </Label>
          <Input name="brand" id="brand" placeholder="Insira a marca do instrumento" defaultValue={instrument?.brand} disabled={pending} readOnly={readOnly} error={error?.errors?.brand} />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!instrument}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do instrumento"
            defaultValue={instrument?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required={!instrument}>
            Ano
          </Label>
          <Input name="year" id="year" maxLength={4} placeholder="Insira o ano do instrumento" defaultValue={instrument?.year} disabled={pending} readOnly={readOnly} error={error?.errors?.year} type="number" />
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!instrument}>
            Categoria
          </Label>
          <Input
            id="category_id"
            name="category_id"
            type="hidden"
            value={selectedCategory?.id}
          />
          <Select
            value={selectedCategory?.id}
            onValueChange={(value) => setSelectedCategory(categories.find((category) => category.id === value) ?? null)}
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!instrument}>
            Quantidade
          </Label>
          <Input name="amount" id="amount" placeholder="Insira a quantidade do instrumento" defaultValue={instrument?.amount} disabled={pending} readOnly={readOnly} error={error?.errors?.amount} />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
