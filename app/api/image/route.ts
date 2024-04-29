import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const cover = formData.get("cover") as File;
    if (!cover) {
      return new NextResponse("No cover uploaded", { status: 404 });
    }
    // 处理文件的保存
    const imageNameSplits = cover.name.split(".")
    if (imageNameSplits.length === 0) {
      return new NextResponse("Uploaded file is not a valid image", { status: 404 });
    }
    const url = `/images/${Date.now().toString()}.${imageNameSplits[imageNameSplits.length - 1]}`;
    const imageData = await cover.arrayBuffer();
    const buffer = Buffer.from(imageData);
    await fs.writeFile(`public${url}`, buffer);
    // remove old image
    const oldUrl = formData.get("oldUrl")
    if (oldUrl) {
      const resoveUrl = oldUrl as string
      await fs.unlink(resoveUrl)
    }
    return new NextResponse(url, { status: 200 });
  } catch (err) {
    console.log("UPLOAD IMAGE ERROR", err);
    return new NextResponse("Upload image error", { status: 500 });
  }
}