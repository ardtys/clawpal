<script lang="ts">
  import { Plus, Minus } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';

  let visible = $state(false);
  let openIndex = $state<number | null>(null);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('faq');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  function toggle(i: number) {
    openIndex = openIndex === i ? null : i;
  }

  const faqs = [
    {
      q: "is this actually safe?",
      a: "yeah. we're non-custodial, meaning we never have access to your private keys. every transaction needs your wallet signature. we just help you build the transaction - you're always in control."
    },
    {
      q: "what wallets work?",
      a: "phantom, backpack, metamask, coinbase wallet, and pretty much any popular crypto wallet. if it connects to dApps, it'll work with us."
    },
    {
      q: "how do you find the best rates?",
      a: "we check jupiter, raydium, orca, and other major DEXs in real-time. the route you see is the best one we found at that moment. simple as that."
    },
    {
      q: "what if i type something wrong?",
      a: "you'll always see a preview before signing. typo in the address? weird amount? you'll catch it. and you can always say 'cancel' or just close the window."
    },
    {
      q: "is there a mobile app?",
      a: "not yet, but it's coming. the web version works fine on mobile browsers though. just connect your mobile wallet and you're good."
    },
    {
      q: "what chains are supported?",
      a: "we support multiple chains and are constantly adding more. ethereum, L2s, and other popular networks are on the roadmap. one interface for all your crypto - that's the goal."
    }
  ];
</script>

<section id="faq" class="py-24 relative">
  <!-- Background -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-primary/5 rounded-full blur-[150px]"></div>

  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div
      class="mb-12 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <p class="text-accent-primary text-sm font-mono mb-3">faq</p>
      <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        questions people ask
      </h2>
      <p class="text-text-secondary">
        stuff you probably want to know before trying it.
      </p>
    </div>

    <!-- FAQ items -->
    <div
      class="space-y-2 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each faqs as faq, i}
        <div class="border-b border-border group/item hover:bg-bg-card/30 transition-colors -mx-4 px-4">
          <button
            onclick={() => toggle(i)}
            class="w-full py-5 flex items-center justify-between text-left group"
          >
            <span class="text-text-primary font-medium group-hover:text-accent-primary transition-colors">
              {faq.q}
            </span>
            <div class="w-6 h-6 rounded-full flex items-center justify-center {openIndex === i ? 'bg-accent-primary/20' : 'bg-bg-card'} transition-colors">
              {#if openIndex === i}
                <Minus size={14} class="text-accent-primary flex-shrink-0" />
              {:else}
                <Plus size={14} class="text-text-muted group-hover:text-accent-primary flex-shrink-0 transition-colors" />
              {/if}
            </div>
          </button>

          {#if openIndex === i}
            <div transition:slide={{ duration: 200 }} class="pb-5">
              <p class="text-text-secondary leading-relaxed pl-0">
                {faq.a}
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- More questions -->
    <div
      class="mt-12 pt-8 border-t border-border text-center opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      <p class="text-text-muted text-sm">
        got more questions? hit us up on{' '}
        <button class="text-accent-primary hover:underline">discord</button>{' '}
        or{' '}
        <button class="text-accent-primary hover:underline">twitter</button>
      </p>
    </div>

  </div>
</section>
