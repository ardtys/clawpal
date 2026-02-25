<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Code, Key, Zap, Lock, Copy, Check, Terminal, Globe, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let copiedIndex = $state<number | null>(null);

  onMount(() => {
    visible = true;
  });

  function copyCode(index: number, code: string) {
    navigator.clipboard.writeText(code);
    copiedIndex = index;
    setTimeout(() => copiedIndex = null, 2000);
  }

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/chat',
      description: 'Send a natural language message and get a structured response with actions',
      example: `fetch('https://api.palclaw.io/v1/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: "swap 10 SOL to USDC",
    wallet: "YOUR_WALLET_ADDRESS",
    chain: "solana"
  })
})`
    },
    {
      method: 'GET',
      path: '/api/v1/balance',
      description: 'Get token balances for a wallet address',
      example: `fetch('https://api.palclaw.io/v1/balance?wallet=YOUR_WALLET&chain=solana', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`
    },
    {
      method: 'POST',
      path: '/api/v1/swap/quote',
      description: 'Get a swap quote with the best available route',
      example: `fetch('https://api.palclaw.io/v1/swap/quote', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fromToken: "SOL",
    toToken: "USDC",
    amount: "10",
    chain: "solana"
  })
})`
    },
    {
      method: 'POST',
      path: '/api/v1/swap/execute',
      description: 'Build a swap transaction ready for signing',
      example: `fetch('https://api.palclaw.io/v1/swap/execute', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    quoteId: "QUOTE_ID_FROM_PREVIOUS_CALL",
    wallet: "YOUR_WALLET_ADDRESS"
  })
})`
    }
  ];

  const rateLimits = [
    { tier: 'Free', requests: '10/min', daily: '100/day' },
    { tier: 'Degen', requests: '60/min', daily: 'Unlimited' },
    { tier: 'Whale', requests: '300/min', daily: 'Unlimited' }
  ];

  const features = [
    { icon: Zap, title: 'Low Latency', description: 'Sub-100ms response times on all endpoints. Built for speed demons.' },
    { icon: Lock, title: 'Secure', description: 'All requests over HTTPS. API keys are scoped and revocable.' },
    { icon: Globe, title: 'Multi-Chain', description: 'Same endpoints work across Solana, Base, and more chains coming.' },
    { icon: Terminal, title: 'WebSocket', description: 'Real-time updates via WebSocket for streaming responses.' }
  ];
</script>

