const listing = {
	title: `view resellers`,

	table_header: {
		signupEmail: 'Signup Email',
		date: 'Signup Date',
		stage: 'Stage',
		company: 'Company Name',
		country:'Country',
		email: 'Email',		
		kyb: 'KYB',
		kyc: 'KYC'
	},

	account_name:'Account Name',
	legal_business_name:'Legal Business Name',
	email:'Email',
	country:'Country',
	company_name:'Company Name',
	created_date:'Created Date',
	display_currency:'Display Currency',
	phone:'Phone',
	statement_descriptor:'Statement Descriptor',
	support_contact:'Support Contact',
	support_url:'Support Url',
	url:'Url',
	merchant_account_stage:{
			id:'Merchant Account ID',
			name:'Stage',
			description:'Merchant Account Desc'
	},

	button: {
			new_client: 'New client',
			edit_client: `Save`,
			view_client: `View Client`,
			cancel: `Cancel`,
	},
}

const errors = {
	error_saving_client: 'Error while saving client: ',
	error_duplicate_key: 'Client with email {email} already exists'
}

export default {
	listing,
	errors
}
