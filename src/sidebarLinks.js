import permission from '@/constants/permission'

export default [
	{
		name: 'Client',
		i18n: 'menu.client',
		permission: permission.NAV_CLIENT,
		icon: 'ti-panel',
		image: 'ic_reseller.svg',
		collapsed: true,
		children: [
				// {
				//     name: 'Create Client',
				//     path: '/client/create',
				//     i18n: 'menu.create_client',
				//     permission: permission.CLIENT_EDIT
				// },
				{
						name: 'View Clients',
						path: '/clients/view',
						i18n: 'menu.view_client',
						permission: permission.CLIENT_VIEW
        },
				{
          name: 'Business type',
          path: '/clients/business-type',
          i18n: 'menu.view_business_types',
          permission: permission.CLIENT_VIEW
        },
      
				// {
				//     name: 'View Client',
				//     path: '/client/view/:id',
				//     permission: permission.CLIENT_VIEW,
				//     hidden: true,
				// },
				// {
				//     name: 'Edit Client',
				//     path: '/client/edit/:id',
				//     permission: permission.CLIENT_EDIT,
				//     hidden: true,
				// },
		]
	},
  {
    name: 'Payment gateway',
    i18n: 'menu.payment_gateway.top',
    permission: permission.NAV_RESELLER,
    icon: 'ti-panel',
    image: 'ic_reseller.svg',
    collapsed: true,
    children: [
      {
        name: 'Settings',
        path: '/payment-gateway/settings',
        i18n: 'menu.payment_gateway.settings',
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      },
      {
        name: 'Merchant',
        path: '/payment-gateway/merchant',
        i18n: 'menu.payment_gateway.merchant',
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      },
      {
        name: 'Acquirer',
        path: '/payment-gateway/acquirer',
        i18n: 'menu.payment_gateway.processor',
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      },
      {
        name: 'Transaction',
        path: '/payment-gateway/transactions',
        i18n: 'menu.payment_gateway.transaction',
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      },
      {
        name: 'Disputes',
        path: '/payment-gateway/disputes',
        i18n: 'menu.payment_gateway.disputes',
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      }
    ]
	},
  {
    name: 'Card Program',
    i18n: 'menu.card_program',
    permission: permission.NAV_CARD_PROGRAM,
    image: 'ic_card.svg',
    icon: 'ti-panel',
    collapsed: true,
    children: [
      {
        name: 'Create card program',
        path: '/card-program/card/new',
        i18n: 'menu.create_card_program',
        permission: permission.CARD_PROGRAM_EDIT
      },
      {
        name: 'View Card Programs',
        path: '/card-program/view',
        i18n: 'menu.view_card_programs',
        permission: permission.CARD_PROGRAM_VIEW
      }
    ]
  },
  {
    name: 'Reseller',
    i18n: 'menu.reseller',
    permission: permission.NAV_RESELLER,
    icon: 'ti-panel',
    image: 'ic_reseller.svg',
    collapsed: true,
    children: [
      {
        name: 'Create Reseller',
        path: '/reseller/create',
        i18n: 'menu.create_reseller',
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      },
      {
        name: 'View Resellers',
        path: '/reseller/view',
        i18n: 'menu.view_reseller',
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      },
      {
        name: 'View Reseller',
        path: '/reseller/view/:id',
        permission: permission.RESELLER_SUBSCRIPTION_VIEW,
        hidden: true,
      },
      {
        name: 'Edit Reseller',
        path: '/reseller/edit/:id',
        permission: permission.RESELLER_SUBSCRIPTION_VIEW,
        hidden: true,
      },
    ]
	},	
  {
    name: 'Float Balance',
    i18n: 'menu.float_balance',
    permission: permission.NAV_FLOAT_BALANCE,
    image: 'ic_balance.svg',
    icon: 'ti-panel',
    collapsed: true,
    children: [
      {
        name: 'view float account',
        path: '/float-account/view-float-account',
        i18n: 'menu.view_float_account',
        permission: permission.FLOAT_ACCOUNT_VIEW,
        isAllowResellerToView: true
      },
/*      {
        name: 'view statement',
        path: '/float-account/view-statement'
      },*/
/*      {
        name: 'Setup Debit/Credit',
        path: '/float-account/setup-debit'
      },*/
 /*     {
        name: 'Approve Debit/Credit',
        path: '/float-account/approve-debit'
      },*/
      {
        name: 'Review Debit/Credit',
        path: '/float-account/review-debit',
        i18n: 'menu.review_debit_credit',
        permission: permission.DEBIT_CREDIT_INSTRUCT_VIEW
      },
      {
        name: 'unallocated float',
        path: '/float-account/unallocated-float',
        i18n: 'menu.unallocated_float',
        permission: permission.UNALLOCATED_FLOAT_VIEW
      }
    ]
  },
  {
        name: 'Flexmonster',
        i18n: 'menu.flexmonster',
        permission: permission.ALL_PERMISSION,
        icon: 'ti-panel',
        image: 'ic_reseller.svg',
        path:'/ipg',
      collapsed: true,
      children: [
          {
              path: '/ipg',
              name: 'Reporting',
              i18n: 'menu.flexmonster',
              permission: permission.ALL_PERMISSION,
          }]
  },
  {
    name: 'KYC Module',
    i18n: 'menu.kyc_module',
    permission: permission.NAV_KYC_MODULE,
    image: 'ic_kyc_module.svg',
    collapsed: true,
    children: [
      {
        path: '/kyc/dashboard',
        name: 'KYC Dashboard',
        i18n: 'menu.kyc_dashboard',
        permission: permission.NAV_KYC_MODULE // !!! change permission
      },
      {
        path: '/kyc/approved-emoney-account',
        name: 'KYC Approved Emoney Account',
        hidden: true,
        i18n: '',
        permission: permission.NAV_KYC_MODULE // !!! change permission
      },
      {
        path: '/kyc/invoices',
        name: 'KYC View All Invoices',
        hidden: true,
        i18n: '',
        permission: permission.NAV_KYC_MODULE // !!! change permission
      },
      {
        path: '/kyc/review-edit-account/',
        name: 'KYC Review Edit Account Creation',
        hidden: true,
        i18n: '',
        permission: permission.NAV_KYC_MODULE // !!! change permission
      },
      {
        path: '/kyc/review-edit-card',
        name: 'KYC Review Edit Card Creation',
        hidden: true,
        i18n: '',
        permission: permission.NAV_KYC_MODULE // !!! change permission
      },
      // {
      //   path: '/kyc/register',
      //   name: 'KYC Register',
      //   i18n: 'menu.kyc_register',
      //   permission: permission.NAV_KYC_MODULE // !!! change permission
      // },
      {
        path: '/kyc/workflow',
        name: 'Work Flow',
        i18n: 'menu.kyc_workflow',
        permission: ''
      },
      {
        path: '/kyc/search',
        name: 'Search',
        i18n: 'menu.kyc_search',
        permission: ''
      },
      {
        path: '/kyc/product-config',
        name: 'Product Config',
        i18n: 'menu.kyc_product_config',
        permission: ''
      },
      {
        path: '/kyc/kyc-mainpage',
        name: 'KYC Main Page',
        permission: '',
        hidden: true,
      },
      {
        path: '/kyc/ID-view',
        name: 'KYC Id View',
        permission: '',
        hidden: true,
      },
      {
        path: '/kyc/ID-action',
        name: 'KYC Id Action',
        permission: '',
        hidden: true,
      },
    ]
  },	
];
