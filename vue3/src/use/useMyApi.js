import { useStore } from 'vuex'
import types from '../store/types'

export default function useMyApi() {

  const store = useStore()

  function create(obj) {
    store.dispatch(`myapi/${types.CREATE_MYAPI}`, obj)
  }

  return {
    create
  }

}