<template>
  <div class="pg-edit-merchant">
    <div class="card p-4">

      <Spinner v-if="loading"/>

      <el-row :gutter="20">
        <el-col :xs="24" :lg="10" :xl="8">
          <div class="form-contents">
            <PGRow labeli18n="client.listing.account_name" :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.account_name}}</span>
              <fg-input slot="edit" v-model="clientData.account_name" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.email"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.email}}</span>
              <fg-input slot="edit" v-model="clientData.email" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.legal_business_name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{clientData.legal_business_name}}</span>
              <fg-input slot="edit" v-model="clientData.legal_business_name" required :maxLength="50"/>
            </PGRow>
            <PGRow labeli18n="client.listing.company_name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.company_name }}</span>
              <fg-input slot="edit" v-model="clientData.company_name" required :maxLength="255"/>
            </PGRow>  

            <PGRow labeli18n="client.listing.country"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.country }}</span>
              <fg-input slot="edit" v-model="clientData.country"  :headerColWidth="'13rem'" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.created_date"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.created_date }}</span>
              <fg-input slot="edit" v-model="clientData.created_date" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.display_currency"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.display_currency }}</span>
              <fg-input slot="edit" v-model="clientData.display_currency" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.phone"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.phone }}</span>
              <fg-input slot="edit" v-model="clientData.phone" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.statement_descriptor"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.statement_descriptor }}</span>
              <fg-input slot="edit" v-model="clientData.statement_descriptor" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.support_contact"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.support_contact }}</span>
              <fg-input slot="edit" v-model="clientData.support_contact" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.support_url"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.support_url }}</span>
              <fg-input slot="edit" v-model="clientData.support_url" required :maxLength="255"/>
            </PGRow>
            <PGRow labeli18n="client.listing.url"  :headerColWidth="'13rem'" required :viewMode="viewMode">
              <span slot="view">{{ clientData.url }}</span>
              <fg-input slot="edit" v-model="clientData.url" required :maxLength="255"/>
            </PGRow>
          </div>
        </el-col>

        <el-col :xs="24" :lg="14" :xl="16">
          <PGRow labeli18n="client.listing.merchant_account_stage.id"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.id }}</span>
            <fg-input slot="edit" v-model="clientData.merchant_account_stage.id" required :maxLength="255"/>
          </PGRow>
          <PGRow labeli18n="client.listing.merchant_account_stage.name"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.name }}</span>
            <fg-input slot="edit" v-model="clientData.merchant_account_stage.name" required :maxLength="255"/>
          </PGRow>
          <PGRow labeli18n="client.listing.merchant_account_stage.description"  :headerColWidth="'13rem'" required :viewMode="viewMode">
            <span slot="view">{{ clientData.merchant_account_stage.description }}</span>
            <fg-input slot="edit" v-model="clientData.merchant_account_stage.description" required :maxLength="255"/>
          </PGRow>
        </el-col>
      </el-row>
    </div>

    <div class="buttons">
      <p-button type="primary" round wide size="sm" @click="onSave" class="mr-2">{{ $i18n.t('client.listing.button.edit_client') }}</p-button>
      <p-button type="black" round wide size="sm" @click="onCancel">{{ $i18n.t('client.listing.button.cancel') }}</p-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import moment from 'moment'

import {
    SHOW_TOAST_MESSAGE,
    ACTION_GET_CLIENT
} from '@/store/types'


import Spinner from '@/components/UIComponents/Spinner'
import PButton from "@/components/UIComponents/Button"
import PGRow from '@/components/Dashboard/pages/PaymentGateway/PGRow'

export default {
  name: 'EditClient',
  components: {    

    Spinner,
    PButton,
    PGRow,
  },
  data () {
    return {
      loading: true,
      viewMode: false,
      clientData:{
          account_name: null,
          active: null,
          company_name: null,
          country: null,
          created_date: null,
          crm_id: null,
          display_currency: null,
          email: null,
          id: null,
          last_update_date: null,
          legal_business_name: null,
          merchant_account_stage: {
              version: 0,
              created_date: null,
              last_updated_date: null,
              id: null,
              name: null,
              description:''
          },
      phone: null,
      statement_descriptor: null,
      support_contact: null,
      support_url: null,
      url: null
      }
    }
  },
    computed: {
        ...mapState({

        }),
    },
  created () {
    this.getData();
    this.loading = false
  },
  methods: {
      ...mapActions({
          getClient: ACTION_GET_CLIENT,
          // getCurrencyList:ACTION_PG_GET_CURRENCIES
      }),
      getData() {
          if (!this.$route.params.id) return false;

          this.getClient(this.$route.params.id).then(data => {
              // console.log('Client data from Component', data);
                  this.clientData.account_name = data.account_name;
                  this.clientData.active = data.active;
                  this.clientData.company_name = data.company_name;
                  this.clientData.country = data.country;
                  this.clientData.created_date = moment(data.created_date).format('YYYY-MM-DD HH:MM:SS');
                  this.clientData.crm_id = data.crm_id;
                  this.clientData.display_currency = data.crm_id;
                  this.clientData.email = data.email;
                  this.clientData.id = data.id;
                  this.clientData.last_update_date = data.last_update_date;
                  this.clientData.legal_business_name = data.legal_business_name;
                  this.clientData.merchant_account_stage.version = data.merchant_account_stage.version;
                  this.clientData.merchant_account_stage.created_date = data.merchant_account_stage.version;
                  this.clientData.merchant_account_stage.last_updated_date = data.merchant_account_stage.version;
                  this.clientData.merchant_account_stage.name = data.merchant_account_stage.name;
                  this.clientData.merchant_account_stage.description = data.merchant_account_stage.description;
                  this.clientData.merchant_account_stage.id = data.merchant_account_stage.id;
                  this.clientData.phone = data.phone;
                  this.clientData.statement_descriptor = data.statement_descriptor;
                  this.clientData.support_contact = data.support_contact;
                  this.clientData.support_url = data.support_url;
                  this.clientData.url = data.url;
          });
      },
      onSave() {
          this.onCancel();
      },
      onCancel() {
          this.$router.push('/clients');
      }
  }
}
</script>

<style>
.pg-merchant-modal-header {
  padding: 0.5rem !important;  
}
.pg-merchant-modal-body {
  padding: 1rem !important;
}
.pg-merchant-modal-footer {
  padding: 0 1rem 0 0 !important;
}
.pg-merchant-collapse div.card-header {
  font-weight: bold;
}
.pg-merchant-collapse div.card-body {
  padding: 0 !important;
}
div.pg-edit-merchant th {
  text-transform: capitalize;
}
div.pg-edit-merchant h4 {
  text-transform: capitalize;
}
div.pg-edit-merchant .el-select,
div.pg-edit-merchant .el-date-editor {
  width: 100%;
}
div.pg-edit-merchant div#accordion div.card-header i.nc-icon {
  color: #8d8d8d;
}
</style>