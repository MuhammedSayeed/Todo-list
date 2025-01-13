import { TodoTable } from "@/components/TodoTable";
import AddTodoForm from "@/components/AddTodoForm";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {

  const {userId} = await auth();

  console.log(userId);
  

  return (
    <main className="container mx-auto space-y-2 px-2">
      <AddTodoForm userId={userId} />
      <TodoTable />
    </main>
  );
}
