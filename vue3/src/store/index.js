import { createStore } from 'vuex'
import site from '../store/modules/site'
import myapi from '../store/modules/myapi'

const store = createStore({
  strict: true,
  modules: {
    site: site,
    myapi: myapi
  },
})

export default store;