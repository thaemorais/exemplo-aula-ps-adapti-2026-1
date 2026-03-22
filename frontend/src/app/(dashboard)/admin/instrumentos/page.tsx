import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { GiGuitar } from "react-icons/gi";
import ListSportsItems from './_components/list-instrument';
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
          <GiGuitar />
          Instrumentos
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua Instrumentos.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListSportsItems />
        </Suspense>
      </DashboardMain>
    </>
  )
}
