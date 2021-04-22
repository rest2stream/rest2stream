import { useStore } from 'vuex'
import types from '../store/types'


export default function useMyApi() {

  const store = useStore()
  const create = async (obj) => await store.dispatch(`myapi/${types.CREATE_MYAPI}`, obj);
  const fetch = async() => await store.dispatch(`myapi/${types.FETCH_MYAPI}`);
  //const fetch_byid = async (obj_id) => await store.dispatch(`myapi/${types.FETCH_MYAPI}`, obj_id);

  const get = (obj_id) => {
    let temp1 = JSON.parse(JSON.stringify(store.state.myapi));
    temp1 = temp1.myapi.filter(res => res.id == obj_id );
    return temp1 ? temp1[0] : {};
  }

  return {
    create,
    fetch,
    get
  }

}