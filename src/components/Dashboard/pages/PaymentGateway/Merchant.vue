<template>
  <div class="card p-2">
    <Spinner v-if="loading"/>
    <RegularTable
      striped responsive condensed bordered
      :headings="merchantHeader"
      :value="merchant">
      <template slot-scope="index">              
        <td>
          <p-button type="primary" @click="viewMerchant(index)" size="sm" outline round>{{ $i18n.t('payment_gateway.button_view') }}</p-button>
        </td>
      </template>
    </RegularTable>
  </div>
</template>

<script>
import {
  ACTION_PG_GET_MERCHANTS
} from '@/store/types'
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'

export default {
  name: 'Merchant',
  components: { Spinner, RegularTable },
  data () {
    return {
      loading: true,
      merchantHeader: [
        { name: 'merchant_name', i18n: 'payment_gateway.merchant.merchantHeader.merchant_name' },
        { name: 'short_code', i18n: 'payment_gateway.merchant.merchantHeader.short_code' },
        { name: 'merchant_id', i18n: 'payment_gateway.merchant.merchantHeader.merchant_id' }
      ]
    }
  },
  async mounted () {
    await this.$store.dispatch(ACTION_PG_GET_MERCHANTS)
    this.loading = false
  },
  computed: {
    merchant () {
      return this.$store.state.paymentGateway.merchants
    }
  },
  methods: {
    viewMerchant (index) {
      this.$router.push(`/payment-gateway/merchant/${this.merchant[index.index.index].merchant_id}`)
    }
  }
}
</script>

