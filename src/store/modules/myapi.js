
//import http from '../../http'
import types from '../types'

const myapi = {
  namespaced: true,
  state: {
    myapi: [],
  },
  mutations: {
    [types.CREATE_MYAPI_OK](state, { status, data }) {
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
    async [types.CREATE_MYAPI]({ commit }, obj) {
      const response = await fetch(import.meta.env.VITE_MYAPI_CREATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    async [types.FETCH_MYAPI]({ commit } ) {
      const response = await fetch(import.meta.env.VITE_MYAPI_LIST_URL)
      const status = response.status;
      const data = await response.json();
      if (response.ok) {
        commit(types.FETCH_MYAPI_OK, { status, data })
      } else {
        // TODO: ??
      }
      return { status, data };
    },
    async [types.REMOVE_MYAPI]({ commit }, obj_id ) {
      const response = await fetch(`${import.meta.env.VITE_MYAPI_URL}/${obj_id}`, {
        method: 'DELETE'
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