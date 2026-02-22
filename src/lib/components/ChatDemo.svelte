<script lang="ts">
  import {
    Send, RotateCcw, Wallet, ArrowRightLeft, PieChart, TrendingUp, Sparkles,
    Check, AlertCircle, ExternalLink, Clock, Shield, Zap, History, Coins,
    Image, Gift, RefreshCw, ChevronRight, Info, Copy, CheckCircle, Globe
  } from 'lucide-svelte';
  import { onMount } from 'svelte';

  type MessageType = 'text' | 'swap' | 'balance' | 'portfolio' | 'price' | 'confirm' | 'history' | 'stake' | 'nft' | 'gas';

  interface Message {
    id: number;
    role: 'user' | 'bot';
    text: string;
    type?: MessageType;
    meta?: string;
    data?: Record<string, unknown>;
    timestamp?: string;
  }

  let messages = $state<Message[]>([]);
  let input = $state('');
  let isThinking = $state(false);
  let chatEl: HTMLDivElement;
  let visible = $state(false);
  let copiedTx = $state(false);

  function getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  const scenarios: Record<string, { response: string; type?: MessageType; meta?: string; data?: Record<string, unknown> }> = {
    'balance': {
      response: "Here's your current wallet balance:",
      type: 'balance',
      meta: 'Synced just now',
      data: {
        tokens: [
          { symbol: 'SOL', name: 'Solana', amount: '23.4521', value: '$3,978.42', change: '+4.2%', positive: true, icon: 'S' },
          { symbol: 'USDC', name: 'USD Coin', amount: '1,250.00', value: '$1,250.00', change: '0%', positive: true, icon: '$' },
          { symbol: 'JUP', name: 'Jupiter', amount: '500', value: '$425.00', change: '+12.3%', positive: true, icon: 'J' },
          { symbol: 'BONK', name: 'Bonk', amount: '2,500,000', value: '$62.50', change: '-2.1%', positive: false, icon: 'B' },
        ],
        total: '$5,715.92',
        change24h: '+$342.18',
        changePercent: '+6.37%'
      }
    },
    'swap': {
      response: "Found the best route across 12 DEXs:",
      type: 'swap',
      meta: 'Route optimized via Jupiter',
      data: {
        from: { symbol: 'SOL', amount: '10', logo: 'S', name: 'Solana' },
        to: { symbol: 'USDC', amount: '1,687.23', logo: '$', name: 'USD Coin' },
        rate: '168.72',
        slippage: '0.5%',
        fee: '$0.003',
        networkFee: '0.000005 SOL',
        route: ['Jupiter', 'Raydium'],
        priceImpact: '0.02%',
        savings: '$2.34',
        minReceived: '1,678.79 USDC',
        estimatedTime: '~15 seconds'
      }
    },
    'send': {
      response: "Ready to send. Please review the details:",
      type: 'confirm',
      meta: 'Recipient verified',
      data: {
        action: 'Send',
        amount: '5 SOL',
        value: '$850.00',
        to: '7xKp...3mNq',
        toFull: '7xKpV8mRjU9kLmNq4wE2dF5gH6jK8pL9',
        fee: '0.000005 SOL',
        feeUsd: '$0.0008',
        network: 'Solana Mainnet',
        estimatedTime: '~400ms'
      }
    },
    'price': {
      response: "Here's the latest market data for SOL:",
      type: 'price',
      data: {
        symbol: 'SOL',
        name: 'Solana',
        price: '$169.82',
        change1h: '+0.8%',
        change24h: '+4.2%',
        change7d: '+12.5%',
        high24h: '$172.50',
        low24h: '$162.30',
        volume: '$2.1B',
        marketCap: '$78.2B',
        rank: '#5',
        ath: '$260.06',
        athDate: 'Nov 2021',
        positive: true
      }
    },
    'portfolio': {
      response: "Your portfolio breakdown:",
      type: 'portfolio',
      meta: 'Live data',
      data: {
        total: '$5,715.92',
        change: '+$342.18',
        changePercent: '+6.37%',
        positive: true,
        pnlAllTime: '+$1,240.50',
        pnlPercent: '+27.7%',
        allocation: [
          { token: 'SOL', percent: 70, color: '#14F195', value: '$3,978.42' },
          { token: 'USDC', percent: 22, color: '#2775CA', value: '$1,250.00' },
          { token: 'JUP', percent: 7, color: '#00D18C', value: '$425.00' },
          { token: 'Other', percent: 1, color: '#8B8BA3', value: '$62.50' }
        ],
        topPerformer: { token: 'JUP', change: '+12.3%' },
        worstPerformer: { token: 'BONK', change: '-2.1%' }
      }
    },
    'history': {
      response: "Here are your recent transactions:",
      type: 'history',
      meta: 'Last 5 transactions',
      data: {
        transactions: [
          { type: 'Swap', from: '5 SOL', to: '845 USDC', time: '2 hours ago', status: 'completed', hash: '4xK7...mN9q' },
          { type: 'Receive', amount: '10 SOL', from: '8pLm...4kWq', time: '5 hours ago', status: 'completed', hash: '7hJ2...pL5r' },
          { type: 'Send', amount: '100 USDC', to: 'alice.sol', time: '1 day ago', status: 'completed', hash: '9nM4...qR8s' },
          { type: 'Swap', from: '1000 BONK', to: '0.025 SOL', time: '2 days ago', status: 'completed', hash: '2kP9...nT6v' },
        ]
      }
    },
    'stake': {
      response: "Here are the best staking options for SOL:",
      type: 'stake',
      meta: 'Updated 5 min ago',
      data: {
        options: [
          { validator: 'Marinade', apy: '7.2%', minStake: '0.01 SOL', lockup: 'Liquid', recommended: true },
          { validator: 'Jito', apy: '7.8%', minStake: '0.1 SOL', lockup: 'Liquid', recommended: false },
          { validator: 'Blaze', apy: '6.9%', minStake: '0.01 SOL', lockup: 'Liquid', recommended: false },
        ],
        currentStaked: '0 SOL',
        availableToStake: '23.45 SOL'
      }
    },
    'gas': {
      response: "Current network conditions:",
      type: 'gas',
      meta: 'Real-time data',
      data: {
        network: 'Solana',
        status: 'Normal',
        statusColor: 'green',
        avgFee: '0.000005 SOL',
        avgFeeUsd: '$0.0008',
        tps: '3,245',
        blockTime: '400ms',
        congestion: 'Low',
        recommendation: 'Good time to transact - fees are minimal'
      }
    },
    'nft': {
      response: "Here are your NFTs:",
      type: 'nft',
      meta: '4 NFTs found',
      data: {
        nfts: [
          { name: 'Mad Lad #4521', collection: 'Mad Lads', floor: '85 SOL', rarity: 'Top 10%' },
          { name: 'Okay Bear #2341', collection: 'Okay Bears', floor: '42 SOL', rarity: 'Top 25%' },
          { name: 'DeGod #8891', collection: 'DeGods', floor: '28 SOL', rarity: 'Top 50%' },
        ],
        totalValue: '~155 SOL',
        totalUsd: '~$26,321'
      }
    }
  };

  function getResponse(text: string): { response: string; type?: MessageType; meta?: string; data?: Record<string, unknown> } {
    const lower = text.toLowerCase();
    if (lower.includes('balance') || lower.includes('how much') || lower.includes('what do i have')) return scenarios['balance'];
    if (lower.includes('swap') || lower.includes('trade') || lower.includes('buy') || lower.includes('convert') || lower.includes('exchange')) return scenarios['swap'];
    if (lower.includes('send') || lower.includes('transfer')) return scenarios['send'];
    if (lower.includes('price') || lower.includes('worth') || lower.includes('how much is') || lower.includes('cost')) return scenarios['price'];
    if (lower.includes('portfolio') || lower.includes('bags') || lower.includes('holdings') || lower.includes('overview')) return scenarios['portfolio'];
    if (lower.includes('history') || lower.includes('transactions') || lower.includes('activity') || lower.includes('recent')) return scenarios['history'];
    if (lower.includes('stake') || lower.includes('staking') || lower.includes('yield') || lower.includes('earn')) return scenarios['stake'];
    if (lower.includes('gas') || lower.includes('fee') || lower.includes('network') || lower.includes('congestion')) return scenarios['gas'];
    if (lower.includes('nft') || lower.includes('collectible') || lower.includes('jpeg')) return scenarios['nft'];

    return {
      response: `I understand you want to "${text}". This is a demo environment - in the full version, I can help you with swaps, transfers, portfolio tracking, staking, and much more. Try one of the quick actions to see what I can do!`
    };
  }

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg) return;

    input = '';
    const timestamp = getCurrentTime();

    messages = [...messages, { id: Date.now(), role: 'user', text: msg, timestamp }];
    scrollToBottom();

    isThinking = true;
    await new Promise(r => setTimeout(r, 800 + Math.random() * 800));
    isThinking = false;

    const { response, type, meta, data } = getResponse(msg);
    messages = [...messages, { id: Date.now() + 1, role: 'bot', text: response, type, meta, data, timestamp: getCurrentTime() }];
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
    }, 50);
  }

  function reset() {
    messages = [];
    setTimeout(() => {
      messages = [{
        id: 1,
        role: 'bot',
        text: "Hey! I'm ClawPal, your AI crypto assistant. I can help you swap tokens, check balances, track your portfolio, and more. What would you like to do?",
        type: 'text',
        timestamp: getCurrentTime()
      }];
    }, 100);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedTx = true;
    setTimeout(() => copiedTx = false, 2000);
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  onMount(() => {
    messages = [{
      id: 1,
      role: 'bot',
      text: "Hey! I'm ClawPal, your AI crypto assistant. I can help you swap tokens, check balances, track your portfolio, and more. What would you like to do?",
      type: 'text',
      timestamp: getCurrentTime()
    }];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('demo');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const suggestions = [
    { text: "What's my balance?", icon: Wallet, category: 'Wallet' },
    { text: "Swap 10 SOL to USDC", icon: ArrowRightLeft, category: 'Trade' },
    { text: "Show my portfolio", icon: PieChart, category: 'Analytics' },
    { text: "What's the price of SOL?", icon: TrendingUp, category: 'Market' },
    { text: "Show transaction history", icon: History, category: 'Activity' },
    { text: "Staking options for SOL", icon: Coins, category: 'DeFi' },
    { text: "Check gas fees", icon: Zap, category: 'Network' },
    { text: "Show my NFTs", icon: Image, category: 'NFTs' }
  ];

  const stats = [
    { label: 'DEXs Integrated', value: '12+' },
    { label: 'Avg. Response', value: '< 1s' },
    { label: 'Tokens Supported', value: '1000+' },
    { label: 'Networks', value: '2' }
  ];

  const features = [
    { icon: Zap, text: "Instant execution" },
    { icon: Shield, text: "Non-custodial" },
    { icon: RefreshCw, text: "Real-time prices" },
    { icon: Globe, text: "Multi-chain ready" }
  ];
</script>

<section id="demo" class="py-24 relative overflow-hidden">
  <!-- Background decorations -->
  <div class="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]"></div>
  <div class="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px]"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Section intro -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full mb-6">
          <Sparkles size={16} class="text-accent-secondary" />
          <span class="text-accent-secondary text-sm font-medium">Interactive Demo</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Experience the <span class="gradient-text-purple">Magic</span>
        </h2>
        <p class="text-text-secondary text-lg">
          Type naturally, like you're chatting with a friend. No complex commands to memorize.
          Just describe what you want and watch it happen.
        </p>
      </div>
    </div>

    <!-- Stats bar -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each stats as stat}
        <div class="bg-bg-card/50 border border-border rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-accent-primary">{stat.value}</p>
          <p class="text-text-muted text-sm">{stat.label}</p>
        </div>
      {/each}
    </div>

    <!-- Chat container -->
    <div
      class="grid lg:grid-cols-12 gap-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >

      <!-- Main chat window -->
      <div class="lg:col-span-8">
        <div class="relative">
          <!-- Glow behind chat -->
          <div class="absolute -inset-2 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-3xl blur-xl opacity-60"></div>

          <div class="relative bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-border bg-bg-secondary/30">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img
                    src="/clawpal-logo.png"
                    alt="ClawPal"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-primary rounded-full border-2 border-bg-card"></div>
                </div>
                <div>
                  <p class="text-text-primary font-semibold">ClawPal Assistant</p>
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse"></div>
                    <p class="text-text-muted text-xs">Online</p>
                    <span class="text-text-muted text-xs">•</span>
                    <p class="text-text-muted text-xs">Demo Mode</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-secondary rounded-lg">
                  <div class="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span class="text-text-secondary text-xs">Solana</span>
                </div>
                <div class="px-2 py-1 bg-accent-warning/10 border border-accent-warning/20 rounded-md">
                  <span class="text-accent-warning text-xs font-mono">devnet</span>
                </div>
                <button onclick={reset} class="p-2 text-text-muted hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all" title="Reset chat">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            <!-- Messages -->
            <div bind:this={chatEl} class="h-[500px] overflow-y-auto p-5 space-y-4">
              {#each messages as msg (msg.id)}
                <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up">
                  <div class="max-w-[90%]">
                    <!-- Text message -->
                    <div class="{msg.role === 'user'
                      ? 'bg-accent-primary text-bg-primary'
                      : 'bg-bg-secondary text-text-primary'} px-4 py-3 rounded-2xl {msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}">
                      <p class="text-sm">{msg.text}</p>
                    </div>

                    <!-- Balance Card -->
                    {#if msg.type === 'balance' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50 bg-bg-card/50">
                          <div class="flex items-center justify-between">
                            <div>
                              <p class="text-text-muted text-xs uppercase tracking-wider">Total Balance</p>
                              <p class="text-text-primary font-bold text-2xl">{msg.data.total}</p>
                            </div>
                            <div class="text-right">
                              <p class="text-xs text-text-muted">24h Change</p>
                              <p class="text-accent-primary font-semibold">{msg.data.change24h} ({msg.data.changePercent})</p>
                            </div>
                          </div>
                        </div>
                        <div class="p-4 space-y-3">
                          {#each msg.data.tokens as token}
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
                    {/if}

                    <!-- Swap Card -->
                    {#if msg.type === 'swap' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-accent-primary/30 rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-lg font-bold text-white">
                                {msg.data.from.logo}
                              </div>
                              <div>
                                <p class="text-text-muted text-xs">You Pay</p>
                                <p class="text-text-primary font-bold text-lg">{msg.data.from.amount} {msg.data.from.symbol}</p>
                                <p class="text-text-muted text-xs">{msg.data.from.name}</p>
                              </div>
                            </div>
                            <div class="p-2 bg-bg-card rounded-full">
                              <ArrowRightLeft class="text-accent-primary" size={20} />
                            </div>
                            <div class="flex items-center gap-3">
                              <div class="text-right">
                                <p class="text-text-muted text-xs">You Receive</p>
                                <p class="text-accent-primary font-bold text-lg">{msg.data.to.amount} {msg.data.to.symbol}</p>
                                <p class="text-text-muted text-xs">{msg.data.to.name}</p>
                              </div>
                              <div class="w-12 h-12 rounded-full bg-[#2775CA] flex items-center justify-center text-lg font-bold text-white">
                                {msg.data.to.logo}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="p-4 bg-bg-card/30">
                          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-4">
                            <div>
                              <p class="text-text-muted mb-1">Rate</p>
                              <p class="text-text-primary font-medium">1 SOL = ${msg.data.rate}</p>
                            </div>
                            <div>
                              <p class="text-text-muted mb-1">Price Impact</p>
                              <p class="text-accent-primary font-medium">{msg.data.priceImpact}</p>
                            </div>
                            <div>
                              <p class="text-text-muted mb-1">Slippage</p>
                              <p class="text-text-primary font-medium">{msg.data.slippage}</p>
                            </div>
                            <div>
                              <p class="text-text-muted mb-1">Network Fee</p>
                              <p class="text-text-primary font-medium">{msg.data.networkFee}</p>
                            </div>
                          </div>
                          <div class="flex items-center justify-between py-2 px-3 bg-bg-secondary/50 rounded-lg mb-4">
                            <div class="flex items-center gap-2">
                              <span class="text-xs text-text-muted">Route:</span>
                              <div class="flex items-center gap-1">
                                {#each msg.data.route as r, i}
                                  <span class="text-xs text-accent-secondary font-medium">{r}</span>
                                  {#if i < msg.data.route.length - 1}
                                    <ChevronRight size={12} class="text-text-muted" />
                                  {/if}
                                {/each}
                              </div>
                            </div>
                            <span class="text-xs text-accent-primary font-medium">Saving {msg.data.savings}</span>
                          </div>
                          <div class="flex items-center justify-between text-xs text-text-muted mb-4">
                            <span>Min. received: {msg.data.minReceived}</span>
                            <span class="flex items-center gap-1">
                              <Clock size={12} />
                              {msg.data.estimatedTime}
                            </span>
                          </div>
                          <button class="w-full py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Check size={18} />
                            Confirm Swap
                          </button>
                        </div>
                      </div>
                    {/if}

                    <!-- Price Card -->
                    {#if msg.type === 'price' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                              <div class="w-14 h-14 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-xl font-bold text-white">
                                S
                              </div>
                              <div>
                                <div class="flex items-center gap-2">
                                  <p class="text-text-primary font-bold text-xl">{msg.data.symbol}</p>
                                  <span class="text-xs text-text-muted px-2 py-0.5 bg-bg-card rounded">{msg.data.rank}</span>
                                </div>
                                <p class="text-text-muted text-sm">{msg.data.name}</p>
                              </div>
                            </div>
                            <div class="text-right">
                              <p class="text-text-primary font-bold text-3xl">{msg.data.price}</p>
                              <div class="flex items-center justify-end gap-2 mt-1">
                                <span class="text-xs px-2 py-0.5 rounded {msg.data.positive ? 'bg-accent-primary/10 text-accent-primary' : 'bg-red-500/10 text-red-400'}">
                                  1h: {msg.data.change1h}
                                </span>
                                <span class="text-xs px-2 py-0.5 rounded {msg.data.positive ? 'bg-accent-primary/10 text-accent-primary' : 'bg-red-500/10 text-red-400'}">
                                  24h: {msg.data.change24h}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div class="bg-bg-card p-3 rounded-lg">
                            <p class="text-text-muted text-xs mb-1">24h High</p>
                            <p class="text-text-primary font-semibold">{msg.data.high24h}</p>
                          </div>
                          <div class="bg-bg-card p-3 rounded-lg">
                            <p class="text-text-muted text-xs mb-1">24h Low</p>
                            <p class="text-text-primary font-semibold">{msg.data.low24h}</p>
                          </div>
                          <div class="bg-bg-card p-3 rounded-lg">
                            <p class="text-text-muted text-xs mb-1">Volume (24h)</p>
                            <p class="text-text-primary font-semibold">{msg.data.volume}</p>
                          </div>
                          <div class="bg-bg-card p-3 rounded-lg">
                            <p class="text-text-muted text-xs mb-1">Market Cap</p>
                            <p class="text-text-primary font-semibold">{msg.data.marketCap}</p>
                          </div>
                        </div>
                        <div class="px-4 pb-4">
                          <div class="flex items-center justify-between py-2 px-3 bg-bg-card/50 rounded-lg text-xs">
                            <span class="text-text-muted">All-Time High: {msg.data.ath}</span>
                            <span class="text-text-muted">{msg.data.athDate}</span>
                          </div>
                        </div>
                      </div>
                    {/if}

                    <!-- Portfolio Card -->
                    {#if msg.type === 'portfolio' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50">
                          <div class="flex items-center justify-between mb-4">
                            <div>
                              <p class="text-text-muted text-xs uppercase tracking-wider">Portfolio Value</p>
                              <p class="text-text-primary font-bold text-3xl">{msg.data.total}</p>
                            </div>
                            <div class="text-right">
                              <p class="text-text-muted text-xs">24h P&L</p>
                              <p class="text-lg font-bold {msg.data.positive ? 'text-accent-primary' : 'text-red-400'}">
                                {msg.data.change} ({msg.data.changePercent})
                              </p>
                            </div>
                          </div>
                          <div class="flex items-center gap-2 text-xs">
                            <span class="text-text-muted">All-time P&L:</span>
                            <span class="text-accent-primary font-semibold">{msg.data.pnlAllTime} ({msg.data.pnlPercent})</span>
                          </div>
                        </div>
                        <div class="p-4">
                          <p class="text-text-muted text-xs uppercase tracking-wider mb-3">Allocation</p>
                          <div class="flex h-4 rounded-full overflow-hidden mb-4">
                            {#each msg.data.allocation as alloc}
                              <div
                                class="h-full transition-all duration-500"
                                style="width: {alloc.percent}%; background-color: {alloc.color}"
                                title="{alloc.token}: {alloc.percent}%"
                              ></div>
                            {/each}
                          </div>
                          <div class="grid grid-cols-2 gap-3">
                            {#each msg.data.allocation as alloc}
                              <div class="flex items-center justify-between p-2 bg-bg-card/50 rounded-lg">
                                <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full" style="background-color: {alloc.color}"></div>
                                  <span class="text-text-primary text-sm font-medium">{alloc.token}</span>
                                </div>
                                <div class="text-right">
                                  <span class="text-text-secondary text-sm">{alloc.percent}%</span>
                                </div>
                              </div>
                            {/each}
                          </div>
                        </div>
                        <div class="px-4 pb-4 flex gap-3">
                          <div class="flex-1 p-3 bg-accent-primary/10 rounded-lg">
                            <p class="text-xs text-text-muted mb-1">Top Performer</p>
                            <p class="text-accent-primary font-semibold">{msg.data.topPerformer.token} {msg.data.topPerformer.change}</p>
                          </div>
                          <div class="flex-1 p-3 bg-red-500/10 rounded-lg">
                            <p class="text-xs text-text-muted mb-1">Worst Performer</p>
                            <p class="text-red-400 font-semibold">{msg.data.worstPerformer.token} {msg.data.worstPerformer.change}</p>
                          </div>
                        </div>
                      </div>
                    {/if}

                    <!-- History Card -->
                    {#if msg.type === 'history' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50 flex items-center justify-between">
                          <p class="text-text-primary font-semibold">Recent Transactions</p>
                          <span class="text-xs text-text-muted">{msg.data.transactions.length} shown</span>
                        </div>
                        <div class="divide-y divide-border/30">
                          {#each msg.data.transactions as tx}
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
                    {/if}

                    <!-- Stake Card -->
                    {#if msg.type === 'stake' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50">
                          <div class="flex items-center justify-between">
                            <p class="text-text-primary font-semibold">Staking Options</p>
                            <span class="text-xs text-text-muted">Available: {msg.data.availableToStake}</span>
                          </div>
                        </div>
                        <div class="divide-y divide-border/30">
                          {#each msg.data.options as opt}
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
                    {/if}

                    <!-- Gas Card -->
                    {#if msg.type === 'gas' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50">
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                              <div class="w-3 h-3 rounded-full bg-accent-primary"></div>
                              <p class="text-text-primary font-semibold">{msg.data.network} Network</p>
                            </div>
                            <span class="text-xs px-2 py-1 bg-accent-primary/10 text-accent-primary rounded-full">{msg.data.status}</span>
                          </div>
                        </div>
                        <div class="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div class="text-center">
                            <p class="text-text-muted text-xs mb-1">Avg. Fee</p>
                            <p class="text-text-primary font-semibold">{msg.data.avgFee}</p>
                            <p class="text-accent-primary text-xs">{msg.data.avgFeeUsd}</p>
                          </div>
                          <div class="text-center">
                            <p class="text-text-muted text-xs mb-1">TPS</p>
                            <p class="text-text-primary font-semibold">{msg.data.tps}</p>
                          </div>
                          <div class="text-center">
                            <p class="text-text-muted text-xs mb-1">Block Time</p>
                            <p class="text-text-primary font-semibold">{msg.data.blockTime}</p>
                          </div>
                          <div class="text-center">
                            <p class="text-text-muted text-xs mb-1">Congestion</p>
                            <p class="text-accent-primary font-semibold">{msg.data.congestion}</p>
                          </div>
                        </div>
                        <div class="px-4 pb-4">
                          <div class="flex items-center gap-2 p-3 bg-accent-primary/10 rounded-lg">
                            <Info size={16} class="text-accent-primary flex-shrink-0" />
                            <p class="text-sm text-text-secondary">{msg.data.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    {/if}

                    <!-- NFT Card -->
                    {#if msg.type === 'nft' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-border rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50 flex items-center justify-between">
                          <p class="text-text-primary font-semibold">Your NFT Collection</p>
                          <div class="text-right">
                            <p class="text-accent-primary font-semibold">{msg.data.totalValue}</p>
                            <p class="text-text-muted text-xs">{msg.data.totalUsd}</p>
                          </div>
                        </div>
                        <div class="p-4 grid gap-3">
                          {#each msg.data.nfts as nft}
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
                    {/if}

                    <!-- Confirm Card -->
                    {#if msg.type === 'confirm' && msg.data}
                      <div class="mt-3 bg-bg-secondary/80 border border-accent-warning/30 rounded-xl overflow-hidden">
                        <div class="p-4 border-b border-border/50 flex items-center gap-2 text-accent-warning">
                          <AlertCircle size={18} />
                          <span class="font-semibold">Confirm Transaction</span>
                        </div>
                        <div class="p-4 space-y-3">
                          <div class="flex justify-between py-2 border-b border-border/30">
                            <span class="text-text-muted">Action</span>
                            <span class="text-text-primary font-medium">{msg.data.action}</span>
                          </div>
                          <div class="flex justify-between py-2 border-b border-border/30">
                            <span class="text-text-muted">Amount</span>
                            <span class="text-text-primary font-medium">{msg.data.amount}</span>
                          </div>
                          <div class="flex justify-between py-2 border-b border-border/30">
                            <span class="text-text-muted">Value (USD)</span>
                            <span class="text-text-primary">{msg.data.value}</span>
                          </div>
                          <div class="flex justify-between py-2 border-b border-border/30">
                            <span class="text-text-muted">Recipient</span>
                            <span class="text-accent-primary font-mono text-sm">{msg.data.to}</span>
                          </div>
                          <div class="flex justify-between py-2 border-b border-border/30">
                            <span class="text-text-muted">Network Fee</span>
                            <span class="text-text-primary">{msg.data.fee} <span class="text-text-muted">({msg.data.feeUsd})</span></span>
                          </div>
                          <div class="flex justify-between py-2">
                            <span class="text-text-muted">Est. Time</span>
                            <span class="text-text-primary">{msg.data.estimatedTime}</span>
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
                    {/if}

                    <!-- Meta info -->
                    {#if msg.meta}
                      <p class="text-xs text-text-muted mt-2 flex items-center gap-1">
                        <Check size={12} class="text-accent-primary" />
                        {msg.meta}
                      </p>
                    {/if}

                    <!-- Timestamp -->
                    {#if msg.timestamp}
                      <p class="text-xs text-text-muted mt-1 {msg.role === 'user' ? 'text-right' : ''}">{msg.timestamp}</p>
                    {/if}
                  </div>
                </div>
              {/each}

              {#if isThinking}
                <div class="flex justify-start animate-fade-in-up">
                  <div class="bg-bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div class="flex items-center gap-2">
                      <div class="flex gap-1">
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                      </div>
                      <span class="text-text-muted text-xs ml-2">Analyzing your request...</span>
                    </div>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Input -->
            <div class="p-4 border-t border-border bg-bg-secondary/20">
              <div class="flex gap-3">
                <input
                  type="text"
                  bind:value={input}
                  onkeydown={handleKey}
                  placeholder="Ask me anything... (e.g., 'swap 10 SOL to USDC')"
                  class="flex-1 bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/20 transition-all"
                />
                <button
                  onclick={() => sendMessage()}
                  disabled={!input.trim()}
                  class="px-5 py-3 bg-accent-primary text-bg-primary rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
                >
                  <Send size={18} />
                  <span class="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-4 space-y-6">
        <!-- Quick suggestions -->
        <div
          class="opacity-0"
          class:animate-slide-in-right={visible}
          style="animation-delay: 0.4s"
        >
          <p class="text-text-primary font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={16} class="text-accent-secondary" />
            Try These Commands
          </p>
          <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {#each suggestions as s, i}
              <button
                onclick={() => sendMessage(s.text)}
                class="w-full flex items-center gap-3 px-4 py-3 bg-bg-card border border-border rounded-xl text-left hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all duration-300 group"
              >
                <div class="w-9 h-9 rounded-lg bg-bg-secondary flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors flex-shrink-0">
                  <s.icon size={16} class="text-text-muted group-hover:text-accent-primary transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-text-secondary text-sm truncate group-hover:text-accent-primary transition-colors">"{s.text}"</p>
                  <p class="text-text-muted text-xs">{s.category}</p>
                </div>
                <ChevronRight size={16} class="text-text-muted group-hover:text-accent-primary transition-colors flex-shrink-0" />
              </button>
            {/each}
          </div>
        </div>

        <!-- Features list -->
        <div
          class="bg-bg-card border border-border rounded-xl p-5 opacity-0"
          class:animate-slide-in-right={visible}
          style="animation-delay: 0.6s"
        >
          <p class="text-text-primary font-semibold mb-4">Powered By</p>
          <div class="grid grid-cols-2 gap-3">
            {#each features as feature}
              <div class="flex items-center gap-2 p-2 bg-bg-secondary/50 rounded-lg">
                <feature.icon size={14} class="text-accent-primary" />
                <span class="text-text-secondary text-xs">{feature.text}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Demo notice -->
        <div
          class="bg-accent-warning/5 border border-accent-warning/20 rounded-xl p-4 opacity-0"
          class:animate-slide-in-right={visible}
          style="animation-delay: 0.8s"
        >
          <div class="flex items-start gap-3">
            <AlertCircle size={18} class="text-accent-warning flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-text-primary text-sm font-medium mb-1">Demo Mode</p>
              <p class="text-text-muted text-xs leading-relaxed">
                This is a simulation with sample data. No real transactions are executed.
                Join the waitlist to access the full version with real blockchain interactions.
              </p>
              <a href="/#waitlist" class="inline-flex items-center gap-1 text-accent-warning text-xs font-medium mt-2 hover:underline">
                Join Waitlist
                <ChevronRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
