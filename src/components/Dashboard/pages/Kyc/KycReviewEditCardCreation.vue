<template>
  <el-row class="card-creation-page">
    <el-row>
      <el-col :md="24" class="mb-5">
        <strong class="h3 page-block-title">Review and Edit Card Creation</strong>
      </el-col>

      <el-row class="second-row">
        <!--Account Information-->
        <el-col :md="12">

          <el-row>
            <label class="row-label">
              <strong>Account ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.accountId"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.customerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Card Holder Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.cardHolderName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fourth Line</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.fourthLine"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Matrix Pid</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.matrixPID"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Delivery Title</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvTitle"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery First Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvFirstName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Last Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvLastName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Delivery Mobile Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvMobilePhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 1</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvAddress1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvAddress2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvAddress3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery City</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvCityTown"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Country Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvCountryCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvPostCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="cardInfo.dlvRegion"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-col :md="24" class="mt-5">
            <div class="btn-block text-center">
              <p-button round type="primary" class="mr-3"
                        :class="{disabled: isDisabledEdit}"
                        @click="handleSaveCard()">Save</p-button>
              <p-button round
                        @click="handleClose()">Close and Return</p-button>
            </div>
          </el-col>

        </el-col>

      </el-row>

    </el-row>
    <PSpinner v-if="isLoading"></PSpinner>
  </el-row>
</template>

<script>
  import {
    ISSUING_GET_CARD_REQUEST,
    GETTER_ISSUING_CARD,
    ISSUING_PUT_CARD_REQUEST,
    GETTER_ISSUING_LOADINGSTATE,
    ISSUING_CARD_REQUEST,
    SHOW_TOAST_MESSAGE,
  } from '@/store/types'
  import {mapActions, mapGetters} from 'vuex'
  import LOADING_STATE from '../../../../utils/loadingState'
  import PSpinner from '../../../../components/UIComponents/Spinner'

  export default {
    name: "KycReviewEditCardCreation",
    components:{
      PSpinner,
    },
    data() {
      return {
        cardInfo: {},
        /*cardInfo:{
          accountId: '',
          customerCode: '',
          cardHolderName: '',
          fourthLine: '',
          matrixPid: '',
          deliveryTitle: '',
          deliveryFirstName: '',
          deliveryLastName: '',
          deliveryMobilePhone: '',
          deliveryAddress1: '',
          deliveryAddress2: '',
          deliveryAddress3: '',
          deliveryCity: '',
          deliveryRegion: '',
          deliveryPostCode: '',
          deliveryCountryCode: '',
        },*/
        id: null,
      }
    },
    created(){
      if(this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
        this.getIssuingCardInfo(this.id)
      }
    },
    computed:{
      ...mapGetters({
        getCardInfo: GETTER_ISSUING_CARD,
        loadingState: GETTER_ISSUING_LOADINGSTATE,
      }),
      isLoading() {
        return this.loadingState !== LOADING_STATE.IDEAL;
      },
      isDisabledEdit(){
        return this.getCardInfo.isSuccess
      },
    },
    watch:{
      getCardInfo(newVal){
        this.cardInfo = newVal.issuingCardRequestInfoData
      }
    },
    methods:{
      ...mapActions({
        getIssuingCardInfo: ISSUING_GET_CARD_REQUEST,
        putCardRequest: ISSUING_PUT_CARD_REQUEST,
      }),
      async handleSaveCard(){
        if (!this.id) return
        await this.putCardRequest({id:this.id, body: this.cardInfo})
          .then(data => {
            this.handleClose()
          })
          .catch(error => {
            this.$store.dispatch(SHOW_TOAST_MESSAGE, {
              message: error.detail,
              status: 'danger'
            })
          })
      },
      handleClose(){
        this.$router.push('/kyc/approved-emoney-account')
      },
    },
  }
</script>

<style scoped lang="scss">
  $text-color: #292929;
  $input-border: #8D8D8D;

  .card-creation-page {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: $text-color;

    .btn{
      height: 42px;
      width: 200px;
      text-transform: unset;
    }

    .btn-block{
      width: 615px;
    }

    .page-block-title {
      font-weight: bold;
    }

    .row-label {
      width: 200px;
    }

    .form-input-block {
      width: 415px;
    }

    label {
      margin-bottom: 0;
    }

    .second-row{
      margin-bottom: 90px;
    }

    /deep/ {
      input{
        font-family: 'Poppins', sans-serif;
      }
      .btn {
        text-transform: unset;
      }

      .el-input__inner, .form-control {
        border-color: $input-border;
        color: $text-color;
        border-radius: 7px;
        font-weight: bold;
      }

      .btn-outline-primary, .btn-outline-success, .btn-outline-danger {
        border-width: 1px !important;
        border-radius: unset !important;
      }
    }

  }
</style>
