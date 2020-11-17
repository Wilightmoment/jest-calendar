/* eslint-disable */
const convertYMD = function (date) {
  const mm = date.getMonth() + 1
  const dd = date.getDate()

  return date.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + ((dd > 9 ? '' : '0') + dd)
}

const dateRest = function (date) {
  const ndate = new Date(date)
  ndate.setHours(0)
  ndate.setMinutes(0)
  ndate.setSeconds(0)
  ndate.setMilliseconds(0)
  return ndate.toISOString()
}

export { convertYMD, dateRest }

// export default function convertYMD (date) {
//   const mm = date.getMonth() + 1
//   const dd = date.getDate()

//   return date.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + ((dd > 9 ? '' : '0') + dd)
// }