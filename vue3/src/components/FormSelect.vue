<template>

  <label 
    class="frm-label" 
    :for="id"
  >{{id}}</label>

  <select 
    class="frm-select"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="opt in options">{{opt}}</option>
  </select>
  

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
      options: {
        type: Array
      }
    },
    setup() {

    }
  }
</script>

