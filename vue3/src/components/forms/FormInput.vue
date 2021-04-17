<template>

  <div :class="divClass || styling.FormInput?.divClass || styling.divClass">
    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormInput?.labelClass || styling.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormInput?.labelClass || styling.labelClass"
      :for="id"
    >{{label}}</label>

    <input 
      :class="inputClass || styling.FormInput?.inputClass || styling.elementsClass"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <span :class="validationClass || styling.FormInput?.validationClass || styling.validationClass" v-if="valMsg">{{valMsg}}</span>
    <span :class="helpClass || styling.FormInput?.helpClass || styling.helpClass" v-if="help && !valMsg">{{help}}</span>
  </div>

</template>

<script>
  import { watch, onMounted, inject,  toRefs, ref, computed } from 'vue'
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
        },
        help: {
          type: String
        },
        labelClass: {
          type: String
        },
        inputClass: {
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
