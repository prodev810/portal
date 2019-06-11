<template>
  <div class="container-fluid d-xl-flex">
    <div class="kyc-client col-md-6">
      <el-row class="row flex-row justify-content-between w-100">
        <span class="h2 kyc-client__sub-head">{{ title }}</span>
        <p-button
          v-if="btn"
          round
          type="default"
          class="search-button"
          @click="searchHandle"
        >
          View Client
        </p-button>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Name</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.name}}</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Client Ref</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.ref}}</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account Contact</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">{{userData.contact}}</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Account e-mail</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name"><a :href="'mailto:' + userData.email" class="kyc-client-row__link">{{userData.email}}</a></p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Issuing Client</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Screening</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Proof of address</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Status</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Resereening interval</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row justify-content-between">
        <div class="item btn-item">
          <p-button
            @click.native="modals.visible = true"
            type="primary"
            class="search-button"
            @click="searchHandle"
          >
            {{ textBtnSuccess }}
          </p-button>
        </div>
        <div class="item btn-item">
          <p-button
            type="default"
            class="search-button"
            @click="searchHandle"
          >
            Cancel
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
            <p-button type="success" round @click.native="modals.visible = false">Yes</p-button>
            <p-button type="default" round @click.native="modals.visible = false">Cancel</p-button>
          </div>
        </modal>
      </el-row>

    </div>
    <div class="kyc-client col-md-6">
      <el-row class="row">
        <h2 class="col-12 kyc-client__sub-head">Fees</h2>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Currency</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>


      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Full Application</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">3.00</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">ID Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">3.33</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">POA Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">2.40</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Sanotion Rescreen</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">0.10</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">SMS Fee</p>
        </el-col>
        <el-col :sm="14">
          <p class="kyc-client-row__text kyc-client-row__name">0.10</p>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Reminder</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">Auto Close</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>


      <el-row class="row kyc-client-row align-items-center">
        <el-col :sm="10">
          <p class="kyc-client-row__text kyc-client-row__title">KYC Auto Followup Close</p>
        </el-col>
        <el-col :sm="14">
          <el-select class="kyc-client-select" v-model="valueSelect">
            <el-option v-for="item in dataForSelects"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import {Modal} from 'src/components/UIComponents'
  export default {
    components:{
      Modal,
    },
    props: ['title', 'textBtnSuccess', 'btn'],
    data() {
      return {
        modals:{
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
    computed:{
      handleModalTitle(){
        if(this.btn){
          return 'Create'
        }
        return 'Edit'
      },
      handleModalText(){
        if(this.btn){
          return 'Are you sure you want to create the KYC client?'
        }
        return 'Are you sure you want to save your changes to the KYC client?'
      },
    },
    methods: {
      searchHandle() {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .kyc-client{
    .h2{
      margin-bottom: 0;
    }
    .btn{
      margin: 0;
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
    border-radius: 30px;
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
    transition : .2s;
    color: #7039DA;
  }
  .kyc-client-row__link:hover {
    transition : .2s;
    color: #5823bd;
  }
  .el-select.kyc-client-select.el-input--suffix.el-input__inner {
    border: 1px solid black;
    border-radius: 1px;
  }

  /deep/{
    .modal-dialog{
      min-width: 760px;
      text-align: center;
      .modal-header{
        border-bottom-color: transparent!important;
      }
      .modal-footer{
        border-top-color: transparent!important;
      }
      .btn{
        width: 178px;
        margin-bottom: 50px;
      }
    }
  }

  .el-select{
    &.kyc-client-select{
      /deep/{
        .el-input {
          .el-input__inner {
            border: 1px solid black;
            border-radius: 1px;
          }
          .el-icon-arrow-up{
            &:before{
              font-family: FontAwesome;
              content: "\f0de" !important;
              transform: translateY(-50%);
              position: absolute;
              font-size: 18px;
              color: #292929;
              width: 30px;
              right: 0;
              top: 60%;
            }
          }
          .el-select__caret{
            &.is-reverse{
              transform: rotateZ(180deg);
            }
          }
        }
      }
    }
  }
</style>
