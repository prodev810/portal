<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>
    <regular-table
      striped responsive condensed bordered
      :headings="merchantHeader"
      :value="merchant">
      <template slot-scope="index">              
        <td>
          <p-button type="primary" @click="viewMerchant(index)" size="sm" outline round>{{ $i18n.t('payment_gateway.button_view') }}</p-button>
        </td>
      </template>
    </regular-table>
  </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex';
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
    this.getMerchants();
    this.loading = false
  },
  computed: {
      ...mapState({
          merchant: (state) => {

              if( state.paymentGateway.merchants.data!=undefined ) {
                  let m = JSON.parse( JSON.stringify(state.paymentGateway.merchants.data) );
                      let new_m = m.map(item =>{
                          return {
                              merchant_name:item.merchant_name,
                              short_code:item.ext_merchant_id,
                              merchant_id:item.merchant_id
                          }
                      });
                      return new_m;
              }
          }
      }),
  },
  methods: {
      ...mapActions({
          getMerchants: ACTION_PG_GET_MERCHANTS
      }),
    viewMerchant (index) {
      this.$router.push(`/payment-gateway/merchant/${this.merchant[index.index.index].merchant_id}`)
    }
  }
}
</script>

<style>
div.pg-merchant table {
  width: 100% !important;
}
</style>


