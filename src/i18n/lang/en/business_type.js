const listing = {
  button_new: 'New Business Type',
  button_view: 'View',

  table_header: {
    business_type: 'Category',
    business_description: 'Description',
    mcc: 'MCC',
    business_risk: 'Risk'
  }
}

const errors = {
  error_get_business_types: 'Error while getting list of business types',
	error_saving_business_type: 'Error while saving client: ',
	error_duplicate_key: 'Business type with MCC {mcc} already exists'
}

export default {
  listing,
  errors
}