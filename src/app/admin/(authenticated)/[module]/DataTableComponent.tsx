"use client"
import { DataTable } from '@/components/shared'
import ActionColumn from '@/components/shared/ActionColumn';
import DeleteConfirmation from '@/components/shared/DeleteConfirmation';
import React from 'react'

const DataTableComponent = ({ data, columns, module }: any) => {
  columns = [
    ...columns, {
      header: '',
      id: 'action',
      cell: (props: any) => (
          <ActionColumn row={props.row.original} module={module} />
      ),
    }
  ]
  return (
    <>
        <DataTable columns={columns} data={data?.results} />
        <DeleteConfirmation text="Are you sure you want to delete ?" module={module} />
    </>
  )
}

export default DataTableComponent