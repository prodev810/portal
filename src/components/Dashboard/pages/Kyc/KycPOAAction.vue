<template>
  <div class="kyc-poa">
    <el-row class="kyc-poa-row w-100 d-flex align-items-center">
      <el-col :sm="12">
        <h2 class="col-12 kyc-poa__sub-head m-0">Application Info</h2>
      </el-col>
      <el-col :sm="12" class="justify-content-end d-flex">
        <p-button @click="handleClose" type="default" round class="kyc-poa-close-btn">Close</p-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="8">
        <el-row class="mb-1" v-for="(info, index) in applicationInfo" :key="index">
          <el-col :md="10">
            <strong>{{info.name}}</strong>
          </el-col>
          <el-col :md="14">
            <p>
              {{info.value}}
              <el-popover v-if="info.className" placement="bottom right" width="490" class="status-helper"
                          trigger="hover">
                <h5 class="sub-title">Status</h5>
                <table class="helper-table">
                  <tbody>
                  <tr v-for="(status, index) in statusList" :key="index">
                    <td>{{ status }}</td>
                  </tr>
                  </tbody>
                </table>
                <img slot="reference" class="ml-2 img-icon" :src="eyeIcon"/>
              </el-popover>
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="16">
        <el-row class="mb-1" v-for="(info, index) in applicationInfoII" :key="index">
          <el-col :md="5">
            <strong>{{info.name}}</strong>
          </el-col>
          <el-col :md="19">
            <p>{{info.value}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="mt-2">
      <el-col>
        <strong>POA Verification</strong>
      </el-col>
    </el-row>

    <el-row class="d-flex">
      <el-col :md="8">
        <el-row class="mb-2 d-flex align-items-center">
          <el-col :md="12" class="">
            <strong>Status</strong>
          </el-col>
          <el-col :md="12">
            <p class="kyc-poa-status">{{poaStatus}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-card class="client-info__card" :body-style="{ padding: '0px' }">
            <el-popover v-if="img" placement="right" width="550" class="image-zoom" trigger="hover">
              <img class="w-100" :src="`data:${getterPoaImg.mimeType};base64, ${getterPoaImg.content}`">
              <img class="client-info__card__img" slot="reference" v-if="img"
                   :src="`data:${getterPoaImg.mimeType};base64, ${getterPoaImg.content}`">
            </el-popover>
            <div v-else class="client-info__card__info d-flex justify-content-center align-items-center">
              <p>No document received</p>
            </div>
          </el-card>
        </el-row>
      </el-col>

      <el-col :md="16">
        <el-row class="mb-5 pl-5 d-flex align-items-center w-100">
          <el-col :md="6">
            <strong>Client Submitted information</strong>
          </el-col>
          <el-col :md="18" class="pl-2">
            <p-button type="primary"
                      class="btn-poa-action"
                      round>Action
            </p-button>
          </el-col>
        </el-row>

        <el-col :md="12" class="pl-5">
          <!--<el-row class="mb-2 d-flex align-items-center w-100">
            <el-col :md="14" class="">
              <strong>Client Submitted information</strong>
            </el-col>
            <el-col :md="10">
              <p-button type="primary"
                        class="w-100"
                        round>Action
              </p-button>
            </el-col>
          </el-row>-->
          <el-row>
            <table class="w-100 table-client-info">
              <tbody>
              <tr v-for="(client, index) in clientInformation" :key="index">
                <td><strong>{{client.name}}</strong></td>
                <td>{{client.value}}</td>
                <td>
                  <!--<img v-if="!editEmail" :src="editIcon" width="20" class="ml-3 img-icon" @click="editEmail = !editEmail" />-->
                  <img :src="editIcon" width="20" class="ml-3 img-icon"/>
                </td>
              </tr>
              </tbody>
            </table>
          </el-row>
          <el-row>
            <p-button class="poa-btn-download" round>Download</p-button>
          </el-row>
        </el-col>
        <el-col :md="12" class="poa-verification-column">
          <el-row>
            <strong>Verification Checklist</strong>
            <ul class="w-100 list-unstyled mt-2">
              <li v-for="(item, index ) in verificationList" :key="index">- {{item}}</li>
            </ul>
          </el-row>
        </el-col>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {Popover, Card} from 'element-ui'
  import eyeIcon from '../../../../../public/static/img/dashboard_icons/outline-visibility-24px-1.svg'
  import editIcon from '../../../../../public/static/img/dashboard_icons/ic_edit.svg'

  export default {
    name: "KycPOAAction",
    components: {
      [Popover.name]: Popover,
      [Card.name]: Card,
    },
    data() {
      return {
        eyeIcon,
        editIcon,
        visible: false,
        img: false,
        poaStatus: 'Unverified',
        applicationInfo: [
          {name: 'Application Ref', value: 'ABCDEFG'},
          {name: 'Client App Ref', value: 'BCDEFGH'},
          {name: 'Status', value: 'KYC Validation'},
          {name: 'ID Documentation', value: 'Drivers License'},
          {name: 'Status', value: 'Unverified', className: 'icon'},
        ],
        applicationInfoII: [
          {name: 'Verification attempts', value: '1'},
          {name: 'Date Received', value: 'YYYY-MM-DD-HH-MM'},
          {name: 'App SMS Sent', value: 'YYYY-MM-DD-HH-MM'},
        ],
        statusList: [
          'Unverified',
          'Approved',
          'Declined',
          'Declined - fraud',
          'New POA requested',
          'Address update - New POA requested'
        ],
        clientInformation: [
          {name: 'Address Line 1', value: 'Wilhelm-Epstein Strasse 14'},
          {name: 'Address Line 2', value: ''},
          {name: 'Address Line 3', value: ''},
          {name: 'City / Town', value: 'Frankfurt'},
          {name: 'Post Code', value: '60431'},
          {name: 'Region', value: 'Frankfurt'},
          {name: 'Country', value: 'Germany'},
        ],
        verificationList: [
          'POA is an approved bill type',
          'POA is an approved bill type',
          'Full POA visible',
          'No obvious marks of manipulation',
          'Address match supplied address by client'
        ]
      }
    },
    methods: {
      handleClose() {
        // this.$router.push({name: 'KYC Main'})
        // todo: add primary screen, add link to primary screen
      }
    }
  }
</script>

<style scoped lang="scss">
  .kyc-poa {
    font-size: 16px;

    p {
      margin-bottom: 0;
    }

    .img-icon {
      cursor: pointer;
    }

    &-status {
      height: 40px;
      text-align: center;
      line-height: 40px;
      padding: auto;
      background-color: #FDD9DA;
    }

    .btn {
      margin: 0;
      text-transform: none;
    }
    .btn-poa-action{
      width: 190px;
    }

    .table-client-info {
      td {
        padding-top: 5px;
      }
    }

    .poa-verification-column{
      padding-left: 70px;
    }

    .poa-btn-download{
      font-size: 11px;
      height: 27px;
      width: 125px;
      line-height: 27px;
      padding: 0 auto;
    }

    table.helper-table {
      width: 100%;

      tr {
        &:nth-child(even) {
          background-color: #F3FCF8;
        }

        td {
          padding: 15px 15px 15px 5px;
          text-align: left;

          &:first-child {
            font-weight: bold;
          }
        }
      }
    }
  }

  .client-info {
    max-width: 480px;

    &__card {
      border-radius: 20px;
      border: 1px solid #707070;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;

      &__img {
        height: 300px;
        width: 100%;
        object-fit: cover;
        cursor: zoom-in;
      }

      &__info {
        height: 300px;
      }
    }
  }

  .kyc-poa__sub-head {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #292929;
    padding-left: 0;
  }

  .kyc-poa-close-btn {
    width: 180px;
  }

  .kyc-poa-row__text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .kyc-poa-row__title {
    font-weight: 600;
  }

  .kyc-poa-row__name {
    font-weight: 100;
  }
</style>
