import { deleteItem, getItem, updateItem } from "@/data/item"
import { NextResponse } from "next/server"
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from "path";


export const PATCH = async(
  req: Request,
  {params}: {params: {itemId: string}}
) => {
  try {
    const formData = await req.formData()
    const cover = formData.get("cover") as any;
    const ppt = formData.get("ppt") as any;
    const title = formData.get("title") as string;
    const introduction = formData.get("introduction") as string;
    const motivation = formData.get("motivation") as string;
    const conclusion = formData.get("conclusion") as string;
    const inspiration = formData.get("inspiration") as string;

    const oldItem = await getItem(params.itemId)
    if (!oldItem) {
      return new NextResponse("item not found", { status: 404 })
    }


    // 保存新的cover
    let coverLink = oldItem.coverLink

    if (cover) {
      const imageNameSplits = cover.name.split(".")
      if (imageNameSplits.length === 0) {
        return new NextResponse("Uploaded file is not a valid image", { status: 404 });
      }
      const coverUrl = `/images/${Date.now().toString()}.${imageNameSplits[imageNameSplits.length - 1]}`;
      const imageData = await cover.arrayBuffer();
      const coverBuffer = Buffer.from(imageData);
      await fsPromises.writeFile(`public${coverUrl}`, coverBuffer);
      coverLink = coverUrl

      // 删除旧的文件
      const oldCoverPath = path.join(process.cwd(), "public", oldItem.coverLink)
      if (fs.existsSync(oldCoverPath)) {
        try {
          fs.unlinkSync(oldCoverPath)
          console.log("OLD COVER FILE REMOVED", oldCoverPath)
        } catch (error) {
          console.log("REMOVE COVER FILE ERROR", error)
        }
      }
    }

    // 保存新的文件
    let pptLink = oldItem.pptLink

    if (ppt) {
      const url = `/ppts/${Date.now().toString()}.pptx`; 
      const data = await ppt.arrayBuffer();
      const buffer = Buffer.from(data);
      await fsPromises.writeFile(`public${url}`, buffer);
      pptLink = url

      // 删除旧的文件
      const oldPPTPath = path.join(process.cwd(), "public", oldItem.pptLink)
      if (fs.existsSync(oldPPTPath)) {
        try {
          fs.unlinkSync(oldPPTPath)
          console.log("OLD PPT FILE REMOVED", oldPPTPath)
        } catch (error) {
          console.log("REMOVE PPT FILE ERROR", error)
        }
      }
    }

    const item = await updateItem(params.itemId, coverLink, title, pptLink, introduction, motivation, conclusion, inspiration)
    return NextResponse.json(item)
  } catch (error) {
    console.log("UPDATE ITEM ERROR", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export const DELETE = async (
  req: Request,
  {params}: {params: {itemId: string}}
) => {
  try {
    const item = await deleteItem(params.itemId)
    // 删除cover
    const oldCoverPath = path.join(process.cwd(), "public", item.coverLink)
    if (fs.existsSync(oldCoverPath)) {
      try {
        fs.unlinkSync(oldCoverPath)
        console.log("COVER FILE REMOVED", oldCoverPath)
      } catch (error) {
        console.log("REMOVE COVER FILE ERROR", error)
      }
    }
    // 删除ppt
    // 删除旧的文件
    const oldPPTPath = path.join(process.cwd(), "public", item.pptLink)
    if (fs.existsSync(oldPPTPath)) {
      try {
        fs.unlinkSync(oldPPTPath)
        console.log("PPT FILE REMOVED", oldPPTPath)
      } catch (error) {
        console.log("REMOVE PPT FILE ERROR", error)
      }
    }
    return new NextResponse("Item removed!", { status: 200 })
  } catch (error) {
    console.log("REMOVE ITEM ERROR", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}