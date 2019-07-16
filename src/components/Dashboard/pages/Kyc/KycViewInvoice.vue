<template>
  <el-row :gutter="20" class="kyc__view__invoice">
    <el-col :sm="24">
      <el-row>
        <p class="d-flex justify-content-between align-items-center w-100">
          <b class="h3 mb-0 page__title">View Invoice</b>
          <p-button class="btn btn-default text-capitalize" round>Download</p-button>
        </p>
      </el-row>

      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <el-row :gutter="20" class="mb-2">
              <el-col :md="6">
                <strong class="mr-2">From</strong>
                <el-date-picker v-model="fromDate" type="date"
                                @change="handleFilterInvoice"
                                placeholder="Pick Starting Date">
                </el-date-picker>
              </el-col>
              <el-col :md="6">
                <strong class="mr-2">To</strong>
                <el-date-picker v-model="toDate" type="date"
                                @change="handleFilterInvoice"
                                placeholder="Pick Starting Date">
                </el-date-picker>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="6">
                <strong>Client Reference</strong>
                <strong v-if="isSingleInvoice"> : {{clientReference}}</strong>
                <el-input v-else v-model="clientReference"
                          @change="handleFilterInvoice"></el-input>
              </el-col>
              <el-col :md="6">
                <strong>Client Name</strong>
                <strong v-if="isSingleInvoice"> : {{clientName}}</strong>
                <el-input v-else v-model="clientName"
                          @change="handleFilterInvoice"></el-input>
              </el-col>
            </el-row>
          </div>
          <regular-table striped
                         :headings="tableHeadings"
                         :value="productConfigViewInvoiceList">
          </regular-table>
          <el-row v-if="!isEmptyTable" class="d-flex justify-content-end">
            <strong class="kyc__invoice__total">
              <b class="text-uppercase">Sum</b> {{productConfigViewInvoiceTotal | numberToMoneyFormat}}
            </strong>
          </el-row>
          <div class="table-pagination">
            <p-pagination :page-count="pageCount"
                          v-model="currentPage"
                          @input="handleChangePage"
                          :perPage="perPage"></p-pagination>
          </div>
        </div>
      </div>
    </el-col>
    <PSpinner v-if="isLoading"></PSpinner>
  </el-row>
</template>

<script>
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"
  import {mapState, mapActions, mapGetters} from 'vuex'
  import {
    KYC_GET_PRODUCT_CONFIG_VIEW_INVOICE,
    GETTER_KYC_LOADINGSTATUS,
    GETTER_KYC_INVOICE_ITEMS,
    GETTER_KYC_INVOICE_PAGEMETA,
    GETTER_KYC_INVOICE_SUM,
  } from "../../../../store/types"
  import {moneyFormat} from '../../../../utils/moneyFormat'
  import {formatDate} from "../../../../utils/Date"
  import {kycModuleDateFormatWithoutSec} from "../../../../utils/kycModuleDateFormat"
  import PPagination from "../../../UIComponents/Pagination"
  import PSpinner from '../../../../components/UIComponents/Spinner'
  import LOADING_STATE from '../../../../utils/loadingState'

  export default {
    name: "KycViewInvoice",
    components: {
      RegularTable, PPagination, PSpinner,
    },
    props: ['mode'],
    created() {
      if (this.$route.query) {
        this.clientName = this.$route.query.clientName
        this.clientReference = this.$route.query.clientReference
      }
      this.handleFilterInvoice()
    },
    data() {
      return {
        totalPages: 0,
        perPage: 20,
        currentPage: 1,
        pageCount: 0,
        tableHeadings: [
          {name: 'clientReference', label: 'App Requested'},
          {name: 'clientName', label: 'KYC Client Code'},
          {name: 'timestamp', label: 'Time Stamp'},
          {name: 'chargeType', label: 'Charge Type'},
          {name: 'itemDesc', label: 'Description'},
          {name: 'itemAmount', label: 'Amount', custom: true},
        ],

        clientReference: '',
        clientName: '',
        fromDate: '',
        toDate: '',
      }
    },
    computed: {
      ...mapGetters({
        kycLoadingState: GETTER_KYC_LOADINGSTATUS,
        productConfigViewInvoiceItem: GETTER_KYC_INVOICE_ITEMS,
        productConfigViewInvoiceTotal: GETTER_KYC_INVOICE_SUM,
        productConfigViewInvoicePageMeta: GETTER_KYC_INVOICE_PAGEMETA,
      }),
      getInvoiceCurrency() {
        return this.productConfigViewInvoiceItem[0].itemCurrency
      },
      productConfigViewInvoiceList() {
        if (this.productConfigViewInvoiceItem) {
          const invoiceItem = JSON.parse(JSON.stringify(this.productConfigViewInvoiceItem))
          return invoiceItem.map(invoice => {
           if(invoice){
             invoice.timestamp = kycModuleDateFormatWithoutSec(invoice.timestamp)
             invoice.itemAmount = `${this.getInvoiceCurrency} ${this.getMoneyFormat(invoice.itemAmount)}`
             return invoice
           }
          })
        }
      },
      isEmptyTable() {
        return this.productConfigViewInvoiceItem ? !this.productConfigViewInvoiceItem.length : true
      },
      isLoading(){
        return this.kycLoadingState !== LOADING_STATE.IDEAL
      },
      isSingleInvoice(){
        return this.mode === 'single'
      },
    },
    watch: {
      productConfigViewInvoicePageMeta(value) {
        this.pageCount = value.totalPages;
        this.perPage = value.perPage;
      },
    },
    methods: {
      ...mapActions({
        getProductConfigInvoices: KYC_GET_PRODUCT_CONFIG_VIEW_INVOICE
      }),
      getMoneyFormat(value) {
        if (value < 1 && value > 0) return value
        return moneyFormat(value)
      },
      handleFilterInvoice() {
        const payload = {
          toDate: this.getDateFormat(this.toDate),
          fromDate: this.getDateFormat(this.fromDate),
          clientName: this.clientName,
          clientReference: this.clientReference ? this.clientReference.toUpperCase() : '',
          pageNum: this.isPagination ? this.currentPage - 1 : 0,
          pageSize: this.perPage
        }
        Object.keys(payload).forEach((key) => (payload[key] == null || payload[key] === '') && delete payload[key])
        this.getProductConfigInvoices(payload)
        if (!this.isPagination) this.currentPage = 1;
      },
      getDateFormat(date) {
        return (date) ? formatDate(date) : ''
      },
      handleChangePage(event) {
        this.currentPage = event;
        this.isPagination = true;
        //this.getProductConfigInvoices({pageNum})
        this.handleFilterInvoice()
      },
    },
    filters: {
      numberToMoneyFormat(value) {
        return (!value) ? '' : `EUR ${value}`
      }
    },
  }
