<template>
  <label class="mdc-text-field mdc-text-field--filled">
    <span class="mdc-text-field__ripple"></span>
    <span class="mdc-floating-label" id="my-label-id">{{label || id}}</span>
    <input 
      class="mdc-text-field__input"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span class="mdc-line-ripple"></span>
  </label>
  <div class="mdc-text-field-helper-line">
    <div v-if="valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="username-helper-text" role="alert">{{valMsg}}</div>
    <div v-if="help && !valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent" id="username-helper-text" aria-hidden="true">{{help}}</div>
  </div>

</template>

<script>
  import { onMounted } from 'vue';
  import { useForm, props1 }  from '@/use/useForm';
  export default {
    name: "MDCTextField",
    props: props1,
    setup(props) {
      const { valMsg } = useForm(props);

      onMounted(() => {
        const textFields = document.querySelectorAll('.mdc-text-field');
        for (const textField of textFields) {
          mdc.textField.MDCTextField.attachTo(textField);
          //new MDCTextField(textField);
        }
      })

      return {
        valMsg,
      }

    }
  }
</script>
