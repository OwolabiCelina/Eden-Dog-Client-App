import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutViewVue from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/dog/:id",
    name: "AboutDog",
    component: AboutViewVue,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;