import { watch, onMounted, inject,  toRefs, ref, computed } from 'vue'

export function useForm(props) {
  const frm = inject('__frmMain');
  let valMsg = ref('');
  const styling = computed(() => frm.styling)
  const { modelValue } = toRefs(props)

  const setCustomRulesAndValMsg = (newVal) => {
    // only apply for individual custom validation msg
    if (props.validationCustom) {
      for (const [k, v] of Object.entries(props.validationMessage)) {
        if (props.validationCustom[k](newVal)) {
          valMsg.value = v
        }
      }
    }
  }

  const setValMsg = () => {
    valMsg.value = '';
    if (props.validationMessage && !props.validationCustom) {
      Array.prototype.forEach.call(frm.frm._value.elements, function(element) {
        for (const [k, v] of Object.entries(props.validationMessage)) {
          if (element.validity[k]) {
            //console.log(element.validity[k], k, v)
            valMsg.value = v
            return;
          }
        }
      })
    }
    if (!valMsg.value) {
      //console.log(props.id, frm.validity.value[props.id], props.modelValue)
      valMsg.value = frm.validity.value[props.id];
    }
  }

  watch(frm.validity, (newVal, oldVal) => {
    setValMsg()
  }) 

  watch(modelValue, (newVal, oldVal) => {
    setCustomRulesAndValMsg(newVal);
  })

  return {
    valMsg,
    styling
  }

}

export const props1 = {
      modelValue: {
        type: [String, Number],
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
      textareaClass: {
        type: String
      },
      options: {
        type: Object
      },
      selectClass: {
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
      }
  }

  export default { props1, useForm }