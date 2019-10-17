<template>
  <div>

      <div  class="bg-white">
        <div class="row mb-3">
          <div class="col-12">
            <h4 class="card-title">
              {{ $t('reseller.listing.title') }}
            </h4>
            <p>
              {{ $t('reseller.listing.tips.line1') }}
              <br><br>
              {{ $t('reseller.listing.tips.line2') }}
            </p>
            <ul>
              <li>{{ $t('reseller.listing.tips.li1') }}</li>
              <li>{{ $t('reseller.listing.tips.li2') }}</li>
              <li>{{ $t('reseller.listing.tips.li3') }}</li>
            </ul>
          </div>
        </div>
      </div>


    <div v-if="true">
      <div class="card flat" v-if="hasPermission(permission.RESELLER_SUBSCRIPTION_LISTING)">
        <div class="card-content row">
          <div class="col-sm-12 tabel-wrapper ceevo__table-flat ceevo__table-full-line">
            <div class="p-1">
              <regular-table
                striped
                :headings="tableHeadings"
                :value="allCardResellers"
                @input="listenToInput"
                :editAll="editAll"
                :editId="editId"
                :uneditable-fields="[]"
                :extraHeadings="3"
              >
                <template slot-scope="index">
                  <th>
                    <div class="cell">
                      <p-button
                        link
                        type="icon-invoice"
                        :key="index.index.index+index.index.id"
                        @click="goToInvoice(index)"
                        v-if="hasPermission(permission.RESELLER_INVOICE_VIEW)"
                      >
                         <img src="../../../../../public/static/icons/ic_view_invoice.svg" alt="collapse-icon"/>
                        {{ $t('reseller.listing.button.view_invoice') }}
                      </p-button>
                    </div>
                  </th>
                  <th>
                    <div class="cell">
                      <p-button
                        link
                        type="icon-view"
                        :key="index.index.index+index.index.id"
                        @click="viewDetails(index)"
                        v-if="hasPermission(permission.RESELLER_SUBSCRIPTION_VIEW)"
                      >
                      <img src="../../../../../public/static/icons/ic_view_statement.svg" alt="collapse-icon"/>
                        {{ $t('reseller.listing.button.view_reseller') }}
                      </p-button>
                    </div>
                  </th>
                  <th>
                    <div class="cell">
                      <p-button
                        link
                        type="icon-edit"
                        :key="index.index.index+index.index.id"
                        @click="edit(index)"
                        v-if="hasPermission(permission.RESELLER_SUBSCRIPTION_EDIT)"
                      >
                      <img  src="../../../../../static/dashboard_icons/ic_edit.svg" alt="">
                        {{ $t('reseller.listing.button.edit_reseller') }}
                      </p-button>
                    </div>
                  </th>
                </template>
              </regular-table>
              <Pagination :page-count="totalPages" v-model="page"
                          @perpagechange="onPerpageChange"
                          :perPage="perPage"
                          displayPerPage>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- No Data -->
    <div class="no-data" v-else>
      <div class="txt">{{ $t('reseller.listing.no_data.message') }}</div>
      <router-link
        to="/reseller/create"
        tag="button"
        class="btn btn-primary btn-round"
      > {{ $t('reseller.listing.no_data.button') }}
      </router-link>
    </div>
    <template
      v-if="loadingState ==='getting'"
    >
      <spinner
      ></spinner>
    </template>
  </div>
