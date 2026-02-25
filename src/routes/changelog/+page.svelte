<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Rocket, Zap, Bug, Sparkles, Shield, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const releases = [
    {
      version: 'v0.6.0',
      date: 'Feb 20, 2025',
      title: 'Base Chain Support',
      description: 'We\'re officially multi-chain, fam! Base is now live alongside Solana. Same chat experience, more chains.',
      type: 'feature',
      changes: [
        { type: 'new', text: 'Full Base chain support - swaps, sends, balances, the works' },
        { type: 'new', text: 'Unified portfolio view across both chains' },
        { type: 'new', text: 'Cross-chain balance summaries' },
        { type: 'improved', text: 'Faster chain detection in chat messages' },
        { type: 'fixed', text: 'Edge case where chain wasn\'t properly identified' }
      ]
    },
    {
      version: 'v0.5.0',
      date: 'Feb 10, 2025',
      title: 'Priority Execution',
      description: 'Degen and Whale tier users now get priority RPC endpoints. Your transactions go through faster than ever.',
      type: 'feature',
      changes: [
        { type: 'new', text: 'Priority RPC endpoints for premium users' },
        { type: 'new', text: 'Transaction speed indicator in chat' },
        { type: 'improved', text: '40% faster response times on average' },
        { type: 'improved', text: 'Better error messages when transactions fail' },
        { type: 'fixed', text: 'Rare timeout issues on high-traffic periods' }
      ]
    },
    {
      version: 'v0.4.2',
      date: 'Feb 5, 2025',
      title: 'Bug Fixes & Polish',
      description: 'Squashed some bugs and made things smoother. Nothing major, just keeping things tight.',
      type: 'fix',
      changes: [
        { type: 'fixed', text: 'Portfolio calculation off by small amounts' },
        { type: 'fixed', text: 'Token symbols not displaying correctly for some SPL tokens' },
        { type: 'fixed', text: 'Chat history not persisting on refresh' },
        { type: 'improved', text: 'Loading states are now more responsive' }
      ]
    },
    {
      version: 'v0.4.0',
      date: 'Jan 28, 2025',
      title: 'MEV Protection',
      description: 'Whale tier now includes MEV protection. No more getting sandwiched by bots. Your trades are safe.',
      type: 'feature',
      changes: [
        { type: 'new', text: 'MEV protection for Whale tier swaps' },
        { type: 'new', text: 'Private transaction routing option' },
        { type: 'improved', text: 'Swap preview now shows potential MEV exposure' },
        { type: 'improved', text: 'Better route visualization' }
      ]
    },
    {
      version: 'v0.3.0',
      date: 'Jan 15, 2025',
      title: 'Portfolio Analytics',
      description: 'Finally dropped portfolio analytics. See your bags, track your gains (or losses), understand your positions.',
      type: 'feature',
      changes: [
        { type: 'new', text: 'Full portfolio breakdown by token' },
        { type: 'new', text: 'Historical value tracking' },
        { type: 'new', text: 'PnL calculations (realized and unrealized)' },
        { type: 'new', text: 'Allocation pie charts' },
        { type: 'improved', text: 'Token price fetching is now real-time' }
      ]
    },
    {
      version: 'v0.2.0',
      date: 'Jan 5, 2025',
      title: 'Smart Routing 2.0',
      description: 'Completely rebuilt our routing engine. Now aggregates even more DEXs and finds better rates.',
      type: 'improvement',
      changes: [
        { type: 'new', text: 'Added Raydium V2 and Orca Whirlpools' },
        { type: 'new', text: 'Multi-hop routing for better rates' },
        { type: 'improved', text: 'Route calculation 3x faster' },
        { type: 'improved', text: 'Slippage estimation more accurate' },
        { type: 'fixed', text: 'Rare issue with stale quotes' }
      ]
    }
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'new': return 'bg-accent-primary/20 text-accent-primary';
      case 'improved': return 'bg-accent-secondary/20 text-accent-secondary';
      case 'fixed': return 'bg-accent-warning/20 text-accent-warning';
      default: return 'bg-text-muted/20 text-text-muted';
    }
  };

  const getReleaseIcon = (type: string) => {
    switch (type) {
      case 'feature': return Rocket;
      case 'improvement': return Zap;
      case 'fix': return Bug;
      default: return Sparkles;
    }
  };
</script>

<svelte:head>
  <title>Changelog | Pal Claw - What's New</title>
  <meta name="description" content="Pal Claw changelog. See what's new, what's improved, and what we fixed. We ship fast and often." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>

  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Changelog"
      badgeColor="warning"
      title="What's "
      highlight="New"
      description="We ship fast and often. Here's everything we've released, fixed, and improved. No vapor, just results."
    />

    <!-- Releases -->
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

      <div class="space-y-12">
        {#each releases as release, i}
          {@const Icon = getReleaseIcon(release.type)}
          <div
            class="relative pl-16 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {i * 0.1}s"
          >
            <!-- Timeline dot -->
            <div class="absolute left-4 top-0 w-5 h-5 rounded-full bg-bg-primary border-2 border-accent-primary flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-accent-primary"></div>
            </div>

            <div class="glass-card p-6">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <div class="flex items-center gap-2">
                  <Icon size={18} class="text-accent-primary" />
                  <span class="font-heading font-bold text-lg text-accent-primary">{release.version}</span>
                </div>
                <span class="text-text-muted text-sm">{release.date}</span>
                <span class="px-2 py-0.5 rounded bg-bg-secondary text-text-muted text-xs font-mono capitalize">
                  {release.type}
                </span>
              </div>

              <h3 class="font-heading font-semibold text-xl text-text-primary mb-2">{release.title}</h3>
              <p class="text-text-secondary mb-6">{release.description}</p>

              <ul class="space-y-2">
                {#each release.changes as change}
                  <li class="flex items-start gap-3">
                    <span class="px-2 py-0.5 rounded text-xs font-mono capitalize flex-shrink-0 {getTypeStyles(change.type)}">
                      {change.type}
                    </span>
                    <span class="text-text-secondary text-sm">{change.text}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- More coming -->
    <div
      class="mt-12 text-center glass-card p-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.6s"
    >
      <Sparkles class="text-accent-primary mx-auto mb-4" size={32} />
      <h3 class="font-heading font-semibold text-text-primary mb-2">More Coming Every Week</h3>
      <p class="text-text-secondary text-sm mb-4">
        We're just getting started. Join the waitlist or follow us on Twitter to stay updated.
      </p>
      <a href="/#waitlist" class="btn-primary inline-flex items-center gap-2">
        Join Waitlist <ArrowRight size={16} />
      </a>
    </div>
  </div>
</main>

<Footer />
