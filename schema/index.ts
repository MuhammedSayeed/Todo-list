import { z } from "zod";

export const todoFormSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(20, { message: "Message must be at Maximum 20 characters" }),
    body: z.string().max(80, { message: "Body must be at Maximum 80 characters" }).optional(),
    completed : z.boolean()
})
export type TodoFormValues = z.infer<typeof todoFormSchema>;
