<template>

  <div v-for="api in listOfApi">
    {{api.url}} - {{api.frequency}}
  </div>

</template>


<script>
  import { ref, reactive, computed, watch } from 'vue';
  import { useStore } from 'vuex'
  import types from '../store/types'
  export default {
    name: "MyApi",
    setup() {
      const listOfApi = reactive([
        { url: "https://github.com/tortoise/tortoise-orm", frequency: 5},
        { url: "https://github.com/tiangolo/fastapi/", frequency: 5}
      ])

      const store = useStore();
      store.commit(`site/${types.SET_PAGE_HEADER}`, 'MyApi')

      return {
        listOfApi
      }

    }
  }

</script>
