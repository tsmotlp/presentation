import { updateItem } from "@/data/item"
import { NextResponse } from "next/server"


export const PATCH = async(
  req: Request,
  {params}: {params: {itemId: string}}
) => {
  try {
    console.log("itemId", params.itemId)
    const body = await req.json()

    const { title, introduction, motivation, conclusion, inspiration } = body
    const item = await updateItem(params.itemId, title, introduction, motivation, conclusion, inspiration)
    return NextResponse.json(item)
  } catch (error) {
    console.log("UPDATE ITEM ERROR", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}