</script>

<style scoped lang="scss">
  $table-border-gray: #dee2e6;

  .kyc {
    &__view__invoice {
      .btn {
        margin: 0;
        min-width: 158px;
      }

      .page__title {
        font-family: 'Poppins', sans-serif;
        font-weight: 900;
      }

      .card {
        &-body {
          padding-left: 0;
          padding-right: 0;
        }

        &-title {
          margin-left: 10px;
        }
      }
    }

    &__invoice__total {
      min-width: 430px;
      display: flex;
      justify-content: space-between;
      margin-right: 17px;
    }
  }

  .table-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }


  tbody {
    tr {
      position: static;

      td {
        position: static;
      }
    }
  }

  /deep/ {
    .table__wrapper {
      &.ceevo__table--auto-height {
        &.ceevo__table--responsive {
          &.ceevo__table--condensed {
            &.ceevo__table--striped {
              padding: 0 0 10px 0;
            }
          }
        }
      }
    }

    .div-max-length {
      font-weight: bold !important;
    }

    .ceevo__table {
      width: 100% !important;
      overflow: auto !important;

      .cell {
        text-align: center;
        min-width: unset;
        padding-left: 0;
        padding-right: 0;
      }

      &.table {
        margin-bottom: 0;

        thead {
          tr {
            th {
              overflow: auto !important;
              border-top-color: $table-border-gray !important;

              .ceevo__heading-label {
                padding-left: 10px;
                justify-content: start;
              }
            }
          }
        }

        tbody {
          outline: none !important;

          tr {
            position: static;

            td {
              border-left: 1px solid $table-border-gray !important;
              min-width: unset;
              position: static;

              &:first-child {
                border: none !important;
              }
            }
          }

          td {
            &:first-child {
              .cell {
                border: none;
              }
            }

            .cell {
              text-align: left;
              padding-left: 10px;
            }
          }

          tr {
            &:last-child {
              .btn-outline-primary {
                border-bottom-width: 1px !important;
              }

              td {
                border-bottom: 1px solid $table-border-gray !important;
              }
            }
          }
        }
      }

      .ceevo__heading-label {
        justify-content: center;
        padding-left: 0;
        padding-right: 0;
      }

      &_custom {
        div {
          text-align: right;
          margin-right: 10px;
        }
      }
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
</style>
