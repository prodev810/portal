<template>
  <div class="pgateway-settings">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <div class="card p-3">
          <Spinner v-if="loading"/>
          <regular-table width="100%"
            striped responsive condensed bordered
            :headings="currencyHeader"
            :value="$store.state.paymentGateway.currencies"/>
        </div>
      </el-col>

      <el-col :sm="24" :md="12">
        <div class="card p-3">
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
        <div class="card p-3">
          <Spinner v-if="loading"/>
          <regular-table
            striped responsive condensed bordered
            :headings="pmethodHeader"
            :value="paymentMethod">
            <template slot-scope="index">
              <td>
                <p-button type="primary" @click="viewPaymentMethod(index)" size="sm" outline round>{{ $i18n.t('payment_gateway.button_view') }}</p-button>
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
  ACTION_PG_GET_PAYMENT_METHODS,
  GETTER_PG_ENV
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
        { name: 'currency_code', i18n: 'payment_gateway.settings.currencyHeader.currency_code' },
        { name: 'currency_name', i18n: 'payment_gateway.settings.currencyHeader.currency_name' }
      ],
      countryHeader: [
        { name: 'country_code', i18n: 'payment_gateway.settings.countryHeader.country_code' },
        { name: 'country_name', i18n: 'payment_gateway.settings.countryHeader.country_name' }
      ],
      pmethodHeader: [
        { name: 'payment_method', i18n: 'payment_gateway.settings.pmethodHeader.payment_method' },
        { name: 'code', i18n: 'payment_gateway.settings.pmethodHeader.code' },
        { name: 'logo', i18n: 'payment_gateway.settings.pmethodHeader.logo' },
        { name: 'currency_support', i18n: 'payment_gateway.settings.pmethodHeader.currency_support' },
        { name: 'country_support', i18n: 'payment_gateway.settings.pmethodHeader.country_support' }
      ],
      axios: null
    }
  },
  // async mounted () {
  //   // Get backend data
  //   await Promise.all([
  //     this.$store.dispatch(ACTION_PG_GET_CURRENCIES),
  //     this.$store.dispatch(ACTION_PG_GET_COUNTRIES),
  //     this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
  //   ])
  //   this.loading = false
  // },
  computed: {
    ...mapGetters({
      env: GETTER_PG_ENV
    }),
    paymentMethod () {
      return this.$store.state.paymentGateway.paymentMethod.map((value, index, array) => {
        return {
          payment_method: value.payment_method,
          code: value.code,
          // transform values for display in table
          currency_support: value.currency_support.map(value => value.currency_code).join(' | '),
          country_support: value.country_support.map(value => value.country_code).join(' | '),
          logo: `<img src="${value.logo}"/>`
        }
      })
    }
  },
  methods: {
    viewPaymentMethod (index) {
      this.$router.push({
        path: `/payment-gateway/settings/payment-method/${this.paymentMethod[index.index.index].code}`,
        query: { env: this.env }
      })
    },
    async loadData (env) {
      this.loading = true
      await Promise.all([
        this.$store.dispatch(ACTION_PG_GET_CURRENCIES),
        this.$store.dispatch(ACTION_PG_GET_COUNTRIES),
        this.$store.dispatch(ACTION_PG_GET_PAYMENT_METHODS)
      ])
      this.loading = false
    }
  }
}
</script>

<style>
.pgateway-settings table {
  width: 100% !important;
  margin-bottom: 0 !important;
}
.pgateway-settings th {
  text-transform: capitalize;
}
</style>
