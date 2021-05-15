<template>    
    <teleport to="body">
    <div class="mdc-snackbar">
        <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
        <div class="mdc-snackbar__label" aria-atomic="false">
            {{label}}
        </div>
        <div class="mdc-snackbar__action">
            <button class="mdc-icon-button mdc-snackbar__dismiss material-icons" title="Dismiss">
            close
            </button>
        </div>
        </div>
    </div>
    </teleport>
</template>

<script>
  import { onMounted, watch } from 'vue';
  export default {
    props: {
      label: {
        type: String,
        required: true
      }
    },
    setup() {
      onMounted(() => {
      })

      const open = () => {
        const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
        snackbar.open();
      }

      return {
        open
      }

    }
  }
</script>