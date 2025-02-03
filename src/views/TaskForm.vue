<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h2>{{ isEditing ? "Edit Task" : "Add Task" }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
          </div>
          <input
            v-model="task.title"
            type="text"
            class="form-control"
            id="title"
            placeholder="Title"
            required
          />
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              v-model="task.description"
              class="form-control"
              id="description"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="dueDate" class="form-label">Due Date</label>
            <input
              v-model="task.dueDate"
              type="date"
              class="form-control"
              id="dueDate"
              required
            />
          </div>
          <button class="btn btn-success mb-3" type="submit">
            {{ isEditing ? "Update" : "Add" }}
          </button>
        </form>
        <button class="btn btn-primary" @click="backToTasks">
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
    const router = useRouter();
    const route = useRoute();

    const isEditing = ref(false);
    const task = ref({
      id: null,
      title: "",
      description: "",
      dueDate: "",
      status: "Incomplete",
      image: `https://picsum.photos/200?random=${Math.floor(
        Math.random() * 100
      )}`,
    });

    onMounted(() => {
      if (route.path !== "/task/new") {
        isEditing.value = true;
        const existingTask = store.state.tasks.find(
          (task) => task.id === parseInt(route.params.id)
        );
        if (existingTask) {
          task.value = { ...existingTask };
        }
      }
    });

    function handleSubmit() {
      if (isEditing.value) {
        store.commit("updateTask", task.value);
      } else {
        task.value.id = Date.now();
        store.commit("addTask", task.value);
      }
      router.push("/tasks");
    }

    function backToTasks() {
      router.push("/tasks");
    }

    return { task, isEditing, handleSubmit, backToTasks };
  },
};
</script>
