import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated:
      JSON.parse(localStorage.getItem("isAuthenticated")) || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    tasks: [],
  },
  mutations: {
    login(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.tasks = [];
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    toggleTaskStatus(state, taskId) {
      const task = state.tasks.find((task) => task.id == taskId);
      if (task) {
        task.status = task.status === "Incomplete" ? "Completed" : "Incomplete";
      }
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      if (username === "admin" && password === "password") {
        commit("login", { username, password });
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});
