'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsInstrument from './form-fields-instrument'
import { createInstrumentsItem } from '@/actions/instrumentsItem'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateInstrumentProps {
  children: React.ReactNode
}

export function DialogCreateInstrument({ children }: DialogCreateInstrumentProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await createInstrumentsItem(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível criar o instrumento!',
      })
    } else {
      toast({
        title: 'Instrumento criado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar instrumento</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo instrumento abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsInstrument error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
