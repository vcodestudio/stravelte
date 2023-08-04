// 숫자를 두 자리로 만들어주는 함수
export const twoDigits = num => {
  return num < 10 ? `0${num}` : num
}

export function formatDateString(str = '20121123', format = 'YYYY.MM.DD') {
  const year = str.slice(0, 4)
  const month = str.slice(4, 6)
  const day = str.slice(6, 8)
  return format.replace(/YYYY/g, year).replace(/MM/g, month).replace(/DD/g, day)
}

// convert new Date to custom format
export function formatDate(date, format = 'YYYY.MM.DD') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // day, month must 2 digits
  return format
    .replace(/YYYY/g, year)
    .replace(/MM/g, month < 10 ? `0${month}` : month)
    .replace(/DD/g, day < 10 ? `0${day}` : day)
}

export async function LoadPost(params = { post_type: 'notices', locale: 'ko-KR', page: 1, limit: 10 }) {
  const type = params.post_type
  delete params.post_type
  // convert params to query string
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')

  const token =
    'a4533bd1babe4da25040ac073d8a3e9708cd48b2667fcd65e362fb018832920c18585b59d3e8ca5974e248cb5edb96065993f498db49766c7618b1e8acb32ff07b474802a35a357cbb92974e74413ffcb2767ab2535f5c3464afa9372063b97d43ee10aebacc4c73764c7eb9dc79a8d48052ad690dc71041b7f96aaead6d3a15'
  const req = await fetch(`http://127.0.0.1:1337/api/${type}/?${query}`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await req.json()

  return data
}
