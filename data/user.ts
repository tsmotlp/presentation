import prismadb from "@/lib/prismadb"

export const createUser = async(username: string, password: string, role: string) => {
  try {
    const user = await prismadb.user.create({
      data: {
        username,
        password,
        role
      }
    })
    return user
  } catch (error) {
    console.log("CREATE USER ERROR", error)
  }
}

export const updateUser = async(id: string, username?: string, password?: string, role?: string) => {
  try {
    const user = await prismadb.user.update({
      where: {
        id
      },
      data: {
        username,
        password,
        role
      }
    })
    return user
  } catch (error) {
    console.log("UPDATE USER ERROR", error)
  }
}

export const getUser = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    console.log("GET USER ERROR", error)
  }
}

export const deleteUser = async (id: string) => {
  try {
    const user = await prismadb.user.delete({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    console.log("DELETE USER ERROR", error)
  }
}