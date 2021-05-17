<template>

  <label class="mdc-text-field mdc-text-field--filled mdc-text-field--textarea">
  <span class="mdc-floating-label" id="my-label-id">{{label || id}}</span>
  <span class="mdc-text-field__ripple"></span>
  <span class="mdc-text-field__resizer">
    <textarea 
      class="mdc-text-field__input" 
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)">
    </textarea>
    <span class="mdc-line-ripple"></span>
  </span>
  <div class="mdc-text-field-helper-line">
    <div v-if="valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="username-helper-text" role="alert">{{valMsg}}</div>
    <div v-if="help && !valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent" id="username-helper-text" aria-hidden="true">{{help}}</div>
    <div v-if="$attrs.maxlength" class="mdc-text-field-character-counter">0 / {{$attrs.maxlength}}</div>
  </div>
</label>


</template>

<script>
  import { useForm, props1 }  from '../../use/useForm';
  export default {
      name: "MDCTextArea",
      props: props1,
      setup(props, { attrs }) {
        const { valMsg, styling } = useForm(props);

        return {
          valMsg,
          styling
        }
      }
  }
</script>
