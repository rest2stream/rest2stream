import store from '@/store'
import { createWebHistory, createRouter } from "vue-router";
import { 
  MyApiIndex,
  MyApiEdit,
  MyApiAdd,
  MyApiList,
  Settings,
  Account,
  Login,
  Layout,
} from "@/views";

const isNotAuthenticated = (to, from, next) => {
  if (!store.getters['auth/isAuthenticated']) {
    next()
  } else {
    next('/')
  }
};

const isAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next()
  } else {
    next({name:'login'})
  }
};

const routes = [
  {
    path: "/login/",
    name: "login",
    component: Login,
    beforeEnter: isNotAuthenticated,
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
            path: "/myapi/add/",
            name: "myapi-add",
            component: MyApiAdd,
            beforeEnter: isAuthenticated,
          },
          {
            path: "/myapi/edit/:id",
            name: "myapi-edit",
            component: MyApiEdit,
            beforeEnter: isAuthenticated,
          },
        ]
      },
      {
        path: "/settings/",
        name: "settings",
        component: Settings,
        beforeEnter: isAuthenticated,
      },
      {
        path: "/account/",
        name: "account",
        component: Account,
        beforeEnter: isAuthenticated,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;