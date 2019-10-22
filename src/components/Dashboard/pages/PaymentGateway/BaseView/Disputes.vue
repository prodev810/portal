<template>
  <div class="card p-3">
    <Spinner v-if="loading"/>

    <regular-table striped responsive condensed bordered
                   :headings="headers"
                   :value="disputesFormatted">

      <template slot-scope="row">   
        <td>
          <p-button type="primary" @click="onPaymentDetails(row.index.row)" size="sm" outline class="mr-2">{{ $i18n.t('payment_gateway.transactions.button_details') }}</p-button>
        </td>
      </template>
    </regular-table>

    <div class="table-pagination mt-2" v-if="disputes.total > perPage">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="disputes.total"
      ></p-pagination>
    </div>

		<DetailsModal v-model="modalDetailsVisible"
									header="payment_gateway.disputes.modal_details.header"
									:data="modalDetailsData"
									:description="modalDetailsDescription"
									i18base="payment_gateway.disputes.header."/>
  </div>
</template>

<script>
import getHttpInstance from '@/store/modules/PGInstance.js' 

import { mapActions, mapState } from 'vuex'
import {
	SHOW_TOAST_MESSAGE,
	ACTION_PG_GET_DISPUTES
} from '@/store/types'
import Modal from "@/components/UIComponents/Modal"
import DetailsModal from "@/components/Dashboard/pages/PaymentGateway/DetailsModal"
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from "@/components/UIComponents/Pagination"

export default {
	name: 'Disputes',
  components: { 
    Spinner, 
    RegularTable,
		PPagination,
		Modal,
		DetailsModal
  },  
	data () {
		return {
			loading: false,
      headers: [
        { name: 'cp_date', i18n: 'payment_gateway.disputes.header.cp_date', dateTime: true },
        { name: 'amount', i18n: 'payment_gateway.disputes.header.amount' },
        { name: 'dispute_type', i18n: 'payment_gateway.disputes.header.dispute_type' },
        { name: 'description', i18n: 'payment_gateway.disputes.header.description' },
				//{ name: 'payment_transaction_date', i18n: 'payment_gateway.disputes.header.payment_transaction_date', dateTime: true },
				{ name: 'record_date', i18n: 'payment_gateway.disputes.header.record_date', dateTime: true }
      ],
      currentPage: 1,
			perPage: 10,
			modalDetailsVisible: false,
			modalDetailsData: {},
			modalDetailsDescription: [
				{ key: 'cp_date', filter: 'dateTime' },
				{ key: 'amount'  },
				{ key: 'dispute_type' },
				{ key: 'description' },
				//{ key: 'payment_transaction_date', filter: 'dateTime' },
				{ key: 'record_date', filter: 'dateTime' }
			]
		}
	},
	computed: {
		...mapState({
			env: state => state.paymentGateway.env,
			disputes: state => state.paymentGateway.disputes
    }),
    disputesFormatted () {
      return this.disputes.items.map(d => ({
          cp_date: d.cp_date,
          amount: `${d.amount} ${d.currency}`,
          dispute_type: d.dispute_type,
          description: d.description,
          //payment_transaction_date: d.payment.transaction_date,
          record_date: d.record_date,
          _links: d._links
        })
      )
    }
	},
	watch: {
		currentPage () {
			this.loadData()
		}
	},
	methods: {
    ...mapActions({
        getDisputes: ACTION_PG_GET_DISPUTES
    }),
		async loadData () {
      this.loading = true
      
			await this.getDisputes({
				page: this.currentPage-1,
				size: this.perPage
      })
      
			this.loading = false
		},
		async onPaymentDetails (row) {
			this.loading = true

			try {
				let response = await getHttpInstance(this.env).get(this.processModalURL(row._links.disputeRecord.href))
				// assign data and make modal visible
        this.modalDetailsData = response.data
				this.modalDetailsVisible = true
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: error.message, status: 'danger' })
			}

			this.loading = false
		},
		processModalURL(value) {
			let url = value.split('/')
			let idx = url.findIndex(s => s === 'payment-mgmt')

			return idx >= 0 
				? '/' + url.slice(idx + 1).join('/') 
				: value			
		}
	},
	mounted () {
		this.loadData()
	}
}
</script>