<template>
  <div class="card pg-merchant p-2">
    <Spinner v-if="loading"/>
		<div class="d-flex flex-row justify-content-between align-items-center">
			<p-button type="primary" @click="$router.push('/clients/business-type/new')" size="md" round>{{ $i18n.t('business_type.listing.button_new') }}</p-button>
  		<fg-input class="search-company text-right" label="Search by Company Name" v-model="search_company"></fg-input>
		</div>
    <regular-table
      striped responsive condensed bordered
      :headings="businessTypeHeader"
      :value="businessTypePaged">
      <template slot-scope="index">              
        <td>
          <p-button type="primary" @click="viewBusinessType(index)" size="sm" outline round>{{ $i18n.t('business_type.listing.button_view') }}</p-button>
        </td>
      </template>
    </regular-table>
    <div class="table-pagination mt-2" v-if="businessTypeFiltered && businessTypeFiltered.length">
      <p-pagination
              v-model="currentPage"
              :perPage="perPage"              
              :total="businessTypeFiltered.length"
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
			businessTypeRaw: [],
      businessTypeHeader: [
				{ name: 'business_type', i18n: 'business_type.listing.table_header.business_type' },
				{ name: 'business_description', i18n: 'business_type.listing.table_header.business_description' },
				{ name: 'mcc', i18n: 'business_type.listing.table_header.mcc' },
				{ name: 'business_risk', i18n: 'business_type.listing.table_header.business_risk', iconByValue: {
          LOW: 'fa-signal-1',
				  MODERATE: 'fa-signal-4',
				  HIGH: 'fa-signal-alt',
				  PROHIBITED: 'fa-signal-alt-slash'
        }}
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
    businessTypeFiltered () {      
      return this.search_company
        ? this.businessTypeRaw.filter(item => item.company_name.toLowerCase().includes(this.search_company.toLowerCase()))
        : this.businessTypeRaw
    },
    businessTypePaged () {
      return this.businessTypeFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
  },
  methods: {
		async getClients () {
			this.loading = true

			try {
				let response = await this.$http.clhttp.get('/business-type')
				this.businessTypeRaw = response.data
        // convert dates
        /*
				this.businessTypeRaw.forEach(client => {
					if (client.created_date) {
						client.created_date = moment(client.created_date).format('YYYY-MM-DD hh:mm:ss')
					}
        })
        */
			} catch (error) {
				this.$store.dispatch(SHOW_TOAST_MESSAGE, { message: this.$t('store.clients.error_load_clients') + error.message, status: 'danger' })
			}

			this.loading = false
		},
		viewBusinessType(index) {
			this.$router.push(`/clients/business-type/${index.index.row.id}`)
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
div.pg-merchant table {
  width: 100% !important;
}
  .search-company .form-control{max-width:200px;margin-left: calc( 100% - 200px );}
</style>


