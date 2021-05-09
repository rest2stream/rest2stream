//import http from '../../http'
import types from '../types'

const auth = {
  namespaced: true,
  state: {
    token: null,
    status: null,
    status_msg: null,
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
    [types.LOGIN_OK](state, { status, data} ) {
      state.status = status
      state.status_msg = ''; // only applies for ERROR?
      state.token = data.access_token;
    },
    [types.LOGIN_ERROR](state, { status, data}) {
      state.status = status;
      state.status_msg = data.detail;
      state.user = {};
      state.token = '';
    },
    [types.LOGOUT](state) {
      state.token = '';
      state.user = {};
      state.status = '';
      state.status_msg = '';
    },
    [types.GET_USER_INFO_OK](state, { status, data}) {
      state.status = status
      state.user = data;
    },
    [types.GET_USER_INFO_ERROR](state, { status, data}) {
      state.status = status;
      state.status_msg = data.detail;
      state.user = {};
      state.token = '';
    },
  },
  // TODO: use axios?
  actions: {
    async [types.LOGIN_REQUEST]({ commit }, formData) {
      const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
        method: 'POST',
        body: formData
      });
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.LOGIN_OK, { status, data });
      } else {
        commit(types.LOGIN_ERROR, { status, data });
      }
      return { status, data };
    },
    async [types.GET_USER_INFO]({ commit, state }) {
      const response = await fetch(import.meta.env.VITE_ACCOUNTS_INFO_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        }
      });
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.GET_USER_INFO_OK, { status, data });
      } else {
        commit(types.GET_USER_INFO_ERROR, { status, data });
      }
      return { status, data };
    }
  }
}

export default auth