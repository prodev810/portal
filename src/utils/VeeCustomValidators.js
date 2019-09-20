import i18n from '@/i18n'
import { Validator } from 'vee-validate'
import currencyFormat from 'currency-format'

let currencyFormatISO = Object.keys(currencyFormat)

Validator.extend('currencyISO', {
  getMessage: field => i18n.t('common.form_validations.valid_iso_currency_code'),
  validate: value => currencyFormatISO.indexOf(value) >= 0
})