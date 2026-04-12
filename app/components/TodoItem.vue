<template>
  <Card>
    <template #content>
      <div class="todo-row">
        <Checkbox
          :modelValue="todo.completed"
          :binary="true"
          @update:modelValue="$emit('toggle', todo.id)"
        />
        <InputText
          v-if="isEditing"
          v-model="editText"
          class="edit-input"
          @keyup.enter="saveEdit"
          @keyup.escape="$emit('cancel-edit')"
        />

        <span v-else :class="{ done: todo.completed }">{{ todo.text }}</span>
        <div class="actions">
          <!-- Edit button: visible only when NOT editing -->

          <Button
            v-if="!isEditing"
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            @click="startEditing"
            aria-label="Edit task"
          />
          <!-- Save button: visible only when editing -->
          <Button
            v-if="isEditing"
            icon="pi pi-check"
            severity="success"
            text
            rounded
            @click="saveEdit"
            aria-label="Save task"
          />
          <!-- Cancel button: visible only when editing -->
          <Button
            v-if="isEditing"
            icon="pi pi-times"
            severity="secondary"
            text
            rounded
            @click="$emit('cancel-edit')"
            aria-label="Cancel edit"
          />
        </div>
        <!-- Delete button: always visible -->
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
import type { Todo } from "../types/todo";

export default defineComponent({
  name: "TodoItem",
  emits: ["toggle", "delete", "start-edit", "save-edit", "cancel-edit"],

  data() {
    return {
      editText: "" as string,
    };
  },
  props: {
    todo: { type: Object as PropType<Todo>, required: true },
    isEditing: { type: Boolean, required: false },
  },
  methods: {
    startEditing(): void {
      this.editText = this.todo.text;
      this.$emit("start-edit", this.todo.id);
    },
    saveEdit(): void {
      const text = this.editText.trim();
      if (!text) return;
      this.$emit("save-edit", { id: this.todo.id, text });
    },
  },
});
</script>

<style scoped>
.todo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.todo-row span,
.edit-input {
  flex: 1;
}

.done {
  text-decoration: line-through;
  color: #999;
}
.actions {
  display: flex;
  gap: 4px;
}
</style>