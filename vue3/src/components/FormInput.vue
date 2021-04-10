<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <input 
      class="mdl-textfield__input"
      :type="type" 
      :id="id" 
      :placeholder="placeholder"
      :value="modelValue"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    >

    <span v-if="help">{{help}}</span>
  </div>

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
        },
        required: {
          type: Boolean
        }
      },
      setup(props) {

      }
  }
</script>
