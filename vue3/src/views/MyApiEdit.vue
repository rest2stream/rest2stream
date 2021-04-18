<template>
  <FormMain 
    v-model="frm" 
    :elements-styling="{ 
      divClass: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
      labelClass: 'mdl-textfield__label',
      elementsClass: 'mdl-textfield__input',
      validationClass: 'validation_error',
      helpClass: 'help_text',
    }"
    #default="{ isValid }" 
  >
    <div :class="css">
      <!-- {{frm}}
      {{store.state.myapi}} -->
      <!-- how to add individual custom validation?
          :validation-custom="{
            foundElle: (value) => ['elle'].includes(value)
          }"
          :validation-message="{
            foundElle: 'Oh no! message contains Elle??'
          }" -->

        <FormInput
          :class="`${css}__name`"
          id="Name"
          type="text"
          placeholder="Please enter text"
          v-model="frm.name"
          required
        />

        <FormInput
          :class="`${css}__desc`"
          id="Desc"
          type="text"
          placeholder="Please enter desc"
          v-model="frm.description"
        />

        <FormInput
          :class="`${css}__url`"
          id="Url"
          type="url"
          placeholder="Please enter valid url"
          v-model="frm.url"
          required
        />

        <div :class="`${css}__frequency`">
          <div>
            <FormInput
              id="Frequency"
              type="number"
              placeholder="Polling frequency"
              v-model="frm.polling_frequency"
              min="1"
              required
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

        <FormTextarea
          :class="`${css}__headers`"
          v-model="frm.http_headers"
          id="headers"
          label="HTTP Headers"
          placeholder="Add Multiple HTTP headers in json format"
          help="example: { Authorization: 'Basic AfgasdwQDU1dzByYM==' }"
        />

        <FormTextarea
          :class="`${css}__query_params`"
          v-model="frm.query_params"
          id="query_params"
          label="Query Params"
          placeholder="Add Multiple Query params in json format"
          help="example: { token : 'yzkg' }"
        />

        <div :class="`${css}__button`">
          <button @click.prevent="create()" :disabled="!isValid" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Save
          </button>
        </div>
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

    
      //const styling = reactive({ 
      //  FormInput: {
      //    labelClass: 'mdl-textfield__label',
      //    inputClass: 'mdl-textfield__input'
      //  },
      //  FormTextarea: {
      //    labelClass: 'mdl-textfield__label',
      //    textareaClass: 'mdl-textfield__input'
      //  }
      //});

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
        store,
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