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
      const valMsg = ref({}) //not able to set using reactive? need to further study
      const frm = ref(null)
      provide('__frmMain', { 
        frm: frm, 
        validity: valMsg, 
        styling: props.elementsStyling, 
      })

      const setValidationMsg = (element) => {
        if (props.validationMessage) {
          // set local form custom validation message
          for (const [k, v] of Object.entries(props.validationMessage)) { 
            if (element.validity[k]) {
              valMsg.value[element.id] = v;
              return;
            }
          }
          // set local form custom validation message
        } else if (!valMsg.value[element.id]) {
          // use es6 form built in validation msg
          valMsg.value[element.id] = element.validationMessage;
        }
      }

      const validateForm = () => {
          //HTMLFormControlCollection does not have forEach
          let hasErrors = false;
          valMsg.value = {};

          //console.log(props.validationMessage)
          //console.log(frm)
          Array.prototype.forEach.call(frm._value.elements, function(element) {
            //element.setCustomValidity('afgag')
            if (!element.checkValidity()) {
              hasErrors = true
              //console.log(element.id);
              //console.log(element.validationMessage);
              //console.log(element.validity);

              setValidationMsg(element);

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
        valMsg
      }
    }
  }
</script>