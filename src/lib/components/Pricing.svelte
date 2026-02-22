<script lang="ts">
  import { Check } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('pricing');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<section id="pricing" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 grid-bg opacity-30"></div>

  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <p class="text-accent-warning text-sm font-mono mb-3">pricing</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        pricing that <span class="gradient-text-warm">doesn't suck</span>
      </h2>
      <p class="text-text-secondary max-w-lg mx-auto">
        start free. upgrade when you're ready. no hidden fees, no bs.
      </p>
    </div>

    <!-- Plans -->
    <div
      class="grid md:grid-cols-3 gap-6 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >

      <!-- Free -->
      <div class="bg-bg-card border border-border rounded-2xl p-6 card-hover">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-text-primary">free</h3>
          <p class="text-text-muted text-sm">for trying things out</p>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-text-primary">$0</span>
          <span class="text-text-muted">/forever</span>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            5 transactions/day
          </li>
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            basic swap routing
          </li>
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            multi-chain support
          </li>
        </ul>

        <a href="#waitlist" class="block w-full text-center py-3 border border-border rounded-lg text-text-secondary hover:border-text-muted transition-colors">
          get started
        </a>
      </div>

      <!-- Pro (highlighted) -->
      <div class="relative bg-bg-card border-2 border-accent-primary rounded-2xl p-6 glow-green card-hover">
        <div class="absolute -top-3 left-4 px-3 py-1 bg-accent-primary text-bg-primary text-xs font-semibold rounded-full animate-pulse-glow">
          most popular
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-text-primary">pro</h3>
          <p class="text-text-muted text-sm">for daily users</p>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-accent-primary">$19</span>
          <span class="text-text-muted">/month</span>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-text-primary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            unlimited transactions
          </li>
          <li class="flex items-center gap-2 text-sm text-text-primary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            priority routing
          </li>
          <li class="flex items-center gap-2 text-sm text-text-primary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            portfolio analytics
          </li>
          <li class="flex items-center gap-2 text-sm text-text-primary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            price alerts
          </li>
        </ul>

        <a href="#waitlist" class="block w-full text-center py-3 bg-accent-primary text-bg-primary rounded-lg font-semibold hover:opacity-90 transition-opacity">
          join waitlist
        </a>
      </div>

      <!-- Team -->
      <div class="bg-bg-card border border-border rounded-2xl p-6 card-hover">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-text-primary">whale</h3>
          <p class="text-text-muted text-sm">for power users</p>
        </div>

        <div class="mb-6">
          <span class="text-3xl font-bold text-text-primary">$99</span>
          <span class="text-text-muted">/month</span>
        </div>

        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            everything in pro
          </li>
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            API access
          </li>
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            MEV protection
          </li>
          <li class="flex items-center gap-2 text-sm text-text-secondary">
            <Check size={16} class="text-accent-primary flex-shrink-0" />
            dedicated support
          </li>
        </ul>

        <a href="#waitlist" class="block w-full text-center py-3 border border-border rounded-lg text-text-secondary hover:border-text-muted transition-colors">
          contact us
        </a>
      </div>

    </div>

    <!-- Note -->
    <p
      class="text-center text-text-muted text-sm mt-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      all plans include 14-day free trial. cancel anytime.
    </p>

  </div>
</section>
