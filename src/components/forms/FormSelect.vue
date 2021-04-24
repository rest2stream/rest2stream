<template>

  <div :class="divClass || styling.FormSelect?.divClass || styling.divClass">
    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormSelect?.labelClass || styling.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormSelect?.labelClass || styling.labelClass"
      :for="id"
    >{{label}}</label>

    <select 
      :class="selectClass || styling.FormSelect?.selectClass || styling.elementsClass"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >
      <option 
        v-for="(name, value) in options" :value="value"
      >{{name}}</option>
    </select>

    <span :class="validationClass || styling.FormSelect?.validationClass || styling.validationClass" v-if="valMsg">{{valMsg}}</span>
    <span :class="helpClass || styling.FormSelect?.helpClass || styling.helpClass" v-if="help && !valMsg">{{help}}</span>
  </div>
  

</template>

<script>
  import { useForm, props1 }  from '../../use/useForm';
  export default {
    name: "FormSelect",
    props: props1,
    setup(props) {
      const { valMsg, styling } = useForm(props);

      return {
        valMsg,
        styling
      }
    }
  }
</script>

