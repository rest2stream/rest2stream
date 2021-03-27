<template>
</template>


<script>
  import { useStore } from 'vuex'
  import types from '../store/types'
  export default {
    name: "Account",
    setup() {
      const store = useStore()
      store.commit(`site/${types.SET_PAGE_HEADER}`, 'Account')
    }
  }
</script>
