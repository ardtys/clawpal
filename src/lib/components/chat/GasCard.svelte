<script lang="ts">
  import { Info } from 'lucide-svelte';

  interface Props {
    data: {
      network: string;
      status: string;
      statusColor: string;
      avgFee: string;
      avgFeeUsd: string;
      tps: string;
      blockTime: string;
      congestion: string;
      recommendation: string;
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-accent-primary"></div>
        <p class="text-text-primary font-semibold">{data.network} Network</p>
      </div>
      <span class="text-xs px-2 py-1 bg-accent-primary/10 text-accent-primary rounded-full">{data.status}</span>
    </div>
  </div>
  <div class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div class="text-center">
      <p class="text-text-muted text-xs mb-1">Avg. Fee</p>
      <p class="text-text-primary font-semibold">{data.avgFee}</p>
      <p class="text-accent-primary text-xs">{data.avgFeeUsd}</p>
    </div>
    <div class="text-center">
      <p class="text-text-muted text-xs mb-1">TPS</p>
      <p class="text-text-primary font-semibold">{data.tps}</p>
    </div>
    <div class="text-center">
      <p class="text-text-muted text-xs mb-1">Block Time</p>
      <p class="text-text-primary font-semibold">{data.blockTime}</p>
    </div>
    <div class="text-center">
      <p class="text-text-muted text-xs mb-1">Congestion</p>
      <p class="text-accent-primary font-semibold">{data.congestion}</p>
    </div>
  </div>
  <div class="px-4 pb-4">
    <div class="flex items-center gap-2 p-3 bg-accent-primary/10 rounded-lg">
      <Info size={16} class="text-accent-primary flex-shrink-0" />
      <p class="text-sm text-text-secondary">{data.recommendation}</p>
    </div>
  </div>
</div>
