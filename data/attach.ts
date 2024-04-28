import prismadb from "@/lib/prismadb"

export const createAttach = async(title: string, itemId: string, pdfLink: string, codeLink?: string, presentationLink?: string) => {
  try {
    const attach = await prismadb.attach.create({
      data: {
        title,
        itemId,
        pdfLink,
        codeLink,
        presentationLink
      }
    })
    return attach
  } catch (error) {
    console.log("CREATE ATTACH ERROR", error)
  }
}

export const updateAttach = async(id: string, title?: string, pdfLink?: string, codeLink?: string, presentationLink?: string) => {
  try {
    const attach = await prismadb.attach.update({
      where: {
        id
      },
      data: {
        title,
        pdfLink,
        codeLink,
        presentationLink
      }
    })
    return attach
  } catch (error) {
    console.log("UPDATE ATTACH ERROR", error)
  }
}

export const getAttach = async(id: string) => {
  try {
    const attach = await prismadb.attach.findUnique({
      where: {
        id
      },
    })
    return attach
  } catch (error) {
    console.log("GET ATTACH ERROR", error)
  }
}

export const getAttachesOfItem = async(itemId: string) => {
  try {
    const attaches = await prismadb.attach.findMany({
      where: {
        itemId
      },
    })
    return attaches
  } catch (error) {
    console.log("GET ATTACHES OF ITEM ERROR", error)
  }
}

export const deleteAttach = async(id: string) => {
  try {
    const attach = await prismadb.attach.delete({
      where: {
        id
      },
    })
    return attach
  } catch (error) {
    console.log("DELETE ATTACH ERROR", error)
  }
}