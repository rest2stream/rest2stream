<template>
  <FormMain 
    :class="css" 
    v-model="frm" 
    #default="{ isValid }" 
  >
  {{frm}}

  {{store.state.myapi}}

    <div :class="`${css}__name`">
      <FormInput
        id="name"
        label="Name"
        type="text"
        placeholder="Please enter text"
        v-model="frm.name"
        required
      />
    </div>

    <div :class="`${css}__desc`">
      <FormInput
        id="desc"
        label="Desc"
        type="text"
        placeholder="Please enter desc"
        v-model="frm.description"
      />
    </div>

    <div :class="`${css}__url`">
      <FormInput
        id="url"
        label="Url"
        type="url"
        placeholder="Please enter valid url"
        v-model="frm.url"
      />
    </div>

    <div :class="`${css}__frequency`">
      <div>
        <FormInput
          id="frequency"
          label="Frequency"
          type="text"
          placeholder="Polling frequency"
          v-model="frm.polling_frequency"
        />
      </div>
      <div>
        <FormSelect 
          v-model="frm.polling_unit"
          id="unit"
          :options="{ hours : 'hours', minutes: 'minutes', seconds: 'seconds' }"
          help="This is a test"
        />
      </div>
    </div>

    <div :class="`${css}__headers`">
      <FormTextarea
        v-model="frm.http_headers"
        id="headers"
        label="HTTP Headers"
        placeholder="Add Multiple HTTP headers in json format"
        help="example: { Authorization: 'Basic AfgasdwQDU1dzByYM==' }"
      />
    </div>

    <div :class="`${css}__query_params`">
      <FormTextarea
        v-model="frm.query_params"
        id="query_params"
        label="Query Params"
        placeholder="Add Multiple Query params in json format"
        help="example: { token : 'yzkg' }"
      />
    </div>

    <div :class="`${css}__button`">
      <button @click.prevent="create()" :disabled="!isValid" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        Save
      </button>
    </div>
  </FormMain>
</template>

<script>
  import { onMounted, ref, reactive } from 'vue';
  import useSite  from '../use/useSite';
  import useMyApi  from '../use/useMyApi';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { 
      FormInput, 
      FormSelect, 
      FormTextarea, 
      FormMain 
  } from '../components/forms';
  export default {
    name: "MyApiEdit",
    components: {
      FormInput,
      FormSelect,
      FormTextarea,
      FormMain
    },
    setup() {
      const router = useRouter();
      const site = useSite();
      const myapi = useMyApi();
      const store = useStore();
      const css = ref('myapi-edit');
      const frm = reactive({
        name: "NBA Api",
        description: "",
        url: "",
        polling_frequency: "",
        polling_unit: "minutes",
        http_headers: "",
        query_params: ""
      })
      const create = () => {
        myapi.create(frm)
        console.log(frm)
      }

      onMounted(() => {
        site.setSite('Edit MyApi')
      })

      return {
        frm,
        css,
        create,
        store
      }
    }
  }
</script>

<style lang="scss" scoped>

  .myapi-edit {
    display: grid;
    padding: 2rem;
    gap: 2rem;
    grid-template-columns: auto 300px;
    grid-template-areas: "name headers"
                         "desc headers"
                         "url query_params"
                         "frequency query_params"
                         "frequency button";
                         

    &__name {        
      grid-area: name;
    }

    &__desc {
      grid-area: desc;
    }

    &__url {
      grid-area: url;
    }

    &__frequency {
      grid-area: frequency;
      display: grid;
      gap: 1rem;
      grid-template-columns: auto 100px;
      justify-content: left;
    }

    &__headers {
      grid-area: headers;
    }

    &__query_params {
      grid-area: query_params;
    }

    &__button {
      grid-area: button;
      justify-self: right;
    }
  }


</style>