<template>

  <div :class="divClass || styling.FormInput?.divClass || styling.divClass">
    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormInput?.labelClass || styling.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormInput?.labelClass || styling.labelClass"
      :for="id"
    >{{label}}</label>

    <input 
      :class="inputClass || styling.FormInput?.inputClass || styling.elementsClass"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span :class="validationClass || styling.FormInput?.validationClass || styling.validationClass" v-if="valMsg">{{valMsg}}</span>
    <span :class="helpClass || styling.FormInput?.helpClass || styling.helpClass" v-if="help && !valMsg">{{help}}</span>
  </div>

</template>

<script>
  import useForm  from '../../use/useForm';
  export default {
    name: "FormInput",
    props: {
      modelValue: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
      },
      help: {
        type: String
      },
      labelClass: {
        type: String
      },
      inputClass: {
        type: String
      },
      divClass: {
        type: String
      },
      validationClass: {
        type: String
      },
      helpClass: {
        type: String
      },
      validationCustom: {
        type: Object,
      },
      validationMessage: {
        type: Object
      },
    },
    setup(props) {
      const { valMsg, styling } = useForm(props);

      return {
        valMsg,
        styling
      }

    }
  }
</script>
