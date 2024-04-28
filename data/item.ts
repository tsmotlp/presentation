import prismadb from "@/lib/prismadb"

export const createItem = async (title: string, username: string, pptLink: string, introduction?: string, motivation?: string, conclusion?: string, inspiration?: string) => {
  try {
    const item = await prismadb.item.create({
      data: {
        title,
        username,
        pptLink,
        archived: false,
        introduction,
        motivation,
        conclusion,
        inspiration
      }
    })
    return item
  } catch (error) {
    console.log("CREATE ITEM ERROR", error)
  }
}


export const updateItem = async (id: string, title?: string, introduction?: string, motivation?: string, conclusion?: string, inspiration?: string) => {
  try {
    const item = await prismadb.item.update({
      where: {
        id
      },
      data: {
        title,
        introduction,
        motivation,
        conclusion,
        inspiration
      }
    })
    return item
  } catch (error) {
    console.log("UPDATE ITEM ERROR", error)
  }
}


export const getItem = async (id: string) => {
  try {
    const item = await prismadb.item.findUnique({
      where: {
        id
      },
    })
    return item
  } catch (error) {
    console.log("GET ITEM ERROR", error)
  }
}

export const getItemWithAttachments = async (id: string) => {
  try {
    const item = await prismadb.item.findUnique({
      where: {
        id
      },
      include: {
        attaches: true
      }
    })
    return item
  } catch (error) {
    console.log("GET ITEM ERROR", error)
  }
}

export const deleteItem = async (id: string) => {
  try {
    const item = await prismadb.item.delete({
      where: {
        id
      },
    })
    return item
  } catch (error) {
    console.log("DELETE ITEM ERROR", error)
  }
}

export const getAllItems = async () => {
  try {
    const item = await prismadb.item.findMany()
    return item
  } catch (error) {
    console.log("GET ITEMS ERROR", error)
  }
}