'use client'

import {
  FormFieldsGroup,
  FormField,
} from '@/components/dashboard/form'
import { Skeleton } from '@/components/skeleton'

interface SkeletonFormFieldsCategoryProps {
  readOnly?: boolean
}

export default function SkeletonFormFieldsCategory({
  readOnly,
}: SkeletonFormFieldsCategoryProps) {
  return (
    <FormFieldsGroup>
      <FormField>
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-10 w-full" />
      </FormField>
    </FormFieldsGroup>
  )
}
