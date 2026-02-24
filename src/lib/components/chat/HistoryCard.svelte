<script lang="ts">
  import { ArrowRightLeft, Send, Wallet, CheckCircle } from 'lucide-svelte';
  import type { Transaction } from '$lib/data/mockData';

  interface Props {
    data: {
      transactions: Transaction[];
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50 flex items-center justify-between">
    <p class="text-text-primary font-semibold">Recent Transactions</p>
    <span class="text-xs text-text-muted">{data.transactions.length} shown</span>
  </div>
  <div class="divide-y divide-border/30">
    {#each data.transactions as tx}
      <div class="p-4 flex items-center justify-between hover:bg-bg-card/30 transition-colors">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full flex items-center justify-center
            {tx.type === 'Swap' ? 'bg-accent-secondary/20 text-accent-secondary' :
             tx.type === 'Send' ? 'bg-red-500/20 text-red-400' :
             'bg-accent-primary/20 text-accent-primary'}">
            {#if tx.type === 'Swap'}
              <ArrowRightLeft size={18} />
            {:else if tx.type === 'Send'}
              <Send size={18} />
            {:else}
              <Wallet size={18} />
            {/if}
          </div>
          <div>
            <p class="text-text-primary font-medium">{tx.type}</p>
            <p class="text-text-muted text-xs">
              {#if tx.type === 'Swap'}
                {tx.from} → {tx.to}
              {:else if tx.type === 'Send'}
                {tx.amount} to {tx.to}
              {:else}
                {tx.amount} from {tx.from}
              {/if}
            </p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-text-muted text-xs">{tx.time}</p>
          <div class="flex items-center gap-1 mt-1">
            <CheckCircle size={12} class="text-accent-primary" />
            <span class="text-xs text-accent-primary">Confirmed</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
