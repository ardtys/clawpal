<script lang="ts">
  import { onMount } from 'svelte';
  import { MessageSquare, Zap, Shield, Globe, TrendingUp, Clock, Sparkles, ArrowRight, Check } from 'lucide-svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('features');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const mainFeatures = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'natural language',
      subtitle: 'talk like a human',
      description: 'say "buy 50 bucks of bonk" or "send half my sol to alex.sol". we understand slang, typos, and everything in between.',
      color: 'accent-primary',
      examples: ['"swap my ETH to SOL"', '"what\'s in my wallet?"', '"send 10 USDC to vitalik.eth"']
    },
    {
      icon: TrendingUp,
      number: '02',
      title: 'best rates guaranteed',
      subtitle: 'we do the math',
      description: 'we scan jupiter, raydium, orca, and 10+ other DEXs in real-time. you get the best route without thinking about it.',
      color: 'accent-secondary',
      stats: [
        { label: 'DEXs Scanned', value: '12+' },
        { label: 'Avg Savings', value: '$2.34' },
        { label: 'Routes Checked', value: '50+' }
      ]
    }
  ];

  const gridFeatures = [
    {
      icon: Shield,
      title: 'non-custodial',
      description: 'your keys, your crypto. we never see your private keys. every transaction requires your wallet signature.',
      color: 'accent-primary'
    },
    {
      icon: Zap,
      title: 'blazing fast',
      description: 'sub-2 second responses. ask something, get an answer. no loading spinners, no waiting around.',
      color: 'accent-warning'
    },
    {
      icon: Globe,
      title: 'multi-chain',
      description: 'multiple chains supported. ethereum, L2s, and more coming soon. one interface for all your crypto.',
      color: 'accent-secondary'
    },
    {
      icon: Clock,
      title: '24/7 available',
      description: 'crypto never sleeps, and neither do we. trade, swap, and manage your portfolio anytime, anywhere.',
      color: 'accent-primary'
    }
  ];

  const upcomingFeatures = [
    'limit orders via chat',
    'auto DCA setup',
    'portfolio rebalancing',
    'price alerts',
    'gas optimization',
    'MEV protection'
  ];
</script>

<section id="features" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background decorations -->
  <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[200px]"></div>
  <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]"></div>
  <div class="absolute inset-0 dot-bg opacity-20"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-20">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
          <Sparkles size={16} class="text-accent-primary" />
          <span class="text-accent-primary text-sm font-medium">features</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          the stuff that <span class="gradient-text">actually matters</span>
        </h2>
        <p class="text-text-secondary text-lg">
          no fluff. no gimmicks. just features that make managing crypto feel like texting a friend.
        </p>
      </div>
    </div>

    <!-- Main features - 2 large cards -->
    <div
      class="grid md:grid-cols-2 gap-6 mb-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each mainFeatures as feature, i}
        <div class="group relative bg-bg-card border border-border rounded-2xl p-8 card-hover overflow-hidden">
          <!-- Background glow on hover -->
          <div class="absolute inset-0 bg-gradient-to-br from-{feature.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div class="relative">
            <!-- Header -->
            <div class="flex items-start justify-between mb-6">
              <div class="w-14 h-14 rounded-2xl bg-{feature.color}/10 border border-{feature.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svelte:component this={feature.icon} size={28} class="text-{feature.color}" />
              </div>
              <span class="text-xs text-{feature.color} font-mono">{feature.number}</span>
            </div>

            <!-- Content -->
            <div class="mb-6">
              <p class="text-text-muted text-sm mb-1">{feature.subtitle}</p>
              <h3 class="text-2xl font-bold text-text-primary mb-3 group-hover:text-{feature.color} transition-colors">
                {feature.title}
              </h3>
              <p class="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>

            <!-- Examples or Stats -->
            {#if feature.examples}
              <div class="space-y-2">
                <p class="text-text-muted text-xs uppercase tracking-wider">Try saying:</p>
                <div class="flex flex-wrap gap-2">
                  {#each feature.examples as example}
                    <span class="px-3 py-1.5 bg-bg-secondary/80 border border-border/50 rounded-lg text-text-secondary text-xs font-mono">
                      {example}
                    </span>
                  {/each}
                </div>
              </div>
            {/if}

            {#if feature.stats}
              <div class="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                {#each feature.stats as stat}
                  <div class="text-center">
                    <p class="text-xl font-bold text-{feature.color}">{stat.value}</p>
                    <p class="text-text-muted text-xs">{stat.label}</p>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Grid features - 4 smaller cards -->
    <div
      class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      {#each gridFeatures as feature, i}
        <div class="group bg-bg-card border border-border rounded-xl p-6 card-hover">
          <div class="w-10 h-10 rounded-xl bg-{feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svelte:component this={feature.icon} size={20} class="text-{feature.color}" />
          </div>
          <h3 class="font-semibold text-text-primary mb-2 group-hover:text-{feature.color} transition-colors">
            {feature.title}
          </h3>
          <p class="text-text-secondary text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Coming soon - highlight card -->
    <div
      class="opacity-0"
      class:animate-scale-in={visible}
      style="animation-delay: 0.3s"
    >
      <div class="relative bg-gradient-to-r from-accent-primary/10 via-accent-secondary/10 to-accent-primary/10 border border-accent-primary/30 rounded-2xl p-8 md:p-10 overflow-hidden">
        <!-- Animated background -->
        <div class="absolute inset-0 animate-gradient bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-primary/5 bg-[length:200%_200%]"></div>

        <!-- Glow effects -->
        <div class="absolute top-0 right-1/4 w-64 h-64 bg-accent-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-0 left-1/4 w-48 h-48 bg-accent-secondary/20 rounded-full blur-[80px] animate-pulse" style="animation-delay: 1s"></div>

        <div class="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-primary/20 border border-accent-primary/30 rounded-full mb-4">
              <div class="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
              <span class="text-accent-primary text-xs font-medium">coming soon</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              "set a limit order<br/>for SOL at $150"
            </h3>
            <p class="text-text-secondary mb-6">
              advanced trading features, all through natural language. set it and forget it —
              we'll handle the execution and ping you when it's done.
            </p>
            <a href="#waitlist" class="inline-flex items-center gap-2 text-accent-primary hover:gap-3 transition-all">
              <span class="font-medium">join waitlist for early access</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div class="grid grid-cols-2 gap-3">
            {#each upcomingFeatures as feature}
              <div class="flex items-center gap-2 px-4 py-3 bg-bg-card/50 backdrop-blur border border-border/50 rounded-xl">
                <div class="w-5 h-5 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check size={12} class="text-accent-primary" />
                </div>
                <span class="text-text-secondary text-sm">{feature}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
