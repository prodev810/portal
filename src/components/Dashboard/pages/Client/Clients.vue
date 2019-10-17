<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>
		<div class="d-flex flex-row justify-content-between align-items-center">
			<p-button type="primary" @click="$router.push('/client/new')" size="md" round>{{ $i18n.t('client.listing.button.new_client') }}</p-button>
  		<fg-input class="search-company text-right" label="Search by Company Name" v-model="search_company"></fg-input>
		</div>
    <regular-table
      striped responsive condensed bordered
      :headings="clientHeader"
      :value="clientsPaged">
      <template slot-scope="index">              
        <td>
          <p-button type="primary" @click="viewClient(index)" size="sm" outline round>{{ $i18n.t('client.listing.button.view_client') }}</p-button>
        </td>
      </template>
    </regular-table>
    <div class="table-pagination mt-2" v-if="clientFiltered && clientFiltered.length">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="clientFiltered.length"
              @input="handleInput"
              displayPerPage
      ></p-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import { SHOW_TOAST_MESSAGE } from '@/store/types'
import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
import PPagination from "../../../UIComponents/Pagination"

export default {
  name: 'Clients',
  components: { Spinner, RegularTable, PPagination },
  data () {
    return {
			loading: true,
			clientsRaw: [],
      clientHeader: [
				{ name: 'email', i18n: 'client.listing.table_header.signupEmail' },
				{ name: 'created_date', i18n: 'client.listing.table_header.date' },
				{ name: 'merchant_account_stage.name', i18n: 'client.listing.table_header.stage' },
				{ name: 'company_name', i18n: 'client.listing.table_header.company' },
				{ name: 'country', i18n: 'client.listing.table_header.country' },				
				{ name: 'url', i18n: 'client.listing.url' },
				{ name: 'email_verified', i18n: 'client.listing.table_header.email', check: true },
				{ name: 'biz_verified', i18n: 'client.listing.table_header.kyb', check: true },
				{ name: 'owner_verified', i18n: 'client.listing.table_header.kyc', check: true },
      ],
      search_company:'',
      //totalPages: 25,
      perPage: 20,
      currentPage:1
      //pageCount: 2,
    }
  },
  mounted () {
    this.getClients();
  },
  computed: {
    clientFiltered () {      
      return this.search_company
        ? this.clientsRaw.filter(item => item.company_name.toLowerCase().includes(this.search_company.toLowerCase()))
        : this.clientsRaw
    },
    clientsPaged () {
      return this.clientFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  methods: {
		async getClients () {
			this.loading = true

			try {
				let response = await this.$http.clhttp.get('/client')
				this.clientsRaw = response.data
				// convert dates
				this.clientsRaw.forEach(client => {
					if (client.created_date) {
						client.created_date = moment(client.created_date).format('YYYY-MM-DD hh:mm:ss')
					}
				})
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('store.clients.error_load_clients') + error.message, status: 'danger' })
			}

			this.loading = false
		},
		viewClient(index) {
			let client_id = index.index.row.id
			this.$router.push(`/client/${client_id}`)
		},
		handleInput(ev) {
				console.log( ev );
				this.currentPage = ev;
				/*this.isPagination = true;
				this.getClients({
						pageNum:ev,
						pageSize:this.perPage,
						paged:this.isPagination,
						offset:ev*this.perPage
				})*/
		},
		search() {
				let filters = null;

				// if (this.search_company.length > 0 ) {
				//     filters = {
				//         isPagination: this.isPagination,
				//         currentPage: this.currentPage,
				//         perPage: this.perPage,
				//         search:this.search_company
				//     }
				// } else {
				//
				//     // localStorage.setItem('search-filters', JSON.stringify(filters))
				// }
		}
  }
}
</script>

<style>
  .search-company .form-control{max-width:200px;margin-left: calc( 100% - 200px );}
</style>


