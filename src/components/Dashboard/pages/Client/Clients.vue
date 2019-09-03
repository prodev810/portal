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

    import {mapActions, mapState} from 'vuex';

    import {
        ACTION_GET_ALL_CLIENTS_LIST,
        GETTER_All_CLIENTS
    } from '@/store/types'

import Spinner from "@/components/UIComponents/Spinner"
import RegularTable from '@/components/UIComponents/CeevoTables/RegularTable/RegularTable'
    import PPagination from "../../../UIComponents/Pagination";
export default {
  name: 'Clients',
  components: { Spinner, RegularTable,PPagination },
  data () {
    return {
      loading: true,
      clientHeader: [
        { name: 'account_name', i18n: 'client.listing.table_header.name' },
        { name: 'merchant_account_stage.name', i18n: 'client.listing.table_header.stage' },
        { name: 'company_name', i18n: 'client.listing.table_header.company' },
        { name: 'country', i18n: 'client.listing.table_header.country' },
        { name: 'email', i18n: 'client.listing.table_header.email' },
        { name: 'createdDate', i18n: 'client.listing.table_header.date' }
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

    this.loading = false
  },
  computed: {
    ...mapState({
      clientsRaw: state => state.Clients.clients  
    }),
    clientFiltered () {      
      return this.search_company
        ? this.clientsRaw.filter(item => item.company_name.toLowerCase().includes(this.search_company.toLowerCase()))
        : this.clientsRaw
    },
    clientsPaged () {
      return this.clientFiltered.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    }
        // totalPages:(state) => {
        //     return state.Clients.clients.totalPages
        // },
      // currentPage: (state)  =>{
      //     return state.Clients.clients.number
      // }
  },
  methods: {
      ...mapActions({
          getClients: ACTION_GET_ALL_CLIENTS_LIST
      }),
      viewClient(index) {
          let client_id = index.index.row.id
          this.$router.push(`/client/${client_id}`)
      },
      handleInput(ev) {
          console.log( ev );
          this.currentPage = ev;
          this.isPagination = true;
          this.getClients({
              pageNum:ev,
              pageSize:this.perPage,
              paged:this.isPagination,
              offset:ev*this.perPage
          })
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


