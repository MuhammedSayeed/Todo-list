"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { todoFormSchema, TodoFormValues } from '../../schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTodoAction } from '../../actions/todo'
import { Checkbox } from './ui/checkbox'
import Spinner from './Spinner'


interface IAddTodoForm {
    userId : string | null
}

const AddTodoForm = ({userId} : IAddTodoForm) => {
    const [isLoading , setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const defaultValues: Partial<TodoFormValues> = {
        title: "",
        body: "",
        completed: false
    }
    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: defaultValues,
        mode: "onChange"
    });
    const { reset } = form;

    const onSubmit = async (data: TodoFormValues) => {
        setIsLoading(true);
        try {
            await createTodoAction({ user_id :  userId as string ,  title: data.title, body: data.body, completed: data.completed })
            reset(defaultValues);
        } catch (error) {
            console.log("Add Todo Form component" , error);
        }finally{
            setIsLoading(false);
            setIsDialogOpen(false)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="w-full flex justify-end">
                <DialogTrigger asChild>
                    <Button ><Plus /> New Todo</Button>
                </DialogTrigger>
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add To Do</DialogTitle>
                    <DialogDescription>
                        Feel Free to assign your new To Do
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="body" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="completed" render={({ field }) => (
                                <FormItem >
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <FormLabel>Completed</FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <DialogFooter>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading ? <Spinner color='black' /> : "Save"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddTodoForm