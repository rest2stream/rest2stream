<template>
  <form :class="css">

    <div :class="`${css}__name`">
      <FormInput
        id="Name"
        type="text"
        placeholder="Please enter text"
        v-model="frm.name"
      />
    </div>

    <div :class="`${css}__desc`">
      <FormInput
        id="Desc"
        type="text"
        placeholder="Please enter desc"
        v-model="frm.desc"
      />
    </div>

    <div :class="`${css}__url`">
      <FormInput
        id="Url"
        type="url"
        placeholder="Please enter valid url"
        v-model="frm.url"
      />
    </div>

    <div :class="`${css}__frequency`">
      <div>
        <FormInput
          id="Frequency"
          type="text"
          placeholder="Polling frequency"
          v-model="frm.frequency"
        />
      </div>
      <div>
        <FormSelect 
          v-model="frm.unit"
          id="Unit"
          :options="['mins', 'secs']"
        />
      </div>
    </div>
  </form>
</template>

<script>
  import { onMounted, ref, reactive } from 'vue';
  import useSite  from '../use/useSite';
  import { useRouter } from 'vue-router';
  import FormInput  from '../components/FormInput.vue';
  import FormSelect  from '../components/FormSelect.vue';
  export default {
    name: "MyApiEdit",
    components: {
      FormInput,
      FormSelect
    },
    setup() {
      const router = useRouter();
      const site = useSite();
      const css = ref('myapi-edit');
      const frm = reactive({
        name: "NBA Api",
        desc: "",
        url: "",
        frequency: "",
        unit: "mins"
      })

      onMounted(() => {
        site.setSite('Edit MyApi')
      })

      return {
        frm,
        css
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
    grid-template-areas: "name frequency"
                         "desc frequency"
                         "url frequency";
                         

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
    }
  }


</style>