import { watch, onMounted, inject,  toRefs, ref, computed } from 'vue'

export function useForm(props) {
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

export const props1 = {
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
      rows: {
        type: Number,
        default: 4
      },
      cols: {
        type: Number,
        default: 30
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