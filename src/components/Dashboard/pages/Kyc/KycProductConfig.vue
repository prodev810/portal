<template>
  <el-row :gutter="20" class="kyc__product__config">
    <el-col :md="24">
      <el-row>
        <div class="d-flex justify-content-between">
          <span class="kyc__product__title">Overview KYC Clients</span>
          <router-link to="/kyc/product-config/create-client">
            <p-button class="text-capitalize" round>Create new client</p-button>
          </router-link>
        </div>
        <div class="card">
          <regular-table class="kyc__module__table"
                         striped responsive condensed
                         :headings="tableHeadings"
                         :value="tableProductConfigData">
            <template slot-scope="index">
              <td>
                <p-button type="primary"
                          outline
                          @click="handleViewInvoice(index)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_view invoice.svg" alt="">
                  </slot>
                  <strong class="kyc-button__title">View Invoice</strong>
                </p-button>
                <p-button type="primary"
                          outline
                          @click="handleEditClient(index.index.row.id)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_edit.svg" alt="">
                  </slot>
                  <strong class="kyc-button__title">Edit</strong>
                </p-button>
                <p-button type="primary"
                          outline
                          @click="handleViewClient(index.index.row.id)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_view statement.svg" alt="">
                  </slot>
                  <strong class="kyc-button__title">View Client</strong>
                </p-button>
              </td>
            </template>
          </regular-table>
          <div class="table-pagination">
            <p-pagination
              :page-count="pageCount"
              v-model="currentPage"
              @input="handleInput"
              :perPage="perPage"></p-pagination>
          </div>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"
  import PButton from "@/components/UIComponents/Button"
  import {KYC_GET_PRODUCT_CONFIG_ALL_CLIENTS} from "../../../../store/types"
  import PPagination from "../../../UIComponents/Pagination.vue"
  import clientTypes from '../../../../utils/clientTypes'

  export default {
    name: "KycProductConfig",
    components: {
      RegularTable, PButton, PPagination,
    },
    created() {
      const pageNum = this.isPagination ? this.currentPage - 1 : 0
      this.getProductConfigClient({pageNum})
      console.log('created')
      if (this.productConfigClients && this.productConfigClients.pageMeta){
        this.pageCount = this.productConfigClients.pageMeta.totalPages;
        this.perPage = this.productConfigClients.pageMeta.perPage;
        console.log('page Meta')
      }
    },
    computed: {
      ...mapState({
        productConfigClients: state => state.kyc.productConfigClients
      }),
      tableProductConfigData() {
        if (this.productConfigClients && this.productConfigClients.clientInfos) {
          return this.productConfigClients.clientInfos.map(data => {

            const classes = {};
            data.issuing = data.clientType === clientTypes.ISSUING
            this.tableCustomColumns.forEach(column => {
              classes[column] = this.getCustomClassName(data[column], column)
            });

            data.clientStatus = data.clientStatus.toLowerCase()
            data.issuing = this.getYesNoFromBoolean(data.issuing)
            data.idCheckRequired = this.getYesNoFromBoolean(data.idCheckRequired)
            data.sanctionCheckRequired = this.getYesNoFromBoolean(data.sanctionCheckRequired)
            data.poaCheckRequired = this.getYesNoFromBoolean(data.poaCheckRequired)
            data.classes = classes;
            return data
          })
        }
      },
      pageCount(){
        if (this.productConfigClients && this.productConfigClients.pageMeta) {
          return this.productConfigClients.pageMeta.totalPages
        }
      },
      perPage(){
        if (this.productConfigClients && this.productConfigClients.pageMeta) {
          return this.productConfigClients.pageMeta.perPage
        }
      },
    },
    methods: {
      ...mapActions({
        getProductConfigClient: KYC_GET_PRODUCT_CONFIG_ALL_CLIENTS,
      }),
      getYesNoFromBoolean(value) {
        return value ? 'Yes' : 'No'
      },
      getCustomClassName(value, name) {
        if (name === 'clientStatus') {
          return value.toLowerCase()
        }
        return (value) ? 'success' : 'danger'
      },
      handleViewClient(clientId) {
        this.$router.push({path: `/kyc/product-config/view-client/${clientId}`});
      },
      handleEditClient(clientId) {
        this.$router.push({path: `/kyc/product-config/edit-client/${clientId}`});
      },
      handleViewInvoice(id) {
        this.$router.push({path: `/kyc/product-config/view-invoice/${id}`});
      },
      handleInput(ev) {
        const pageNum = ev - 1;
        this.getProductConfigClient({pageNum})
        console.log('pagination ', ev)
      },
    },
    data() {
      return {
        totalPages: 0,
        currentPage: 1,
        isPagination: false,
        tableHeadings: [
          {name: 'clientName', label: 'Client Name'},
          {name: 'clientReference', label: 'Client App'},
          {name: 'contactName', label: 'Account Contact'},
          {name: 'contactEmail', label: 'Account E-mail', email: true},
          {name: 'issuing', label: 'Issuing', custom: true},
          {name: 'idCheckRequired', label: 'ID', custom: true},
          {name: 'sanctionCheckRequired', label: 'Screening', custom: true},
          {name: 'poaCheckRequired', label: 'Proof Of Address'},
          {name: 'clientStatus', label: 'Status', status: true},
        ],

        tableCustomColumns: [
          'issuing', 'idCheckRequired', 'sanctionCheckRequired', 'poaCheckRequired', 'clientStatus'
        ],

      }
    }
  }
