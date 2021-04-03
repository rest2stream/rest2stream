<template>

    <label 
      class="frm-label" 
      :for="id"
    >{{id}}</label>

    <input 
      class="frm-input" 
      :type="type" 
      :id="id" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
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
        type: {
          type: String,
          required: true,
        },
        placeholder: { 
          type: String,
        }
      },
      setup(props) {

      }
  }
</script>