</template>
<script>
  import {permissionMixin} from '@/mixins/permission'
  import {Button} from "src/components/UIComponents";
  import {mapActions, mapGetters} from "vuex";
  import {
    ADD_RESELLER_SUBSCRIPTION,
    EDIT_RESELLER_SUBSCRTION_BY_ID,
    GET_ALL_CARD_PROGRAM,
    GET_ALL_RESELLER_SUBSCRIPTIONS, GET_ALL_RESELLER_SUBSCRIPTIONS_LIST,
    GETTER_ALL_CARDS,
    GETTER_LOADINGSTATE_RESELLER,
    GETTER_RESELLER_SUBSCRIPTIONS, GETTER_RESELLER_SUBSCRIPTIONS_LIST
  } from "../../../../store/types";
  import createCSVData, {fileDownlaodFromEncodedURI} from "../../../../utils/createCSVData";
  import AbaButton from "../../../UIComponents/ABAComponents/AbaButton";
  import Pagination from "../../../UIComponents/ABAComponents/Pagenation/Pagenation";
  import PButton from "../../../UIComponents/Button";
  import RegularTable from "../../../UIComponents/CeevoTables/RegularTable/RegularTable";
  import Loader from "../../../UIComponents/Loader";
  import Spinner from "../../../UIComponents/Spinner";
  import NAMED_ROUTES from '../../../../routes/nameRoutes'

  export default {
    name: "CardPrograms",
    mixins: [permissionMixin],
    components: {
      Pagination,
      AbaButton,
      Spinner,
      Loader,
      PButton,
      RegularTable,
      [Button.name]: Button
    },
    data() {
      return {
        tableHeadings: [
          {
            //!missing name
            //TODO: fix this field
            label: 'CPC',
            name: 'cardProgramID',
            i18n: 'reseller.listing.table_header.card_program_id',
            input: 'select',
            selectKeys: [
              {name: '', value: ''}
            ],
            mapViewData: 'cardProgCode'
          },
          {
            label: 'Default Currency',
            name: 'defCurrency',
          },
          {
            label: 'RC',
            name: 'resellerCode',
            i18n: 'reseller.listing.table_header.reseller_code'
          },
          // imagamry field
          {
            label: 'reseller name',
            name: 'resellerName',
            i18n: 'reseller.listing.table_header.reseller_name'
          },
        ],
        editAll: false,
        editId: '',
        allCardResellers: [],
        page: 0,
        perPage: 10,
        totalPages: 0

      };
    },
    computed: {
      ...mapGetters({
        cardData: GETTER_ALL_CARDS,
        loadingState: GETTER_LOADINGSTATE_RESELLER,
        resellersList: GETTER_RESELLER_SUBSCRIPTIONS_LIST
      }),
      resellerData() {
        const _resellerData = this.resellersList || {};
        return {
          ..._resellerData,
          resellerSubscriptionList: (_resellerData.resellerSubscriptionList || []).map(resellerSub => {
            return {
              ...resellerSub,
              ['cardProgCode']: (this.$store.state.cardProgram.allCardPrograms.find(cardProgram => cardProgram.id === resellerSub.cardProgramID) || {cardProgCode: null}).cardProgramCode,
              ['cardProgCurrency']: (this.$store.state.cardProgram.allCardPrograms.find(cardProgram => cardProgram.id === resellerSub.cardProgramID) || {cardProgCode: null}).defaultCurrencyCode,
            }
          })
        }
      }
    },
    watch: {
      resellerData(newVal) {
        console.log('resellerData', newVal)
        this.allCardResellers = [...(newVal.resellerSubscriptionList || [])]
        if (!newVal.pageMeta) return;
        this.totalPages = newVal.pageMeta.totalPages || 0;
      },
      page() {
        if (typeof this.getResellerData !== 'function') return;
        this.getResellerData()
      },
      cardData(newVal) {
        this.chagneCardProgramOptions(newVal);
      },
      loadingState(newVal, oldVal) {
        if (oldVal === 'sending' && newVal === 'ideal') {
          this.editAll = false;
          this.editId = '';
        }
      },
    },
    methods: {
      ...mapActions({
        getAllCardResellers: GET_ALL_RESELLER_SUBSCRIPTIONS_LIST,
        getAllCardPrograms: GET_ALL_CARD_PROGRAM,
        addReseller: ADD_RESELLER_SUBSCRIPTION,
        editReseller: EDIT_RESELLER_SUBSCRTION_BY_ID
      }),
      onPerpageChange(ev) {
        const newPage = (this.page * this.perPage) / ev
        const page = Math.floor(isFinite(newPage) ? newPage : 0);
        this.perPage = ev;
        if (this.page === page) {
          return this.getResellerData();
        }
        this.page = page
        this.getResellerData()

      },
      chagneCardProgramOptions(cardPrograms = []) {
        this.tableHeadings = this.tableHeadings.map(i => {
          if (i.label === 'cardProgramID') {
            return {
              ...i,
              selectKeys: cardPrograms.map(cardProgram => ({name: cardProgram.email, value: cardProgram.id}))
            }
          } else {
            return i;
          }
        })
      },
      edit({index: {row: id}}) {
        console.log('edit', id)
        this.$router.history.push({
          path: `/reseller/edit/${id.id}`
        })
      },
      viewDetails({index: {row: id}}) {
        this.$router.history.push({
          path: `/reseller/view/${id.id}`
        });
      },
      handleSecondaryAction() {
        if (this.editId || this.editAll) {
          this.editId = '';
          this.editAll = false;
          this.allCardResellers = [...this.resellerData];
          return;
        }
      },
      handleEditAction() {
        if (this.editAll || this.editId) return this.saveEdition();

        this.getCSVfile();
      },
      saveEdition() {
        // on edit ?
        if (this.editId !== '' && this.loadingState === 'ideal') {

          // on edit for faiure creating new card
          //massage data -> remove edit prop
          const {id, edit, resellerId, ...body} = this.allCardResellers.find(i => i.id === this.editId);
          if (this.editId === 'Reseller_new_row') {
            // create
            this.addReseller({body});

            return;
          } else {

            //massage data -> remove edit prop
            // edit single card
            this.editReseller({body, id})
          }
        } else {
          // editing multiple cards unhandled by the api
          alert('editing multiple cards unhandled by the api currently')
        }
      },
      getCSVfile() {
        const csvString = createCSVData(this.tableHeadings, this.resellerData)
        const encodedUri = encodeURI(csvString);
        fileDownlaodFromEncodedURI(encodedUri, 'reseller_sub');
      },
      goToInvoice({index: {row:id}}) {
        const {resellerCode, cardProgCode} = this.resellerData.resellerSubscriptionList.find(reseller => reseller.id === id.id);
        this.$router.push({
          path: '/reseller/invoice',
          query: {
            reseller_code: resellerCode,
            card_program_code: cardProgCode
          }
        })
      },
      getResellerData() {
        const queryParams = {
          page: this.page,
          perPage: this.perPage,
        }
        this.redirectByNameRoute(NAMED_ROUTES.RESELLERS_VIEW, {query: queryParams})
        if (this.$oAuth.isReseller()) {
          queryParams.resellerCode = this.$oAuth.getCurrentResellerCode()
        }

        this.getAllCardResellers(queryParams);
      },
      listenToInput({value}) {
        this.allCardResellers = value
      },
      redirectByNameRoute(name, query = {}) {
        console.log('red by id', query)
        this.$router.push({
          name: name,
          query,
        })
      },
    },
    mounted() {
      const {page, per_page} = this.$route.query
      this.perPage = +per_page || this.perPage;
      this.page = +page || this.page;
      /*if (!page && !per_page) {
        console.log('mounted')
        this.redirectByNameRoute(NAMED_ROUTES.RESELLERS_VIEW, {page: this.page,perPage: this.perPage})
      }*/
      this.getResellerData()
      this.getAllCardPrograms();
      this.chagneCardProgramOptions(this.cardData)
    }
  };
</script>
<style scoped>
  .section-header {
    padding-bottom: 2rem;
  }

  .section-header h4 {
    margin: 0;
  }

  .section-header button {
    margin: 0;
  }

  .card-content .tabel-wrapper {
    margin: 10px 0;
  }

  .no-data {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .no-data .txt {
    font-size: 27px;
    color: #aaa;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .no-data .btn {
    max-width: 300px;
  }


  .display-inline {
    display: inline;
  }

  .card-header {
    padding-bottom: 2rem;
  }

  .card-content .tabel-wrapper {
    margin-top: 10px;
  }

  .actionsWrapper {
    padding-top: 1rem;
    text-align: right;
  }

  @media (max-width: 620px) {
    .actionsWrapper {
      padding-top: 1rem;
      text-align: right;
    }
  }
</style>
