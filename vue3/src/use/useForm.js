import { watch, onMounted, inject,  toRefs, ref, computed } from 'vue'

export default function useForm(props) {
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