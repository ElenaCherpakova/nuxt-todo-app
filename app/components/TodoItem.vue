<template>
  <Card>
    <template #content>
      <div class="todo-row">
        <Checkbox
          :modelValue="todo.completed"
          :binary="true"
          @update:modelValue="$emit('toggle', todo.id)"
        />
        <span :class="{ done: todo.completed }">{{ todo.text }}</span>
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          rounded
          @click="$emit('delete', todo.id)"
          aria-label="Delete task"
        />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">

import { defineComponent, type PropType } from "vue";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
export default defineComponent({
  name: "TodoItem",
  emits: ["toggle", "delete"],
  props: {
    todo: { type: Object as PropType<Todo>, required: true },
  },
});
</script>

<style scoped>
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