<svelte:head>
  <title>API Reference | Pal Claw - Build with Our API</title>
  <meta name="description" content="Pal Claw API documentation. Integrate natural language crypto operations into your apps, bots, and workflows." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="API Reference"
      badgeColor="warning"
      title="Build Something "
      highlight="Fire"
      description="Integrate Pal Claw's natural language processing into your own apps. Perfect for trading bots, dashboards, and custom tools. Let's get you building."
    />

    <!-- API Key Notice -->
    <div
      class="glass-card p-6 mb-12 border-accent-warning/50 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-lg bg-accent-warning/20 text-accent-warning flex items-center justify-center flex-shrink-0">
          <Key size={20} />
        </div>
        <div>
          <h3 class="font-heading font-semibold text-text-primary mb-1">API Access is Whale Tier Only</h3>
          <p class="text-text-secondary text-sm">
            Real talk - API access is only available on the Whale tier ($99/mo). This ain't for casual users, it's for builders who are serious about integrating Pal Claw into their stack. If that's you, let's go.
          </p>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {#each features as feature, i}
        <div
          class="glass-card p-6 opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: {0.1 + i * 0.1}s"
        >
          <div class="w-10 h-10 rounded-lg bg-accent-primary/20 text-accent-primary flex items-center justify-center mb-4">
            <feature.icon size={20} />
          </div>
          <h3 class="font-heading font-semibold text-text-primary mb-2">{feature.title}</h3>
          <p class="text-text-secondary text-sm">{feature.description}</p>
        </div>
      {/each}
    </div>

    <!-- Base URL -->
    <div
      class="glass-card p-6 mb-12 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.5s"
    >
      <h3 class="font-heading font-semibold text-text-primary mb-3">Base URL</h3>
      <div class="flex items-center gap-3 bg-bg-secondary rounded-lg p-4">
        <code class="font-mono text-accent-primary flex-1">https://api.palclaw.io/v1</code>
        <button
          onclick={() => copyCode(-1, 'https://api.palclaw.io/v1')}
          class="p-2 hover:bg-bg-card rounded transition-colors"
        >
          {#if copiedIndex === -1}
            <Check size={16} class="text-accent-primary" />
          {:else}
            <Copy size={16} class="text-text-muted" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Endpoints -->
    <section class="mb-16">
      <h2 class="font-heading text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
        <Code class="text-accent-secondary" size={24} />
        Endpoints
      </h2>

      <div class="space-y-6">
        {#each endpoints as endpoint, i}
          <div
            class="glass-card overflow-hidden opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.6 + i * 0.1}s"
          >
            <div class="px-6 py-4 border-b border-border flex items-center gap-4">
              <span class="px-3 py-1 rounded font-mono text-sm font-semibold {
                endpoint.method === 'GET' ? 'bg-accent-primary/20 text-accent-primary' : 'bg-accent-secondary/20 text-accent-secondary'
              }">
                {endpoint.method}
              </span>
              <code class="font-mono text-text-primary">{endpoint.path}</code>
            </div>
            <div class="p-6">
              <p class="text-text-secondary mb-4">{endpoint.description}</p>
              <div class="relative">
                <pre class="bg-bg-secondary rounded-lg p-4 overflow-x-auto"><code class="font-mono text-sm text-text-secondary">{endpoint.example}</code></pre>
                <button
                  onclick={() => copyCode(i, endpoint.example)}
                  class="absolute top-3 right-3 p-2 bg-bg-card rounded hover:bg-border transition-colors"
                >
                  {#if copiedIndex === i}
                    <Check size={14} class="text-accent-primary" />
                  {:else}
                    <Copy size={14} class="text-text-muted" />
                  {/if}
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Rate Limits -->
    <section class="mb-16">
      <h2 class="font-heading text-2xl font-bold text-text-primary mb-8">Rate Limits</h2>

      <div
        class="glass-card overflow-hidden opacity-0"
        class:animate-fade-in-up={visible}
        style="animation-delay: 1s"
      >
        <table class="w-full">
          <thead class="bg-bg-secondary">
            <tr>
              <th class="px-6 py-4 text-left font-heading text-text-primary">Tier</th>
              <th class="px-6 py-4 text-left font-heading text-text-primary">Requests/Min</th>
              <th class="px-6 py-4 text-left font-heading text-text-primary">Daily Limit</th>
            </tr>
          </thead>
          <tbody>
            {#each rateLimits as limit}
              <tr class="border-t border-border">
                <td class="px-6 py-4 font-semibold text-text-primary">{limit.tier}</td>
                <td class="px-6 py-4 text-text-secondary font-mono">{limit.requests}</td>
                <td class="px-6 py-4 text-text-secondary font-mono">{limit.daily}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>

    <!-- CTA -->
    <div
      class="text-center glass-card p-12 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 1.2s"
    >
      <h2 class="font-heading text-2xl font-bold text-text-primary mb-4">
        Ready to Start Building?
      </h2>
      <p class="text-text-secondary mb-8 max-w-xl mx-auto">
        Get your API key and start integrating Pal Claw into your project. Hit us up if you're building something cool - we love seeing what the community creates.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/#pricing" class="btn-primary flex items-center gap-2">
          Get API Access
          <ArrowRight size={16} />
        </a>
        <button class="btn-secondary">Talk to the Team</button>
      </div>
    </div>
  </div>
</main>

<Footer />
