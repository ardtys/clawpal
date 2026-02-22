<script lang="ts">
  import { onMount } from 'svelte';
  import { Wallet, MessageSquare, CheckCircle, ArrowRight, Sparkles } from 'lucide-svelte';

  let visible = $state(false);
  let activeStep = $state(0);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          // Auto-advance steps
          const interval = setInterval(() => {
            activeStep = (activeStep + 1) % 3;
          }, 3000);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('how-it-works');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const steps = [
    {
      icon: Wallet,
      number: '01',
      title: 'connect your wallet',
      description: 'phantom, backpack, solflare, coinbase wallet... we support all the popular ones. just click connect and authorize.',
      features: ['one-click connect', 'hardware wallet support', 'multi-wallet support'],
      color: 'accent-secondary'
    },
    {
      icon: MessageSquare,
      number: '02',
      title: 'tell us what you want',
      description: 'use plain english. no special commands. just say "swap my sol to usdc" or "send 10 bucks to alex.sol" and we get it.',
      features: ['natural language', 'typo-tolerant', 'context-aware'],
      color: 'accent-primary'
    },
    {
      icon: CheckCircle,
      number: '03',
      title: 'review and confirm',
      description: 'we show you exactly what\'s gonna happen before you sign. check the preview, hit confirm, and you\'re done.',
      features: ['clear previews', 'no hidden fees', 'instant execution'],
      color: 'accent-warning'
    }
  ];

  const wallets = [
    { name: 'Phantom', color: '#AB9FF2' },
    { name: 'Backpack', color: '#E33E3F' },
    { name: 'Solflare', color: '#FC7227' },
    { name: 'Coinbase', color: '#0052FF' }
  ];
</script>

