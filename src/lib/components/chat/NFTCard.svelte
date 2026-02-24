<script lang="ts">
  import { Image } from 'lucide-svelte';
  import type { NFT } from '$lib/data/mockData';

  interface Props {
    data: {
      nfts: NFT[];
      totalValue: string;
      totalUsd: string;
    };
  }

  let { data }: Props = $props();
</script>

<div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
  <div class="p-4 border-b border-border/50 flex items-center justify-between">
    <p class="text-text-primary font-semibold">Your NFT Collection</p>
    <div class="text-right">
      <p class="text-accent-primary font-semibold">{data.totalValue}</p>
      <p class="text-text-muted text-xs">{data.totalUsd}</p>
    </div>
  </div>
  <div class="p-4 grid gap-3">
    {#each data.nfts as nft}
      <div class="flex items-center gap-3 p-3 bg-bg-card/50 rounded-lg">
        <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
          <Image size={24} class="text-purple-400" />
        </div>
        <div class="flex-1">
          <p class="text-text-primary font-medium">{nft.name}</p>
          <p class="text-text-muted text-xs">{nft.collection}</p>
        </div>
        <div class="text-right">
          <p class="text-text-primary font-medium">{nft.floor}</p>
          <p class="text-accent-secondary text-xs">{nft.rarity}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
