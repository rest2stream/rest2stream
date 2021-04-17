<template>

    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormInput?.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormInput?.labelClass"
      :for="id"
    >{{label}}</label>

    <input 
      :class="inputClass || styling.FormInput?.inputClass"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help && !validationMessage">{{help}}</span>

</template>

<script>
  import { inject,  watchEffect, ref, computed } from 'vue'
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
        //validationMessage: {
        //  type: String
        //},
      },
      setup(props) {
        const frm = inject('__frmMain');
        let validationMessage = ref('');
        const styling = computed(() => frm.styling)

        console.log(styling)

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
