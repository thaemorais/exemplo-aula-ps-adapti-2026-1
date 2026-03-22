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
import { InstrumentType } from '@/types/instrument'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInstrumentInformationProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInstrumentInformation({
  id,
  children,
}: DialogInstrumentInformationProps) {
  const [instrument, setInstrument] = useState<InstrumentType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setInstrument(null)
      return
    }

    setInstrument(null)

    const requestData = async () => {
      const { response } = await api<InstrumentType>('GET', `/instruments/${id}`)

      if (response) {
        setInstrument(response)
      } else {
        toast({
          title: 'Instrumento não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()
    return () => setInstrument(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do instrumento</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do instrumento abaixo.
          </DialogDescription>
        </DialogHeader>
        {instrument ? (
          <FormFieldsInstrument instrument={instrument} readOnly />
        ) : (
          <p className="text-muted-foreground text-sm">Carregando...</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
