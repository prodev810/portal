export const kycModuleDateFormat = (value) => {
  return value.replace('Z', '').replace('T', '-').replace(/:/g, '-')
}

export const kycModuleDateFormatWithoutSec= (value) => {
  return value.replace('Z', '').replace('T', '-').replace(/:/g, '-').substring(0, 16)
}
