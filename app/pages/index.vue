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
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
export default defineComponent({
  name: "TodoPage",
  data() {
    return {
      todos: [] as Todo[],
    };
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
    },
    toggleTodo(id: string): void {
        const todo = this.todos.find((todo: Todo)=> todo.id === id)
        if(todo) todo.completed = !todo.completed

    }
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