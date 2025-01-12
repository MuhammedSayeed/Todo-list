"use server"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoListAction = async (user_id : string) => {
    return await prisma.todo.findMany({
        where : {
            user_id : user_id
        },
        orderBy : {
            createdAt : "desc"
        }
    })
}

export const createTodoAction = async ({ user_id , title , body ,completed } : {user_id :string , title : string , body : string | undefined , completed : boolean}) => {
    await prisma.todo.create({
        data : {
            title: title,
            body: body,
            completed : completed,
            user_id : user_id
        }
    })
    revalidatePath("/")


}


export const updateTodoAction = async ({ id, title, body, completed }: { id: string; title: string; body: string; completed: boolean }) => {
    await prisma.todo.update({
        where : {
            id : id
        },
        data : {
            title : title,
            body : body,
            completed : completed
        }
    })
    revalidatePath("/")

}

export const deleteTodoAction = async ({id} : {id : string}) => {
    await prisma.todo.delete({
        where : {
            id : id
        }
    })
    revalidatePath("/")
}


