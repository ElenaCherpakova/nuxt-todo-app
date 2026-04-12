import { describe, it, expect } from "vitest";

interface Todo {
    id: string,
    text: string,
    completed: boolean
}


describe('Todo logic', () => {
    it('creates a todo with the correct shape', () => {
        const todo: Todo = { id: 'uuid-1', text: 'Walk the dog', completed: false }
        expect(todo.id).toBe('uuid-1')
        expect(todo.text).toBe('Walk the dog')
        expect(todo.completed).toBe(false)
    })
    it('filters out completed todos', () => {
        const todos: Todo[] = [
            { id: 'uuid-1', text: 'Walk the dog', completed: false },
            { id: 'uuid-2', text: 'Wash the dish', completed: true },
            { id: 'uuid-3', text: 'Shopping', completed: false }
        ]
        const remaining = todos.filter(t => !t.completed)
        expect(remaining).toHaveLength(2)
        expect(remaining.every(t => !t.completed)).toBe(true)
    })
    it('removes a todo by id', () => {
        const todos: Todo[] = [
            { id: 'uuid-1', text: 'Walk the dog', completed: false },
            { id: 'uuid-2', text: 'Wash the dish', completed: true },
        ]
        const after = todos.filter(t => t.id !== "uuid-1")
        expect(after).toHaveLength(1)
        expect(after[0].id).toBe('uuid-2')
    })
    it('toggles a todo completed state', () => {
        const todo: Todo = { id: 'uuid-1', text: 'Walk the dog', completed: false }

        todo.completed = !todo.completed
        expect(todo.completed).toBe(true)
        todo.completed = !todo.completed
        expect(todo.completed).toBe(false)

    })

})