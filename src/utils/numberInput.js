export const toNumber = (value) => {
  if (value && value.toString().indexOf('e') == -1) {
    return Math.abs(Number(value))
  }
  return 0
}

export const validateNumber = (value) => {
  return (typeof (value) === 'undefined' || value !== '' && value > 0)
}