<section id="how-it-works" class="py-24 relative overflow-hidden">
  <!-- Background decorations -->
  <div class="absolute inset-0 grid-bg opacity-20"></div>
  <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]"></div>
  <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px]"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-20">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full mb-6">
          <Sparkles size={16} class="text-accent-secondary" />
          <span class="text-accent-secondary text-sm font-medium">how it works</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          three steps. <span class="gradient-text-purple">that's it.</span>
        </h2>
        <p class="text-text-secondary text-lg">
          no tutorials needed. if you can text, you can use clawpal.
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-16 items-center">

      <!-- Left - Steps -->
      <div
        class="space-y-6 opacity-0"
        class:animate-slide-in-left={visible}
      >
        {#each steps as step, i}
          <button
            onclick={() => activeStep = i}
            class="w-full text-left group relative bg-bg-card border rounded-2xl p-6 transition-all duration-300 {activeStep === i ? 'border-' + step.color + '/50 shadow-lg' : 'border-border hover:border-border/80'}"
          >
            <!-- Active indicator -->
            {#if activeStep === i}
              <div class="absolute -left-px top-6 bottom-6 w-1 bg-{step.color} rounded-full"></div>
            {/if}

            <div class="flex gap-5">
              <!-- Icon -->
              <div class="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 {activeStep === i ? 'bg-' + step.color + '/20 scale-110' : 'bg-bg-secondary'}">
                <svelte:component this={step.icon} size={24} class="transition-colors {activeStep === i ? 'text-' + step.color : 'text-text-muted'}" />
              </div>

              <!-- Content -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <span class="text-xs font-mono {activeStep === i ? 'text-' + step.color : 'text-text-muted'}">{step.number}</span>
                  <h3 class="font-semibold text-lg {activeStep === i ? 'text-text-primary' : 'text-text-secondary'}">
                    {step.title}
                  </h3>
                </div>
                <p class="text-text-secondary text-sm mb-4">
                  {step.description}
                </p>

                <!-- Features -->
                {#if activeStep === i}
                  <div class="flex flex-wrap gap-2 animate-fade-in-up">
                    {#each step.features as feature}
                      <span class="px-2.5 py-1 bg-bg-secondary/80 border border-border/50 rounded-lg text-text-muted text-xs">
                        {feature}
                      </span>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </button>
        {/each}

        <!-- Supported wallets -->
        <div class="pt-6 border-t border-border/50">
          <p class="text-text-muted text-sm mb-4">Supported wallets:</p>
          <div class="flex flex-wrap gap-3">
            {#each wallets as wallet}
              <div class="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border rounded-lg">
                <div class="w-4 h-4 rounded-full" style="background-color: {wallet.color}"></div>
                <span class="text-text-secondary text-sm">{wallet.name}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right - Phone mockup with dynamic content -->
      <div
        class="opacity-0"
        class:animate-slide-in-right={visible}
        style="animation-delay: 0.2s"
      >
        <div class="relative">
          <!-- Glow effect -->
          <div class="absolute -inset-4 bg-gradient-to-r from-accent-secondary/20 to-accent-primary/20 rounded-[40px] blur-2xl opacity-60"></div>

          <!-- Phone frame -->
          <div class="relative bg-bg-card border border-border rounded-[32px] p-2 max-w-sm mx-auto shadow-2xl">
            <!-- Notch -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-bg-card rounded-b-2xl z-10"></div>

            <div class="bg-bg-primary rounded-[28px] overflow-hidden">
              <!-- Status bar -->
              <div class="flex justify-between items-center px-6 py-3 text-xs text-text-muted">
                <span class="font-medium">9:41</span>
                <div class="flex items-center gap-1">
                  <div class="flex gap-0.5">
                    <div class="w-1 h-1 bg-text-muted rounded-full"></div>
                    <div class="w-1 h-2 bg-text-muted rounded-full"></div>
                    <div class="w-1 h-3 bg-text-muted rounded-full"></div>
                    <div class="w-1 h-4 bg-text-muted rounded-full"></div>
                  </div>
                  <span class="ml-1">100%</span>
                </div>
              </div>

              <!-- App header -->
              <div class="px-4 py-3 border-b border-border/50 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                  🐾
                </div>
                <div>
                  <p class="text-text-primary font-semibold text-sm">clawpal</p>
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 bg-accent-primary rounded-full"></div>
                    <span class="text-text-muted text-xs">online</span>
                  </div>
                </div>
              </div>

              <!-- Dynamic content based on active step -->
              <div class="p-4 min-h-[320px]">
                {#if activeStep === 0}
                  <!-- Connect wallet screen -->
                  <div class="space-y-4 animate-fade-in-up">
                    <div class="text-center py-6">
                      <div class="w-16 h-16 rounded-2xl bg-accent-secondary/20 flex items-center justify-center mx-auto mb-4">
                        <Wallet size={32} class="text-accent-secondary" />
                      </div>
                      <h4 class="text-text-primary font-semibold mb-2">Connect Wallet</h4>
                      <p class="text-text-muted text-sm">Choose your preferred wallet</p>
                    </div>
                    <div class="space-y-2">
                      {#each wallets as wallet}
                        <button class="w-full flex items-center gap-3 px-4 py-3 bg-bg-secondary border border-border rounded-xl hover:border-accent-secondary/50 transition-colors">
                          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: {wallet.color}20">
                            <div class="w-4 h-4 rounded-full" style="background-color: {wallet.color}"></div>
                          </div>
                          <span class="text-text-primary text-sm">{wallet.name}</span>
                          <ArrowRight size={16} class="text-text-muted ml-auto" />
                        </button>
                      {/each}
                    </div>
                  </div>
                {:else if activeStep === 1}
                  <!-- Chat screen -->
                  <div class="space-y-3 animate-fade-in-up">
                    <div class="bg-bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                      <p class="text-text-primary text-sm">yo! connected and ready. what do you wanna do?</p>
                    </div>
                    <div class="flex justify-end">
                      <div class="bg-accent-primary text-bg-primary rounded-2xl rounded-br-md px-4 py-3 max-w-[80%]">
                        <p class="text-sm">swap 100 usdc to sol</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 px-2">
                      <div class="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
                      <span class="text-text-muted text-xs">finding best route...</span>
                    </div>
                  </div>
                {:else}
                  <!-- Confirm screen -->
                  <div class="space-y-4 animate-fade-in-up">
                    <div class="bg-bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                      <p class="text-text-primary text-sm mb-2">found the best route:</p>
                      <div class="bg-bg-card rounded-xl p-3 space-y-2 text-sm">
                        <div class="flex justify-between">
                          <span class="text-text-muted">You send</span>
                          <span class="text-text-primary font-medium">100 USDC</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-text-muted">You get</span>
                          <span class="text-accent-primary font-bold">0.59 SOL</span>
                        </div>
                        <div class="flex justify-between text-xs">
                          <span class="text-text-muted">Fee</span>
                          <span class="text-text-secondary">$0.003</span>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-end">
                      <div class="bg-accent-primary text-bg-primary rounded-2xl rounded-br-md px-4 py-3">
                        <p class="text-sm">send it!</p>
                      </div>
                    </div>
                    <div class="bg-accent-primary/20 border border-accent-primary/30 rounded-2xl px-4 py-3">
                      <div class="flex items-center gap-2">
                        <CheckCircle size={18} class="text-accent-primary" />
                        <span class="text-accent-primary text-sm font-medium">Swap successful!</span>
                      </div>
                      <p class="text-text-muted text-xs mt-1">tx: 7xKp...3mNq</p>
                    </div>
                  </div>
                {/if}
              </div>

              <!-- Input bar -->
              <div class="px-4 py-3 border-t border-border/50">
                <div class="flex items-center gap-2 bg-bg-secondary rounded-full px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="type something..."
                    class="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                    disabled
                  />
                  <div class="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center">
                    <ArrowRight size={16} class="text-bg-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating decorations -->
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-accent-secondary/30 rounded-full blur-2xl animate-pulse"></div>
          <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-accent-primary/30 rounded-full blur-2xl animate-pulse" style="animation-delay: 1s"></div>
        </div>
      </div>

    </div>

  </div>
</section>
