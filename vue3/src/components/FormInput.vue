<template>

    <label 
      :for="id"
    >{{label}}</label>

    <input 
      class="frm-input" 
      :type="type" 
      :id="id" 
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >

    <span v-if="help">{{help}}</span>

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
        },
        label: {
          type: String,
          required: true
        },
        help: {
          type: String
        }
      },
      setup(props) {

      }
  }
</script>
