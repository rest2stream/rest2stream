
import { useStore } from 'vuex'
import types from '../store/types'

export default function useAuth() {

  const store = useStore()
  const login = async (obj) => await store.dispatch(`auth/${types.LOGIN_REQUEST}`, obj);

  return {
    login
  }

}