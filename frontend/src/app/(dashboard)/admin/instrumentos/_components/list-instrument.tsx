'use client'

import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { InstrumentType } from '@/types/instrument'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateInstrument } from './dialog-update-instrument'
import { DialogInstrumentDelete } from './dialog-delete-instrument'
import { DialogInstrumentInformation } from './dialog-information-instrument'
import { DialogCreateInstrument } from './dialog-create-instrument'
import { useEffect, useState } from 'react'

export default function ListInstruments() {
  const [instruments, setInstruments] = useState<InstrumentType[]>([])

  useEffect(() => {
    async function getInstruments() {
        const { response, error } = await api('GET', '/instruments')
  
        if (response) {
            setInstruments(response as InstrumentType[])
        } else {
            console.error(error?.message)
        }
    }
  
    getInstruments()
  }, [])

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateInstrument>
          <Button size="sm">
            <LuPlusCircle />
            Novo instrumento
          </Button>
        </DialogCreateInstrument>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instruments?.map((instrument: InstrumentType) => (
              <TableRow key={instrument.id}>
                <TableCell>
                  <TabbleCellImage src={instrument.image} />
                </TableCell>
                <TableCell>{instrument.name}</TableCell>
                <TableCell>{instrument.brand}</TableCell>
                <TableCell>{instrument.price}</TableCell>
                <TableCell>{instrument.year}</TableCell>
                <TableCell>{instrument.category?.name}</TableCell>
                <TableCell>{instrument.amount}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInstrumentInformation id={instrument.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInstrumentInformation>
                  <DialogUpdateInstrument id={instrument.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateInstrument>
                  <DialogInstrumentDelete id={instrument.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogInstrumentDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!instruments.length && (
            <TableCaption>Nenhum instrumento encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
