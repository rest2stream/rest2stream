<template>

  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <label 
      class="mdl-textfield__label"
      :for="id"
    >{{label}}</label>

    <select 
      class="mdl-textfield__input"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option 
        v-for="(name, value) in options" :value="value"
      >{{name}}</option>
    </select>

    <span v-if="help">{{help}}</span>
  </div>
  

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
        type: String
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

