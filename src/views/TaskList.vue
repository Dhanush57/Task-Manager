<template>
  <div
    class="header d-flex align-items-center justify-content-between mb-4 position-relative"
  >
    <h1 class="mx-auto">Task list</h1>
    <button
      class="logout btn btn-danger position-absolute end-0"
      @click="logout"
    >
      Logout
    </button>
  </div>
  <div class="container mt-4">
    <button @click="addTask" class="btn btn-success mb-3">Add task</button>

    <div v-for="task in tasks" :key="task.id" class="card mb-3">
      <div class="card=body mb-3">
        <h3
          class="card-title"
          style="cursor: pointer; color: blue"
          @click="viewTask(task.id)"
        >
          {{ task.title }}
        </h3>
        <p class="card-text">{{ task.description }}</p>
        <p class="card-text">
          Status:
          <span
            :class="{
              'text-success': task.status === 'Completed',
              'text-warning': task.status === 'Incomplete',
            }"
            >{{ task.status }}</span
          >
        </p>
        <img :src="task.image" alt="Task Image" width="150" />
        <div class="mt-2">
          <button class="btn btn-warning me-2" @click="toggleStatus(task.id)">
            Change Status
          </button>
          <button class="btn btn-primary me-2" @click="editTask(task.id)">
            Edit
          </button>
          <button class="btn btn-danger" @click="deleteTask(task.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, computed } from "vue";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const tasks = computed(() => store.state.tasks);

    const fetchTasks = async () => {
      if (store.state.tasks.length === 0) {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        const taskData = response.data.map((task) => ({
          ...task,
          image: `https://picsum.photos/200?random=${task.id}`,
          status: task.completed ? "Completed" : "Incomplete",
        }));
        tasks.value = taskData;
        store.commit("setTasks", taskData);
      }
    };

    function toggleStatus(id) {
      const task = tasks.value.find((task) => task.id === id);
      task.status = task.status === "Incomplete" ? "Completed" : "Incomplete";
      store.commit("toggleStatus", id);
    }

    function deleteTask(id) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
      store.commit("deleteTask", id);
    }

    function addTask() {
      router.push("/task/new");
    }

    function editTask(id) {
      router.push(`/task/${id}/edit`);
    }

    function viewTask(id) {
      router.push(`/task/${id}`);
    }

    function logout() {
      store.commit("logout");
      router.push("/login");
    }

    onMounted(fetchTasks);

    return {
      tasks,
      toggleStatus,
      deleteTask,
      addTask,
      editTask,
      viewTask,
      logout,
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.logout {
  display: flex;
  margin-left: auto;
}
</style>
