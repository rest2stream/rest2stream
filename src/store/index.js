import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import site from '../store/modules/site'
import myapi from '../store/modules/myapi'

const store = createStore({
  strict: true,
  modules: {
    site: site,
    myapi: myapi
  },
  plugins: [createPersistedState()]
})

export default store;