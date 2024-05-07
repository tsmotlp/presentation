import { deleteAttachment } from "@/data/attachment"
import { NextResponse } from "next/server"

export const DELETE = async (
    req: Request,
    {params}: {params: {attachmentId: string}}
  ) => {
    try {
      await deleteAttachment(params.attachmentId)
      return new NextResponse("Attachment removed!", { status: 200 })
    } catch (error) {
      console.log("REMOVE ATTACHMENT ERROR", error)
      return new NextResponse("Internal server error", { status: 500 })
    }
  }