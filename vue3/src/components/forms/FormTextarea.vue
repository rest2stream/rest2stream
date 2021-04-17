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
    <span :class="validationClass || styling.FormTextarea?.validationClass || styling.validationClass" v-if="validationMessage">{{validationMessage}}</span>
    <span :class="helpClass || styling.FormInput?.helpClass || styling.helpClass" v-if="help && !validationMessage">{{help}}</span>
  </div>

</template>

<script>
  import { inject, watchEffect, ref, computed } from 'vue'
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
        //validationMessage: {
        //  type: String
        //},
      },
      setup(props) {
        const frm = inject('__frmMain');
        let validationMessage = ref('');
        const styling = computed(() => frm.styling)

        watchEffect(() => {
          validationMessage.value = frm.validity.value[props.id];
          //console.log(frm.validity.value[props.id], props.id);
        })

        return {
          validationMessage,
          styling
        }

      }
  }
</script>
