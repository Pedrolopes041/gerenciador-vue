<template>
    <TransitionGroup name="task-list" tag="ul" class="space-y-4">
      <li
        v-for="task in tasks"
        :key="task.id"
        :class="['bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out', { 'opacity-70': task.isCompleted }]"
      >
        <div class="p-6 flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <input
              :id="`task-${task.id}`"
              :checked="task.isCompleted"
             @change="() => $emit('toggleTaskCompletion', task)"
              type="checkbox"
              class="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              :for="`task-${task.id}`"
              class="text-lg font-medium text-gray-900"
              :class="{ 'line-through': task.isCompleted }"
            >
              {{ task.description }}
            </label>
          </div>
          <button
            @click="() => $emit('deleteTask', task.id)"
            class="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            aria-label="Delete task"
          >
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
      </li>
    </TransitionGroup>
  </template>
  
  <script setup>
  import { TrashIcon } from 'lucide-vue-next'
  
  const props = defineProps({
    tasks: Array,
    toggleTaskCompletion: Function,
    deleteTask: Function,
  })
  </script>
  