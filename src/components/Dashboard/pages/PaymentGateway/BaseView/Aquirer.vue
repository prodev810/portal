<template>
  <div class="card p-3">
    <Spinner v-if="loading"/>
		<div class="d-flex flex-row justify-content-between align-items-center">
			<p-button type="primary" @click="$router.push({path: '/payment-gateway/acquirer/new', query: { env }})" size="md" round>{{ $i18n.t('payment_gateway.acquirer.button_new') }}</p-button>
  		<!--<fg-input class="search-company text-right" label="Search by Company Name" v-model="search_company"></fg-input>-->
		</div>

    <regular-table striped responsive condensed bordered
                   :headings="headers"
                   :value="aquirersPaged">

      <template slot-scope="row">   
        <td>
          <p-button type="primary" @click="viewAquirer(row)" size="sm" outline round>{{ $i18n.t('payment_gateway.acquirer.button_view') }}</p-button>
        </td>
      </template>
    </regular-table>
    <div class="table-pagination mt-2" v-if="aquirersFiltered && aquirersFiltered.length">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="aquirersFiltered.length"
              
              displayPerPage
      ></p-pagination> <!-- @input="handleInput" -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
  SHOW_TOAST_MESSAGE,
  GETTER_PG_ENV,
  ACTION_PG_GET_ACQUIRERS
} from '@/store/types'
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from '@/components/UIComponents/Pagination'

export default {
  name: 'Aquirer',
  components: { 
    Spinner, 
    RegularTable,
    PPagination 
  },  
  data () {
    return {
      loading: false,
      //aquirers: [],
      headers: [
        { name: 'full_name', i18n: 'payment_gateway.acquirer.full_name' },
        { name: 'short_name', i18n: 'payment_gateway.acquirer.short_name' },
        { name: 'institution_id', i18n: 'payment_gateway.acquirer.institution_id' },
        { name: 'amex_id', i18n: 'payment_gateway.acquirer.amex_id' },
        { name: 'visa_id', i18n: 'payment_gateway.acquirer.visa_id' },
        { name: 'mastercard_id', i18n: 'payment_gateway.acquirer.mastercard_id' }
      ],
      currentPage: 1,
      perPage: 10
    }
  },
  computed: {
    ...mapGetters({
      env: GETTER_PG_ENV
    }),
    ...mapState({
      acquirers: (state) => state.paymentGateway.acquirers
    }),
    aquirersFiltered () {
      return this.acquirers.map(a => {
        let res = a
        res.amex_id = this.getCardID(a.amex_id),
        res.visa_id = this.getCardID(a.visa_id),
        res.mastercard_id = this.getCardID(a.mastercard_id)
        return res
      })
    },
    aquirersPaged () {
      return this.aquirersFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  // async mounted () {
  //   this.loadData()
  // },
  methods: {
    ...mapActions({
        getAcquirers: ACTION_PG_GET_ACQUIRERS
    }),
    async loadData (env) {
      this.loading = true
      await this.getAcquirers()
      this.loading = false
    },
    viewAquirer (aquirer) {
      this.$router.push({
        path: `/payment-gateway/acquirer/${aquirer.index.row.id}`,
        query: { env: this.env }
      })
    },
    getCardID (value) {
      return !value || value === '000000'
        ? '-'
        : value
    }
  }
}
</script>