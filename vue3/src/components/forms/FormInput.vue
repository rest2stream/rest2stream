<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <input 
      class="mdl-textfield__input"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :validation_message="validationMessage"
    >
    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help && !validationMessage">{{help}}</span>
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
        label: {
          type: String,
          required: true
        },
        help: {
          type: String
        },
        validationMessage: {
          type: String
        },
      },
      setup(props) {
      }
  }
</script>
