<template>
  <MDCForm 
    v-model="frm" 
    #default="{ isValid }" 
  >
    <div class="quicktest">
      <div class="quicktest__target">
        <MDCTextField
            id="TargetURL"
            label="Target URL"
            type="url"
            v-model="frm.target_url"
            required
        />
      </div>
  
      <div class="quicktest__try">
        <MDCTextField
            id="TryInConsole"
            label="Try In Console"
            type="text"
            v-model="frm.try_console"
            readonly
            help="Copy and paste to your console"
        />
      </div>
    </div>
  </MDCForm>

</template>
<script>
import { ref, onMounted, computed, watchEffect } from 'vue';
import {
  MDCTextField,
  MDCForm
} from '@/components/forms';
import useSite  from '@/use/useSite';
export default {
  name: "QuickTest",
  components: {
    MDCTextField,
    MDCForm
  },
  setup() {
    const site = useSite();
    const frm = ref({
      target_url: '',
      try_console: ''
    });

    watchEffect(() => {
      frm.value.try_console = `curl -v "${import.meta.env.VITE_STREAM_URL}/${frm.value.target_url}"`
    })

    onMounted(() => {
      site.set('Quick Test')
    })

    return {
      frm,
    }
  }
}
</script>
<style lang="scss" scoped>
  .quicktest {
    display:grid;
    gap:2rem;
    padding:2rem;
  }
</style>