</script>

<style lang="scss" scoped>
  $table-border-gray: #dee2e6;
  $table-column-success: #C9F4DF;
  $table-column-danger: #FDD9DA;
  $table-column-active: #3ED683;
  $table-column-inactive: #F86A6A;
  $table-column-closed: #292929;

  .kyc__product__config {
    /deep/ {
      .table__wrapper.ceevo__table--auto-height.ceevo__table--responsive.ceevo__table--condensed.ceevo__table--striped {
        padding: 0 !important;
      }
    }

    .kyc__product__title {
      font-size: 28px;
      font-weight: 900;
      font-family: 'Poppins', sans-serif;
      margin: auto 0;
    }

    .btn {
      padding-left: 30px;
      padding-right: 30px;
      font-weight: bold;
    }

    .kyc__product__btn {
      box-sizing: border-box;
      border-radius: 0;
      border-bottom: unset;
      text-transform: capitalize;
      position: relative;
    }

    .btn-outline-primary {
      border-width: 1px !important;
      border-right-width: 0 !important;
      border-bottom-width: 0 !important;

      &:hover {
        background-color: white !important;
        color: #9E79E7 !important;
      }

      &:last-child {
        border-right-width: 1px !important;
      }
    }

    .ic__icon {
      height: 20px;
      margin-right: 7px;
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
    }

    .kyc__module__table {
      /deep/ {
        .ceevo__table {
          overflow: auto !important;

          .ceevo__table_status {
            text-transform: capitalize;
            color: white;
          }

          .cell {
            text-align: center;
            min-width: unset;
            padding-left: 6px !important;
            padding-right: 0;
            font-weight: bold;
          }

          &.table {
            margin-bottom: 0;

            thead {
              th {
                overflow: auto !important;

                &:first-child {
                  .ceevo__heading-label {
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
                    padding-left: 6px;
                    text-align: left;
                  }
                }

                &:last-child {
                  border-left: none !important;
                }
              }

              tr {
                &:last-child {
                  .btn-outline-primary {
                    border-bottom-width: 1px !important;
                  }
                }
              }
            }
            td {
              background-clip: padding-box;
            }
          }

          .ceevo__heading-label {
            justify-content: center;
            padding-left: 6px;
            padding-right: 0;
          }

          .success {
            background-color: $table-column-success;
          }

          .danger {
            background-color: $table-column-danger;
          }

          .active {
            background-color: $table-column-active;
          }

          .inactive {
            background-color: $table-column-inactive;
          }

          .closed {
            background-color: $table-column-closed;
            color: white;
          }
        }
      }
    }

    .table-pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }

  }

</style>
