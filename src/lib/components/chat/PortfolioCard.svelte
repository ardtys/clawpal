<script lang="ts">
  import type { PortfolioAllocation } from '$lib/data/mockData';

  interface Props {
    data: {
      total: string;
      change: string;
      changePercent: string;
      positive: boolean;
      pnlAllTime: string;
      pnlPercent: string;
      allocation: PortfolioAllocation[];
      topPerformer: { token: string; change: string };
      worstPerformer: { token: string; change: string };
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50">
    <div class="flex items-center justify-between mb-4">
      <div>
        <p class="text-text-muted text-xs uppercase tracking-wider">Portfolio Value</p>
        <p class="text-text-primary font-bold text-3xl">{data.total}</p>
      </div>
      <div class="text-right">
        <p class="text-text-muted text-xs">24h P&L</p>
        <p class="text-lg font-bold {data.positive ? 'text-accent-primary' : 'text-red-400'}">
          {data.change} ({data.changePercent})
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2 text-xs">
      <span class="text-text-muted">All-time P&L:</span>
      <span class="text-accent-primary font-semibold">{data.pnlAllTime} ({data.pnlPercent})</span>
    </div>
  </div>
  <div class="p-4">
    <p class="text-text-muted text-xs uppercase tracking-wider mb-3">Allocation</p>
    <div class="flex h-4 rounded-full overflow-hidden mb-4">
      {#each data.allocation as alloc}
        <div
          class="h-full transition-all duration-500"
          style="width: {alloc.percent}%; background-color: {alloc.color}"
          title="{alloc.token}: {alloc.percent}%"
        ></div>
      {/each}
    </div>
    <div class="grid grid-cols-2 gap-3">
      {#each data.allocation as alloc}
        <div class="flex items-center justify-between p-2 bg-bg-card/50 rounded-lg">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" style="background-color: {alloc.color}"></div>
            <span class="text-text-primary text-sm font-medium">{alloc.token}</span>
          </div>
          <div class="text-right">
            <span class="text-text-secondary text-sm">{alloc.percent}%</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="px-4 pb-4 flex gap-3">
    <div class="flex-1 p-3 bg-accent-primary/10 rounded-lg">
      <p class="text-xs text-text-muted mb-1">Top Performer</p>
      <p class="text-accent-primary font-semibold">{data.topPerformer.token} {data.topPerformer.change}</p>
    </div>
    <div class="flex-1 p-3 bg-red-500/10 rounded-lg">
      <p class="text-xs text-text-muted mb-1">Worst Performer</p>
      <p class="text-red-400 font-semibold">{data.worstPerformer.token} {data.worstPerformer.change}</p>
    </div>
  </div>
</div>
