export const kycModuleDateFormat = (value) => {
  return value.replace('Z', '').replace('T', '-').replace(/:/g, '-')
}
