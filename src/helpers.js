const arrToString = (array) => {
  const arrMap = array.map(i => i[2])
  return arrMap.join(",").toString()
}


module.exports = {
  arrToString
}