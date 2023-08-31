import { LoadPost } from '$lib/utils.js'

export const load = async ({ fetch }) => {
  const res_1 = await LoadPost({
    post_type: 'notices',
    'pagination[page]': 1,
    'pagination[pageSize]': 5,
    sort: 'date:desc',
  })
  const res_2 = await LoadPost({
    post_type: 'presses',
    'pagination[page]': 1,
    'pagination[pageSize]': 5,
    sort: 'date:desc',
  })

  return {
    notice: res_1,
    press: res_2,
  }
}
