<template>
  <div class="pgateway-settings">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <div class="card p-2">
          <Spinner v-if="loading"/>
          <regular-table width="100%"
            striped responsive condensed bordered
            :headings="currencyHeader"
            :value="$store.state.paymentGateway.currencies"/>
        </div>
      </el-col>

      <el-col :sm="24" :md="12">
        <div class="card p-2">
          <Spinner v-if="loading"/>
          <regular-table
            striped responsive condensed bordered
            :headings="countryHeader"
            :value="$store.state.paymentGateway.countries"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24">
        <div class="card p-2">
          <Spinner v-if="loading"/>
          <regular-table
            striped responsive condensed bordered
            :headings="pmethodHeader"
            :value="paymentMethod">
            <template slot-scope="index">              
              <td>
                <p-button type="primary" @click="editPaymentMethod(index)">Edit</p-button>
              </td>
            </template>
          </regular-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  ACTION_PG_GET_CURRENCIES,
  ACTION_PG_GET_COUNTRIES,
  ACTION_PG_GET_PAYMENT_METHODS
} from '@/store/types'
import { mapActions, mapGetters } from 'vuex'
import Spinner from "@/components/UIComponents/Spinner"
import PButton from "@/components/UIComponents/Button"
import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"

export default {
  name: 'Settings',
  components: { 
    PButton, 
    RegularTable, 
    Spinner 
  },  
  data () {
    return {
      loading: true,
      currencyHeader: [
        { name: 'currency_code', label: 'Currency symbol' },
        { name: 'currency_name', label: 'Currency name' }
      ],
      countryHeader: [
        { name: 'country_code', label: 'Country code' },
        { name: 'country_name', label: 'Country name' }
      ],
      pmethodHeader: [
        { name: 'logo', label: 'Logo' },
        { name: 'payment_method', label: 'Payment method' },
        { name: 'code', label: 'Method code' },
        { name: 'currency_support', label: 'Currency support' },
        { name: 'country_support', label: 'Country support' }
      ],
      axios: null
    }
  },
  async mounted () {
    // Get backend data
    //await this.$store.dispatch(ACTION_PG_GET_CURRENCIES)
    //await this.$store.dispatch(ACTION_PG_GET_COUNTRIES)
    //await this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
    await Promise.all([
      this.$store.dispatch(ACTION_PG_GET_CURRENCIES),
      this.$store.dispatch(ACTION_PG_GET_COUNTRIES),
      this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
    ])
    this.loading = false
  },
  computed: {
    paymentMethod () {
      return this.$store.state.paymentGateway.paymentMethod.map((value, index, array) => {
        return {
          payment_method: value.payment_method,
          code: value.code,
          // transform values for displayt in table
          currency_support: value.currency_support.map(value => value.currency_code).join(' | '),
          country_support: value.country_support.map(value => value.country_code).join(' | '),
          logo: `<img src="${value.logo}"/>`
        }
      })
    }
  },
  methods: {
    editPaymentMethod (index) {
      this.$router.push(`/payment-gateway/settings/payment-method/${this.paymentMethod[index.index.index].code}`)
    }
  }
}
</script>

<style>
.pgateway-settings table {
  width: 100% !important;
  margin-bottom: 0 !important;
}
</style>
