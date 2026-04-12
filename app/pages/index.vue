<template>
  <div class="container">
    <h1>📝 My To-Do List</h1>

    <!--ADD A TASK-->
    <TodoInput @add-todo="addTodo" />
    <p v-if="todos.length === 0" class="empty">No task yet. Add one above!</p>

    <div v-else class="todo-list">
      <Card v-for="todo in todos" :key="todo.id" class="todo-card">
        <template #content>
          <div class="todo-row">
            <Checkbox v-model="todo.completed" :binary="true" />
            <span :class="{ done: todo.completed }">{{ todo.text }}</span>
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="deleteTodo(todo.id)"
              aria-label="Delete task"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  text: string;
  completed: Boolean;
}
export default defineComponent({
  name: "TodoPage",
  data() {
    return {
      todos: [
        { id: "1", text: "do laundry", completed: false },
        { id: "2", text: "walk the dog", completed: true },
      ] as Todo[],
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
.todo-card {
  width: 100%;
}

.todo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.todo-row span {
  flex: 1;
}
.done {
  text-decoration: line-through;
  color: #999;
}
</style>