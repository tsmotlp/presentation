import { deleteAttach } from "@/data/attach"
import { NextResponse } from "next/server"

export const DELETE = async (
    req: Request,
    {params}: {params: {attachId: string}}
  ) => {
    try {
      await deleteAttach(params.attachId)
      return new NextResponse("Attachment removed!", { status: 200 })
    } catch (error) {
      console.log("REMOVE ATTACHMENT ERROR", error)
      return new NextResponse("Internal server error", { status: 500 })
    }
  }