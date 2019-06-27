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
              <fg-input v-model="card.accountId"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Customer Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.customerCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Card Holder Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.cardHolderName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Fourth Line</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.fourthLine"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Matrix Pid</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.matrixPid"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Delivery Title</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryTitle"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery First Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryFirstName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Last Name</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryLastName"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row class="mt-4">
            <label class="row-label">
              <strong>Delivery Mobile Phone</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryMobilePhone"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 1</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryAddress1"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 2</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryAddress2"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Address 3</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryAddress3"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery City</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryCity"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Country Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryCountryCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Post Code</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryPostCode"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-row>
            <label class="row-label">
              <strong>Delivery Region</strong>
            </label>
            <div class="d-inline-flex form-input-block">
              <fg-input v-model="card.deliveryRegion"
                        class="w-100"></fg-input>
            </div>
          </el-row>

          <el-col :md="24" class="mt-5">
            <div class="btn-block text-center">
              <p-button round type="primary" class="mr-3"
                        @click="handleSaveCard()">Save</p-button>
              <p-button round
                        @click="handleClose()">Close and Return</p-button>
            </div>
          </el-col>

        </el-col>

      </el-row>

    </el-row>
  </el-row>
</template>

<script>
  export default {
    name: "KycReviewEditCardCreation",
    data() {
      return {
        card:{
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
        },
      }
    },
    created(){
      console.log('card review created')
    },
    methods:{
      handleSaveCard(){
        console.log('save card')
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
