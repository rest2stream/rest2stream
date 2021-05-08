import http from '../../http'
import types from '../types'

const auth = {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    [types.LOGIN_SUCCESS](state, obj) {
        state.token = obj.access_token;
    },
    [types.LOGOUT_SUCCESS](state, obj) {
        state.token = '';
    },
  },
  actions: {
    async [types.LOGIN_REQUEST]({ commit }, formData) {
      const data = await http.postForm(import.meta.env.VITE_LOGIN_URL, formData);
      commit(types.LOGIN_SUCCESS, data);
      return data;
    }
  }
}

export default auth