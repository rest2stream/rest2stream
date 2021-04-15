<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      v-if="id && !label" 
      class="mdl-textfield__label"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <input 
      class="mdl-textfield__input"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help && !validationMessage">{{help}}</span>
  </div>

</template>

<script>
  import { inject,  watchEffect, ref } from 'vue'
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
