"use client"
import { Attach } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { BsFileEarmarkPpt } from "react-icons/bs";
import Link from "next/link";

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
            {row.original.id === "ppt" ? (
              <BsFileEarmarkPpt className="h-4 w-4 text-red-500" />
            ) : (
              <BsFileEarmarkPdf className="h-4 w-4 text-red-500" />
            )}
            <span className="truncate text-muted-foreground hover:underline hover:cursor-pointer">{row.original.title}</span>
          </div>
        </Link>
      )
    }
  },
  {
    header: "Code",
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.codeLink ? row.original.codeLink : ""}
          legacyBehavior
        >
          <span className="truncate text-muted-foreground hover:underline hover:cursor-pointer">{row.original.codeLink}</span>
        </Link>
      )
    }
  },
  {
    header: "Presentation",
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.presentationLink ? row.original.presentationLink : ""}
          legacyBehavior
        >
          <span className="truncate text-muted-foreground hover:underline hover:cursor-pointer">{row.original.presentationLink}</span>
        </Link>
      )
    }
  },
]