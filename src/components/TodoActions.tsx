"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { deleteTodoAction } from '../../actions/todo'
import Spinner from './Spinner'
import EditTodoForm from './EditTodoForm'
import { Todo } from '@/interfaces'

interface ITodo {
    todo: Todo
}

const TodoActions = ({ todo }: ITodo) => {
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async (id: string) => {
        setIsLoading(true);
        try {
            await deleteTodoAction({ id });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-3 ">
            <EditTodoForm todo={todo} />
            <Button disabled={isLoading} onClick={() => onDelete(todo.id)} variant={"destructive"} size={"icon"}>
                {isLoading ? <Spinner /> : <Trash size={16} />}
            </Button>
        </div>
    );
};

export default TodoActions;
