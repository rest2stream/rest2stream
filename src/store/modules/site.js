import types from '../types'

const site = {
  namespaced: true,
  state: {
    page_header: null
  },
  mutations: {
    [types.SET_PAGE_HEADER](state, val) {
        state.page_header = val
    }
  }
}

export default site