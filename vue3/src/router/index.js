import { createWebHistory, createRouter } from "vue-router";
import Myapi from "../views/Myapi.vue";
import Settings from "../views/Settings.vue";
import Account from "../views/Account.vue";

const routes = [
  {
    path: "/",
    name: "Myapi",
    component: Myapi,
  },
  {
    path: "/settings/",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/account/",
    name: "Account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;