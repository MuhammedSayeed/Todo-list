


export interface Todo {
    id: string;
    title: string;
    body: string | null;
    completed: boolean | null;
    createdAt?: Date;
}