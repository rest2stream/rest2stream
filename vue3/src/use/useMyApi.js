import { useStore } from 'vuex'
import types from '../store/types'
import _ from 'lodash';


export default function useMyApi() {

  const store = useStore()
  const create = async (obj) => await store.dispatch(`myapi/${types.CREATE_MYAPI}`, obj);
  const fetch = async() => await store.dispatch(`myapi/${types.FETCH_MYAPI}`);
  //const fetch_byid = async (obj_id) => await store.dispatch(`myapi/${types.FETCH_MYAPI}`, obj_id);
  const refetch = async(obj_id) => {
    let data = await fetch();
    data = _.cloneDeep(data)
    data = data.filter(res => res.id == obj_id);
    return data
  }

  const get = async (obj_id) => {
    let temp1 = _.cloneDeep(store.state.myapi);
    temp1 = temp1.myapi.filter(res => res.id == obj_id );
    if (temp1.length == 0) { // if not yet loaded to store
      temp1 = await refetch(obj_id);
      //temp1 = JSON.parse(sessionStorage.getItem('myapi')
    }
    return temp1 ? temp1[0] : {};
  }

  return {
    create,
    fetch,
    get
  }

}