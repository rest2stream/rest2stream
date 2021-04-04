<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <textarea 
      class="mdl-textfield__input"
      :id="id" 
      :placeholder="placeholder"
      :rows="rows"
      :cols="cols"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <span v-if="help">{{help}}</span>
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
        rows: {
          type: Number,
          default: 4
        },
        cols: {
          type: Number,
          default: 30
        }
      },
      setup(props) {

      }
  }
</script>
