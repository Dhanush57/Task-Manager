<template>
  <div class="container mt-4">
    <div v-if="task" class="card shadow-sm">
      <img
        :src="task.image"
        style="align-self: center"
        alt="Task Image"
        width="200"
      />
      <div class="card-body">
        <h2 class="card-tite text center mb-3">{{ task.title }}</h2>
      </div>
      <ul class="list-group list-group-flush mb-3">
        <li class="list-group-item">
          <strong>Description:</strong>{{ task.description }}
        </li>
        <li class="list-group-item">
          <strong>Due Date:</strong>{{ task.dueDate }}
        </li>
        <li class="list-group-item">
          <strong>Status:</strong>
          <span
            :class="{
              'text-success': task.status === 'Completed',
              'text-warning': task.status === 'Incomplete',
            }"
            >{{ task.status }}</span
          >
        </li>
      </ul>

      <div class="mb-3">
        <button class="btn btn-outline-primary" @click="backToTasks">
          Back To Tasks
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const task = ref(null);

    onMounted(() => {
      const taskId = parseInt(route.params.id);
      let tasks = [];
      tasks.push(store.state.tasks);
      task.value = store.state.tasks.find((task) => task.id === taskId);
      if (!task.value) {
        router.push("/tasks");
      }
    });

    function backToTasks() {
      router.push("/tasks");
    }

    return { task, backToTasks };
  },
};
</script>