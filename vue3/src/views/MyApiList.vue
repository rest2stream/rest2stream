<template>

  <div :class="`${css} mdl-typography--h6`">
    <div :class="`${css}__name`"><strong>Name</strong></div>
    <div :class="`${css}__url`"><strong>Url</strong></div>
    <div :class="`${css}__frequency`"><strong>Polling Frequency</strong></div>
    <div :class="`${css}__action`"><strong>Action</strong></div>
    <div :class="`${css}__row-border`"></div>
    <template v-for="api in listOfApi">
      <div :class="`${css}__name`"><a href="">{{api.name}}</a></div>
      <div :class="`${css}__url`">{{api.url}}</div>
      <div :class="`${css}__frequency`">{{api.polling_frequency}} {{api.polling_unit}}</div>
      <div :class="`${css}__action`">
        <!-- Icon button -->
        <button @click="goEdit(api.id)" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">edit</i>
        </button>
        <!-- Colored icon button -->
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </template>
  </div>

</template>


<script>
  import { onMounted, reactive, ref, computed } from 'vue';
  import useSite  from '../use/useSite';
  import useMyApi  from '../use/useMyApi';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  export default {
    name: "MyApiList",
    setup() {
      const css = ref('myapi-list')
      const listOfApi = computed(() => store.state.myapi.myapi);
      //const listOfApi = reactive([
      //  { id: 1, name: "NBA Sport Api", url: "https://api-sports/api/api-nba", polling_frequency: 5, polling_unit: "min."},
      //  { id: 2, name: "API Football", url: "https://rapidapi.com/api-sports/api/api-football", polling_frequency: 5, polling_unit: "secs."}
      //])

      const site = useSite();
      const myapi = useMyApi();
      const router = useRouter();
      const store = useStore();

      const goEdit = (id) => {
        router.push({ name: 'myapi-edit', params: { id: id } })
      }


      onMounted(() => {
        site.setSite('MyApi');
        myapi.fetch();
      })

      return {
        listOfApi,
        goEdit,
        css,
        store
      }

    }
  }

</script>

<style lang="scss">

  .myapi-list {
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