export default {
  settings: {
    currencyHeader: {
      currency_code: 'Currency symbol',
      currency_name: 'Currency name'
    },
    countryHeader: {
      country_code: 'Country code',
      country_name: 'Country name'
    },
    pmethodHeader: {
      logo: 'Logo',
      payment_method: 'Payment method',
      code: 'Method code',
      currency_support: 'Currency support',
      country_support: 'Country support'
    }
  },
  merchant: {
    merchantHeader: {
      merchant_name: 'Merchant Name',
      short_code: 'Short Code',
      merchant_id: 'Merchant ID'
    },
    edit_merchant: {
      view_header: 'View merchant',
      edit_header: 'Edit merchant',
      error_unknown_id: 'Unknown merchant id: ',
      section_float_account: 'Float Account',
      section_processing_profile: 'Processing Profile',
      section_reserve: 'Reserve',
      section_settlement_profile: 'Settlement Profile',
      section_settlement_bank_account: 'Settlement Bank Account',
      headerFloatAccount: {
        name: 'Name',
        balance: 'Balance',
        last_update: 'Last update'
      },
      headerProcessingProfile: {
        business_type: 'Business/Type',
        description: 'Description',
        float_account: 'Float account'
      },
      headerReserve: {
        percentage: 'Percentage %',
        retention_period: 'Retention period',
        effective_date: 'Effective date'
      },
      headerSettlementProfile: {
        interval: 'Interval',
        currency: 'Currency',
        fee: 'Fee',
        effective_date: 'Effective date'        
      },
      add_float_account: 'Add float account',
      choose_currency: 'Choose currency',
      opening_balance: 'Opening balance',
      date: 'Date',
      default_float: 'Default float',

      add_processing_profile: 'Add Processing Profile',
      float_account: 'Float Account',
      processing_type: 'Processing Type',
      transaction_type: 'Transaction Type',

      add_fee: 'Add Fee',
      processing_profile: 'Processing Profile',
      apply_all: 'Apply all',
      fee_name: 'Fee Name',
      fee: 'Fee',
      effective_date: 'Effective Date',

      fee_history: 'Fee history',
      headerFeeHistory: {
        business_type: 'Business/Type',
        description: 'Description',
        effective_date: 'Effective date'
      },

      add_reserve: 'Add Reserve Profile',
      add_settlement_profile: 'Add Settlement Profile'
    }
  },
  acquirer: {
    is_active: 'Active',    
    full_name: 'Full name',    
    short_name: 'Short name',
    institution_id: 'Institution ID',    
    amex_id: 'AMEX ID',
    visa_id: 'VISA ID',
    mastercard_id: 'MasterCard ID',

    error_duplicate_key: 'Aquirer with id {id} already exists',
    error_saving_client: 'Error while saving aquirer: ',

    button_new: 'New acquirer',
    button_view: 'View acquirer'
  },
  button_view: 'View',
  button_add: 'Add',
  button_history: 'History',
  button_save: 'Save',
  button_add_fee: 'Add Fee',
  button_close: 'Close',
  button_cancel: 'Cancel'
}