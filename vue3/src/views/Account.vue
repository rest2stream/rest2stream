<template>
</template>


<script>
  import { onMounted } from 'vue'
  import useSite  from '../use/useSite';
  export default {
    name: "Account",
    setup() {
      const site = useSite()
      onMounted(() => {
        site.setSite('MyApi')
      })
    }
  }
</script>
