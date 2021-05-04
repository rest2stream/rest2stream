
import http from '../../http'
import types from '../types'

const myapi = {
  namespaced: true,
  state: {
    myapi: [],
  },
  mutations: {
    [types.CREATE_MYAPI](state, obj) {
        state.myapi.push(obj)
    },
    [types.FETCH_MYAPI](state, obj) {
        state.myapi = obj;
        //sessionStorage.setItem('myapi', JSON.stringify(obj))
    },
    [types.REMOVE_MYAPI](state, obj_id) {
      state.myapi = state.myapi.filter(res => res.id != obj_id)
    },
  },
  actions: {
    async [types.CREATE_MYAPI]({ commit }, obj) {
      const url = 'http://localhost:8000/myapi/create';
      const data = await http.post(url, obj);
      //console.log('Success:', data);
      commit(types.CREATE_MYAPI, data)
      return data
    },
    async [types.FETCH_MYAPI]({ commit } ) {
      const url = "http://localhost:8000/myapi/list";
      const data = await http.get(url)
      commit(types.FETCH_MYAPI, data)
      //console.log('Success:', data);
      return data
    },
    async [types.REMOVE_MYAPI]({ commit }, obj_id ) {
      const url = `http://localhost:8000/myapi/${obj_id}`;
      const data = await http.post(url, {}, 'DELETE')
      commit(types.REMOVE_MYAPI, obj_id)
      //console.log('Removed:', obj_id);
      return data
    }
  }
}

export default myapi