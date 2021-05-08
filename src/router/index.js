import { createWebHistory, createRouter } from "vue-router";
import { 
  MyApiIndex,
  MyApiEdit,
  MyApiList,
  Settings,
  Account,
  Login,
  Layout,
} from "@/views";

const routes = [
  {
    path: "/login/",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
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
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;