<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <textarea 
      class="mdl-textfield__input"
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span v-if="validationMessage">{{validationMessage}}</span>
    <span v-if="help && !validationMessage">{{help}}</span>
  </div>

</template>

<script>
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
        validationMessage: {
          type: String
        },
      },
      setup(props) {

      }
  }
</script>
