<template>

  <label 
    class="frm-label" 
    :for="id"
  >{{label}}</label>

  <select 
    class="frm-select"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option 
      v-for="(name, value) in options" :value="value"
    >{{name}}</option>
  </select>

  <span v-if="help">{{help}}</span>
  

</template>

<script>
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
        type: String,
        required: true
      },
      options: {
        type: Object
      },
      help: {
        type: String
      }
    },
    setup() {

    }
  }
</script>

