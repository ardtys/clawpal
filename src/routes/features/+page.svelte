<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { MessageSquare, Zap, Shield, Coins, Globe, Clock, Sparkles, ArrowRightLeft, Bot, BarChart3, Bell, Lock, Layers, Cpu, Wallet, TrendingUp } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const mainFeatures = [
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      tagline: 'Talk to your wallet like it\'s your homie',
      description: 'Forget memorizing commands or navigating confusing UIs. Just type what you want in plain English - "swap half my SOL to USDC" or "send 100 bucks worth of ETH to chad.eth". Our AI understands context, slang, and even your typos. It\'s like texting your most crypto-savvy friend, except this one never sleeps and never fat-fingers a trade.',
      color: 'accent-primary',
      features: ['Understands crypto slang & abbreviations', 'Context-aware conversations', 'Handles complex multi-step requests', 'Works with token symbols or names']
    },
    {
      icon: ArrowRightLeft,
      title: 'Smart Swap Routing',
      tagline: 'We find gains you didn\'t even know existed',
      description: 'Our routing engine scans every DEX, every liquidity pool, every possible path to get you the absolute best rate. We\'re talking Jupiter, Raydium, Orca, and more - all checked in milliseconds. You just say "swap" and we handle the rest. No more manually comparing rates across 10 tabs like some kind of caveman.',
      color: 'accent-secondary',
      features: ['Aggregates all major DEXs', 'Splits trades for better rates', 'MEV protection on premium tiers', 'Real-time slippage optimization']
    },
    {
      icon: Shield,
      title: 'Non-Custodial Security',
      tagline: 'Your keys stay yours. Period.',
      description: 'We\'re not trying to be another FTX, fam. Pal Claw NEVER has access to your private keys. Every single transaction requires YOUR signature from YOUR wallet. We just help you build the transaction - you maintain full control at all times. Sleep easy knowing your bags are safe.',
      color: 'accent-primary',
      features: ['Zero access to private keys', 'Transaction preview before signing', 'Works with hardware wallets', 'Open source verification coming']
    },
    {
      icon: Zap,
      title: 'Lightning Execution',
      tagline: 'Speed that\'ll make your head spin',
      description: 'In crypto, milliseconds matter. Our infrastructure is built for speed freaks - sub-2 second response times on every request. Premium users get priority RPC endpoints that cut through network congestion like butter. When you need to ape in FAST, we got you.',
      color: 'accent-warning',
      features: ['Sub-2 second responses', 'Priority RPC for premium users', 'Optimized transaction building', 'Real-time confirmation tracking']
    }
  ];

  const additionalFeatures = [
    { icon: Globe, title: 'Multi-Chain Support', description: 'Solana and Base today, Ethereum and more coming soon. One chat to rule all your chains.' },
    { icon: BarChart3, title: 'Portfolio Analytics', description: 'Track your bags in real-time. PnL, allocation, historical performance - all the alpha you need.' },
    { icon: Bell, title: 'Smart Alerts', description: 'Get pinged when your coins move. Price alerts, whale watches, and portfolio changes.' },
    { icon: Coins, title: 'DeFi Actions', description: 'Stake, provide liquidity, claim rewards - all the DeFi stuff without the complexity.' },
    { icon: Lock, title: 'Transaction Limits', description: 'Set your own guardrails. Daily limits, confirmation thresholds, whatever keeps you safe.' },
    { icon: Layers, title: 'Batch Operations', description: 'Send to multiple wallets, swap multiple tokens - do it all in one message.' },
    { icon: Cpu, title: 'AI Fine-Tuning', description: 'Premium users can customize how the AI responds. Make it match your trading style.' },
    { icon: TrendingUp, title: 'Market Intel', description: 'Ask about any token - price, volume, holders, recent activity. We got the data.' }
  ];
</script>

<svelte:head>
  <title>Features | Pal Claw - AI-Powered Crypto Wallet</title>
  <meta name="description" content="Discover all Pal Claw features - natural language crypto trading, smart swap routing, non-custodial security, and lightning-fast execution." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>
  <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[128px]"></div>
  <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[128px]"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Features"
      badgeColor="primary"
      title="Everything You Need to "
      highlight="Dominate"
      description="We built Pal Claw for degens, by degens. Every feature is designed to make your crypto life easier, faster, and more profitable. No cap."
    />

    <!-- Main Features -->
    <div class="space-y-24 mb-24">
      {#each mainFeatures as feature, i}
        <div
          class="grid lg:grid-cols-2 gap-12 items-center opacity-0 {i % 2 === 1 ? 'lg:flex-row-reverse' : ''}"
          class:animate-fade-in-up={visible}
          style="animation-delay: {i * 0.15}s"
        >
          <div class="{i % 2 === 1 ? 'lg:order-2' : ''}">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center {
                feature.color === 'accent-primary'
                  ? 'bg-accent-primary/20 text-accent-primary'
                  : feature.color === 'accent-secondary'
                  ? 'bg-accent-secondary/20 text-accent-secondary'
                  : 'bg-accent-warning/20 text-accent-warning'
              }">
                <feature.icon size={24} />
              </div>
              <span class="text-sm font-mono text-text-muted uppercase tracking-wider">Feature</span>
            </div>

            <h2 class="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              {feature.title}
            </h2>
            <p class="text-lg {
              feature.color === 'accent-primary'
                ? 'text-accent-primary'
                : feature.color === 'accent-secondary'
                ? 'text-accent-secondary'
                : 'text-accent-warning'
            } font-semibold mb-4">
              {feature.tagline}
            </p>
            <p class="text-text-secondary leading-relaxed mb-6">
              {feature.description}
            </p>

            <ul class="space-y-3">
              {#each feature.features as item}
                <li class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                    <span class="text-accent-primary text-xs">✓</span>
                  </div>
                  <span class="text-text-secondary">{item}</span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="glass-card p-8 {i % 2 === 1 ? 'lg:order-1' : ''}">
            <div class="aspect-video bg-bg-secondary rounded-lg flex items-center justify-center border border-border">
              <feature.icon size={64} class="{
                feature.color === 'accent-primary'
                  ? 'text-accent-primary'
                  : feature.color === 'accent-secondary'
                  ? 'text-accent-secondary'
                  : 'text-accent-warning'
              } opacity-50" />
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Additional Features Grid -->
    <div class="mb-16">
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary text-center mb-12">
        Plus a Whole Lot More <span class="gradient-text">Good Stuff</span>
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each additionalFeatures as feature, i}
          <div
            class="glass-card p-6 hover:scale-[1.02] transition-all duration-300 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.6 + i * 0.1}s"
          >
            <div class="w-10 h-10 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center mb-4">
              <feature.icon size={20} />
            </div>
            <h3 class="font-heading font-semibold text-text-primary mb-2">{feature.title}</h3>
            <p class="text-text-secondary text-sm">{feature.description}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- CTA -->
    <div
      class="text-center glass-card p-12 glow-primary opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 1.4s"
    >
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Ready to Level Up Your Crypto Game?
      </h2>
      <p class="text-text-secondary mb-8 max-w-xl mx-auto">
        Stop fumbling with complex UIs and start chatting your way to gains. Join thousands of degens who've already made the switch.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/#demo" class="btn-primary">Try the Demo</a>
        <a href="/#waitlist" class="btn-secondary">Join Waitlist</a>
      </div>
    </div>
  </div>
</main>

<Footer />
