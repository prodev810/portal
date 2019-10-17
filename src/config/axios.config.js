export default {
  timeout: 35000,
  apis: [
    {
      BASE_URL: `${process.env.VUE_APP_API_BASE_PATH}/kyc-api/v1/kyc`,
      TIMEOUT: process.env.VUE_APP_API_CALL_TIMEOUT,
      SHORTCUT: 'kyc',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: `${process.env.VUE_APP_API_BASE_PATH}/biz-api/v1/business`,
      TIMEOUT: process.env.VUE_APP_API_CALL_TIMEOUT,
      SHORTCUT: 'aba1',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: `${process.env.VUE_APP_API_BASE_PATH}/payment-mgmt`,
      TIMEOUT: process.env.VUE_APP_API_CALL_TIMEOUT,
      SHORTCUT: 'acchttp',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: `${process.env.VUE_APP_API_BASE_PATH}/payment-mgmt-live`,
      TIMEOUT: process.env.VUE_APP_API_CALL_TIMEOUT,
      SHORTCUT: 'acchttpLive',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: `${process.env.VUE_APP_API_BASE_PATH}/aba-api`,
      TIMEOUT: process.env.VUE_APP_API_CALL_TIMEOUT,
      SHORTCUT: 'abahttp',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
        BASE_URL: 'https://api.dev.ceevo.com/client-mgmt',
        TIMEOUT: 35000,
        SHORTCUT: 'clhttp',
        OAUTH: '$oAuth' // same oAuth as main
    }

  ]
}
