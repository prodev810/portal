const card_program = {
  error_load_card_program: `There has been an error displaying the card programs, please refresh the page and if the problem persists, contact Technical Support`,
  error_edit_card_program: `There was an error editing the card program, please ensure all fields are completed correctly and try again, if the problem persists, please contact Technical Support`,
}

const float_balance = {
  success_add_float_entity: `Added float entry successfully`,
  error_add_float_entity: `There is an error adding the chosen amount to the float balance. Please try again and if the problem persists, contact Technical Support`,
  error_load_floats: `There is an error showing the float balances. Please try again and if the problem persists, contact Technical Support`,
  error_load_unallocated_float_balance: `There is an error showing the Unallocated float balance. Please try again and if the problem persists, contact Technical Support`,
  error_load_statement: `There is an error Viewing the account statement. Please try again and if the problem persists, contact Technical Support`,
  error_edit_float_entity: `There is an error editing Float entry. Please try again and if the problem persists, contact Technical Support`,
  success_edit_float_entity: `Edited float entry successfully`
}

const clients = {
    error_load_clients: `There is an error with retrieving the data, please refresh the page and try again,if the problem persists please contact Technical Support`
}

const reseller = {
  success_create_reseller: `Created new card reseller sub successfully`,
  success_edit_reseller: `Edited successfully`,
  error_create_reseller: `There is an error creating this Reseller, please ensure all fields are completed correctly and try again, if the problem persists, please contact Technical Support`,
  error_load_resellers: `There is an error with retrieving the data, please refresh the page and try again,if the problem persists please contact Technical Support`,
  error_load_reseller_entity: `There is an error retrieving the data. Please refresh the page and try again,if the problem persists please contact Technical Support`,
  error_edit_reseller_entity: `There was an error editing the Reseller, please ensure all fields are completed correctly and try again, if the problem persists, please contact Technical Support`,
  error_load_invoices: `There was an error retrieving the invoices, please ensure all fields are completed correctly and try again, if the problem persists, please contact Technical Support`
}

const ui_module = {
}

const paymentGateway = {
  error_load_currencies: 'Error while loading currencies: ',
  error_load_countries: 'Error while loading countries: ',
  error_load_payment_methods: 'Error while loading payment methods: ',
  error_set_payment_method: 'Error while saving payment method: ',
  error_get_merchants: 'Error while loading merchants: ',
  error_load_float_accounts: 'Error while loading float accounts: ',
  error_set_float_account: 'Error while saving float account: ',
	success_add_float_account: 'Added float account successfully',
	error_get_transactions: 'Error while getting transactions: ',
  error_load_aquirers: 'Error while getting aсquirers: ',
  error_load_kyc_classifier: 'Error while loading kyc classifier: '
}

const countries = {
  error_load_countries: 'Error while loading countries',
  unknown_country: 'Unknown country, code:'
}

export default {
    card_program,
    float_balance,
    reseller,
    clients,
    ui_module,
    paymentGateway,
    countries
}
