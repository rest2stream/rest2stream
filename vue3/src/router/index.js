import { createWebHistory, createRouter } from "vue-router";
import MyApiIndex from "../views/MyapiIndex.vue";
import MyApiEdit from "../views/MyapiEdit.vue";
import MyApiList from "../views/MyapiList.vue";
import Settings from "../views/Settings.vue";
import Account from "../views/Account.vue";

const routes = [
  {
    path: "/",
    name: "myapi",
    component: MyApiIndex,
    redirect: { name: "myapi-list"},
    children: [
      {
        path: "/myapi/list",
        name: "myapi-list",
        component: MyApiList,
      },
      {
        path: "/myapi/edit/:id",
        name: "myapi-edit",
        component: MyApiEdit,
      },
    ]
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