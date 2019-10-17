<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>

    <regular-table striped responsive condensed bordered
                   :headings="headers"
                   :value="transactions.items">

			<!--
      <template slot-scope="row">   
        <td>
          <p-button type="primary" @click="viewAquirer(row)" size="sm" outline round>{{ $i18n.t('payment_gateway.acquirer.button_view') }}</p-button>
        </td>
      </template>
			-->
    </regular-table>

    <div class="table-pagination mt-2" v-if="transactions.total > perPage">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="transactions.total"
              
              displayPerPage
      ></p-pagination> <!-- @input="handleInput" -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {
	SHOW_TOAST_MESSAGE,
	ACTION_PG_GET_TRANSACTIONS
} from '@/store/types'
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from "../../../../UIComponents/Pagination"

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
      headers: [
        { name: 'merchant_id', i18n: 'payment_gateway.transactions.header.merchant_id' },
        { name: 'method_code', i18n: 'payment_gateway.transactions.header.method_code' },
        { name: 'payer_id', i18n: 'payment_gateway.transactions.header.payer_id' },
        { name: 'status', i18n: 'payment_gateway.transactions.header.status' },
				{ name: 'sub_type', i18n: 'payment_gateway.transactions.header.sub_type' },
				{ name: 'transaction_date', i18n: 'payment_gateway.transactions.header.transaction_date', dateTime: true }
      ],
      currentPage: 1,
			perPage: 10
		}
	},
	computed: {
		...mapState({
			transactions: state => state.paymentGateway.transactions
		})
	},
	watch: {
		currentPage () {
			this.loadData()
		}
	},
	methods: {
    ...mapActions({
        getTransactions: ACTION_PG_GET_TRANSACTIONS
    }),
		async loadData () {
			this.loading = true
			await this.getTransactions()
			this.loading = false
		}
	},
	mounted () {
		this.loadData()
	}
}
</script>