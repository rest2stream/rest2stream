<template>
  <MDCForm 
    v-model="frm" 
    #default="{ isValid }" 
  >
    <div class="myapi">

        <div class="myapi__name">
          <MDCTextField
            id="Name"
            type="text"
            placeholder="Please enter text"
            v-model="frm.name"
            required
            help="zup"
          />
        </div>

        <div class="myapi__desc">
          <MDCTextField
            id="Desc"
            type="text"
            placeholder="Please enter desc"
            v-model="frm.description"
          />
        </div>

        <div class="myapi__url">
          <MDCTextField
            id="Url"
            type="url"
            placeholder="Please enter valid url"
            v-model="frm.url"
            required
          />
        </div>

        <div class="myapi__frequency">
          <div>
            <MDCTextField
              id="Frequency"
              type="number"
              placeholder="Polling frequency"
              v-model="frm.polling_frequency"
              min="1"
              required
            />
          </div>
          <div>
            <MDCSelect 
              v-model="frm.polling_unit"
              id="Unit"
              :options="{ hours : 'hours', minutes: 'minutes', seconds: 'seconds' }"
              help="This is a test"
              readonly
            />
          </div>
        </div>

        <div class="myapi__headers">
          <MDCTextArea
            v-model="frm.http_headers"
            id="headers"
            label="HTTP Headers"
            placeholder="Add Multiple HTTP headers in json format"
            help="example: { Authorization: 'Basic AfgasdwQDU1dzByYM==' }"
            maxlength="140"
            rows="5"
          />
        </div>

        <div class="myapi__query_params">
          <MDCTextArea
            v-model="frm.query_params"
            id="query_params"
            label="Query Params"
            placeholder="Add Multiple Query params in json format"
            help="example: { token : 'yzkg' }"
            maxlength="140"
            rows="5"
          />
        </div>

        <div class="myapi__button">
          <button 
            @click.prevent="createOrUpdate()"
            :disabled="!isValid" 
            class="box__btn mdc-button mdc-button--raised"
          >
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Save</span>
          </button>
        </div>
    </div>
  </MDCForm>

  <MDCSnackbar
    ref="snackRef"
    :label="snackLabel"
  />

</template>

<script>
  import { onMounted, ref, watchEffect } from 'vue';
  import useSite  from '@/use/useSite';
  import useMyApi  from '@/use/useMyApi';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { 
      MDCTextField, 
      MDCSelect, 
      MDCTextArea, 
      MDCForm,
      MDCSnackbar
  } from '@/components/forms';
  export default {
    name: "MyApi",
    components: {
      MDCTextField,
      MDCSelect,
      MDCTextArea,
      MDCForm,
      MDCSnackbar
    },
    props: {
      mode: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    async setup(props) {
      console.log(props)
      const route = useRoute();
      const router = useRouter();
      const site = useSite();
      const myapi = useMyApi();
      const store = useStore();
      const frm = ref({
        name: "",
        description: "",
        url: "",
        polling_frequency: "",
        polling_unit: "minutes",
        http_headers: "",
        query_params: ""
      });
      const snackLabel = ref('');
      const snackRef = ref(null);

      onMounted(() => {
        const buttons = document.querySelectorAll('.mdc-button');
        for (const button of buttons) {
          mdc.ripple.MDCRipple.attachTo(button);
          //new MDCRipple(button);
        }
      })

      if (props.mode == 'edit') {
        const stop = watchEffect(async () => {
          const data = await myapi.get(route.params.id);
          if (data) {
            frm.value = data;
          }
        })
        stop(); // stop once data loaded
      }
      
      onMounted(() => {
        site.set(props.title);
      })

      const createOrUpdate = async () => {
        let msg = '';

        if (props.mode == 'edit') { // edit 
          await myapi.update(route.params.id, frm.value); 
          msg = `${frm.value.name} has been updated!`;
        } else { // create
          await myapi.create(frm.value);
          msg = `${frm.value.name} has been created!`;
        }

        snackLabel.value = msg;
        snackRef.value.open();

        // add a delay to make Snackbar noticeable
        setTimeout(() => {
          router.push({ name: 'myapi-list' })
        }, 1000);
      }


      return {
        createOrUpdate,
        frm,
        store,
        snackLabel,
        snackRef
      }
    }
  }
</script>

<style lang="scss" scoped>

  .myapi {
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
      grid-template-columns: auto 200px;
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