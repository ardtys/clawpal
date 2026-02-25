<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import {
    Book, Rocket, MessageSquare, Wallet, ArrowRightLeft, Shield, Zap,
    HelpCircle, ChevronRight, ExternalLink, Terminal, CheckCircle,
    AlertTriangle, Info, Copy, Send, TrendingUp, Settings, Lock
  } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let activeSection = $state('quickstart');

  onMount(() => {
    visible = true;
  });

  const quickStart = [
    {
      step: '01',
      title: 'Connect Your Wallet',
      description: 'Click the "Connect Wallet" button in the top right corner. Pal Claw supports Phantom, Backpack, Coinbase Wallet, MetaMask, and all major wallet providers on Solana and Base networks.',
      icon: Wallet,
      tips: ['Make sure your wallet extension is installed', 'Approve the connection request in your wallet']
    },
    {
      step: '02',
      title: 'Start a Conversation',
      description: 'Type your request in natural language. No special commands or syntax required. Pal Claw understands context and can handle complex multi-step operations.',
      icon: MessageSquare,
      tips: ['Be specific about amounts and tokens', 'You can reference previous messages for context']
    },
    {
      step: '03',
      title: 'Review Transaction Details',
      description: 'Before any transaction executes, Pal Claw displays a clear summary showing exactly what will happen: tokens involved, amounts, fees, and estimated outcomes.',
      icon: CheckCircle,
      tips: ['Always verify the destination address', 'Check slippage tolerance for swaps']
    },
    {
      step: '04',
      title: 'Confirm and Execute',
      description: 'Once you approve, your wallet will prompt you to sign the transaction. After signing, Pal Claw monitors the transaction and notifies you when it completes.',
      icon: Zap,
      tips: ['Keep your wallet open during signing', 'Transaction status updates in real-time']
    }
  ];

  const commandCategories = [
    {
      category: 'Balance & Portfolio',
      icon: Wallet,
      color: 'accent-primary',
      commands: [
        { cmd: '"What\'s my balance?"', desc: 'View all token balances in your wallet' },
        { cmd: '"How much SOL do I have?"', desc: 'Check specific token balance' },
        { cmd: '"Show my portfolio value"', desc: 'See total portfolio worth in USD' },
        { cmd: '"What tokens do I own?"', desc: 'List all tokens with amounts' }
      ]
    },
    {
      category: 'Token Swaps',
      icon: ArrowRightLeft,
      color: 'accent-secondary',
      commands: [
        { cmd: '"Swap 10 SOL to USDC"', desc: 'Exchange exact amount of tokens' },
        { cmd: '"Buy $100 worth of BONK"', desc: 'Purchase tokens with USD value' },
        { cmd: '"Sell half my WIF"', desc: 'Sell percentage of holdings' },
        { cmd: '"Convert all USDT to SOL"', desc: 'Swap entire token balance' }
      ]
    },
    {
      category: 'Send & Transfer',
      icon: Send,
      color: 'accent-warning',
      commands: [
        { cmd: '"Send 1 SOL to alice.sol"', desc: 'Transfer to Solana domain' },
        { cmd: '"Transfer 100 USDC to 0x..."', desc: 'Send to wallet address' },
        { cmd: '"Send $50 of ETH to vitalik.eth"', desc: 'Transfer USD value amount' },
        { cmd: '"Send max SOL to my-wallet.sol"', desc: 'Transfer maximum available' }
      ]
    },
    {
      category: 'Market Information',
      icon: TrendingUp,
      color: 'accent-primary',
      commands: [
        { cmd: '"What\'s the price of SOL?"', desc: 'Get current token price' },
        { cmd: '"Tell me about BONK"', desc: 'Token info, market cap, volume' },
        { cmd: '"What\'s trending today?"', desc: 'Top trending tokens' },
        { cmd: '"Compare SOL vs ETH"', desc: 'Side-by-side comparison' }
      ]
    }
  ];

  const docSections = [
    {
      id: 'swapping',
      icon: ArrowRightLeft,
      title: 'Token Swapping',
      description: 'Learn how Pal Claw finds the best rates across multiple DEXs and executes swaps with optimal routing.',
      content: [
        {
          subtitle: 'How Swaps Work',
          text: 'Pal Claw aggregates liquidity from Jupiter, Raydium, Orca, and other major DEXs to find you the best possible rate. When you request a swap, we analyze all available routes and present the optimal path.'
        },
        {
          subtitle: 'Slippage Protection',
          text: 'Default slippage tolerance is set to 0.5% for stablecoins and 1% for volatile assets. You can customize this by saying "set slippage to 2%" or specifying it per-trade.'
        },
        {
          subtitle: 'Price Impact Warnings',
          text: 'For large trades, Pal Claw automatically warns you about potential price impact and may suggest splitting the order into smaller chunks for better execution.'
        }
      ]
    },
    {
      id: 'wallets',
      icon: Wallet,
      title: 'Wallet Management',
      description: 'Connect and manage multiple wallets across different networks with ease.',
      content: [
        {
          subtitle: 'Supported Wallets',
          text: 'Pal Claw works with Phantom, Backpack, Solflare, Coinbase Wallet, MetaMask, Rainbow, and WalletConnect-compatible wallets. Hardware wallets like Ledger are supported through compatible browser extensions.'
        },
        {
          subtitle: 'Multiple Accounts',
          text: 'You can connect multiple wallets and switch between them seamlessly. Just say "switch to my Phantom wallet" or "use my trading wallet" to change active accounts.'
        },
        {
          subtitle: 'Network Support',
          text: 'Currently supporting Solana mainnet and Base. More networks coming soon including Ethereum mainnet, Arbitrum, and Optimism.'
        }
      ]
    },
    {
      id: 'security',
      icon: Shield,
      title: 'Security & Safety',
      description: 'Understand how Pal Claw keeps your assets safe with non-custodial design.',
      content: [
        {
          subtitle: 'Non-Custodial Architecture',
          text: 'Pal Claw never has access to your private keys. All transactions are signed locally in your wallet. We only prepare transaction instructions - you maintain full control.'
        },
        {
          subtitle: 'Transaction Simulation',
          text: 'Before you sign, every transaction is simulated to predict the outcome. This helps catch errors and potential issues before they cost you real money.'
        },
        {
          subtitle: 'Scam Protection',
          text: 'Pal Claw maintains a database of known scam tokens and malicious contracts. We warn you before interacting with suspicious addresses and flag potential honeypots.'
        }
      ]
    },
    {
      id: 'premium',
      icon: Zap,
      title: 'Premium Features',
      description: 'Unlock advanced capabilities with Degen and Whale subscription tiers.',
      content: [
        {
          subtitle: 'Priority Execution',
          text: 'Premium users get priority transaction processing with dynamic fee optimization. Your swaps land faster, especially during high-congestion periods.'
        },
        {
          subtitle: 'MEV Protection',
          text: 'Whale tier includes MEV protection through private transaction submission. Your large trades won\'t be front-run or sandwiched by bots.'
        },
        {
          subtitle: 'API Access',
          text: 'Build your own integrations with Pal Claw\'s API. Available on Whale tier with rate limits based on your subscription level.'
        }
      ]
    }
  ];

  const troubleshooting = [
    {
      issue: 'Wallet won\'t connect',
      solutions: [
        'Ensure your wallet extension is unlocked',
        'Try refreshing the page',
        'Clear browser cache and reconnect',
        'Check if you\'re on the correct network'
      ]
    },
    {
      issue: 'Transaction failed',
      solutions: [
        'Check if you have enough SOL for gas fees',
        'Increase slippage tolerance for volatile tokens',
        'Ensure the token has sufficient liquidity',
        'Try again with a smaller amount'
      ]
    },
    {
      issue: 'Slow response times',
      solutions: [
        'Check your internet connection',
        'Network congestion may cause delays',
        'Try simplifying your request',
        'Premium users get priority processing'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Documentation | Pal Claw - Complete Guide to AI-Powered Crypto Management</title>
  <meta name="description" content="Comprehensive documentation for Pal Claw. Learn how to swap tokens, manage your portfolio, and interact with DeFi using natural language." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Documentation"
      badgeColor="secondary"
      title="Complete "
      highlight="Guide"
      description="Everything you need to master Pal Claw. From basic commands to advanced features, this documentation covers it all."
    />

    <!-- Table of Contents -->
    <nav class="glass-card p-6 mb-12">
      <h2 class="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Book size={20} class="text-accent-primary" />
        Table of Contents
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#quickstart" class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm">
          <ChevronRight size={16} />
          Quick Start Guide
        </a>
        <a href="#commands" class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm">
          <ChevronRight size={16} />
          Chat Commands
        </a>
        <a href="#features" class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm">
          <ChevronRight size={16} />
          Feature Documentation
        </a>
        <a href="#troubleshooting" class="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors text-sm">
          <ChevronRight size={16} />
          Troubleshooting
        </a>
      </div>
    </nav>

    <!-- Quick Start Guide -->
    <section id="quickstart" class="mb-24 scroll-mt-20">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-accent-primary/20 flex items-center justify-center">
          <Rocket class="text-accent-primary" size={20} />
        </div>
        <div>
          <h2 class="font-heading text-2xl font-bold text-text-primary">Quick Start Guide</h2>
          <p class="text-text-muted text-sm">Get up and running in under 2 minutes</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mt-8">
        {#each quickStart as step, i}
          <div
            class="glass-card p-6 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {i * 0.1}s"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-xl bg-accent-primary/20 flex items-center justify-center">
                  <span class="font-heading text-xl font-bold text-accent-primary">{step.step}</span>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-heading font-semibold text-lg text-text-primary mb-2 flex items-center gap-2">
                  <step.icon size={18} class="text-accent-secondary" />
                  {step.title}
                </h3>
                <p class="text-text-secondary text-sm mb-4 leading-relaxed">{step.description}</p>

                <div class="bg-bg-secondary rounded-lg p-3">
                  <p class="text-xs text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Info size={12} />
                    Tips
                  </p>
                  <ul class="space-y-1">
                    {#each step.tips as tip}
                      <li class="text-sm text-text-secondary flex items-start gap-2">
                        <CheckCircle size={14} class="text-accent-primary mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Chat Commands -->
    <section id="commands" class="mb-24 scroll-mt-20">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-accent-secondary/20 flex items-center justify-center">
          <Terminal class="text-accent-secondary" size={20} />
        </div>
        <div>
          <h2 class="font-heading text-2xl font-bold text-text-primary">Chat Commands</h2>
          <p class="text-text-muted text-sm">Natural language commands Pal Claw understands</p>
        </div>
      </div>

      <div class="glass-card p-6 mb-8">
        <div class="flex items-start gap-3">
          <Info size={20} class="text-accent-primary flex-shrink-0 mt-0.5" />
          <div>
            <p class="text-text-primary font-medium mb-1">Natural Language Understanding</p>
            <p class="text-text-secondary text-sm">
              Pal Claw uses advanced AI to understand your intent. You don't need to memorize exact phrases -
              just describe what you want to do in plain English. The examples below show common patterns,
              but feel free to phrase things your own way.
            </p>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        {#each commandCategories as cat, i}
          <div
            class="glass-card p-6 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.4 + i * 0.1}s"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-{cat.color}/20 flex items-center justify-center">
                <cat.icon size={20} class="text-{cat.color}" />
              </div>
              <h3 class="font-heading font-semibold text-lg text-text-primary">{cat.category}</h3>
            </div>

            <div class="space-y-3">
              {#each cat.commands as command}
                <div class="bg-bg-secondary rounded-lg p-3">
                  <code class="text-accent-primary text-sm font-mono">{command.cmd}</code>
                  <p class="text-text-muted text-xs mt-1">{command.desc}</p>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Feature Documentation -->
    <section id="features" class="mb-24 scroll-mt-20">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-accent-warning/20 flex items-center justify-center">
          <Book class="text-accent-warning" size={20} />
        </div>
        <div>
          <h2 class="font-heading text-2xl font-bold text-text-primary">Feature Documentation</h2>
          <p class="text-text-muted text-sm">In-depth guides for each Pal Claw feature</p>
        </div>
      </div>

      <div class="space-y-8 mt-8">
        {#each docSections as section, i}
          <div
            id={section.id}
            class="glass-card overflow-hidden opacity-0 scroll-mt-20"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.8 + i * 0.1}s"
          >
            <div class="p-6 border-b border-border">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center">
                  <section.icon size={24} class="text-accent-secondary" />
                </div>
                <div>
                  <h3 class="font-heading font-bold text-xl text-text-primary">{section.title}</h3>
                  <p class="text-text-secondary text-sm">{section.description}</p>
                </div>
              </div>
            </div>

            <div class="p-6">
              <div class="grid md:grid-cols-3 gap-6">
                {#each section.content as item}
                  <div>
                    <h4 class="font-heading font-semibold text-text-primary mb-2 flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-accent-primary"></span>
                      {item.subtitle}
                    </h4>
                    <p class="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Troubleshooting -->
    <section id="troubleshooting" class="mb-24 scroll-mt-20">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <AlertTriangle class="text-red-400" size={20} />
        </div>
        <div>
          <h2 class="font-heading text-2xl font-bold text-text-primary">Troubleshooting</h2>
          <p class="text-text-muted text-sm">Solutions for common issues</p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mt-8">
        {#each troubleshooting as item, i}
          <div
            class="glass-card p-6 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {1.2 + i * 0.1}s"
          >
            <h3 class="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
              <HelpCircle size={18} class="text-accent-warning" />
              {item.issue}
            </h3>
            <ul class="space-y-2">
              {#each item.solutions as solution}
                <li class="text-sm text-text-secondary flex items-start gap-2">
                  <CheckCircle size={14} class="text-accent-primary mt-0.5 flex-shrink-0" />
                  {solution}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </section>

    <!-- Help CTA -->
    <div
      class="glass-card p-8 text-center opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 1.5s"
    >
      <h2 class="font-heading text-xl font-bold text-text-primary mb-3">
        Need More Help?
      </h2>
      <p class="text-text-secondary mb-6 max-w-xl mx-auto">
        Can't find what you're looking for? Join our Discord community for real-time support
        from the team and other users, or check the FAQ for quick answers.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/#faq" class="btn-secondary flex items-center gap-2">
          <HelpCircle size={18} />
          View FAQ
        </a>
        <a href="#" class="btn-primary flex items-center gap-2">
          Join Discord
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </div>
</main>

<Footer />
