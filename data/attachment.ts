import prismadb from "@/lib/prismadb"

export const createAttachment = async(title: string, itemId: string, pdfLink: string) => {
  try {
    const attachment = await prismadb.attachment.create({
      data: {
        title,
        itemId,
        pdfLink,
      }
    })
    return attachment
  } catch (error) {
    console.log("CREATE ATTACH ERROR", error)
  }
}

export const updateAttachment = async(id: string, title?: string, pdfLink?: string) => {
  try {
    const attachment = await prismadb.attachment.update({
      where: {
        id
      },
      data: {
        title,
        pdfLink,
      }
    })
    return attachment
  } catch (error) {
    console.log("UPDATE ATTACH ERROR", error)
  }
}

export const getAttachment = async(id: string) => {
  try {
    const attachment = await prismadb.attachment.findUnique({
      where: {
        id
      },
    })
    return attachment
  } catch (error) {
    console.log("GET ATTACH ERROR", error)
  }
}

export const getAttachmentesOfItem = async(itemId: string) => {
  try {
    const attachments = await prismadb.attachment.findMany({
      where: {
        itemId
      },
    })
    return attachments
  } catch (error) {
    console.log("GET ATTACHES OF ITEM ERROR", error)
  }
}

export const deleteAttachment = async(id: string) => {
  try {
    const attachment = await prismadb.attachment.delete({
      where: {
        id
      },
    })
    return attachment
  } catch (error) {
    console.log("DELETE ATTACH ERROR", error)
  }
}