<template>
  <router-view></router-view>
</template>


<script>
  import { onMounted, reactive } from 'vue';
  import useSite  from '../use/useSite';
  import { useRouter } from 'vue-router';
  export default {
    name: "MyApiIndex",
    setup() {

    }
  }

</script>

<style lang="scss">

  .myapi-grid {
    display: grid;
    padding: 1rem;
    grid-template-columns: 150px auto 100px 100px;
    align-items: center;

    &__name {
      padding: 1rem;
    }

    &__url {
      padding: 1rem;
    }
    
    &__frequency {
      padding: 1rem;
      width:100%;
      display:grid;
      justify-content: center;
    }

    &__action {
      padding: 1rem;
    }

    &__row-border{
      border-top: 1px solid #ecebeb;
      grid-column: 1 / 5; /* this code makes the row stretch to entire width of the container */
    }

  }

</style>