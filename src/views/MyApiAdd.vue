<template>
  <MyApi
    mode="add"
    title="Add Myapi"
  />
</template>

<script>
  import { 
      MyApi, 
  } from '@/components/forms';
  export default {
    name: "MyApiAdd",
    components: {
      MyApi,
    },
    async setup() {
    }
  }
</script>
