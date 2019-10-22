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
	transactions: {
		header: {
			merchant_id: 'Merchant',
			method_code: 'Method',
			payer_id: 'Client',
			status: 'Status',
			sub_type: 'Type',
			transaction_date: 'Date'
		},
		modal_details: {
			header: 'Payment details',
			account_token: 'Account token',
			amount: 'Amount',
			currency: 'Currency',
			is3_d: 'Is 3D',
			merch_reference: 'Merchant reference',
			merchant_id: 'Merchant ID',
			method_code: 'Method code',
			modified_date: 'Modified ID',
			payer_id: 'Payer ID',
			session_id: 'Session ID',
			sett_amount: 'Sett amount',
			sett_currency: 'Sett currency',
			status: 'Status',
			sub_type: 'Sub type',
			transaction_date: 'Transaction date',
			value_date: 'Value date'
		},
		modal_customer: {
			header: 'Customer details',
			active: 'Active',
			create_date: 'Create date',
			email: 'Email',
			first_name: 'First name',
			last_name: 'Last name',
			merchant_id: 'Merchant ID',
			mobile: 'Mobile',
			phone: 'Phone',
			sex: 'Sex',
			update_date: 'Update date'
		},
		modal_shipping_address: {
			header: 'Shipping address',
			city: 'City',
			country: 'Country',
			state: 'State',
			street: 'Street',
			zip: 'ZIP'
		},
		button_details: 'Details',
		button_operations: 'Operations',
		button_customer: 'Customer',
		button_shipping_address: 'Shipping address'
  },
  disputes: {
    header: {
      cp_date: 'CPD',
      amount: 'Dispute Amount',
      dispute_type: 'Type',
      description: 'Description',
      payment_transaction_date: 'Transaction Date',
      record_date: 'Date'
    },
    modal_details: {
      header: 'Dispute details'
    }
  },
  button_view: 'View',
  button_add: 'Add',
  button_history: 'History',
  button_save: 'Save',
  button_add_fee: 'Add Fee',
  button_close: 'Close',
  button_cancel: 'Cancel'
}