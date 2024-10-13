<template>
    <div class="mb-8">
      <button
        @click="$emit('openModal')"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        Add New Task
      </button>
    </div>
  </template>
  
  <script setup>
  import { PlusIcon } from 'lucide-vue-next'
  
  // Props para abrir o modal
  const props = defineProps({
    openModal: Function,
  })
  </script>
  