<script>
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { isLoading } from '$lib/store'
  export let maxPages = 20
  export let current = 1
  export let query = {}

  const pageSize = 5
  const url = $page.url

  function slicePages(current_ = 1) {
    let start = Math.max(0, current_ - 3)
    let end = Math.min(maxPages - 1, start + pageSize)
    start = Math.max(0, Math.min(current_ - 3, end - pageSize))
    return [start, end]
  }

  function getPages(current_) {
    const pgs = []
    const [start, end] = slicePages(current_)
    for (let i = start; i <= end; i++) {
      pgs.push({ pageNum: i + 1 })
    }
    return pgs
  }

  function pgLink(pg_nm) {
    const searchParams = new URLSearchParams($page.url.searchParams)
    searchParams.set('page', pg_nm)
    isLoading.set(true)
    goto(`${url.pathname}?${searchParams.toString()}`)
  }

  let pages = []
  $: {
    maxPages = maxPages
    pages = getPages(current)
  }
</script>

{#if pages.length > 0}
  <div class="flex justify-center pagination">
    <a class="item" href="." on:click|preventDefault|stopPropagation={() => pgLink(1)} class:disabled={current == 1}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.0059 13.5305L8.47061 8.0003L14.0059 2.47006L13.0619 1.52697L7.05469 7.52875C6.79403 7.78918 6.79403 8.21142 7.05469 8.47184L13.0619 14.4736L14.0059 13.5305ZM9.33919 13.5305L3.80394 8.0003L9.33919 2.47006L8.39525 1.52697L2.38802 7.52875C2.12736 7.78918 2.12736 8.21142 2.38802 8.47184L8.39525 14.4736L9.33919 13.5305Z"
          fill="#888888"
        />
      </svg>
    </a>
    <a
      class="item"
      href="."
      on:click|preventDefault|stopPropagation={() => pgLink(current - 1)}
      class:disabled={current == 1}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.86472 8L11.333 13.1259L10.4005 14L3.99968 8L10.4005 2L11.333 2.87413L5.86472 8Z"
          fill="#888888"
        />
      </svg>
    </a>
    {#each pages as page}
      {#if page.pageNum == current}
        <span class="item color-blue font-[600]">{page.pageNum}</span>
      {:else}
        <a class="item" href="." on:click|preventDefault|stopPropagation={() => pgLink(+page.pageNum)}>{page.pageNum}</a
        >
      {/if}
    {/each}
    <a
      class="item"
      href="."
      on:click|preventDefault|stopPropagation={() => pgLink(current + 1)}
      class:disabled={current == maxPages}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.1353 8L4.66699 2.87413L5.59952 2L12.0003 8L5.59952 14L4.66699 13.1259L10.1353 8Z"
          fill="#888888"
        />
      </svg>
    </a>
    <a
      class="item"
      href="."
      on:click|preventDefault|stopPropagation={() => pgLink(maxPages)}
      class:disabled={current == maxPages}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.19336 2.46946L7.72861 7.9997L2.19336 13.5299L3.1373 14.473L9.14453 8.47124C9.40519 8.21082 9.40519 7.78858 9.14453 7.52815L3.1373 1.52637L2.19336 2.46946ZM6.86003 2.46946L12.3953 7.9997L6.86003 13.5299L7.80397 14.473L13.8112 8.47124C14.0719 8.21082 14.0719 7.78858 13.8112 7.52815L7.80397 1.52637L6.86003 2.46946Z"
          fill="#888888"
        />
      </svg>
    </a>
  </div>
{/if}
