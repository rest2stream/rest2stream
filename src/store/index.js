import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import site from '@/store/modules/site'
import myapi from '@/store/modules/myapi'
import auth from '@/store/modules/auth';

const store = createStore({
  strict: true,
  modules: {
    site: site,
    myapi: myapi,
    auth: auth
  },
  plugins: [createPersistedState()]
})

export default store;