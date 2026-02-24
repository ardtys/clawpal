<script lang="ts">
  import type { StakeOption } from '$lib/data/mockData';

  interface Props {
    data: {
      options: StakeOption[];
      currentStaked: string;
      availableToStake: string;
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50">
    <div class="flex items-center justify-between">
      <p class="text-text-primary font-semibold">Staking Options</p>
      <span class="text-xs text-text-muted">Available: {data.availableToStake}</span>
    </div>
  </div>
  <div class="divide-y divide-border/30">
    {#each data.options as opt}
      <div class="p-4 flex items-center justify-between hover:bg-bg-card/30 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center text-sm font-bold text-accent-primary">
            {opt.validator.charAt(0)}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p class="text-text-primary font-medium">{opt.validator}</p>
              {#if opt.recommended}
                <span class="text-xs px-2 py-0.5 bg-accent-primary/10 text-accent-primary rounded">Recommended</span>
              {/if}
            </div>
            <p class="text-text-muted text-xs">Min: {opt.minStake} • {opt.lockup}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-accent-primary font-bold text-lg">{opt.apy}</p>
          <p class="text-text-muted text-xs">APY</p>
        </div>
      </div>
    {/each}
  </div>
</div>
