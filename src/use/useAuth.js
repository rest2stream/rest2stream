
import { useStore } from 'vuex'
import types from '../store/types'

export default function useAuth() {

  const store = useStore()
  const login = async (obj) => await store.dispatch(`auth/${types.LOGIN_REQUEST}`, obj);
  const logout = () =>  store.commit(`auth/${types.LOGOUT}`);
  const getUser = async () => await store.dispatch(`auth/${types.GET_USER_INFO}`);

  return {
    login,
    logout,
    getUser
  }

}