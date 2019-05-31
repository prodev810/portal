<template>
  <div>
    <Spinner v-if="loading"/>

    <div class="card p-4">
      <fg-input v-model="methodData.payment_method" placeholder="Payment method name"></fg-input>      
      <fg-input v-model="methodData.code" placeholder="Payment method code"></fg-input>
      <fg-input v-model="methodData.logo" placeholder="Logo URL"></fg-input>
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">Save</p-button>      
      <p-button type="black" round wide size="sm" @click="onCancel">Cancel</p-button>
    </div>
  </div>
</template>

<script>
import { ACTION_PG_GET_PAYMENT_METHODS } from '@/store/types'
import PButton from "@/components/UIComponents/Button"
import Spinner from "@/components/UIComponents/Spinner"

export default {
  name: 'EditPaymentMethod',
  components: {
    PButton,
    Spinner
  },
  data () {
    return {
      loading: true,
      methodData: {}
    }
  },
  async created () {
    await this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
    this.getData()
    this.loading = false
  },
  methods: {
    getData () {
      // !!! Проверка ошибки
      let pm = this.$store.state.paymentGateway.paymentMethod.filter(value => value.code === this.$route.params.code)
      this.methodData = pm[0]
    },
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


