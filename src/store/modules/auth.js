import http from '../../http'
import types from '../types'

const auth = {
  namespaced: true,
  state: {
    token: null,
    status: null,
    user: {}
  },
  getters: {
    isAuthenticated (state) {
      return (
        (state.token && state.token.length > 0) &&
        (state.user.username && state.user.username.length > 0)
     ); // TODO: need to add extra checking token expiration?
    }
  },
  mutations: {
    [types.LOGIN_SUCCESS](state, obj) {
      state.status = 'success'
      state.token = obj.access_token;
    },
    [types.LOGOUT](state) {
      state.token = '';
      state.user = {};
      state.status = '';
    },
    [types.GET_USER_INFO](state, obj) {
      console.log(obj)
      state.user = obj;
    },
  },
  // TODO: use axios?
  actions: {
    async [types.LOGIN_REQUEST]({ commit }, formData) {
      const data = await http.post(import.meta.env.VITE_LOGIN_URL, { formData, headers: {} });
      commit(types.LOGIN_SUCCESS, data);
      return data;
    },
    async [types.GET_USER_INFO]({ commit, state }) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      }
      const data = await http.get(import.meta.env.VITE_ACCOUNTS_INFO_URL, { headers });
      commit(types.GET_USER_INFO, data);
      return data;
    }
  }
}

export default auth