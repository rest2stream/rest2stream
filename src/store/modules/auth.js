//import http from '../../http'
import types from '@/store/types'

const auth = {
  namespaced: true,
  state: {
    //token: null,
    status: null,
    status_msg: null,
    user: {},
    token: {}
  },
  getters: {
    isAuthenticated (state) {
      // define as Date so we can convert to acceptable date time format (with out letter T, ex. 2020-10-10T06:50:14.751 )
      const temp = new Date(state.token.exp) 
      // suffix UTC so it will render as local time when it use toLocalString
      const exp = new Date(`${temp.toLocaleString()} UTC`); 
      return (
        (Object.entries(state.token).length > 0) &&
        (Object.entries(state.user).length > 0 ) &&
        (exp > new Date())
     ); 
    }
  },
  mutations: {
    [types.LOGIN_OK](state, { status, data} ) {
      state.status = status
      state.status_msg = ''; // only applies for ERROR?
      state.token = data;
    },
    [types.LOGIN_ERROR](state, { status, data}) {
      state.status = status;
      state.status_msg = data.detail;
      state.user = {};
      state.token = {};
    },
    [types.LOGOUT](state) {
      state.token = {};
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
      state.token = {};
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
          'Authorization': `Bearer ${state.token.access_token}`
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