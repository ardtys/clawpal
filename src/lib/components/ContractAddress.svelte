<script lang="ts">
  import { Copy, Check, ExternalLink, Shield } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { createVisibilityObserver } from '$lib/utils';

  let visible = $state(false);
  let copied = $state(false);

  // Placeholder CA - replace with actual contract address
  const contractAddress = 'COMING_SOON_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  const isPlaceholder = true;

  async function copyCA() {
    if (isPlaceholder) return;

    try {
      await navigator.clipboard.writeText(contractAddress);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  onMount(() => {
    return createVisibilityObserver('contract-address', (isVisible) => {
      visible = isVisible;
    });
  });
</script>

<section id="contract-address" class="py-16 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 to-bg-primary"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-primary/5 rounded-full blur-[100px]"></div>

  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div
      class="opacity-0"
      class:animate-fade-in-up={visible}
    >
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-4">
          <Shield size={16} class="text-accent-primary" />
          <span class="text-accent-primary text-sm font-medium">Official Contract</span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Contract Address (CA)
        </h2>
        <p class="text-text-secondary text-sm">
          Always verify the contract address before interacting
        </p>
      </div>

      <!-- CA Display Box -->
      <div class="bg-bg-card border border-border rounded-2xl p-6 {isPlaceholder ? 'opacity-75' : ''}">
        {#if isPlaceholder}
          <!-- Placeholder state -->
          <div class="text-center py-4">
            <div class="inline-flex items-center gap-3 px-6 py-4 bg-bg-secondary rounded-xl border border-border mb-4">
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse"></span>
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
              </div>
              <span class="text-text-muted font-mono text-lg">Coming Soon</span>
              <div class="flex gap-1">
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse" style="animation-delay: 0.4s"></span>
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse" style="animation-delay: 0.2s"></span>
                <span class="w-2 h-2 bg-accent-warning rounded-full animate-pulse"></span>
              </div>
            </div>
            <p class="text-text-muted text-sm">
              Contract address will be announced soon. Join the waitlist to get notified!
            </p>
            <a
              href="#waitlist"
              class="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Join Waitlist
            </a>
          </div>
        {:else}
          <!-- Active CA state -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="flex-1 w-full">
              <p class="text-text-muted text-xs mb-2">Solana Network</p>
              <div class="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl border border-border">
                <code class="flex-1 text-text-primary font-mono text-sm break-all">
                  {contractAddress}
                </code>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                onclick={copyCA}
                class="inline-flex items-center gap-2 px-5 py-3 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                {#if copied}
                  <Check size={18} />
                  Copied!
                {:else}
                  <Copy size={18} />
                  Copy
                {/if}
              </button>
              <a
                href="https://solscan.io/token/{contractAddress}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-3 bg-bg-secondary border border-border text-text-primary font-semibold rounded-xl hover:border-accent-primary/50 transition-all"
              >
                <ExternalLink size={18} />
                View
              </a>
            </div>
          </div>

          <!-- Warning -->
          <div class="mt-4 p-4 bg-accent-warning/10 border border-accent-warning/20 rounded-xl">
            <p class="text-accent-warning text-sm text-center">
              Only interact with the official contract address above. Beware of scams!
            </p>
          </div>
        {/if}
      </div>

      <!-- Trust indicators -->
      <div class="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-text-muted">
        <div class="flex items-center gap-2">
          <Shield size={14} class="text-accent-primary" />
          <span>Verified Contract</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-accent-primary rounded-full"></div>
          <span>Solana Network</span>
        </div>
        <div class="flex items-center gap-2">
          <Check size={14} class="text-accent-primary" />
          <span>Audited</span>
        </div>
      </div>
    </div>
  </div>
</section>
