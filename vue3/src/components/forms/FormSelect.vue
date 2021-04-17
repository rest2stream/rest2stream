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
  import { inject, toRefs, ref, computed, watch } from 'vue';
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
      },
      selectClass: {
        type: String
      },
      labelClass: {
        type: String
      },
      divClass: {
        type: String
      },
      validationClass: {
        type: String
      },
      helpClass: {
        type: String
      },
      validationCustom: {
        type: Object,
      },
      validationMessage: {
        type: Object
      },
    },
    setup(props) {
      const frm = inject('__frmMain');
      let valMsg = ref('');
      const styling = computed(() => frm.styling)
      const { modelValue } = toRefs(props)

      const setCustomValMsgInput = (newVal) => {
        // only apply for individual custom validation msg
        if (props.validationCustom) {
          for (const [k, v] of Object.entries(props.validationMessage)) {
            if (props.validationCustom[k](newVal)) {
              valMsg.value = v
              console.log('select hours', v)
            }
          }
        }
      }

      watch(frm.validity, (newVal, oldVal) => {
        valMsg.value = frm.validity.value[props.id];
      }) 

      watch(modelValue, (newVal, oldVal) => {
        setCustomValMsgInput(newVal);
      })

      return {
        valMsg,
        styling
      }
    }
  }
</script>

