'use client'

import { destroyInstrumentsItem } from '@/actions/instrumentsItem'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateInstrumentProps {
  id: string
  children: React.ReactNode
}

export function DialogInstrumentDelete({ id, children }: DialogCreateInstrumentProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroyInstrumentsItem(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir o instrumento!',
      })
    } else {
      toast({
        title: 'Instrumento deletado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão do instrumento</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este instrumento? Esta ação é
            irreversível e removerá permanentemente o instrumento do sistema. Deseja
            continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
