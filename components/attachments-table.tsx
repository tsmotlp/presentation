"use client"

import {
  flexRender,
  getCoreRowModel,
  Table as ReactTable,
  useReactTable,
} from "@tanstack/react-table";
import { RiFilePpt2Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attach } from "@prisma/client"
import { AttachmentsTableColumns } from "./attachments-table-columns";

interface AttachmentsTableProps {
  attachmemts: Attach[]
}

export const AttachmentsTable = ({
  attachmemts
}: AttachmentsTableProps) => {
  const table = useReactTable({
    columns: AttachmentsTableColumns,
    data: attachmemts,
    getCoreRowModel: getCoreRowModel()
  })
  console.log("attachments", attachmemts)
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="w-full">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}
                  className="font-semibold text-medium"
                >
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length > 0 && (
          table.getRowModel().rows
            .map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  )
}