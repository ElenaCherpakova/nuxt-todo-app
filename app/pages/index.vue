<template>
  <div class="container">
    <h1>📝 My To-Do List</h1>

    <TodoInput @add-todo="addTodo" />
    <p v-if="todos.length === 0" class="empty">No task yet. Add one above!</p>

    <div v-else class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :isEditing="editingId === todo.id"
        @toggle="toggleTodo"
        @delete="deleteTodo"
        @start-edit="startEdit"
        @save-edit="saveEdit"
        @cancel-edit="cancelEdit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "../types/todo";


const STORAGE_KEY = "nuxt-todo-app";
export default defineComponent({
  name: "TodoPage",
  data() {
    return {
      todos: [] as Todo[],
      editingId: null as string | null,
    };
  },

  watch: {
    todos: {
      deep: true,
      handler(newTodos: Todo[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
      },
    },
  },
  mounted() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.todos = JSON.parse(saved) as Todo[];
    }
  },

  methods: {
    addTodo(text: string): void {
      if (!text) return;
      const newTodo = {
        id: uuidv4(),
        text,
        completed: false,
      };
      this.todos.unshift(newTodo);
    },
    deleteTodo(id: string): void {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
      if (this.editingId === id) this.editingId = null;
    },
    toggleTodo(id: string): void {
      const todo = this.todos.find((todo: Todo) => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    startEdit(id: string): void {
      this.editingId = id;
    },
    saveEdit({ id, text }: { id: string; text: string }): void {
      const todo = this.todos.find((todo: Todo) => todo.id === id);
      if (todo) todo.text = text;
      this.editingId = null;
    },
    cancelEdit(): void {
      this.editingId = null;
    },
  },
});
</script>
<style scoped>
.container {
  max-width: 540px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.empty {
  text-align: center;
  color: #999;
  font-style: italic;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>