
//import http from '../../http'
import types from '@/store/types'

const myapi = {
  namespaced: true,
  state: {
    myapi: [],
  },
  mutations: {
    [types.CREATE_MYAPI_OK](state, { status, data }) {
      state.myapi.push(data)
    },
    [types.UPDATE_MYAPI_OK](state, { status, data }) {
      // TODO: good to use json patch?
      state.myapi = state.myapi.filter(r => r.id != data.id)
      state.myapi.push(data)
    },
    [types.FETCH_MYAPI_OK](state, { status, data} ) {
        state.myapi = data;
        //sessionStorage.setItem('myapi', JSON.stringify(data))
    },
    [types.REMOVE_MYAPI_OK](state, { status, obj_id } ) {
      state.myapi = state.myapi.filter(res => res.id != obj_id)
    },
  },
  actions: {
    async [types.CREATE_MYAPI]({ commit, rootState }, obj) {
      const response = await fetch(import.meta.env.VITE_MYAPI_CREATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rootState.auth.token.access_token}`
        },
        body: JSON.stringify(obj)
      });
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.CREATE_MYAPI_OK, { status, data })
      } else {
        // TODO: ??
      }
      return { status, data };
    },
    async [types.UPDATE_MYAPI]({ commit, rootState }, { obj_id, obj }) {

      // TODO: handle this in backend?
      delete obj.created_at;
      delete obj.modified_at;
      delete obj.id;

      const response = await fetch(`${import.meta.env.VITE_MYAPI_URL}/${obj_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rootState.auth.token.access_token}`
        },
        body: JSON.stringify(obj)
      });
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.UPDATE_MYAPI_OK, { status, data })
      } else {
        console.log(response)
        console.log(obj)
        // TODO: ??
      }
      return { status, data };
    },
    async [types.FETCH_MYAPI]({ commit, rootState } ) {
      const response = await fetch(import.meta.env.VITE_MYAPI_LIST_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rootState.auth.token.access_token}`
        },
      })
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.FETCH_MYAPI_OK, { status, data })
      } else {
        // TODO: ??
      }
      return { status, data };
    },
    async [types.REMOVE_MYAPI]({ commit, rootState }, obj_id ) {
      const response = await fetch(`${import.meta.env.VITE_MYAPI_URL}/${obj_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${rootState.auth.token.access_token}`
        },
      });
      const status = response.status;
      //const data = await response.json();
      if (response.ok) {
        commit(types.REMOVE_MYAPI_OK, { status, obj_id } )
      } else {
        // TODO: ??
      }
      return { status, obj_id };
    }
  }
}

export default myapi