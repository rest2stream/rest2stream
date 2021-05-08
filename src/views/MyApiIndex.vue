<template>
  <router-view></router-view>
</template>


<script>
  import { useStore } from 'vuex';
  import useMyApi  from '@/use/useMyApi';
  export default {
    name: "MyApiIndex",
    async setup() {
      const myapi = useMyApi();
      await myapi.fetch()
    }
  }

</script>
