import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import { createItem } from "@/data/item";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData()
    const cover = formData.get("cover") as File;
    const ppt = formData.get("ppt") as File;
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;
    const username = formData.get("username") as string;
    const introduction = formData.get("introduction") as string;
    const motivation = formData.get("motivation") as string;
    const conclusion = formData.get("conclusion") as string;
    const inspiration = formData.get("inspiration") as string;

    if (!cover) {
      return new NextResponse("No cover uploaded", { status: 404 });
    }

    if (!ppt) {
      return new NextResponse("No PPT uploaded", { status: 404 });
    }

    if (!title) {
      return new NextResponse("Title is not specified", { status: 404 });
    }

    if (!userId) {
      return new NextResponse("User Id is not specified", { status: 404 });
    }

    if (!username) {
      return new NextResponse("Username is not specified", { status: 404 });
    }

    if (!introduction) {
      return new NextResponse("Introduction is not specified", { status: 404 });
    }

    if (!motivation) {
      return new NextResponse("Motivation is not specified", { status: 404 });
    }

    if (!conclusion) {
      return new NextResponse("Conclusion is not specified", { status: 404 });
    }

    if (!inspiration) {
      return new NextResponse("Inspiration is not specified", { status: 404 });
    }

    //处理cover的保存
    const imageNameSplits = cover.name.split(".")
    if (imageNameSplits.length === 0) {
      return new NextResponse("Uploaded file is not a valid image", { status: 404 });
    }
    const coverLink = `/images/${Date.now().toString()}.${imageNameSplits[imageNameSplits.length - 1]}`;
    const imageData = await cover.arrayBuffer();
    const coverBuffer = Buffer.from(imageData);
    await fs.writeFile(`public${coverLink}`, coverBuffer);

    // 处理文件的保存
    const url = `/ppts/${Date.now().toString()}.pptx`;
    const data = await ppt.arrayBuffer();
    const buffer = Buffer.from(data);
    await fs.writeFile(`public${url}`, buffer);
    const itemInfo = await createItem(title, userId, username, coverLink, url, introduction, motivation, conclusion, inspiration)
    if (itemInfo) {
      return NextResponse.json(itemInfo);
    }
    return new NextResponse("Internal server error", { status: 500 });
  } catch (error) {
    console.log("CREATE ITEM ERROR", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}