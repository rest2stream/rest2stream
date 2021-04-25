<template>

  <div :class="`${css} mdl-typography--h6`">
    <div :class="`${css}__name`"><strong>Name</strong></div>
    <div :class="`${css}__url`"><strong>Url</strong></div>
    <div :class="`${css}__frequency`"><strong>Polling Frequency</strong></div>
    <div :class="`${css}__action`"><strong>Action</strong></div>
    <div :class="`${css}__row-border`"></div>
    <template v-for="api in listOfApi">
      <div :class="`${css}__name`">
        <router-link :to="{ name: 'myapi-edit', params: { id: api.id }}">{{api.name}}</router-link>
      </div>
      <div :class="`${css}__url`">{{api.url}}</div>
      <div :class="`${css}__frequency`">{{api.polling_frequency}} {{api.polling_unit}}</div>
      <div :class="`${css}__action`">
        <!-- Colored icon button -->
        <button @click="remove(api.id)" class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </template>
  </div>

</template>


<script>
  import { onMounted, reactive, ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import useMyApi  from '../use/useMyApi';
  import useSite  from '../use/useSite';
  export default {
    name: "MyApiList",
    async setup() {
      const css = ref('myapi-list')
      const listOfApi = computed(() => store.state.myapi.myapi);
      const store = useStore();
      const site = useSite();
      const myapi = useMyApi();

      onMounted(() => {
        site.set('MyApi');
      })

      const remove = async (obj_id) => {
        await myapi.remove(obj_id);
      }

      return {
        listOfApi,
        css,
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