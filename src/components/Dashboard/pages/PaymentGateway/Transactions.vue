<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>

    <regular-table striped responsive condensed bordered
                   :headings="headers"
                   :value="transactionsPaged">

			<!--
      <template slot-scope="row">   
        <td>
          <p-button type="primary" @click="viewAquirer(row)" size="sm" outline round>{{ $i18n.t('payment_gateway.acquirer.button_view') }}</p-button>
        </td>
      </template>
			-->
    </regular-table>

    <div class="table-pagination mt-2" v-if="transactions.length">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="transactions.length"
              
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
import PPagination from "../../../UIComponents/Pagination"

export default {
	name: 'Transactions',
  components: { 
    Spinner, 
    RegularTable,
    PPagination 
  },  
	data () {
		return {
			loading: false,
      transactions: [],
      headers: [
        { name: 'merchant_id', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'method_code', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'payer_id', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'proc_processor', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'status', i18n: 'payment_gateway.transactions.header.merchant_id' },
				{ name: 'sub_type', i18n: 'payment_gateway.transactions.header.merchant_id' },
				{ name: 'transaction_date', i18n: 'payment_gateway.transactions.header.transaction_date' }
      ],
      currentPage: 1,
      perPage: 10
		}
	},
	computed: {
		transactionsPaged () {
			return this.transactions.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
		}
	},
	methods: {
		async getData () {
			this.loading = true

			try {
				let response = await this.$http.acchttp.get('/charge/search?pageNumber=1')
				console.log('Transactions', response)
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('payment_gateway.transactions.error_get_transactions') + error.message, status: 'danger' })
			}
		}
	},
	mounted () {
		this.getData()
	}
}
</script>