import { useStore } from 'vuex'
import types from '../store/types'

export default function useMyApi() {

  const store = useStore()
  const create = (obj) => store.dispatch(`myapi/${types.CREATE_MYAPI}`, obj);
  const fetch = () => store.dispatch(`myapi/${types.FETCH_MYAPI}`);

  return {
    create,
    fetch
  }

}