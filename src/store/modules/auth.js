import http from '../../http'
import types from '../types'

const auth = {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    [types.LOGIN](state, obj) {
        state.token = obj.access_token;
    },
    [types.LOGOUT](state, obj) {
        state.token = '';
    },
  },
  actions: {
    async [types.LOGIN]({ commit }, formData) {
      const data = await http.postForm(import.meta.env.VITE_LOGIN_URL, formData);
      commit(types.LOGIN, data);
      return data;
    }
  }
}

export default auth