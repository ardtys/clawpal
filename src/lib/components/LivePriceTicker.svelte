<script lang="ts">
  import { onMount } from 'svelte';
  import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-svelte';

  interface TokenPrice {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    icon: string;
  }

  let prices = $state<TokenPrice[]>([]);
  let loading = $state(true);
  let error = $state('');
  let lastUpdate = $state<Date | null>(null);

  const tokens = [
    { id: 'solana', symbol: 'SOL', name: 'Solana', icon: 'S' },
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', icon: 'B' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', icon: 'E' },
    { id: 'jupiter-exchange-solana', symbol: 'JUP', name: 'Jupiter', icon: 'J' },
    { id: 'bonk', symbol: 'BONK', name: 'Bonk', icon: 'K' },
  ];

  async function fetchPrices() {
    try {
      const ids = tokens.map(t => t.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );

      if (!response.ok) throw new Error('Failed to fetch prices');

      const data = await response.json();

      prices = tokens.map(token => ({
        ...token,
        price: data[token.id]?.usd || 0,
        change24h: data[token.id]?.usd_24h_change || 0
      }));

      lastUpdate = new Date();
      error = '';
    } catch (err) {
      error = 'Unable to fetch prices';
      console.error('Price fetch error:', err);
    } finally {
      loading = false;
    }
  }

  function formatPrice(price: number): string {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.0001) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(8)}`;
  }

  function formatChange(change: number): string {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }

  onMount(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  });
</script>

<div class="w-full overflow-hidden bg-bg-secondary/50 border-y border-border">
  <div class="flex items-center">
    <!-- Live indicator -->
    <div class="flex-shrink-0 px-4 py-3 border-r border-border bg-bg-card/50">
      <div class="flex items-center gap-2">
        <div class="relative">
          <div class="w-2 h-2 bg-accent-primary rounded-full"></div>
          <div class="absolute inset-0 w-2 h-2 bg-accent-primary rounded-full animate-ping"></div>
        </div>
        <span class="text-text-muted text-xs font-medium hidden sm:inline">LIVE</span>
      </div>
    </div>

    <!-- Scrolling prices -->
    <div class="flex-1 overflow-hidden">
      {#if loading}
        <div class="flex items-center justify-center py-3">
          <RefreshCw size={16} class="text-text-muted animate-spin" />
          <span class="text-text-muted text-sm ml-2">Loading prices...</span>
        </div>
      {:else if error}
        <div class="flex items-center justify-center py-3">
          <span class="text-text-muted text-sm">{error}</span>
          <button onclick={fetchPrices} class="ml-2 text-accent-primary text-sm hover:underline">Retry</button>
        </div>
      {:else}
        <div class="flex animate-scroll">
          {#each [...prices, ...prices] as token}
            <div class="flex-shrink-0 flex items-center gap-4 px-6 py-3 border-r border-border/50">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-bg-card flex items-center justify-center text-xs font-bold text-text-primary">
                  {token.icon}
                </div>
                <span class="text-text-primary font-medium text-sm">{token.symbol}</span>
              </div>
              <span class="text-text-primary font-mono text-sm">{formatPrice(token.price)}</span>
              <span class="flex items-center gap-1 text-sm font-medium {token.change24h >= 0 ? 'text-accent-primary' : 'text-red-400'}">
                {#if token.change24h >= 0}
                  <TrendingUp size={14} />
                {:else}
                  <TrendingDown size={14} />
                {/if}
                {formatChange(token.change24h)}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 30s linear infinite;
  }

  .animate-scroll:hover {
    animation-play-state: paused;
  }
</style>
