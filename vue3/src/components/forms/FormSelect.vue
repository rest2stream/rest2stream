<template>

    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormSelect?.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormSelect?.labelClass"
      :for="id"
    >{{label}}</label>

    <select 
      :class="selectClass || styling.FormSelect?.selectClass"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option 
        v-for="(name, value) in options" :value="value"
      >{{name}}</option>
    </select>

    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help">{{help}}</span>
  

</template>

<script>
  import { inject, ref, computed, watchEffect } from 'vue';
  export default {
    name: "FormSelect",
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
        type: String
      },
      options: {
        type: Object
      },
      help: {
        type: String
      },
      selectClass: {
        type: String
      },
      labelClass: {
        type: String
      }
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

