
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
  },
  actions: {
    async [types.CREATE_MYAPI]({ commit }, obj) {
      const url = 'http://localhost:8000/create-myapi';
      const data = await http.post(url, obj);
      //console.log('Success:', data);
      commit(types.CREATE_MYAPI, data)
      return data
    },
    async [types.FETCH_MYAPI]({ commit } ) {
      const url = "http://localhost:8000/list-myapi";
      const data = await http.get(url)
      commit(types.FETCH_MYAPI, data)
      //console.log('Success:', data);
      return data

    }
  }
}

export default myapi