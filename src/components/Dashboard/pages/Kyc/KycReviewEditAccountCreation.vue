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
              <fg-input v-model="account.accountInformation.merchantUsn"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>IssuerInst Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.issuerInstCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Program Manager Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.programManagerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Program Owner Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.programOwnerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Card Program Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.cardProgramCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Currency Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.currencyCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Card Program ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.cardProgramID"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Reseller Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.resellerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>KYC Level</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.KYCLevel"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fee Profile ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.feeProfileID"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer ID Type</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.customerIDType"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer ID</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.customerID"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Account Reference</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.accountInformation.accountReference"
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
              <fg-input v-model="account.particulars.title"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>First Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.firstName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Second Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.secondName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Last Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.lastName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Maiden Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.maidenName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Gender</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.gender"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Birth Date</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.birthDate"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Email</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.email"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Home Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.homePhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Work Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.workPhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Mobile Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.particulars.mobilePhone"
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
              <fg-input v-model="account.primaryAddress.addressline1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.addressline2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.addressline3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>City / Town</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.city"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.region"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.postCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Country Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.primaryAddress.countryCode"
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
              <fg-input v-model="account.overrideAddress.addressline1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.addressline2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Address line 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.addressline3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>City / Town</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.city"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.region"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.postCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Country Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.overrideAddress.countryCode"
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
              <fg-input v-model="account.miscellaneous.cardHolderName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fourth Line</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.fourthLine"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>KYC Appr Ref Number</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.KYCApprRefNumber"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Proof Of Passport URL</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.proofOfPassportURL"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Proof Of Address URL</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.proofOfAddressURL"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Memorable Word</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.memorableWord"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Access Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="account.miscellaneous.accessCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

        </el-col>
      </el-row>

      <el-row>
        <el-col :md="24" class="text-center">
          <p-button round type="primary" class="mr-3"
                    @click="handleSaveAccount()">Save</p-button>
          <p-button round
                    @click="handleClose()">Close and Return</p-button>
        </el-col>
      </el-row>

    </el-row>
  </el-row>
</template>

<script>
  export default {
    name: "KycReviewEditAccountCreation",
    data() {
      return {
        account:{
          accountInformation:{
            merchantUsn: '2136855643',
            issuerInstCode: 'HGDSBV',
            programManagerCode: 'T24PM',
            programOwnerCode: 'T24UK',
            cardProgramCode: 'JFDST',
            currencyCode: '245',
            cardProgramID: '3',
            resellerCode: 'Reseller$5',
            KYCLevel: '3',
            feeProfileID: '1',
            customerIDType: '3',
            customerID: 'DEBUG-TGF-1222-3231',
            accountReference: '',
          },
          particulars:{
            title: '1',
            firstName: 'John',
            secondName: 'Doe',
            lastName: 'Smith',
            maidenName: 'Copper',
            gender: 1,
            birthDate: '19900201',
            email: 'jd@test.com',
            homePhone: '+2399990345',
            workPhone: '+2399440345',
            mobilePhone: '+2399690395',
          },
          primaryAddress:{
            addressline1: 'Street 11',
            addressline2: '',
            addressline3: '',
            city: 'New York',
            region: 'New York',
            postCode: '11111',
            countryCode: '344',
          },
          overrideAddress:{
            addressline1: '',
            addressline2: '',
            addressline3: '',
            city: '',
            region: '',
            postCode: '',
            countryCode: '',
          },
          miscellaneous:{
            cardHolderName: 'John Smith',
            fourthLine: 'FDD TESET',
            KYCApprRefNumber: 'KYC-1234',
            proofOfPassportURL: 'https://test.com/poa/1234',
            proofOfAddressURL: 'https://test.com/poa/1256',
            memorableWord: 'Hello',
            accessCode: '123456',
          },
        },

      }
    },
    created(){
      console.log('r params',this.$route.params)
      if(this.$route.params && this.$route.params.accountReferenceId){
        this.account.accountInformation.accountReference = this.$route.params.accountReferenceId
      }
    },
    methods:{
      handleSaveAccount(){
        console.log('save acc')
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

  .account-creation-page {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: $text-color;

    .sub-title{
      font-size: 18px;
    }

    .btn{
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
