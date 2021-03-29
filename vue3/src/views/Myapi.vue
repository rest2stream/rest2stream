<template>

  <div v-for="api in listOfApi">
    {{api.url}} - {{api.frequency}}
  </div>

</template>


<script>
  import { onMounted, reactive } from 'vue';
  import useSite  from '../use/useSite';
  export default {
    name: "MyApi",
    setup() {
      const listOfApi = reactive([
        { url: "https://github.com/tortoise/tortoise-orm", frequency: 5},
        { url: "https://github.com/tiangolo/fastapi/", frequency: 5}
      ])

      const site = useSite();

      onMounted(() => {
        site.setSite('MyApi')
      })

      return {
        listOfApi
      }

    }
  }

</script>
