<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>
		<div class="d-flex flex-row justify-content-between align-items-center">
			<p-button type="primary" @click="$router.push('/payment-gateway/acquirer/new')" size="md" round>{{ $i18n.t('payment_gateway.acquirer.button_new') }}</p-button>
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
import {
	SHOW_TOAST_MESSAGE
} from '@/store/types'
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from "../../../UIComponents/Pagination";

export default {
  name: 'ViewAcquirer',
  components: { 
    Spinner, 
    RegularTable,
    PPagination 
  },  
  data () {
    return {
      loading: false,
      aquirers: [],
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
    aquirersFiltered () {
      return this.aquirers
    },
    aquirersPaged () {
      return this.aquirersFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  async mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      
      try {
        let response = await this.$http.acchttp.get('/acquirer')
        this.aquirers = response.data

      } catch (error) {
        dispatch(SHOW_TOAST_MESSAGE, { message: i18n.t('payment_gateway.acquirer.error_get_aquirers') + e.message, status: 'danger' })
      }   

      this.loading = false
    },
    viewAquirer (aquirer) {
      console.log(aquirer)
      this.$router.push(`/payment-gateway/acquirer/${aquirer.index.row.id}`)
    }
  }
}
</script>