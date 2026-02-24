<script lang="ts">
  import { ArrowRightLeft, Clock, Check, ChevronRight } from 'lucide-svelte';
  import type { SwapData } from '$lib/data/mockData';

  interface Props {
    data: SwapData;
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-accent-primary/30 rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-lg font-bold text-white">
          {data.from.logo}
        </div>
        <div>
          <p class="text-text-muted text-xs">You Pay</p>
          <p class="text-text-primary font-bold text-lg">{data.from.amount} {data.from.symbol}</p>
          <p class="text-text-muted text-xs">{data.from.name}</p>
        </div>
      </div>
      <div class="p-2 bg-bg-card rounded-full">
        <ArrowRightLeft class="text-accent-primary" size={20} />
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-text-muted text-xs">You Receive</p>
          <p class="text-accent-primary font-bold text-lg">{data.to.amount} {data.to.symbol}</p>
          <p class="text-text-muted text-xs">{data.to.name}</p>
        </div>
        <div class="w-12 h-12 rounded-full bg-[#2775CA] flex items-center justify-center text-lg font-bold text-white">
          {data.to.logo}
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 bg-bg-card/30">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-4">
      <div>
        <p class="text-text-muted mb-1">Rate</p>
        <p class="text-text-primary font-medium">1 SOL = ${data.rate}</p>
      </div>
      <div>
        <p class="text-text-muted mb-1">Price Impact</p>
        <p class="text-accent-primary font-medium">{data.priceImpact}</p>
      </div>
      <div>
        <p class="text-text-muted mb-1">Slippage</p>
        <p class="text-text-primary font-medium">{data.slippage}</p>
      </div>
      <div>
        <p class="text-text-muted mb-1">Network Fee</p>
        <p class="text-text-primary font-medium">{data.networkFee}</p>
      </div>
    </div>
    <div class="flex items-center justify-between py-2 px-3 bg-bg-secondary/50 rounded-lg mb-4">
      <div class="flex items-center gap-2">
        <span class="text-xs text-text-muted">Route:</span>
        <div class="flex items-center gap-1">
          {#each data.route as r, i}
            <span class="text-xs text-accent-secondary font-medium">{r}</span>
            {#if i < data.route.length - 1}
              <ChevronRight size={12} class="text-text-muted" />
            {/if}
          {/each}
        </div>
      </div>
      <span class="text-xs text-accent-primary font-medium">Saving {data.savings}</span>
    </div>
    <div class="flex items-center justify-between text-xs text-text-muted mb-4">
      <span>Min. received: {data.minReceived}</span>
      <span class="flex items-center gap-1">
        <Clock size={12} />
        {data.estimatedTime}
      </span>
    </div>
    <button class="w-full py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
      <Check size={18} />
      Confirm Swap
    </button>
  </div>
</div>
