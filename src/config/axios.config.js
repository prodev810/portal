export default {
  timeout: 35000,
  apis: [
    {
      BASE_URL: 'https://api.dev.ceevo.com/kyc-api/v1/kyc',
      TIMEOUT: 35000,
      SHORTCUT: 'kyc',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: 'https://api.dev.ceevo.com/aba-api/v1/business',
      TIMEOUT: 35000,
      SHORTCUT: 'aba1',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: 'https://api.dev.ceevo.com/acquring/mgmt',
      TIMEOUT: 35000,
      SHORTCUT: 'acchttp',
      OAUTH: '$oAuth' // same oAuth as main
    },
    {
      BASE_URL: 'https://api.dev.ceevo.com/aba-api',
      TIMEOUT: 35000,
      SHORTCUT: 'abahttp',
      OAUTH: '$oAuth' // same oAuth as main
    }
  ]
}
