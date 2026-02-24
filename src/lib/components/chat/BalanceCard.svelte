<script lang="ts">
  import type { Token } from '$lib/data/mockData';

  interface Props {
    data: {
      tokens: Token[];
      total: string;
      change24h: string;
      changePercent: string;
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50 bg-bg-card/50">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-text-muted text-xs uppercase tracking-wider">Total Balance</p>
        <p class="text-text-primary font-bold text-2xl">{data.total}</p>
      </div>
      <div class="text-right">
        <p class="text-xs text-text-muted">24h Change</p>
        <p class="text-accent-primary font-semibold">{data.change24h} ({data.changePercent})</p>
      </div>
    </div>
  </div>
  <div class="p-4 space-y-3">
    {#each data.tokens as token}
      <div class="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-sm font-bold text-text-primary">
            {token.icon}
          </div>
          <div>
            <p class="text-text-primary font-medium">{token.symbol}</p>
            <p class="text-text-muted text-xs">{token.name}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-text-primary font-medium">{token.value}</p>
          <p class="text-xs text-text-muted">{token.amount} {token.symbol}</p>
        </div>
        <div class="w-16 text-right">
          <span class="text-xs px-2 py-1 rounded-full {token.positive ? 'bg-accent-primary/10 text-accent-primary' : 'bg-red-500/10 text-red-400'}">
            {token.change}
          </span>
        </div>
      </div>
    {/each}
  </div>
</div>
