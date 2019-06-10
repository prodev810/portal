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
            <span class="mr-5"><b>From</b> YYYY-MM-DD-HH-MM</span>
            <span><b>To</b> YYYY-MM-DD-HH-MM</span>
          </div>
          <regular-table striped
                         :headings="tableHeadings"
                         :value="viewInvoiceData">
          </regular-table>
          <el-row class="d-flex justify-content-end">
            <span class="kyc__invoice__total">
              <b class="text-uppercase">Sum</b> {{invoiceTotal | moneyFormat}}
            </span>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"

  export default {
    name: "KycViewInvoice",
    components: {
      RegularTable,
    },
    data() {
      return {
        tableHeadings: [
          {name: 'clientName', label: 'KYC Client Code'},
          {name: 'clientRef', label: 'App Requested'},
          {name: 'timestamp', label: 'Time Stamp'},
          {name: 'chargeType', label: 'Charge Type'},
          {name: 'description', label: 'Description'},
          {name: 'amount', label: 'Amount', custom: true},
        ],

        viewInvoiceData: [
          {
            clientName: 'KYCACQ',
            clientRef: 'Acquiring',
            timestamp: 'YYYY-MM-DD-HH-MM',
            chargeType: 'Sanction Screen',
            description: '',
            amount: 'EUR 1.00',
          },
          {
            clientName: 'KYCACQ',
            clientRef: 'Acquiring',
            timestamp: 'YYYY-MM-DD-HH-MM',
            chargeType: 'POA Screen',
            description: '',
            amount: 'EUR 2.00',
          },
          {
            clientName: 'KYCACQ',
            clientRef: 'Acquiring',
            timestamp: 'YYYY-MM-DD-HH-MM',
            chargeType: 'ID Screen',
            description: '',
            amount: 'EUR 3.00',
          },
          {
            clientName: 'KYCACQ',
            clientRef: 'Acquiring',
            timestamp: 'YYYY-MM-DD-HH-MM',
            chargeType: 'Application Fee',
            description: '',
            amount: 'EUR 1.00',
          },
        ],

        invoiceTotal: 7,
      }
    },
    filters: {
      moneyFormat(value) {
        if (!value) {
          return ''
        }

        return `EUR ${value}.00`
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

  /deep/ {
    .table__wrapper{
      &.ceevo__table--auto-height{
        &.ceevo__table--responsive{
          &.ceevo__table--condensed{
            &.ceevo__table--striped{
              padding: 0 0 10px 0;
            }
          }
        }
      }
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
            td {
              border-left: 1px solid $table-border-gray !important;
              min-width: unset;

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
  }
</style>
