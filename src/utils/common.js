export const inArray = (search, array) => {
  for(let i in array){
    if(array[i] === search){
      return true
    }
  }
  return false
}
