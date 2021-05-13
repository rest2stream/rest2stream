<template>
  <div class="myapi-list mdc-typography--subtitle1">
    <div class="myapi-list__name"><strong>Name</strong></div>
    <div class="myapi-list__url"><strong>Url</strong></div>
    <div class="myapi-list__frequency"><strong>Polling Frequency</strong></div>
    <div class="myapi-list__action"><strong>Action</strong></div>
    <div class="myapi-list__row-border"></div>
    <template v-for="api in listOfApi">
      <div class="myapi-list__name">
        <router-link :to="{ name: 'myapi-edit', params: { id: api.id }}">{{api.name}}</router-link>
      </div>
      <div class="myapi-list__url">{{api.url}}</div>
      <div class="myapi-list__frequency">{{api.polling_frequency}} {{api.polling_unit}}</div>
      <div class="myapi-list__action mdc-typeography--button">
        <!-- Colored icon button -->
        <button @click="remove(api.id)" 
          class="u--red material-icons mdc-icon-button" 
          aria-label="Remove">remove_circle_outline
        </button>
      </div>
    </template>
  </div>

</template>


<script>
  import { onMounted, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import useMyApi  from '@/use/useMyApi';
  import useSite  from '@/use/useSite';
  export default {
    name: "MyApiList",
    async setup() {
      const listOfApi = computed(() => store.state.myapi.myapi);
      const store = useStore();
      const site = useSite();
      const myapi = useMyApi();

      onMounted(() => {
        site.set('MyApi');
      })

      // TODO: make sure use is log in first
      const remove = async (obj_id) => {
        await myapi.remove(obj_id);
      }

      return {
        listOfApi,
        store,
        remove
      }

    }
  }

</script>

<style lang="scss">

  .myapi-list {
    display: grid;
    padding: 1rem;
    grid-template-columns: 170px auto 200px 130px;
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
      justify-content: center;
      display: grid;
    }

    &__row-border{
      border-top: 1px solid #ecebeb;
      grid-column: 1 / 5; /* this code makes the row stretch to entire width of the container */
    }

  }

.u--red {
  color:red
}


</style>