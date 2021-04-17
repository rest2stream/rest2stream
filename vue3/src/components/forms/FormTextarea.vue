<template>

  <div :class="divClass || styling.FormTextarea?.divClass || styling.divClass">
    <label 
      v-if="id && !label" 
      :class="labelClass || styling.FormTextarea?.labelClass || styling.labelClass"
      :for="id"
    >{{id}}</label>

    <label 
      v-if="id && label" 
      :class="labelClass || styling.FormTextarea?.labelClass || styling.labelClass"
      :for="id"
    >{{label}}</label>

    <textarea 
      :class="textareaClass || styling.FormTextarea?.textareaClass || styling.elementsClass"
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span :class="validationClass || styling.FormTextarea?.validationClass || styling.validationClass" v-if="valMsg">{{valMsg}}</span>
    <span :class="helpClass || styling.FormTextarea?.helpClass || styling.helpClass" v-if="help && !valMsg">{{help}}</span>
  </div>

</template>

<script>
  import { inject, watch, toRefs, ref, computed } from 'vue';
  export default {
      name: "FormTextarea",
      props: {
        modelValue: {
          type: String,
          required: true
        },
        id: {
          type: String,
          required: true,
        },
        rows: {
          type: Number,
          default: 4
        },
        cols: {
          type: Number,
          default: 30
        },
        label: {
          type: String
        },
        help: {
          type: String
        },
        labelClass: {
          type: String
        },
        textareaClass: {
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
