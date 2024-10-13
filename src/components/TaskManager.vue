<template>
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <Header />
        <AddTaskButton @openModal="openModal" />
  
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Active Tasks</h2>
          <TaskList
            :tasks="activeTasks"
            @toggleTaskCompletion="toggleTaskCompletion"
            @deleteTask="deleteTask"
          />
        </div>
  
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Completed Tasks</h2>
          <TaskList
            :tasks="completedTasks"
            @toggleTaskCompletion="toggleTaskCompletion"
            @deleteTask="deleteTask"
          />
        </div>
      </div>
  
      <TaskModal
    :isModalOpen="isModalOpen"
    :newTaskTitle="newTaskTitle"
    @update:newTaskTitle="newTaskTitle = $event"
    :closeModal="closeModal"
    :addNewTask="addNewTask"
  />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import Header from './Header.vue'
  import AddTaskButton from './AddTaskButton.vue'
  import TaskList from './TaskList.vue'
  import TaskModal from './TaskModal.vue'
  import axios from 'axios'
  
  const tasks = ref([])

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  const isModalOpen = ref(false)
const newTaskTitle = ref('')

// Funções
const loadTasks = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/tasks`)
    tasks.value = response.data
  } catch (error) {
    console.error('Error loading tasks:', error)
  }
}

const activeTasks = computed(() => tasks.value.filter(task => !task.isCompleted))
const completedTasks = computed(() => tasks.value.filter(task => task.isCompleted))

const openModal = () => { isModalOpen.value = true }
const closeModal = () => {
  isModalOpen.value = false
  newTaskTitle.value = ''
}

const addNewTask = async () => {
  if (newTaskTitle.value.trim()) {
    try {
      const response = await axios.post(`${apiBaseUrl}/tasks`, {
        description: newTaskTitle.value.trim(),
        isCompleted: false
      })
      tasks.value.push(response.data)
      closeModal()
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }
}

const deleteTask = async (id) => {
  try {
    await axios.delete(`${apiBaseUrl}/tasks/${id}`)
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const toggleTaskCompletion = async (task) => {
  try {
    const updatedTask = { isCompleted: !task.isCompleted }
    const response = await axios.patch(`${apiBaseUrl}/tasks/${task.id}`, updatedTask)
    task.isCompleted = response.data.isCompleted
    loadTasks();
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

loadTasks()
</script>

<style scoped>
.task-list-enter-active, .task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from, .task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>

  
  