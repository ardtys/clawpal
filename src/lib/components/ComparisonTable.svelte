<script lang="ts">
  import { Check, X, Minus, Crown, Zap } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('comparison');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  interface Feature {
    name: string;
    clawpal: boolean | string;
    metamask: boolean | string;
    phantom: boolean | string;
    jupiter: boolean | string;
  }

  const features: Feature[] = [
    { name: 'Natural Language Commands', clawpal: true, metamask: false, phantom: false, jupiter: false },
    { name: 'AI-Powered Routing', clawpal: true, metamask: false, phantom: false, jupiter: true },
    { name: 'Multi-DEX Aggregation', clawpal: '12+ DEXs', metamask: false, phantom: 'Limited', jupiter: '12+ DEXs' },
    { name: 'Non-Custodial', clawpal: true, metamask: true, phantom: true, jupiter: true },
    { name: 'Portfolio Tracking', clawpal: true, metamask: 'Basic', phantom: true, jupiter: false },
    { name: 'Price Alerts', clawpal: true, metamask: false, phantom: false, jupiter: false },
    { name: 'Transaction History Analysis', clawpal: true, metamask: 'Basic', phantom: 'Basic', jupiter: false },
    { name: 'Gas Optimization', clawpal: true, metamask: false, phantom: 'Basic', jupiter: true },
    { name: 'Mobile App', clawpal: 'Coming Soon', metamask: true, phantom: true, jupiter: false },
    { name: 'API Access', clawpal: 'Pro Plan', metamask: false, phantom: false, jupiter: true },
    { name: 'MEV Protection', clawpal: 'Whale Plan', metamask: false, phantom: false, jupiter: true },
    { name: '24/7 Support', clawpal: true, metamask: 'Community', phantom: 'Community', jupiter: 'Community' },
  ];

  function renderValue(value: boolean | string) {
    if (value === true) return { icon: Check, class: 'text-accent-primary', text: '' };
    if (value === false) return { icon: X, class: 'text-red-400', text: '' };
    return { icon: Minus, class: 'text-text-secondary', text: value };
  }
</script>

<section id="comparison" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 grid-bg opacity-20"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-12">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full mb-6">
          <Crown size={16} class="text-accent-secondary" />
          <span class="text-accent-secondary text-sm font-medium">Why ClawPal?</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          See How We <span class="gradient-text-purple">Compare</span>
        </h2>
        <p class="text-text-secondary text-lg">
          The only AI-powered wallet assistant that combines natural language with best-in-class trading
        </p>
      </div>
    </div>

    <!-- Comparison Table -->
    <div
      class="overflow-x-auto opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      <table class="w-full min-w-[700px]">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left py-4 px-4 text-text-muted font-medium">Feature</th>
            <th class="py-4 px-4">
              <div class="flex flex-col items-center gap-2">
                <div class="relative">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                    <Zap size={24} class="text-white" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-5 h-5 bg-accent-warning rounded-full flex items-center justify-center">
                    <Crown size={10} class="text-bg-primary" />
                  </div>
                </div>
                <span class="text-text-primary font-bold">ClawPal</span>
              </div>
            </th>
            <th class="py-4 px-4">
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-xl bg-[#F6851B]/20 flex items-center justify-center text-xl">
                  🦊
                </div>
                <span class="text-text-secondary font-medium">MetaMask</span>
              </div>
            </th>
            <th class="py-4 px-4">
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-xl bg-[#AB9FF2]/20 flex items-center justify-center text-xl">
                  👻
                </div>
                <span class="text-text-secondary font-medium">Phantom</span>
              </div>
            </th>
            <th class="py-4 px-4">
              <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-xl bg-[#00D18C]/20 flex items-center justify-center text-xl">
                  🪐
                </div>
                <span class="text-text-secondary font-medium">Jupiter</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each features as feature, i}
            <tr class="border-b border-border/50 hover:bg-bg-card/50 transition-colors">
              <td class="py-4 px-4 text-text-primary font-medium">{feature.name}</td>

              <!-- ClawPal (highlighted) -->
              <td class="py-4 px-4 bg-accent-primary/5">
                <div class="flex items-center justify-center gap-2">
                  {#if typeof feature.clawpal === 'boolean'}
                    {#if feature.clawpal}
                      <div class="w-6 h-6 bg-accent-primary/20 rounded-full flex items-center justify-center">
                        <Check size={14} class="text-accent-primary" />
                      </div>
                    {:else}
                      <X size={18} class="text-red-400" />
                    {/if}
                  {:else}
                    <span class="text-accent-primary text-sm font-medium">{feature.clawpal}</span>
                  {/if}
                </div>
              </td>

              <!-- MetaMask -->
              <td class="py-4 px-4">
                <div class="flex items-center justify-center gap-2">
                  {#if typeof feature.metamask === 'boolean'}
                    {#if feature.metamask}
                      <Check size={18} class="text-accent-primary" />
                    {:else}
                      <X size={18} class="text-red-400" />
                    {/if}
                  {:else}
                    <span class="text-text-muted text-sm">{feature.metamask}</span>
                  {/if}
                </div>
              </td>

              <!-- Phantom -->
              <td class="py-4 px-4">
                <div class="flex items-center justify-center gap-2">
                  {#if typeof feature.phantom === 'boolean'}
                    {#if feature.phantom}
                      <Check size={18} class="text-accent-primary" />
                    {:else}
                      <X size={18} class="text-red-400" />
                    {/if}
                  {:else}
                    <span class="text-text-muted text-sm">{feature.phantom}</span>
                  {/if}
                </div>
              </td>

              <!-- Jupiter -->
              <td class="py-4 px-4">
                <div class="flex items-center justify-center gap-2">
                  {#if typeof feature.jupiter === 'boolean'}
                    {#if feature.jupiter}
                      <Check size={18} class="text-accent-primary" />
                    {:else}
                      <X size={18} class="text-red-400" />
                    {/if}
                  {:else}
                    <span class="text-text-muted text-sm">{feature.jupiter}</span>
                  {/if}
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Bottom CTA -->
    <div
      class="text-center mt-12 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      <p class="text-text-secondary mb-4">
        Ready to experience the future of crypto management?
      </p>
      <a
        href="#waitlist"
        class="inline-flex items-center gap-2 px-8 py-4 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        Get Early Access
        <span>→</span>
      </a>
    </div>

  </div>
</section>
