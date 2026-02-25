<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowDownUp, RefreshCw, Zap, TrendingUp, ChevronDown } from 'lucide-svelte';
  import { createVisibilityObserver } from '$lib/utils';

  interface Token {
    symbol: string;
    name: string;
    mint: string;
    decimals: number;
    icon: string;
    color: string;
  }

  const tokens: Token[] = [
    { symbol: 'SOL', name: 'Solana', mint: 'So11111111111111111111111111111111111111112', decimals: 9, icon: 'S', color: 'from-purple-500 to-violet-600' },
    { symbol: 'USDC', name: 'USD Coin', mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, icon: '$', color: 'from-blue-500 to-cyan-600' },
    { symbol: 'USDT', name: 'Tether', mint: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', decimals: 6, icon: 'T', color: 'from-green-500 to-emerald-600' },
    { symbol: 'JUP', name: 'Jupiter', mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', decimals: 6, icon: 'J', color: 'from-lime-500 to-green-600' },
    { symbol: 'BONK', name: 'Bonk', mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5, icon: 'B', color: 'from-orange-500 to-amber-600' },
  ];

  let visible = $state(false);
  let fromToken = $state(tokens[0]);
  let toToken = $state(tokens[1]);
  let fromAmount = $state('1');
  let toAmount = $state('');
  let loading = $state(false);
  let error = $state('');
  let rate = $state('');
  let priceImpact = $state('');
  let showFromDropdown = $state(false);
  let showToDropdown = $state(false);
  let lastQuote = $state<any>(null);

  async function fetchQuote() {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toAmount = '';
      rate = '';
      return;
    }

    loading = true;
    error = '';

    try {
      const inputAmount = parseFloat(fromAmount) * Math.pow(10, fromToken.decimals);

      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.mint}&outputMint=${toToken.mint}&amount=${Math.floor(inputAmount)}&slippageBps=50`
      );

      if (!response.ok) throw new Error('Failed to fetch quote');

      const data = await response.json();
      lastQuote = data;

      const outputAmount = parseInt(data.outAmount) / Math.pow(10, toToken.decimals);
      toAmount = outputAmount.toLocaleString('en-US', { maximumFractionDigits: 6 });

      const rateValue = outputAmount / parseFloat(fromAmount);
      rate = `1 ${fromToken.symbol} = ${rateValue.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${toToken.symbol}`;

      priceImpact = data.priceImpactPct ? `${(parseFloat(data.priceImpactPct) * 100).toFixed(4)}%` : '< 0.01%';
    } catch (err) {
      error = 'Unable to fetch quote. Try again.';
      toAmount = '';
      rate = '';
      console.error('Quote error:', err);
    } finally {
      loading = false;
    }
  }

  function swapTokens() {
    const temp = fromToken;
    fromToken = toToken;
    toToken = temp;
    fromAmount = toAmount || '1';
    fetchQuote();
  }

  function selectFromToken(token: Token) {
    if (token.symbol === toToken.symbol) {
      swapTokens();
    } else {
      fromToken = token;
      fetchQuote();
    }
    showFromDropdown = false;
  }

  function selectToToken(token: Token) {
    if (token.symbol === fromToken.symbol) {
      swapTokens();
    } else {
      toToken = token;
      fetchQuote();
    }
    showToDropdown = false;
  }

  function handleAmountChange(e: Event) {
    const target = e.target as HTMLInputElement;
    fromAmount = target.value;
  }

  let debounceTimer: ReturnType<typeof setTimeout>;
  $effect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (fromAmount) fetchQuote();
    }, 500);
  });

  onMount(() => {
    fetchQuote();
    return createVisibilityObserver('swap-calculator', (isVisible) => {
      visible = isVisible;
    });
  });
</script>

<section id="swap-calculator" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary"></div>
  <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[150px]"></div>
  <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[120px]"></div>

  <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div
      class="opacity-0"
      class:animate-fade-in-up={visible}
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-4">
          <Zap size={16} class="text-accent-primary" />
          <span class="text-accent-primary text-sm font-medium">Live Swap Rates</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          Try the <span class="gradient-text">Swap Calculator</span>
        </h2>
        <p class="text-text-secondary">
          Real-time rates from Jupiter aggregator. See what you'd get.
        </p>
      </div>

      <!-- Calculator Card -->
      <div class="bg-bg-card border border-border rounded-2xl p-6 shadow-xl">
        <!-- From Token -->
        <div class="mb-2">
          <label class="text-text-muted text-sm mb-2 block">You pay</label>
          <div class="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border">
            <input
              type="number"
              value={fromAmount}
              oninput={handleAmountChange}
              placeholder="0.00"
              class="flex-1 bg-transparent text-2xl font-bold text-text-primary placeholder:text-text-muted focus:outline-none"
            />
            <div class="relative">
              <button
                onclick={() => { showFromDropdown = !showFromDropdown; showToDropdown = false; }}
                class="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border rounded-xl hover:border-accent-primary/50 transition-colors"
              >
                <div class="w-6 h-6 rounded-full bg-gradient-to-br {fromToken.color} flex items-center justify-center text-white text-xs font-bold">
                  {fromToken.icon}
                </div>
                <span class="text-text-primary font-medium">{fromToken.symbol}</span>
                <ChevronDown size={16} class="text-text-muted" />
              </button>

              {#if showFromDropdown}
                <div class="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden">
                  {#each tokens as token}
                    <button
                      onclick={() => selectFromToken(token)}
                      class="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-secondary transition-colors {token.symbol === fromToken.symbol ? 'bg-bg-secondary' : ''}"
                    >
                      <div class="w-6 h-6 rounded-full bg-gradient-to-br {token.color} flex items-center justify-center text-white text-xs font-bold">
                        {token.icon}
                      </div>
                      <div class="text-left">
                        <p class="text-text-primary font-medium text-sm">{token.symbol}</p>
                        <p class="text-text-muted text-xs">{token.name}</p>
                      </div>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- Swap Button -->
        <div class="flex justify-center -my-3 relative z-10">
          <button
            onclick={swapTokens}
            class="w-10 h-10 bg-bg-card border border-border rounded-xl flex items-center justify-center hover:border-accent-primary hover:bg-accent-primary/10 transition-all group"
          >
            <ArrowDownUp size={18} class="text-text-muted group-hover:text-accent-primary transition-colors" />
          </button>
        </div>

        <!-- To Token -->
        <div class="mt-2">
          <label class="text-text-muted text-sm mb-2 block">You receive</label>
          <div class="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border">
            <div class="flex-1">
              {#if loading}
                <div class="flex items-center gap-2">
                  <RefreshCw size={20} class="text-text-muted animate-spin" />
                  <span class="text-text-muted">Fetching quote...</span>
                </div>
              {:else if error}
                <span class="text-red-400 text-sm">{error}</span>
              {:else}
                <span class="text-2xl font-bold text-text-primary">{toAmount || '0.00'}</span>
              {/if}
            </div>
            <div class="relative">
              <button
                onclick={() => { showToDropdown = !showToDropdown; showFromDropdown = false; }}
                class="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border rounded-xl hover:border-accent-primary/50 transition-colors"
              >
                <div class="w-6 h-6 rounded-full bg-gradient-to-br {toToken.color} flex items-center justify-center text-white text-xs font-bold">
                  {toToken.icon}
                </div>
                <span class="text-text-primary font-medium">{toToken.symbol}</span>
                <ChevronDown size={16} class="text-text-muted" />
              </button>

              {#if showToDropdown}
                <div class="absolute right-0 top-full mt-2 w-48 bg-bg-card border border-border rounded-xl shadow-xl z-10 overflow-hidden">
                  {#each tokens as token}
                    <button
                      onclick={() => selectToToken(token)}
                      class="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-secondary transition-colors {token.symbol === toToken.symbol ? 'bg-bg-secondary' : ''}"
                    >
                      <div class="w-6 h-6 rounded-full bg-gradient-to-br {token.color} flex items-center justify-center text-white text-xs font-bold">
                        {token.icon}
                      </div>
                      <div class="text-left">
                        <p class="text-text-primary font-medium text-sm">{token.symbol}</p>
                        <p class="text-text-muted text-xs">{token.name}</p>
                      </div>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>

        <!-- Rate Info -->
        {#if rate && !loading}
          <div class="mt-4 p-3 bg-bg-secondary/50 rounded-xl space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Rate</span>
              <span class="text-text-primary font-mono">{rate}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Price Impact</span>
              <span class="text-accent-primary font-mono">{priceImpact}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-muted">Powered by</span>
              <span class="text-text-secondary">Jupiter Aggregator</span>
            </div>
          </div>
        {/if}

        <!-- CTA -->
        <a
          href="#waitlist"
          class="mt-4 w-full py-4 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Zap size={18} />
          Get Early Access to Swap
        </a>

        <p class="text-text-muted text-xs text-center mt-3">
          This is a rate preview. Join waitlist to execute real swaps.
        </p>
      </div>
    </div>
  </div>
</section>
