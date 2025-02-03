import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import TaskList from "@/views/TaskList.vue";
import TaskDetails from "@/views/TaskDetails.vue";
import TaskForm from "@/views/TaskForm.vue";
import store from "../store";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/tasks", component: TaskList, meta: { requiresAuth: true } },
  { path: "/task/new", component: TaskForm, meta: { requiresAuth: true } },
  { path: "/task/:id/edit", component: TaskForm, meta: { requiresAuth: true } },
  { path: "/task/:id", component: TaskDetails, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
