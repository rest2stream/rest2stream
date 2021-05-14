<template>

  <label class="mdc-text-field mdc-text-field--filled">
    <span class="mdc-text-field__ripple"></span>
    <span class="mdc-floating-label" id="my-label-id">{{id}}</span>
    <input 
      class="mdc-text-field__input"
      v-bind="$attrs"
      :id="id" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="openMenu()"
    >
    <i @click="openMenu()" class="material-icons mdc-text-field__icon mdc-text-field__icon--leading" tabindex="0" role="button">arrow_drop_down</i>
    <span class="mdc-line-ripple"></span>
  </label>
    <div class="mdc-menu-surface--anchor">
      <div :class="`${id} mdc-menu mdc-menu-surface width-100`">
        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
          <li 
            class="mdc-list-item" 
            role="option"
            v-for="(name, value) in options" :value="value"
            tabindex="0"
            @click="selectList(name)"
          >
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">{{name}}</span>
          </li>
        </ul>
      </div>
    </div>
  <div class="mdc-text-field-helper-line">
    <div v-if="valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg" id="username-helper-text" role="alert">{{valMsg}}</div>
    <div v-if="help && !valMsg" class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent" id="username-helper-text" aria-hidden="true">{{help}}</div>
  </div>


</template>

<script>
  import { useForm, props1 }  from '@/use/useForm';
  export default {
    name: "MDCSelect",
    props: props1,
    setup(props, { emit, attrs }) {
      const { valMsg, styling } = useForm(props);

      const openMenu = () => {
        const menu = mdc.menu.MDCMenu.attachTo(document.querySelector(`.${props.id}`));
        menu.open = true;
      }

      const selectList = (opt) => {
        emit('update:modelValue', opt);
      }

      return {
        valMsg,
        styling,
        openMenu,
        selectList
      }
    }
  }
</script>

<style lang="scss" scoped>

.width-100 {
  width: 100%;
}

</style>
