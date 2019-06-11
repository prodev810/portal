<template>
  <el-row :gutter="20" class="kyc__product__config">
    <el-col :md="24">
      <el-row>
        <div class="d-flex justify-content-between">
          <span class="kyc__product__title">Overview KYC Client</span>
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
                          @click="handleViewInvoice(1)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_view invoice.svg" alt="">
                  </slot>
                  <span class="kyc-button__title">View Invoice</span>
                </p-button>
                <p-button type="primary"
                          outline
                          @click="handleEditClient(1)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_edit.svg" alt="">
                  </slot>
                  <span class="kyc-button__title">Edit</span>
                </p-button>
                <p-button type="primary"
                          outline
                          @click="handleViewClient(1)"
                          class="kyc__product__btn">
                  <slot name="label">
                    <img class="img-responsive ic__icon"
                         src="../../../../../public/static/img/dashboard_icons/ic_view statement.svg" alt="">
                  </slot>
                  <span class="kyc-button__title">View Client</span>
                </p-button>
              </td>
            </template>
          </regular-table>
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import RegularTable from "@/components/UIComponents/CeevoTables/RegularTable/RegularTable"
  import PButton from "@/components/UIComponents/Button"

  export default {
    name: "KycProductConfig",
    components: {
      RegularTable, PButton,
    },
    computed: {
      tableProductConfigData() {
        return this.productConfigData.map(data => {
          const classes = {};
          this.tableCustomColumns.forEach(column => {
            classes[column] = this.getCustomClassName(data[column], column)
          });
          data.classes = classes;
          return data
        })
      }
    },
    methods: {
      getCustomClassName(value, name) {
        if (name === 'status') {
          return value.toLowerCase()
        }
        return (value.toLowerCase() === 'yes') ? 'success' : 'danger'
      },
      handleViewClient(id) {
        this.$router.push({path: `/kyc/product-config/view-client/${id}`});
      },
      handleEditClient(id) {
        this.$router.push({path: `/kyc/product-config/edit-client/${id}`});
      },
      handleViewInvoice(id) {
        this.$router.push({path: `/kyc/product-config/view-invoice/${id}`});
      },
    },
    data() {
      return {
        tableHeadings: [
          {name: 'clientName', label: 'Client Name'},
          {name: 'clientRef', label: 'Client App'},
          {name: 'accountContact', label: 'Account Contact'},
          {name: 'accountEmail', label: 'Account e-mail', email: true},
          {name: 'issuing', label: 'Issuing', custom: true},
          {name: 'ident', label: 'ID', custom: true},
          {name: 'screening', label: 'Screening', custom: true},
          {name: 'proofofaddress', label: 'Proof Of address'},
          {name: 'status', label: 'Status', status: true},
        ],

        tableCustomColumns: [
          'issuing', 'ident', 'screening', 'proofofaddress', 'status'
        ],

        productConfigData: [
          {
            clientName: 'Acwqee',
            clientRef: 'KYCACQ',
            accountContact: 'Peter Gibbons',
            accountEmail: 'gibbons@email.com',
            issuing: 'Yes',
            ident: 'Yes',
            screening: 'Yes',
            proofofaddress: 'Yes',
            status: 'Active',
            classes: {
              status: 'active',
              issuing: 'success'
            }
          },
          {
            clientName: 'Abc Name',
            clientRef: 'KYCACQ',
            accountContact: 'Peter Gibbons',
            accountEmail: 'gibbons@email.com',
            issuing: 'No',
            ident: 'Yes',
            screening: 'Yes',
            proofofaddress: 'No',
            status: 'Inactive',
          },
          {
            clientName: 'Chn Name',
            clientRef: 'KYCACQ',
            accountContact: 'Peter Gibbons',
            accountEmail: 'gibbons@email.com',
            issuing: 'No',
            ident: 'Yes',
            screening: 'Yes',
            proofofaddress: 'No',
            status: 'Closed',
          },
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

    .kyc__product__title {
      font-size: 28px;
      font-weight: 900;
      font-family: 'Poppins', sans-serif;
      margin: auto 0;
    }

    .btn {
      padding-left: 30px;
      padding-right: 30px;
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

          .cell {
            text-align: center;
            min-width: unset;
            padding-left: 0;
            padding-right: 0;
          }

          &.table {
            margin-bottom: 0;

            thead {
              th {
                overflow: auto !important;
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
          }

          .ceevo__heading-label {
            justify-content: center;
            padding-left: 0;
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

  }

</style>
