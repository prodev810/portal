<template>
  <div>
    <div>

      <div  class="bg-white">
        <div class="row">
          <div class="col-12">
            <h4 class="card-title">
              {{ $t('unallocated_float.listing.title') }}</h4>

            <p class="card-info">
              {{ $t('unallocated_float.listing.tips.line1') }}
            </p>
          </div>
        </div>
      </div>

      <div class="row align-items-center px-2">

        <div class="mr-auto">
          <div class="d-flex align-items-center flex-wrap">
            <div class="py-2 from-date">
              <div>
                <span class="px-2">{{ $t('unallocated_float.listing.search_filter.target_date') }}</span>
                <el-date-picker v-model="unallocatedFloatDate" type="date"
                                placeholder="Please Pick A date">
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>

        <div class="pr-0 ml-auto">

          <div class="d-flex align-items-center flex-wrap float-left float-xl-right">

            <div class="py-2 ceevo__select-group">
              <div class="d-flex align-items-center">
                <span class="px-2 text-nowrap">{{ $t('unallocated_float.listing.search_filter.currency') }}</span>
                <el-select class="select-default ceevo__select-default"
                           size="small"
                           placeholder="selected a currency"
                           v-model="currencyCode"
                >
                  <el-option v-for="currency in supportedCurrencies"
                             class="select-success"
                             :value="currency.code"
                             :label="currency.code"
                             :key="currency.id">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="py-2 ceevo__select-group">
              <div class="d-flex align-items-center">
                <span class="px-2 text-nowrap">{{ $t('unallocated_float.listing.search_filter.card_program') }}</span>
                <el-select class="select-default ceevo__select-default"
                           size="small"
                           placeholder="selected a card program"
                           v-model="cardProgramCode"
                >
                  <el-option v-for="card in cardPrograms"
                             class="select-success"
                             :value="card.cardProgramCode"
                             :label="card.cardProgramCode"
                             :key="card.id">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="py-2 ceevo__select-group">
              <div class="d-flex align-items-center" v-if="!$oAuth.isReseller()">
                <span class="px-2 text-nowrap">{{ $t('unallocated_float.listing.search_filter.reseller') }}</span>
                <el-select class="select-default ceevo__select-default"
                           size="small"
                           placeholder="selected a card program"
                           v-model="resellerCode"
                >
                  <el-option v-for="reseller in resellers"
                             class="select-success"
                             :value="reseller.resellerCode"
                             :label="reseller.resellerCode"
                             :key="reseller.id">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="py-2 ml-0 ml-md-2">
              <div class="d-flex align-items-center align-content-center">
                <p-button round @click="viewUnallocatedFloat" type="primary"
                          v-if="hasPermission(permission.UNALLOCATED_FLOAT_VIEW)"
                          :disabled="!ready">
                  {{ $t('unallocated_float.listing.button.view') }}
                </p-button>
              </div>
            </div>

          </div>
        </div>


      </div>
    </div>
    <div class="card p-2">
      <div class="card-content row">
        <div class="col-sm-12">
          <regular-table
            striped
            :headings="tableHeadings"
            :value="tableData"
          >
          </regular-table>
          <pagination :page-count="totalPages"
                      v-model="page"
                      @perpagechange="onPerpageChange"
                      :perPage="perPage" displayPerPage></pagination>
        </div>
      </div>
    </div>
    <Spinner v-if="loadingState ==='getting'">
    </Spinner>
  </div>
