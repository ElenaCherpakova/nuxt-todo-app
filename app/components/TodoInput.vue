<template>
  <div class="input-row">
    <InputText
      v-model="inputText"
      placeholder="What do you need to do?"
      @keyup.enter="handleAdd"
    />
    <Button
      label="Add"
      icon="pi pi-plus"
      @click="handleAdd"
      :disabled="isInputEmpty"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoInput",
  data() {
    return {
      inputText: "" as string,
    };
  },
  emits: ["add-todo"],

  methods: {
    handleAdd(): void {
      const text = this.inputText.trim();
      if (!text) return;
      this.$emit("add-todo", text);
      this.inputText = "";
    },
  },
  computed: {
    isInputEmpty(): boolean {
      return this.inputText.trim() === "";
    },
  },
});
</script>


<style scoped>
.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.input-row :deep(input) {
  flex: 1;
  width: 100%;
}
</style>