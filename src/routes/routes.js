import permission from '@/constants/permission'
// Calendar
import Calendar from 'src/components/Dashboard/Views/Calendar/CalendarRoute.vue';
// Components pages
import Lock from 'src/components/Dashboard/Views/Pages/Lock.vue';
import Login from 'src/components/Dashboard/Views/Pages/Login.vue';
import Register from 'src/components/Dashboard/Views/Pages/Register.vue';
// Pages
import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue';
import CardPrograms from '../components/Dashboard/pages/CardProgram/CardPrograms';
import Create from '../components/Dashboard/pages/CardProgram/Create';
import ApproveDebit from '../components/Dashboard/pages/FloatBalance/ApproveDebit';
import PreviewDebit from '../components/Dashboard/pages/FloatBalance/PreviewDebit';
import SetupDebit from '../components/Dashboard/pages/FloatBalance/SetupDebit';
import UnallocatedFloat from '../components/Dashboard/pages/FloatBalance/UnallocatedFloat';
import ViewFloatAccount from '../components/Dashboard/pages/FloatBalance/ViewFloatAccount';
import ViewStatement from '../components/Dashboard/pages/FloatBalance/ViewStatement';
import ResellerCreate from '../components/Dashboard/pages/Resller/Create';
import ResellerInvoice from '../components/Dashboard/pages/Resller/Invoice';
import Invoicesdetails from "../components/Dashboard/pages/Resller/Invoicesdetails";
import SearchInvoices from "../components/Dashboard/pages/Resller/SearchInvoices";
// Kyc
import Kyc from "../components/Dashboard/pages/Kyc/Kyc";
import KycDashboard from "../components/Dashboard/pages/Kyc/KycDashboard";
import Workflow from "../components/Dashboard/pages/Kyc/Workflow";
// Payment gateway
import PGSettings from '@/components/Dashboard/pages/PaymentGateway/Settings'
import EditPaymentMethod from '@/components/Dashboard/pages/PaymentGateway/EditPaymentMethod'
// Reseller
import ResellerView from '../components/Dashboard/pages/Resller/View';
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue';
import NoPermission from '../components/Dashboard/pages/Dashboard/NoPermission.vue';

// Charts
const Charts = () =>
  import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Charts.vue');

// ABA ROUTES
let cardProgram = {
  path: '/card-program',
  redirect: '/card-program/view',
  component: DashboardLayout,
  meta: {
    permission: permission.CARD_PROGRAM_VIEW
  },
  children: [
    {
      path: 'Create',
      name: 'Create card program',
      component: Create,
      meta: {
        permission: permission.CARD_PROGRAM_EDIT
      }
    },
    {
      path: 'card/:id',
      name: 'Edit card program',
      component: Create,
      meta: {
        permission: permission.CARD_PROGRAM_EDIT
      }
    },
    {
      path: 'view',
      name: 'View Card Programs',
      component: CardPrograms,
      meta: {
        permission: permission.CARD_PROGRAM_VIEW
      }
    }
  ]
};

// floatAccount rotues

let floatAccount = {
  path: '/float-account',
  redirect: '/float-account/approve-debits',
  component: DashboardLayout,
  meta: {
    permission: permission.DEBIT_CREDIT_INSTRUCT_APPROVE
  },
  children: [
    {
      path: '/float-account/approve-debit',
      name: 'approve debit',
      component: ApproveDebit,
      meta: {
        permission: permission.DEBIT_CREDIT_INSTRUCT_APPROVE
      }
    },
    {
      path: '/float-account/review-debit',
      name: 'review debit',
      component: PreviewDebit,
      meta: {
        permission: permission.DEBIT_CREDIT_INSTRUCT_VIEW
      }
    },
    {
      path: '/float-account/setup-debit',
      name: 'setup debit',
      component: SetupDebit,
      meta: {
        permission: permission.DEBIT_CREDIT_INSTRUCT_EDIT
      }
    },
    {
      path: '/float-account/unallocated-float',
      name: 'unallocated float',
      component: UnallocatedFloat,
      meta: {
        permission: permission.UNALLOCATED_FLOAT_VIEW
      }
    },
    {
      path: '/float-account/view-statement/:card_program_code?/:currency_code?/:reseller_code?/:page_num?/:page_size?',
      name: 'view statement',
      component: ViewStatement,
      meta: {
        permission: permission.STATEMENT_VIEW
      }
    },
    {
      path: '/float-account/view-float-account',
      name: 'view float account',
      component: ViewFloatAccount,
      meta: {
        permission: permission.FLOAT_ACCOUNT_VIEW
      }
    }
  ]
};

// reseller routes
let payment_gateway = {
  path: '/payment-gateway',
  //redirect: '/payment-gateway/view',
  component: DashboardLayout,
  meta: {
    permission: permission.RESELLER_SUBSCRIPTION_VIEW
  },
  children: [
    {
      path: '/payment-gateway/settings',
      name: 'Payment gateway - Settings',
      component: PGSettings,
      meta: {
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      }
    },
    {
      path: '/payment-gateway/settings/payment-method/:code',
      name: 'Payment gateway - Edit payment method',
      component: EditPaymentMethod,
      meta: {
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      }
    }
  ]
};

let reseller = {
  path: '/reseller',
  // redirect: '/reseller/view?page=0&per_page=10',
  redirect: '/reseller/view',
  component: DashboardLayout,
  meta: {
    permission: permission.RESELLER_SUBSCRIPTION_VIEW
  },
  children: [
    {
      path: '/reseller/view',
      name: 'Resellers View',
      component: ResellerView,
      meta: {
        permission: permission.RESELLER_SUBSCRIPTION_VIEW
      }
    },
    {
      path: '/reseller/create',
      name: 'Resellers Create',
      component: ResellerCreate,
      meta: {
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      }
    },
    {
      path: '/reseller/resellers/:id',
      name: 'Resellers Editor',
      component: ResellerCreate,
      meta: {
        permission: permission.RESELLER_SUBSCRIPTION_EDIT
      }
    },
    {
      path: '/reseller/search',
      name: 'Search Invoices',
      component: SearchInvoices,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    }, {
      path: '/reseller/details',
      name: 'Invoice Details',
      component: Invoicesdetails,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    },
    {
      path: '/reseller/invoice/:reseller_code?/:card_program_code?',
      name: 'Reseller Invoice',
      component: ResellerInvoice,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    }
  ]
};


const kyc = {
  path: '/kyc',
  redirect: '/kyc/register',
  component: DashboardLayout,
  children: [
    {
      path: '/kyc/dashboard',
      name: 'KYC Dashboard',
      component:KycDashboard,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW // !!! change
      }
    },
    {
      path: '/kyc/register',
      name: 'KYC Register',
      component:Kyc,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    },
    {
      path: '/kyc/workflow',
      name: 'KYC Work Flow',
      component:Workflow,
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    },
    {
      path: '/kyc/search',
      name: 'KYC Search',
      component: () => import('../components/Dashboard/pages/Kyc/Search'),
      meta: {
        permission: permission.RESELLER_INVOICE_VIEW
      }
    }
  ]
}
let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
};

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
};

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
};

let system = {
  path: '/system',
  component: DashboardLayout,
  children: [
    {
      path: '/',
      name: 'empty_view',
      component: NoPermission
    }
  ]
    
}

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/card-program',
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      }
    ]
  },
  cardProgram,
  loginPage,
  registerPage,
  lockPage,
  floatAccount,
  reseller,
  payment_gateway,
  kyc,
  system,
  {path: '*', component: NotFound}
];

export default routes;
