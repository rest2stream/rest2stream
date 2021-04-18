<template>

  <div :class="divClass || styling.FormTextarea?.divClass || styling.divClass">
    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormTextarea?.labelClass || styling.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormTextarea?.labelClass || styling.labelClass"
      :for="id"
    >{{label}}</label>

    <textarea 
      :class="textareaClass || styling.FormTextarea?.textareaClass || styling.elementsClass"
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span :class="validationClass || styling.FormTextarea?.validationClass || styling.validationClass" v-if="valMsg">{{valMsg}}</span>
    <span :class="helpClass || styling.FormTextarea?.helpClass || styling.helpClass" v-if="help && !valMsg">{{help}}</span>
  </div>

</template>

<script>
  import useForm  from '../../use/useForm';
  export default {
      name: "FormTextarea",
      props: {
        modelValue: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true,
        },
        rows: {
          type: Number,
          default: 4
        },
        cols: {
          type: Number,
          default: 30
        },
        label: {
          type: String
        },
        help: {
          type: String
        },
        labelClass: {
          type: String
        },
        textareaClass: {
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
