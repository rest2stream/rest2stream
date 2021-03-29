import { useStore } from 'vuex'
import types from '../store/types'

export default function useSite() {

      const store = useStore()

      function setSite(header) {
        store.commit(`site/${types.SET_PAGE_HEADER}`, header)
      }

      return {
          setSite
      }

}