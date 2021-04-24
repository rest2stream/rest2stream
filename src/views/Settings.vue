<template>
</template>

<script>
  import { onMounted } from 'vue'
  import useSite  from '../use/useSite';
  export default {
    name: "Settings",
    setup() {
      const site = useSite();
      site.setSite('Settings')
    }
  }
</script>