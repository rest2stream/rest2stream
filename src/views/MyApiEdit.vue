<template>
  <MyApi
    mode="edit"
    title="Edit Myapi"
  />
</template>

<script>
  import { 
      MyApi, 
  } from '@/components/forms';
  export default {
    name: "MyApiEdit",
    components: {
      MyApi,
    },
    async setup() {
    }
  }
</script>
