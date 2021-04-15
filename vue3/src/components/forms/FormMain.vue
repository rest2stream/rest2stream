<template>
  <form  
    ref="frm" 
    novalidate
  >
    <slot :isValid="isValid" :validationMessage="validationMessage"/>
  </form>
</template>

<script>
  import _ from 'lodash';
  import { onMounted, ref, watch, provide  } from 'vue'
  export default {
    name: "FormMain",
    props: {
      modelValue: {
        type: Object,
        required: true
      },
      class: {
        type: String,
      },
    },
    setup(props) {
      const isValid = ref(false);
      const validationMessage = ref({}) //not able to set using reactive? need to further study
      const frm = ref(null)
      provide('__frmMain', { form: props.modelValue, validity: validationMessage })

      const validateForm = () => {
          //HTMLFormControlCollection does not have forEach
          let hasErrors = false;
          validationMessage.value = {};
          //console.log(frm)
          Array.prototype.forEach.call(frm._value.elements, function(element) {
            if (!element.validity.valid) {
              hasErrors = true
              //console.log(element.id);
              //console.log(element.validationMessage);
              //console.log(element.validity);
              validationMessage.value[element.id] = element.validationMessage;
              //console.log(validationMessage.value)
            }
            isValid.value = !hasErrors;
          });
      }

      onMounted(() => {
        validateForm()
      })

      watch( 
        () => _.cloneDeep(props.modelValue),
        () => validateForm()
      )

      return {
        frm,
        isValid,
        validationMessage
      }
    }
  }
</script>