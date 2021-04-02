<template>
</template>

<script>
  import { onMounted } from 'vue';
  import useSite  from '../use/useSite';
  import { useRouter } from 'vue-router';
  export default {
    name: "MyApiEdit",
    setup() {
      const router = useRouter();
      const site = useSite();
      console.log(router)
      onMounted(() => {
        site.setSite('Edit MyApi')
      })
    }
  }
</script>