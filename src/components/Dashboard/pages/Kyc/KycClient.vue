<template>
  <div class="container-fluid d-xl-flex">
    <div class="kyc-client col-md-6">
      <el-row class="w-100 mb-4 kyc__client__head">
        <div class="d-flex justify-content-between">
          <span class="h2 kyc-client__sub-head">{{ handlePageTitle }} KYC Client</span>
          <p-button
            v-if="isCreateMode"
            round
            type="default"
            @click="searchHandle"
          >
            View Client
          </p-button>
        </div>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Name</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.name}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Ref</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.ref}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account Contact</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.contact}}</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account e-mail</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"><a :href="'mailto:' + userData.email"
                                                                  class="kyc-client-row__link">{{userData.email}}</a>
          </p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Issuing Client</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Yes</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Yes</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Screening</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Yes</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Proof of address</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Yes</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Status</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Active</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Resereening interval</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>Yearly</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-inline-flex justify-content-between w-100">
        <div class="item btn-item">
          <p-button
            v-if="!isViewMode"
            round
            @click.native="modals.visible = true"
            type="primary"
            class="search-button"
            @click="searchHandle"
          >
            {{ handlePageBtn }}
          </p-button>
          <div v-else>
            <router-link to="/kyc/product-config/edit-client/1">
              <p-button round type="primary">
                {{handlePageBtn}}
              </p-button>
            </router-link>
          </div>
        </div>
        <div class="item btn-item">
          <p-button
            round
            type="default"
            @click="searchHandle"
          >
            {{handlePageCancelBtn}}
          </p-button>
        </div>
        <modal :show.sync="modals.visible"
               footer-classes="justify-content-center"
               type="notice">
          <h5 slot="header" class="modal-title">{{handleModalTitle}} KYC Client Confirmation</h5>
          <template>
            <p>{{handleModalText}}?</p>
          </template>
          <div slot="footer" class="w-50 d-flex justify-content-between">
            <router-link to="/kyc/product-config/view-client/1">
              <p-button round type="success" round @click.native="modals.visible = false">Yes</p-button>
            </router-link>
            <p-button round type="default" round @click.native="modals.visible = false">Cancel</p-button>
          </div>
        </modal>
      </el-row>

    </div>
    <div class="kyc-client col-md-6">
      <el-row class="mb-4">
        <span class="h2 kyc-client__sub-head">Fees</span>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Currency</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>EUR</span>
        </el-col>
      </el-row>


      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Full Application</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">3.00</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">3.33</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">POA Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">2.40</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Sanotion Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">0.10</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">SMS Fee</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">0.10</p>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Reminder</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>7 days</span>
        </el-col>
      </el-row>

      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Auto Close</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>30 days</span>
        </el-col>
      </el-row>


      <el-row class="kyc-client-row d-flex align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Auto Followup Close</p>
        </el-col>
        <el-col :sm="14">
          <el-select v-if="!isViewMode"
                     class="select-primary kyc__custom__primary__select"
                     v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-else>30 days</span>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import {Modal} from 'src/components/UIComponents'

  const KYC_CLIENT_MODE = {
    create: {
      modal: {title: 'Create', modalText: 'Are you sure you want to create the KYC client?'},
      page: {title: 'Create', btnText: 'Create'},
    },
    edit: {
      modal: {title: 'Edit', modalText: 'Are you sure you want to save your changes to the KYC client?'},
      page: {title: 'Edit', btnText: 'Save'},
    },
    view: {
      page:
        {title: 'View', btnText: 'Edit'}
    },
  }

  export default {
    components: {
      Modal,
    },
    props: ['title', 'textBtnSuccess', 'btn', 'mode'],
    data() {
      return {
        modals: {
          visible: false
        },
        valueSelect: '',
        userData: {
          name: 'Acquiring',
          ref: 'KYCACQ',
          contact: 'Peter Gibbons',
          email: 'gibbons@email.com'
        },
        dataForSelects: [
          {value: true, label: 'yes'},
          {value: false, label: 'no'},

        ]
      }
    },
    computed: {
      handleModalTitle() {
        return (KYC_CLIENT_MODE[this.mode].modal) ? KYC_CLIENT_MODE[this.mode].modal.title : ''
      },
      handleModalText() {
        return (KYC_CLIENT_MODE[this.mode].modal) ? KYC_CLIENT_MODE[this.mode].modal.modalText : ''
      },
      handlePageTitle() {
        return KYC_CLIENT_MODE[this.mode].page.title || ''
      },
      handlePageBtn() {
        return KYC_CLIENT_MODE[this.mode].page.btnText || ''
      },
      handlePageCancelBtn() {
        if (this.mode === 'view') {
          return 'Go Back'
        }
        return 'Cancel'
      },
      isCreateMode() {
        return this.mode === 'create'
      },
      isViewMode() {
        return this.mode === 'view'
      }
    },
    methods: {
      searchHandle() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  $grey-color: #8D8D8D;

  .kyc-client {
    padding-right: 225px;

    .h2 {
      margin-bottom: 0;
    }

    .btn {
      margin: 0;
      text-transform: none;
      width: 180px;
    }
  }

  .kyc__client__head {
    .btn {
      width: 150px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      padding: 0;
    }
  }

  .kyc-client__sub-head {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #292929;
    padding-left: 0;
  }

  .kyc-client-row {
    margin-bottom: 15px;
  }

  .search-button {
    text-transform: none;
    width: 180px;
  }

  .kyc-client-row__text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .kyc-client-row__title {
    font-weight: 600;
  }

  .kyc-client-row__name {
    font-weight: 100;
  }

  .kyc-client-row__link {
    transition: .2s;
    color: #7039DA;
  }

  .kyc-client-row__link:hover {
    transition: .2s;
    color: #5823bd;
  }

  .el-select.kyc__top__bottom__arrows.el-input--suffix.el-input__inner {
    border: 1px solid black;
    border-radius: 1px;
  }

  .kyc__custom__primary__select {
    /deep/ {
      .el-select-dropdown {
        .el-select-dropdown__item {
          background-color: black !important;

          &.selected {
            color: white !important;
          }

          &.hover, &:hover {
            background-color: #31AF6A !important;
          }
        }
      }
    }
  }

  /deep/ {
    .modal-dialog {
      min-width: 760px;
      text-align: center;

      .modal-header {
        border-bottom-color: transparent !important;
      }

      .modal-footer {
        border-top-color: transparent !important;
      }

      .btn {
        width: 178px;
        margin-bottom: 50px;
      }
    }

    .select-primary.el-select .el-input input,
    .select-primary.el-select .el-input:hover input,
    .select-primary.el-select .el-input:hover .el-input__icon {
      background-color: white;
      color: black;

      &:hover {
        background-color: white;
        color: black;
      }
    }

    .select-primary.el-select {
      .el-input {
        input {
          border-width: 1px;
          border-radius: 5px;
          color: $grey-color;

          &:hover {
            &::-webkit-input-placeholder {
              color: $grey-color;
            }

            &::-moz-placeholder {
              color: $grey-color;
            }

            &:-ms-input-placeholder {
              color: $grey-color;
            }

            &:-moz-placeholder {
              color: $grey-color;
            }
          }
        }
      }
    }
  }

  .el-select {
    &.kyc-client-select {
      /deep/ {
        .el-input {
          .el-input__inner {
            border: 1px solid black;
            border-radius: 1px;
          }

        }
      }
    }
  }
</style>
