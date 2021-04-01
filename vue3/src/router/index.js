import { createWebHistory, createRouter } from "vue-router";
import MyApi from "../views/Myapi.vue";
import MyApiEdit from "../views/MyapiEdit.vue";
import Settings from "../views/Settings.vue";
import Account from "../views/Account.vue";

const routes = [
  {
    path: "/",
    name: "myapi",
    component: MyApi,
  },
  {
    path: "/myapi/edit/:id",
    name: "myapi-edit",
    component: MyApiEdit,
  },
  {
    path: "/settings/",
    name: "settings",
    component: Settings,
  },
  {
    path: "/account/",
    name: "account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;