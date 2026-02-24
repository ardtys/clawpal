<script lang="ts">
  import type { PriceData } from '$lib/data/mockData';

  interface Props {
    data: PriceData;
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-xl font-bold text-white">
          S
        </div>
        <div>
          <div class="flex items-center gap-2">
            <p class="text-text-primary font-bold text-xl">{data.symbol}</p>
            <span class="text-xs text-text-muted px-2 py-0.5 bg-bg-card rounded">{data.rank}</span>
          </div>
          <p class="text-text-muted text-sm">{data.name}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-text-primary font-bold text-3xl">{data.price}</p>
        <div class="flex items-center justify-end gap-2 mt-1">
          <span class="text-xs px-2 py-0.5 rounded {data.positive ? 'bg-accent-primary/10 text-accent-primary' : 'bg-red-500/10 text-red-400'}">
            1h: {data.change1h}
          </span>
          <span class="text-xs px-2 py-0.5 rounded {data.positive ? 'bg-accent-primary/10 text-accent-primary' : 'bg-red-500/10 text-red-400'}">
            24h: {data.change24h}
          </span>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div class="bg-bg-card p-3 rounded-lg">
      <p class="text-text-muted text-xs mb-1">24h High</p>
      <p class="text-text-primary font-semibold">{data.high24h}</p>
    </div>
    <div class="bg-bg-card p-3 rounded-lg">
      <p class="text-text-muted text-xs mb-1">24h Low</p>
      <p class="text-text-primary font-semibold">{data.low24h}</p>
    </div>
    <div class="bg-bg-card p-3 rounded-lg">
      <p class="text-text-muted text-xs mb-1">Volume (24h)</p>
      <p class="text-text-primary font-semibold">{data.volume}</p>
    </div>
    <div class="bg-bg-card p-3 rounded-lg">
      <p class="text-text-muted text-xs mb-1">Market Cap</p>
      <p class="text-text-primary font-semibold">{data.marketCap}</p>
    </div>
  </div>
  <div class="px-4 pb-4">
    <div class="flex items-center justify-between py-2 px-3 bg-bg-card/50 rounded-lg text-xs">
      <span class="text-text-muted">All-Time High: {data.ath}</span>
      <span class="text-text-muted">{data.athDate}</span>
    </div>
  </div>
</div>
