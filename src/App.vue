<script setup>
import TaskManager from './components/TaskManager.vue';


</script>

<template>
 
  <main>
    <TaskManager/>
  </main>
</template>

<style scoped>

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  header {
    font-size: 20px;
  }

  .add-button, .update-button {
    font-size: 14px;
    padding: 8px;
  }

  .task-item {
    padding: 8px;
  }

  .task-item div {
    font-size: 14px;
  }
}
</style>
