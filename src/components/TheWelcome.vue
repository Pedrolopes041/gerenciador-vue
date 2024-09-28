<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Task Manager
        </h1>
      </header>

      <div class="mb-8">
        <button
          @click="openModal"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out bg-black"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add New Task
        </button>
      </div>

      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Active Tasks</h2>
        <TransitionGroup
          name="task-list"
          tag="ul"
          class="space-y-4"
        >
          <li
            v-for="task in activeTasks"
            :key="task.id"
            class="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-lg"
          >
            <div class="p-6 flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <input
                  :id="`task-${task.id}`"
                  :checked="task.completed"
                  @change="toggleTaskCompletion(task)"
                  type="checkbox"
                  class="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  :for="`task-${task.id}`"
                  class="text-lg font-medium text-gray-900"
                >
                  {{ task.title }}
                </label>
              </div>
              <button
                @click="deleteTask(task.id)"
                class="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                aria-label="Delete task"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </li>
        </TransitionGroup>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Completed Tasks</h2>
        <TransitionGroup
          name="task-list"
          tag="ul"
          class="space-y-4"
        >
          <li
            v-for="task in completedTasks"
            :key="task.id"
            class="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-lg opacity-70"
          >
            <div class="p-6 flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <input
                  :id="`task-${task.id}`"
                  :checked="task.completed"
                  @change="toggleTaskCompletion(task)"
                  type="checkbox"
                  class="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  :for="`task-${task.id}`"
                  class="text-lg font-medium text-gray-900 line-through"
                >
                  {{ task.title }}
                </label>
              </div>
              <button
                @click="deleteTask(task.id)"
                class="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                aria-label="Delete task"
              >
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </li>
        </TransitionGroup>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="isModalOpen" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Add New Task
              </h3>
              <div class="mt-2">
                <input
                  v-model="newTaskTitle"
                  type="text"
                  placeholder="Task Title"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  @keyup.enter="addNewTask"
                />
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="addNewTask"
                type="button"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm bg-black"
              >
                Add Task
              </button>
              <button
                @click="closeModal"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const tasks = ref([])

const isModalOpen = ref(false)
const newTaskTitle = ref('')

// Carregar tarefas da API quando o componente for montado
const loadTasks = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}`)
    tasks.value = response.data
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error)
  }
}

// Filtrar tarefas ativas e completadas
const activeTasks = computed(() => tasks.value.filter(task => !task.isCompleted))
const completedTasks = computed(() => tasks.value.filter(task => task.isCompleted))

// Abrir e fechar modal
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  newTaskTitle.value = ''
}

// Adicionar nova tarefa
const addNewTask = async () => {
  if (newTaskTitle.value.trim()) {
    try {
      console.log({
        description: newTaskTitle.value.trim(),
        isCompleted: false
      });
      const response = await axios.post(`${apiBaseUrl}/`, {
        description: newTaskTitle.value.trim(),
        isCompleted: false
      });
      tasks.value.push(response.data);
      closeModal();
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error.response?.data || error);
    }
  }
}


// Deletar tarefa
const deleteTask = async (id) => {
  try {
    await axios.delete(`${apiBaseUrl}/${id}`)
    tasks.value = tasks.value.filter(task => task._id !== id)
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error)
  }
}

// Alternar status de conclusão da tarefa
const toggleTaskCompletion = async (task) => {
  try {
    const updatedTask = {
      isCompleted: !task.isCompleted
    }
    const response = await axios.patch(`${apiBaseUrl}/${task._id}`, updatedTask)
    task.isCompleted = response.data.isCompleted
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
  }
}

// Carregar tarefas ao montar o componente
loadTasks()
</script>


<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>