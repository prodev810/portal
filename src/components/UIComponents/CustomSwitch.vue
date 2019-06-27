<template>
  <div @click="triggerToggle()" class="custom-switch">
    <strong class="mr-1">
      <slot name="on">
        {{onText}}
      </slot>
    </strong>
    <label class="switch">
      <input :value="switchModel" type="checkbox">
      <span class="slider round"></span>
    </label>
    <strong class="ml-1">
      <slot name="off">
        {{offText}}
      </slot>
    </strong>
  </div>
</template>

<script>
  export default {
    name: "CustomSwitch",
    props: {
      value:{
        type: [Number, Boolean],
        description: 'Switch value',
      },
      onText: {
        type: String,
        description: 'switch on text',
        default: 'On',
      },
      offText: {
        type: String,
        description: 'switch off text',
        default: 'Off',
      },
    },
    computed:{
      switchModel(){
        return this.value
      },
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      triggerToggle () {
        this.model = !this.model
      }
    }
  }
</script>

<style scoped lang="scss">
  $switcher-bg: #2ED684;
  $switch-color: #292929;

  .custom-switch{
    color: $switch-color;
  }

  label{
    margin-bottom: 0;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 26px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: $switcher-bg;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $switcher-bg;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

</style>
