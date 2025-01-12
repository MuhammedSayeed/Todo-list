import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "./ui/badge";
import TodoActions from "./TodoActions";
import { getTodoListAction } from "../../actions/todo";
import { auth } from "@clerk/nextjs/server";






export async function TodoTable() {
    const { userId } = await auth();
    const trimText = (text: string, limit: number) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    }

    const todos = await getTodoListAction(userId as string);


    return (
        <Table>
            <TableCaption className=" text-center">A list of your recent Todos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead >ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell className="font-medium">{trimText(todo.id, 5)}</TableCell>
                            <TableCell className="whitespace-nowrap">{trimText(todo.title, 20)}</TableCell>
                            <TableCell>{todo.completed ? <Badge variant={"secondary"}>Completed</Badge> : <Badge variant={"destructive"} >Uncompleted</Badge>}</TableCell>
                            <TableCell className="space-y-2">
                                <TodoActions todo={todo} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} >Total</TableCell>
                    <TableCell className="text-right" >{todos.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

{/*  */ }
