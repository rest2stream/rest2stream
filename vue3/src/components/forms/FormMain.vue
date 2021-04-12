<template>
    {{modelValue}} 
  <form  
    ref="frm" 
    novalidate
  >
    <slot :is_valid="isValid"/>
  </form>
</template>

<script>
  import _ from 'lodash';
  import { onMounted, ref, watch  } from 'vue'
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
      let isValid = ref(false);
      const frm = ref(null)

      const validateForm = () => {
          //HTMLFormControlCollection does not have forEach
          let hasErrors = false;
          Array.prototype.forEach.call(frm._value.elements, function(element) {
            console.log(element.validity.valid);
            if (!element.validity.valid) {
              hasErrors = true
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
      }
    }
  }
</script>