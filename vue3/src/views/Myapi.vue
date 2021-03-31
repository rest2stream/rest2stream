<template>

  <div class="myapi-grid mdl-typography--h6">
    <div class="myapi-grid__name"><strong>Name</strong></div>
    <div class="myapi-grid__url"><strong>Url</strong></div>
    <div class="myapi-grid__frequency"><strong>Polling Frequency</strong></div>
    <div class="myapi-grid__row-border"></div>
    <template v-for="api in listOfApi">
      <div class="myapi-grid__name"><a href="">{{api.name}}</a></div>
      <div class="myapi-grid__url">{{api.url}}</div>
      <div class="myapi-grid__frequency">{{api.polling_frequency}} {{api.polling_unit}}</div>
    </template>
  </div>

</template>


<script>
  import { onMounted, reactive } from 'vue';
  import useSite  from '../use/useSite';
  export default {
    name: "MyApi",
    setup() {
      const listOfApi = reactive([
        { name: "NBA Sport Api", url: "https://api-sports/api/api-nba", polling_frequency: 5, polling_unit: "min."},
        { name: "API Football", url: "https://rapidapi.com/api-sports/api/api-football", polling_frequency: 5, polling_unit: "secs."}
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

<style lang="scss">

  .myapi-grid {
    display: grid;
    padding: 1rem;
    grid-template-columns: 150px auto 100px;
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

    &__row-border{
      border-top: 1px solid #ecebeb;
      grid-column: 1 / 4; /* this code makes the row stretch to entire width of the container */
    }

  }



</style>