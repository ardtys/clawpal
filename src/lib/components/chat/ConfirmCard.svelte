<script lang="ts">
  import { AlertCircle, Check } from 'lucide-svelte';

  interface Props {
    data: {
      action: string;
      amount: string;
      value: string;
      to: string;
      toFull: string;
      fee: string;
      feeUsd: string;
      network: string;
      estimatedTime: string;
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-accent-warning/30 rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50 flex items-center gap-2 text-accent-warning">
    <AlertCircle size={18} />
    <span class="font-semibold">Confirm Transaction</span>
  </div>
  <div class="p-4 space-y-3">
    <div class="flex justify-between py-2 border-b border-border/30">
      <span class="text-text-muted">Action</span>
      <span class="text-text-primary font-medium">{data.action}</span>
    </div>
    <div class="flex justify-between py-2 border-b border-border/30">
      <span class="text-text-muted">Amount</span>
      <span class="text-text-primary font-medium">{data.amount}</span>
    </div>
    <div class="flex justify-between py-2 border-b border-border/30">
      <span class="text-text-muted">Value (USD)</span>
      <span class="text-text-primary">{data.value}</span>
    </div>
    <div class="flex justify-between py-2 border-b border-border/30">
      <span class="text-text-muted">Recipient</span>
      <span class="text-accent-primary font-mono text-sm">{data.to}</span>
    </div>
    <div class="flex justify-between py-2 border-b border-border/30">
      <span class="text-text-muted">Network Fee</span>
      <span class="text-text-primary">{data.fee} <span class="text-text-muted">({data.feeUsd})</span></span>
    </div>
    <div class="flex justify-between py-2">
      <span class="text-text-muted">Est. Time</span>
      <span class="text-text-primary">{data.estimatedTime}</span>
    </div>
  </div>
  <div class="p-4 pt-0 flex gap-3">
    <button class="flex-1 py-3 border border-border rounded-xl text-text-secondary hover:bg-bg-card transition-colors font-medium">
      Cancel
    </button>
    <button class="flex-1 py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
      <Check size={18} />
      Confirm
    </button>
  </div>
</div>
