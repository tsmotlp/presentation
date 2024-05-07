import { createAttachment } from "@/data/attachment"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "@/node_modules/next/server"


export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { title, itemId, pdfLink } = body
    const attachment = await createAttachment(title, itemId, pdfLink)
    return NextResponse.json(attachment)
  } catch (error) {
    console.log("CREATE ATTACH ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}