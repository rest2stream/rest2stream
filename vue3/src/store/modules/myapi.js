
import http from '../../http'
import types from '../types'

const myapi = {
  namespaced: true,
  state: {
    myapi: []
  },
  mutations: {
    [types.CREATE_MYAPI](state, obj) {
        state.myapi.push(obj)
    },
    [types.FETCH_MYAPI](state, obj) {
        state.myapi = obj;
    }
  },
  actions: {
    [types.CREATE_MYAPI]({ commit }, obj) {
      http.post('http://localhost:8000/create-myapi', obj).then(data => {
        console.log('Success:', data);
        commit(types.CREATE_MYAPI, data)
      })
    },
    [types.FETCH_MYAPI]({ commit }) {
      http.get('http://localhost:8000/list-myapi').then(data => {
        console.log('Success:', data);
        commit(types.FETCH_MYAPI, data)
      })
    }
  }
}

export default myapi