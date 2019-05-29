<template>
  <div class="pgateway-settings">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12">
        <div class="card p-2">
          <regular-table width="100%"
            striped responsive condensed bordered
            :headings="currencyHeader"
            :value="currencyData"/>
        </div>
      </el-col>

      <el-col :sm="24" :md="12">
        <div class="card p-2">
          <regular-table
            striped responsive condensed bordered
            :headings="countryHeader"
            :value="countryData"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :sm="24">
        <div class="card p-2">
          <regular-table
            striped responsive condensed bordered
            :headings="pmethodHeader"
            :value="pmethodData"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"

export default {
  name: 'Settings',
  components: { RegularTable },  
  data () {
    return {
      currencyHeader: [
        { name: 'symbol', label: 'Currency symbol' },
        { name: 'name', label: 'Currency name' }
      ],
      countryHeader: [
        { name: 'code', label: 'Country code' },
        { name: 'name', label: 'Country name' }
      ],
      pmethodHeader: [
        { name: 'name', label: 'Payment method' },
        { name: 'code', label: 'Method code' },
        { name: 'logo', label: 'Logo' },
        { name: 'currency', label: 'Currency support' },
        { name: 'country', label: 'Country support' },
        { name: 'actions', label: 'Actions' }
      ],
      currencyData: [
        { symbol: 'USD', name: 'US dollar' },
        { symbol: 'EUR', name: 'EURO' },
        { symbol: 'PLN', name: 'Poland zloty' }
      ],
      countryData: [
        { code: 'DE', name: 'Germany' },
        { code: 'UK', name: 'United Kingdom' },
        { code: 'AU', name: 'Austria' }
      ],
      pmethodData: [
        { name: 'Credit / Debit Card', code: 'CARDS', logo: '', currency: 'USD | EUR', country: 'AU | DE' },
        { name: 'SOFORT', code: 'SOFORT', logo: '', currency: 'EUR', country: 'AU | DE' }
      ]
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
