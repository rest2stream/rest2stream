<template>
{{frm}}
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
    <div class="myapi-edit">
      <!-- {{frm}}
      {{store.state.myapi}} -->
      <!-- how to add individual custom validation?
          :validation-custom="{
            foundElle: (value) => ['elle'].includes(value)
          }"
          :validation-message="{
            foundElle: 'Oh no! message contains Elle??'
          }" -->

        <div class="myapi-edit__name">
          <FormInput
            id="Name"
            type="text"
            placeholder="Please enter text"
            v-model="frm.name"
            required
            help="zup"
          />
        </div>

        <div class="myapi-edit__desc">
          <FormInput
            id="Desc"
            type="text"
            placeholder="Please enter desc"
            v-model="frm.description"
          />
        </div>

        <div class="myapi-edit__url">
          <FormInput
            class="myapi-edit__url"
            id="Url"
            type="url"
            placeholder="Please enter valid url"
            v-model="frm.url"
            required
          />
        </div>

        <div class="myapi-edit__frequency">
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

        <div class="myapi-edit__headers">
          <FormTextarea
            v-model="frm.http_headers"
            id="headers"
            label="HTTP Headers"
            placeholder="Add Multiple HTTP headers in json format"
            help="example: { Authorization: 'Basic AfgasdwQDU1dzByYM==' }"
            maxlength="140"
            rows="5"
          />
        </div>

        <div class="myapi-edit__query_params">
          <FormTextarea
            v-model="frm.query_params"
            id="query_params"
            label="Query Params"
            placeholder="Add Multiple Query params in json format"
            help="example: { token : 'yzkg' }"
            maxlength="140"
            rows="5"
          />
        </div>

        <div class="myapi-edit__button">
          <button 
            @click.prevent="create()"
            :disabled="!isValid" 
            class="box__btn mdc-button mdc-button--raised">
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Save</span>
          </button>
        </div>
    </div>
  </FormMain>
</template>

<script>
  import { onMounted, ref, watchEffect } from 'vue';
  import useSite  from '@/use/useSite';
  import useMyApi  from '@/use/useMyApi';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import useMDC  from '@/use/useMDC';
  import { 
      FormInput, 
      FormSelect, 
      FormTextarea, 
      FormMain 
  } from '@/components/forms';
  export default {
    name: "MyApiEdit",
    components: {
      FormInput,
      FormSelect,
      FormTextarea,
      FormMain
    },
    async setup() {
      const route = useRoute();
      const router = useRouter();
      const site = useSite();
      const myapi = useMyApi();
      const mdc1 = useMDC();
      const store = useStore();
      const css = ref('myapi-edit');
      const frm = ref({
        name: "",
        description: "",
        url: "",
        polling_frequency: "",
        polling_unit: "minutes",
        http_headers: "",
        query_params: ""
      })

      onMounted(() => {
        mdc1.buttonInit();
        mdc1.textFieldInit();
      })

      const stop = watchEffect(async () => {
        const data = await myapi.get(route.params.id);
        if (data) {
          frm.value = data;
        }
      })
      
      stop(); // stop once data loaded

      onMounted(() => {
        site.set('Edit MyApi')
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


      const create = async () => {
        await myapi.create(frm.value)
        router.push({ name: 'myapi-list' })
        console.log(frm)
      }


      return {
        css,
        create,
        frm,
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
    grid-template-columns: 2fr 1.5fr;
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