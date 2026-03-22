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
import { updateInstrumentsItem } from '@/actions/instrumentsItem'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { InstrumentType } from '@/types/instrument'
import { ResponseErrorType, api } from '@/services/api'

interface DialogUpdateInstrumentProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateInstrument({ id, children }: DialogUpdateInstrumentProps) {
  const [instrument, setInstrument] = useState<InstrumentType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return
    setInstrument(null)

    const requestData = async () => {
      const { response } = await api<InstrumentType>('GET', `/instruments/${id}`)

      if (response) {
        setInstrument(response as InstrumentType)
      } else {
        toast({
          title: 'Instrumento não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setInstrument(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateInstrumentsItem(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o instrumento!',
      })
    } else {
      toast({
        title: 'Instrumento editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar instrumento</DialogTitle>
          <DialogDescription>
            Atualize as informações do instrumento abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsInstrument error={error} instrument={instrument} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
