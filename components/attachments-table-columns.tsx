"use client"
import { Attach } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon } from "lucide-react";
import { BsFileEarmarkPpt } from "react-icons/bs";
import { Trash2 } from "lucide-react"
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export const AttachmentsTableColumns: ColumnDef<Attach>[] = [
  {
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.pdfLink ? row.original.pdfLink : ""}
          legacyBehavior
        >
          <div className="flex items-center gap-x-1">
            <FileIcon className="h-4 w-4 text-sky-500" />
            <span className="truncate text-muted-foreground hover:underline hover:cursor-pointer">{row.original.title}</span>
          </div>
        </Link>
      )
    }
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const { isSignedIn } = useAuth()
      return (
        <>
          {isSignedIn ? (
            <Button
            variant="ghost"
            size="xs"
            onClick={async() => {
              const response = await axios.delete(`/api/attachment/${row.original.id}`)
              if (!response || response.status !== 200) {
                toast.error("Failed to remove item")
              } else {
                toast.success("Item removed!")
                location.reload()
              }
            }}
          >
            <Trash2 className="h-4 w-4 text-red-400 text-muted-foreground" />
          </Button>
          ): (null)}
        </>
      )
    }
  },
]