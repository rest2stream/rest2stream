<template>

    <label 
      v-if="id && !label" 
      :class="label_class"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="label_class"
      :for="id"
    >{{label}}</label>

    <textarea 
      :class="textarea_class"
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help && !validationMessage">{{help}}</span>

</template>

<script>
  import { inject, watchEffect, ref } from 'vue'
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
        label_class: {
          type: String
        },
        textarea_class: {
          type: String
        },
        //validationMessage: {
        //  type: String
        //},
      },
      setup(props) {
        const frm = inject('__frmMain');
        let validationMessage = ref('');

        watchEffect(() => {
          validationMessage.value = frm.validity.value[props.id];
          //console.log(frm.validity.value[props.id], props.id);
        })

        return {
          validationMessage
        }

      }
  }
</script>
