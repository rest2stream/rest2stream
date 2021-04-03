<template>

  <label 
    class="frm-label" 
    :for="id"
  >{{id}}</label>

  <select 
    class="frm-select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option v-for="opt in options">{{opt}}</option>
  </select>
  

</template>

<script>
  export default {
    name: "FormSelect",
    props: {
      modelValue: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true,
      },
      options: {
        type: Array
      }
    },
    setup() {

    }
  }
</script>

<style lang="scss" scoped>

  .frm-label {
    font-size: 12px;
    height: 15px;
    line-height: 15px;
    overflow: hidden;
    color: #424242;
    display: block;
    margin-bottom: 5px;
  }

  .frm-select {
    -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #ddd;
      font-size: 14px;
      height: 40px;
      line-height: 38px \0;
      padding: 0 35px 0 10px;
      margin-bottom: 2px;
      outline: none;
  }

</style>