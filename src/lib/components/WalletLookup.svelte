<script lang="ts">
  import { onMount } from 'svelte';
  import { Search, Wallet, ExternalLink, RefreshCw, Copy, Check, TrendingUp, TrendingDown } from 'lucide-svelte';
  import { createVisibilityObserver } from '$lib/utils';

  interface TokenBalance {
    symbol: string;
    name: string;
    amount: number;
    usdValue: number;
    change24h: number;
    icon: string;
    color: string;
  }

  let visible = $state(false);
  let walletAddress = $state('');
  let loading = $state(false);
  let error = $state('');
  let balances = $state<TokenBalance[]>([]);
  let totalValue = $state(0);
  let solBalance = $state(0);
  let copied = $state(false);

  // Example wallets for demo
  const exampleWallets = [
    { label: 'Whale Wallet', address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM' },
    { label: 'NFT Collector', address: 'Fxn9sqzKLEnj6FLFyZ7VYjPHRK8iNpHuxnxqGhRLLi4t' },
  ];

  // Token metadata for display
  const tokenMeta: Record<string, { name: string; icon: string; color: string }> = {
    'SOL': { name: 'Solana', icon: 'S', color: 'from-purple-500 to-violet-600' },
    'USDC': { name: 'USD Coin', icon: '$', color: 'from-blue-500 to-cyan-600' },
    'USDT': { name: 'Tether', icon: 'T', color: 'from-green-500 to-emerald-600' },
    'JUP': { name: 'Jupiter', icon: 'J', color: 'from-lime-500 to-green-600' },
    'BONK': { name: 'Bonk', icon: 'B', color: 'from-orange-500 to-amber-600' },
    'RAY': { name: 'Raydium', icon: 'R', color: 'from-cyan-500 to-blue-600' },
    'ORCA': { name: 'Orca', icon: 'O', color: 'from-yellow-500 to-orange-600' },
  };

  function isValidSolanaAddress(address: string): boolean {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  }

  async function lookupWallet() {
    if (!walletAddress.trim()) {
      error = 'Please enter a wallet address';
      return;
    }

    if (!isValidSolanaAddress(walletAddress.trim())) {
      error = 'Invalid Solana wallet address';
      return;
    }

    loading = true;
    error = '';
    balances = [];

    try {
      // Fetch SOL balance using public RPC
      const solResponse = await fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [walletAddress.trim()]
        })
      });

      const solData = await solResponse.json();
      if (solData.error) throw new Error(solData.error.message);

      solBalance = (solData.result?.value || 0) / 1e9;

      // Fetch SOL price
      const priceResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true'
      );
      const priceData = await priceResponse.json();
      const solPrice = priceData.solana?.usd || 0;
      const solChange = priceData.solana?.usd_24h_change || 0;

      // Build balances array
      const newBalances: TokenBalance[] = [];

      if (solBalance > 0) {
        newBalances.push({
          symbol: 'SOL',
          name: 'Solana',
          amount: solBalance,
          usdValue: solBalance * solPrice,
          change24h: solChange,
          icon: 'S',
          color: 'from-purple-500 to-violet-600'
        });
      }

      // Fetch token accounts (SPL tokens)
      const tokenResponse = await fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress.trim(),
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' }
          ]
        })
      });

      const tokenData = await tokenResponse.json();
      const tokenAccounts = tokenData.result?.value || [];

      // Process token accounts (simplified - in production you'd fetch token metadata)
      for (const account of tokenAccounts.slice(0, 10)) {
        const info = account.account.data.parsed.info;
        const amount = parseFloat(info.tokenAmount.uiAmountString || '0');

        if (amount > 0) {
          // Try to identify known tokens (simplified)
          const mint = info.mint;
          let tokenInfo = { symbol: 'Unknown', name: 'Unknown Token', icon: '?', color: 'from-gray-500 to-gray-600' };

          // Check if it's a known token
          if (mint === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') {
            tokenInfo = { symbol: 'USDC', ...tokenMeta['USDC'] };
          } else if (mint === 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') {
            tokenInfo = { symbol: 'USDT', ...tokenMeta['USDT'] };
          } else if (mint === 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN') {
            tokenInfo = { symbol: 'JUP', ...tokenMeta['JUP'] };
          } else if (mint === 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263') {
            tokenInfo = { symbol: 'BONK', ...tokenMeta['BONK'] };
          }

          if (tokenInfo.symbol !== 'Unknown') {
            newBalances.push({
              symbol: tokenInfo.symbol,
              name: tokenInfo.name,
              amount: amount,
              usdValue: 0, // Would need price API for each token
              change24h: 0,
              icon: tokenInfo.icon,
              color: tokenInfo.color
            });
          }
        }
      }

      balances = newBalances;
      totalValue = newBalances.reduce((sum, b) => sum + b.usdValue, 0);

    } catch (err) {
      error = 'Failed to fetch wallet data. Please try again.';
      console.error('Wallet lookup error:', err);
    } finally {
      loading = false;
    }
  }

  function useExample(address: string) {
    walletAddress = address;
    lookupWallet();
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(walletAddress);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  function formatAmount(amount: number): string {
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(2)}K`;
    if (amount >= 1) return amount.toFixed(4);
    return amount.toFixed(8);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') lookupWallet();
  }

  onMount(() => {
    return createVisibilityObserver('wallet-lookup', (isVisible) => {
      visible = isVisible;
    });
  });
</script>

<section id="wallet-lookup" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 grid-bg opacity-20"></div>
  <div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]"></div>

  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div
      class="opacity-0"
      class:animate-fade-in-up={visible}
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full mb-4">
          <Search size={16} class="text-accent-secondary" />
          <span class="text-accent-secondary text-sm font-medium">Wallet Explorer</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Lookup Any <span class="gradient-text-purple">Wallet</span>
        </h2>
        <p class="text-text-secondary">
          Enter any Solana wallet address to see their portfolio. No connection needed.
        </p>
      </div>

      <!-- Search Box -->
      <div class="bg-bg-card border border-border rounded-2xl p-6 shadow-xl">
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <div class="flex-1 relative">
            <Wallet size={18} class="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              bind:value={walletAddress}
              onkeydown={handleKeydown}
              placeholder="Enter Solana wallet address..."
              class="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>
          <button
            onclick={lookupWallet}
            disabled={loading}
            class="px-6 py-3 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
          >
            {#if loading}
              <RefreshCw size={18} class="animate-spin" />
              <span>Looking up...</span>
            {:else}
              <Search size={18} />
              <span>Lookup</span>
            {/if}
          </button>
        </div>

        <!-- Example wallets -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="text-text-muted text-sm">Try:</span>
          {#each exampleWallets as example}
            <button
              onclick={() => useExample(example.address)}
              class="px-3 py-1 text-sm bg-bg-secondary border border-border rounded-lg text-text-secondary hover:text-accent-primary hover:border-accent-primary/50 transition-colors"
            >
              {example.label}
            </button>
          {/each}
        </div>

        {#if error}
          <div class="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
            <p class="text-red-400 text-sm">{error}</p>
          </div>
        {/if}

        <!-- Results -->
        {#if balances.length > 0}
          <div class="border-t border-border pt-4">
            <!-- Wallet header -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                  <Wallet size={16} class="text-white" />
                </div>
                <div>
                  <p class="text-text-primary font-medium text-sm">
                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                  </p>
                  <p class="text-text-muted text-xs">{balances.length} tokens found</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button
                  onclick={copyAddress}
                  class="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                  title="Copy address"
                >
                  {#if copied}
                    <Check size={16} class="text-accent-primary" />
                  {:else}
                    <Copy size={16} class="text-text-muted" />
                  {/if}
                </button>
                <a
                  href="https://solscan.io/account/{walletAddress}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                  title="View on Solscan"
                >
                  <ExternalLink size={16} class="text-text-muted" />
                </a>
              </div>
            </div>

            <!-- Total value -->
            {#if totalValue > 0}
              <div class="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-xl mb-4">
                <p class="text-text-muted text-sm">Total Value</p>
                <p class="text-2xl font-bold text-accent-primary">
                  ${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              </div>
            {/if}

            <!-- Token list -->
            <div class="space-y-2">
              {#each balances as token}
                <div class="flex items-center justify-between p-3 bg-bg-secondary/50 rounded-xl">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br {token.color} flex items-center justify-center text-white font-bold">
                      {token.icon}
                    </div>
                    <div>
                      <p class="text-text-primary font-medium">{token.symbol}</p>
                      <p class="text-text-muted text-sm">{token.name}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-text-primary font-mono">{formatAmount(token.amount)}</p>
                    {#if token.usdValue > 0}
                      <p class="text-text-muted text-sm">${token.usdValue.toFixed(2)}</p>
                    {/if}
                    {#if token.change24h !== 0}
                      <div class="flex items-center justify-end gap-1 text-xs {token.change24h >= 0 ? 'text-accent-primary' : 'text-red-400'}">
                        {#if token.change24h >= 0}
                          <TrendingUp size={12} />
                        {:else}
                          <TrendingDown size={12} />
                        {/if}
                        {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>

            <!-- CTA -->
            <a
              href="#waitlist"
              class="mt-6 w-full py-4 bg-accent-secondary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Wallet size={18} />
              Track This Wallet with Pal Claw
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
