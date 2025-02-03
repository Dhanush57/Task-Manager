<template>
  <div class="container mt-4">
    <div class="card mx-auto" style="max-width: 400">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>

        <form @submit.prevent="loginCheck">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="passsword" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <button class="btn btn-primary w-100" type="submit">Login</button>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const loginCheck = async () => {
      const success = await store.dispatch("login", {
        username: username.value,
        password: password.value,
      });
      if (success) {
        router.push("/tasks");
      } else {
        error.value = "Invalid credentials";
      }
    };

    return { username, password, loginCheck, error };
  },
};
</script>