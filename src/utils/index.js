/**
 * 得到长度为10或13的时间戳
 * @param length
 * @param timeZone
 * @returns {string}
 */
export function timeUnix_now(length, timeZone) {
  return strTimeToUnixTime(length, null, timeZone)
}

/**
 * 本地默认时间
 * @returns {string}
 */
export function time_default_now(unixTime, timeZone) {
  return unixTimeToStrTime('Y-m-d H:i:s', unixTime, timeZone)
}

/**
 * 时间字符串转时间戳
 * @param strTime   时间字符串 Y-m-d H:i:s,只限这种格式
 * @param length    时间戳长度
 * @param timeZone  时区
 * @returns {string}
 */
export function strTimeToUnixTime(length, strTime, timeZone) {
  if (parseInt(length) !== 13 && parseInt(length) !== 10) {
    console.log('length必须为10或者13，默认为10')
    length = 10
  }
  let date
  if (strTime) {
    date = new Date(strTime)
  } else {
    date = new Date()
  }
  const nowDate = date.getTime()
  if (timeZone == null || timeZone === '') {
    timeZone = 8
  }
  const offset_GMT = new Date().getTimezoneOffset()
  const targetDate = nowDate - offset_GMT * 60 * 1000 - timeZone * 60 * 60 * 1000
  return targetDate.toString().slice(0, length)
}

/**
 * 时间戳转换为时间 Y-m-d H:i:s
 * @param format
 * @param unixTime
 * @param timeZone
 * @returns {string}
 */
export function unixTimeToStrTime(format, unixTime, timeZone) {
  if (unixTime) {
    unixTime = parseInt(unixTime.toString().length === 10 ? unixTime * 1000 : unixTime)
  } else {
    unixTime = new Date().getTime()
  }
  if (timeZone == null || timeZone === '') {
    timeZone = 8
  }
  const offset_GMT = new Date().getTimezoneOffset()
  unixTime += (offset_GMT * 60 * 1000 + timeZone * 60 * 60 * 1000)
  const date = new Date(unixTime)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const t = {
    Y: date.getFullYear(),
    m: padTo2(month),
    d: padTo2(day),
    H: padTo2(hours),
    i: padTo2(minutes),
    s: padTo2(seconds)
  }
  format = format || 'Y-m-d H:i:s'
  return format.replace(/[\]?[a-zA-Z]/g, function(w) {
    if (w === '\\') {
      return '-'
    } else {
      return t[w]
    }
  })
}

function padTo2(n) {
  return n > 9 ? n : '0' + n
}
