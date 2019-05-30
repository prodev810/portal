<template>
  <div>
    <div class="card p-4">
      {{ this.$route.params.code }}
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">Save</p-button>      
      <p-button type="black" round wide size="sm" @click="onCancel">Cancel</p-button>
    </div>
  </div>
</template>

<script>
import PButton from "@/components/UIComponents/Button"

export default {
  name: 'EditPaymentMethod',
  components: {
    PButton
  },
  methods: {
    onSave () {

    },
    onCancel () {
      this.$router.push('/payment-gateway/settings')
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
}
</style>