</template>
<script>
  import { permissionMixin } from '@/mixins/permission'
  import {Button, DatePicker, Option, Select} from "element-ui";
  import {mapActions, mapGetters} from 'vuex';
  import {moneyFormatAppendCurrency} from "../../../../utils/moneyFormat";
  import {
    GET_ALL_CARD_PROGRAM,
    GET_ALL_FLOATS,
    GET_ALL_RESELLER_SUBSCRIPTIONS,
    GET_UNALLOCATED_FLOAT,
    GETTER_ALL_CARDS,
    GETTER_FLOATS,
    GETTER_LOADINGSTATE_FLOAT_BALANCE,
    GETTER_SUPPORTED_CURRENCIES,
    GETTER_UNALLOCATED_FLOAT
  } from "../../../../store/types";
  import {formatDate} from "../../../../utils/Date";
  // import {formatedMoney} from "../../../../utils/inputMasks";
  import Pagination from "../../../UIComponents/ABAComponents/Pagenation/Pagenation";

  import RegularTable from "../../../UIComponents/CeevoTables/RegularTable/RegularTable";
  import Spinner from "../../../UIComponents/Spinner";

  export default {
    name: 'UnallocatedFloat',
    mixins: [permissionMixin],
    components: {
      Pagination,
      Spinner,
      RegularTable,
      [DatePicker.name]: DatePicker,
      [Button.name]: Button,
      [Option.name]: Option,
      [Select.name]: Select,
    },
    data() {
      return {
        unallocatedFloatDate: '',
        tableHeadings: [
          {label: 'PSF Ref', name: 'psfRef', i18n: 'unallocated_float.listing.table_header.psf_ref'},
          {label: 'issuer inst', name: 'issuerInst', i18n: 'unallocated_float.listing.table_header.issuer_inst'},
          {label: 'PM inst', name: 'pmInst', i18n: 'unallocated_float.listing.table_header.pm_inst'},
          {label: 'PO inst', name: 'poInst', i18n: 'unallocated_float.listing.table_header.po_inst'},
          {label: 'CPC', name: 'cardProgCode', i18n: 'unallocated_float.listing.table_header.card_prog_code'},
          {label: 'RC', name: 'resellerCode', i18n: 'unallocated_float.listing.table_header.reseller_code'},
          {label: 'reseller name', name: 'resellerName', i18n: 'unallocated_float.listing.table_header.reseller_name'},
          {label: 'opening balance', name: 'openingBalance', i18n: 'unallocated_float.listing.table_header.opening_balance'},
          {label: 'closing balance', name: 'closingBalance', i18n: 'unallocated_float.listing.table_header.closing_balance'},
          {label: 'Net Change', name: 'netChange', i18n: 'unallocated_float.listing.table_header.net_change'},
        ],
        tableData: [],
        cardProgramCode: '',
        currencyCode: 'EUR',
        perPage: 10,
        page: 0,
        totalPages: 0,
        resellerCode: '',
        query: {},
      }
    },
    computed: {
      ...mapGetters({
        allFloats: GETTER_FLOATS,
        cardPrograms: GETTER_ALL_CARDS,
        loadingState: GETTER_LOADINGSTATE_FLOAT_BALANCE,
        unallocatedFloats: GETTER_UNALLOCATED_FLOAT
      }), ready() {
        return (this.currencyCode !== '' &&
          this.perPage !== void 0 &&
          this.page !== void 0 &&
          this.resellerCode !== '' &&
          this.cardProgramCode !== '' &&
          this.unallocatedFloatDate !== '' &&
          this.loadingState !== 'getting')
      },
      resellers() {
        return (this.$store.state.reseller.resellerSubscriptions || [])
          .reduce((acc, i) => !!acc.find(({id}) => i.id === id)
            ? acc
            : [...acc, i]
            , [{id: 'all', value: '', resellerCode: 'All'}])


      }, supportedCurrencies() {
        return (this.$store.state.cardProgram.allCardPrograms || [])
          .reduce((acc, i) => !!acc.find(({code}) => i.defaultCurrencyCode === code)
            ? acc
            : [...acc, {
              id: i.id + 'curr',
              code: i.defaultCurrencyCode
            }]
            , [])
      },
      cardPrograms() {
        return (this.$store.state.cardProgram.allCardPrograms || [])
          .reduce((acc, i) => !!acc.find(({cardProgramCode}) => i.cardProgramCode === cardProgramCode)
            ? acc
            : [...acc, i]
            , [{id: 'all', value: '', cardProgCode: 'All'}])

      }
    }, watch: {
      unallocatedFloats(newVal) {
        this.tableData = [...newVal.unallocatedFloatResultList.map(i => ({
          ...i,
          id: i.tableData + '' + i.netChange + Math.random() * Date.now() + '' + i.cardProgCode,
          closingBalance: moneyFormatAppendCurrency(i.closingBalance, this.currencyCode),
          openingBalance: moneyFormatAppendCurrency(i.openingBalance, this.currencyCode),
          netChange: moneyFormatAppendCurrency(i.netChange, this.currencyCode),
        }))]
        if (!newVal.pageMeta) return
        this.totalPages = newVal.pageMeta.totalPages;
      }, unallocatedFloatDate(unallocatedFloatDate) {
        this.handleQuery({unallocatedFloatDate})
      }, cardProgramCode(cardProgramCode) {
        this.handleQuery({cardProgramCode})
      },
      page(page) {
        this.handleQuery({page})
      },
      resellerCode(resellerCode) {
        this.handleQuery({resellerCode})

      },
      currencyCode(currencyCode) {
        this.handleQuery({currencyCode})

      },
      query(newQuery) {
        this.$router.push({
          path: this.$route.path,
          query: Object.keys(newQuery)
            .reduce((acc, key) => (newQuery[key] !== void 0 && newQuery[key] !== '') ?
              {...acc, [key]: newQuery[key]}
              : acc,
              {})

        })
        this.viewUnallocatedFloat();
      },
    }, methods: {
      ...mapActions({
        getFloats: GET_ALL_FLOATS,
        getAllCards: GET_ALL_CARD_PROGRAM,
        getAllResellers: GET_ALL_RESELLER_SUBSCRIPTIONS,
        getUnallocatedFloats: GET_UNALLOCATED_FLOAT
      }),
      onPerpageChange(ev) {
        const newPage = (this.page * this.perPage) / ev
        const page = Math.floor(isFinite(newPage) ? newPage : 0);
        this.perPage = +ev;
        this.handleQuery({perPage: ev})
        if (this.page === page) {
          return this.viewUnallocatedFloat();
        }
        this.page = +page
        this.viewUnallocatedFloat()
      },
      handleQuery({cardProgramCode, currencyCode, resellerCode, unallocatedFloatDate, page, perPage} ={}) {
        if (!this) return;
        unallocatedFloatDate = (unallocatedFloatDate || this.unallocatedFloatDate) ? formatDate(unallocatedFloatDate || this.unallocatedFloatDate) : '';
        this.query = {
          card_program_code: cardProgramCode || this.cardProgramCode,
          reseller_code: resellerCode || this.resellerCode,
          currency_code: currencyCode || this.currencyCode,
          date: unallocatedFloatDate,
          per_page: perPage || this.perPage,
          page: page || this.page,
        }
      },
      viewUnallocatedFloat() {
        if (!this.ready) return
        this.getUnallocatedFloats({
          currencyCode: this.currencyCode,
          perPage: this.perPage,
          page: this.page,
          resellerCode: this.$oAuth.isReseller() ? this.$oAuth.getCurrentResellerCode() : this.resellerCode,
          cardProgramCode: this.cardProgramCode,
          date: formatDate(this.unallocatedFloatDate)
        })

      }
    }, mounted() {
      this.getAllCards();
      this.getAllResellers()
      const {
        card_program_code,
        reseller_code,
        currency_code,
        date,
        per_page,
        page,
      } = this.$route.query

      this.cardProgramCode = card_program_code || 'All';
      this.resellerCode = reseller_code || 'All';
      this.currencyCode = currency_code || this.currencyCode;
      this.unallocatedFloatDate = date || '';
      this.perPage = +per_page || this.perPage;
      this.page = + page || this.page;
      this.handleQuery()
    }
  }
</script>
<style scoped>
  .el-select {
    width: 130px;
    overflow: hidden;
  }

  .el-select input {
    border-radius: .4rem !important;
    border: 1px solid #DDDDDD !important;

    &:hover {
      border: 1px solid #000 !important;

    }
  }
</style>
