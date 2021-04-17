<!--
  <FormMain 
    v-model="frm" 
    :elements-styling="{ 
      divClass: 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label',
      labelClass: 'mdl-textfield__label',
      elementsClass: 'mdl-textfield__input',
      validationClass: 'mdl-textfield__error',
      helpClass: 'help_text',
    }"
    :validation-message="{
      patternMismatch: 'patternMismatch mismsatch???',
      valueMissing: 'Missing value custom message',
      badInput: 'Whats your Custom message??',
      customError: 'Custom message',
      patternMismatch: '',
      rangeOverflow: '',
      rangeUnderflow: '',
      stepMismatch: '',
      tooLong: '',
      tooShort: '',
      typeMismatch: '',
      valueMissing: '',
    }"
    #default="{ isValid }" 
  >
  </FormMain>
-->
<template>
  <form  
    ref="frm" 
    novalidate
  >
  <slot :isValid="isValid"/>
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
      elementsStyling: {
        type: Object,
      },
      validationMessage: {
        type: Object,
      },
    },
    setup(props) {
      const isValid = ref(false);
      const validationMessage = ref({}) //not able to set using reactive? need to further study
      const frm = ref(null)
      provide('__frmMain', { 
        form: props.modelValue, 
        validity: validationMessage, 
        styling: props.elementsStyling, 
      })

      const setCustomValidationMsg = (element) => {
        // set custom validation message
        if (props.validationMessage) {
          for (const [k, v] of Object.entries(props.validationMessage)) { 
            if (element.validity[k]) {
              validationMessage.value[element.id] = v;
              return;
            }
          }
        }
        // set custom validation message
      }

      const validateForm = () => {
          //HTMLFormControlCollection does not have forEach
          let hasErrors = false;
          validationMessage.value = {};

          //console.log(props.validationMessage)
          //console.log(frm)
          Array.prototype.forEach.call(frm._value.elements, function(element) {
            //element.setCustomValidity('afgag')
            if (!element.checkValidity()) {
              hasErrors = true
              //console.log(element.id);
              //console.log(element.validationMessage);
              //console.log(element.validity);

              setCustomValidationMsg(element);

              if (!validationMessage.value[element.id]) {
                validationMessage.value[element.id] = element.validationMessage;
              }
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