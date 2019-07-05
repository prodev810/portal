<template>
  <el-row class="account-creation-page">
    <el-row>
      <el-col :md="24" class="mb-4">
        <strong class="h3 page-block-title">Review and Edit Account Creation</strong>
      </el-col>

      <el-row class="second-row">
        <!--Account Information-->
        <el-col :md="12">

          <el-row class="mb-2">
            <strong class="sub-title">Account Information</strong>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Merchant USN</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.merchantUSN"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>IssuerInst Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.issuerInstCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Program Manager Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.programManagerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Program Owner Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.programOwnerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Card Program Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.cardProgramCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Currency Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.currencyCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Card Program ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.cardProgramId"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Reseller Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.resellerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>KYC Level</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.kycLevel"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fee Profile ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.feeProfileId"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer ID Type</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.customerIdType"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.customerId"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Account Reference</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.accountReference"
                        class="w-100"></fg-input>
            </div>
          </el-row>

        </el-col>
        <!--Particulars-->
        <el-col :md="12">

          <el-row class="mb-2">
            <strong class="sub-title">Particulars</strong>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Title</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.title"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>First Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.firstName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Second Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.secondName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Last Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.lastName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Maiden Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.maidenName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Gender</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.gender"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Birth Date</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.birthDate"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Email</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.email"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Home Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.homePhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Work Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.workPhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Mobile Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.mobilePhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

        </el-col>
      </el-row>

      <el-row class="second-row">
        <!--Primary Address-->
        <el-col :md="12">

          <el-row class="mb-2">
            <strong class="sub-title">Primary Address</strong>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 1</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.address1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.address2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.address3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>City / Town</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.city"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.region"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.postCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>CountryCode</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.primaryAddress.countryCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>


        </el-col>
        <!--Override Address-->
        <el-col :md="12">

          <el-row class="mb-2">
            <strong class="sub-title">Override Address</strong>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 1</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.address1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.address2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.address3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>City / Town</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.city"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.region"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.postCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>CountryCode</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.overrideAddress.countryCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>


        </el-col>
      </el-row>

      <el-row class="second-row">
        <!--Miscellaneous-->
        <el-col :md="12">

          <el-row class="mb-2">
            <strong class="sub-title">Miscellaneous</strong>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Card Holder Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.cardHolderName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fourth Line</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.fourthLine"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>KYC Appr Ref Number</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.kycAppRefNumber"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Proof Of Passport URL</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.proofOfPassportUrl"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Proof Of Address URL</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.proofOfAddressUrl"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Memorable Word</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.memorableWord"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Access Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="accountInfo.accessCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

        </el-col>
      </el-row>

      <el-row>
        <el-col :md="24" class="text-center">
          <p-button round type="primary" class="mr-3"
                    @click="handleSaveAccount()">Save
          </p-button>
          <p-button round
                    @click="handleClose()">Close and Return
          </p-button>
        </el-col>
      </el-row>
    </el-row>
    <PSpinner v-if="isLoading"></PSpinner>
  </el-row>
</template>

<script>
  import PSpinner from '../../../../components/UIComponents/Spinner'
  import {
    ISSUING_ACCOUNT_REQUEST,
    ISSUING_GET_ACCOUNT_REQUEST,
    ISSUING_PUT_ACCOUNT_REQUEST,
    GETTER_ISSUING_LOADINGSTATE,
    GETTER_ISSUING_ACCOUNT,
  } from '@/store/types'
  import {mapActions, mapGetters} from 'vuex'
  import LOADING_STATE from '../../../../utils/loadingState'

  export default {
    name: "KycReviewEditAccountCreation",
    components:{
      PSpinner,
    },
    data() {
      return {
        accountInfo:  {
          accessCode: '',
          accountReference: '',
          birthDate: '',
          cardHolderName: '',
          cardProgramCode: '',
          cardProgramId: 0,
          currencyCode: '',
          customerId: '',
          customerIdType: 0,
          email: '',
          feeProfileId: 0,
          firstName: '',
          fourthLine: '',
          gender: '',
          homePhone: '',
          issuerInstCode: '',
          kycAppRefNumber: '',
          kycLevel: 0,
          lastName: '',
          maidenName: '',
          memorableWord: '',
          merchantUSN: 0,
          mobilePhone: '',
          overrideAddress: {
            address1: '',
            address2: '',
            address3: '',
            city: '',
            countryCode: '',
            postCode: '',
            region: ''
          },
          primaryAddress: {
            address1: '',
            address2: '',
            address3: '',
            city: '',
            countryCode: '',
            postCode: '',
            region: ''
          },
          programManagerCode: '',
          programOwnerCode: '',
          proofOfAddressUrl: '',
          proofOfPassportUrl: '',
          resellerCode: '',
          secondName: '',
          title: '',
          workPhone: ''
        },
        id: null,
      }
    },
    created() {
      if (this.$route.params && this.$route.params.id) {
        this.id = this.$route.params.id
        this.getIssuingAccount(this.id)
      }
    },
    watch:{
      getAccountInfo(newVal){
        this.accountInfo = newVal
      },
    },
    computed: {
      ...mapGetters({
        getAccountInfo: GETTER_ISSUING_ACCOUNT,
        loadingState: GETTER_ISSUING_LOADINGSTATE,
      }),
      isLoading() {
        return this.loadingState !== LOADING_STATE.IDEAL;
      },
    },
    methods: {
      ...mapActions({
        getIssuingAccount: ISSUING_GET_ACCOUNT_REQUEST,
        putIssuingAccount: ISSUING_PUT_ACCOUNT_REQUEST,
      }),
      handleSaveAccount() {
        this.putIssuingAccount({id: this.id, body: this.accountInfo})
      },
      handleClose() {
        this.$router.push('/kyc/approved-emoney-account')
      },
    },
  }
</script>

<style scoped lang="scss">
  $text-color: #292929;
  $input-border: #8D8D8D;

  .account-creation-page {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: $text-color;

    .sub-title {
      font-size: 18px;
      font-weight: 900;
    }

    .btn {
      height: 42px;
      width: 200px;
      text-transform: unset;
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

    .second-row {
      margin-bottom: 90px;
    }

    /deep/ {
      input {
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
