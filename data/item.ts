import prismadb from "@/lib/prismadb"

export const createItem = async (title: string, userId: string, username: string, coverLink: string, pptLink: string, introduction?: string, motivation?: string, conclusion?: string, inspiration?: string) => {
  try {
    const item = await prismadb.item.create({
      data: {
        title,
        userId,
        username,
        coverLink,
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


export const updateItem = async (id: string, coverLink: string, title?: string, pptLink?: string, introduction?: string, motivation?: string, conclusion?: string, inspiration?: string) => {
  try {
    const item = await prismadb.item.update({
      where: {
        id
      },
      data: {
        coverLink,
        title,
        pptLink,
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
        attachments: true
      }
    })
    return item
  } catch (error) {
    console.log("GET ITEM ERROR", error)
  }
}

export const deleteItem = async (id: string) => {
  try {
    // 开始事务处理
    const result = await prismadb.$transaction(async (transaction) => {
      // 首先删除所有依赖的附件
      await transaction.attachment.deleteMany({
        where: {
          itemId: id  // 确保这里的字段名与数据库模型匹配
        }
      });

      // 删除项目
      const item = await transaction.item.delete({
        where: {
          id
        }
      });

      return item;
    });
    return result;
  } catch (error) {
    console.error("DELETE ITEM ERROR", error);
    throw error;  // 将错误向上抛出，以便调用者可以处理
  }
};

export const getAllItems = async () => {
  try {
    const item = await prismadb.item.findMany()
    return item
  } catch (error) {
    console.log("GET ITEMS ERROR", error)
  }
}