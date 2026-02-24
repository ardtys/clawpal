<script lang="ts">
  import { ArrowRight, Shield, Zap, TrendingUp, Wallet, Check } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { HERO_STATS, INTEGRATIONS } from '$lib/constants';

  let visible = $state(false);
  let typedText = $state('');
  let typingComplete = $state(false);
  let showConfirm = $state(false);

  // Animated counters
  let volumeCount = $state(0);
  let usersCount = $state(0);

  const swapCommand = 'swap 50 sol to usdc';

  onMount(() => {
    visible = true;

    // Typing animation
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < swapCommand.length) {
        typedText = swapCommand.slice(0, charIndex + 1);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        typingComplete = true;
        setTimeout(() => {
          showConfirm = true;
        }, HERO_STATS.CONFIRM_DELAY_MS);
      }
    }, HERO_STATS.TYPING_SPEED_MS);

    // Animated counters
    const volumeInterval = setInterval(() => {
      if (volumeCount < HERO_STATS.VOLUME_TARGET) {
        volumeCount += 1;
      } else {
        clearInterval(volumeInterval);
      }
    }, HERO_STATS.VOLUME_INCREMENT_MS);

    const usersInterval = setInterval(() => {
      if (usersCount < HERO_STATS.USERS_TARGET) {
        usersCount += 1;
      } else {
        clearInterval(usersInterval);
      }
    }, HERO_STATS.USERS_INCREMENT_MS);

    return () => {
      clearInterval(typeInterval);
      clearInterval(volumeInterval);
      clearInterval(usersInterval);
    };
  });
</script>

<section class="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden">
  <!-- Enhanced background with multiple layers -->
  <div class="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary"></div>
  <div class="absolute inset-0 grid-bg opacity-30"></div>

  <!-- Animated glow orbs -->
  <div class="absolute top-20 right-10 w-[500px] h-[500px] bg-accent-primary/8 rounded-full blur-[150px] animate-pulse"></div>
  <div class="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent-secondary/8 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1s"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[200px]"></div>

  <!-- Floating particles -->
  <div class="absolute top-32 left-20 w-2 h-2 bg-accent-primary/60 rounded-full animate-float"></div>
  <div class="absolute top-48 right-32 w-1.5 h-1.5 bg-accent-secondary/60 rounded-full animate-float" style="animation-delay: 0.5s"></div>
  <div class="absolute bottom-32 left-1/3 w-1 h-1 bg-accent-warning/60 rounded-full animate-float" style="animation-delay: 1s"></div>
  <div class="absolute top-1/3 right-20 w-2.5 h-2.5 bg-accent-primary/40 rounded-full animate-float" style="animation-delay: 1.5s"></div>

  <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Main content - asymmetric layout -->
    <div class="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">

      <!-- Left side - Text content -->
      <div class="lg:col-span-3 space-y-8">

        <!-- Main headline - raw and bold -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: 0.1s"
        >
          <span class="text-text-primary">your crypto.</span><br/>
          <span class="text-text-primary">your words.</span><br/>
          <span class="gradient-text text-glow-green">zero friction.</span>
        </h1>

        <!-- Subtext - conversational -->
        <p
          class="text-text-secondary text-lg max-w-lg leading-relaxed opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: 0.2s"
        >
          your AI-powered crypto bestie. just type what you want in plain english —
          swap tokens, send crypto, check balances. we handle the complex stuff.
        </p>

        <!-- Feature pills -->
        <div
          class="flex flex-wrap items-center gap-3 opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: 0.25s"
        >
          <div class="flex items-center gap-2 px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full">
            <Shield size={14} class="text-accent-primary" />
            <span class="text-text-primary text-xs">non-custodial</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-accent-secondary/10 border border-accent-secondary/20 rounded-full">
            <Zap size={14} class="text-accent-secondary" />
            <span class="text-text-primary text-xs">sub-2s execution</span>
          </div>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-accent-warning/10 border border-accent-warning/20 rounded-full">
            <TrendingUp size={14} class="text-accent-warning" />
            <span class="text-text-primary text-xs">best rates</span>
          </div>
        </div>

        <!-- CTA group -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: 0.3s"
        >
          <a
            href="#demo"
            class="group inline-flex items-center gap-3 bg-accent-primary text-bg-primary font-semibold px-8 py-4 rounded-xl btn-glow animate-pulse-glow hover:gap-4 transition-all"
          >
            try the demo
            <ArrowRight size={18} class="group-hover:translate-x-1 transition-transform" />
          </a>
          <div class="flex items-center gap-3">
            <a
              href="#waitlist"
              class="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Wallet size={18} />
              <span>join waitlist</span>
            </a>
            <span class="text-text-muted">•</span>
            <span class="text-text-muted text-sm">no signup needed for demo</span>
          </div>
        </div>

      </div>

      <!-- Right side - Enhanced terminal mockup -->
      <div
        class="lg:col-span-2 opacity-0"
        class:animate-slide-in-right={visible}
        style="animation-delay: 0.4s"
      >
        <!-- Terminal window - clickable to try demo -->
        <a href="#demo" class="block relative group cursor-pointer">
          <!-- Glow effect behind terminal -->
          <div class="absolute -inset-4 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-3xl blur-2xl opacity-60"></div>

          <div class="relative bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl group-hover:border-accent-primary/50 transition-all duration-300">
            <!-- Try it overlay (shown on hover) -->
            <div class="absolute inset-0 bg-accent-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
              <div class="px-6 py-3 bg-accent-primary text-bg-primary font-bold rounded-xl flex items-center gap-2 shadow-xl">
                <Zap size={18} />
                Click to Try Demo
              </div>
            </div>
            <!-- Terminal header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-border bg-bg-secondary/50">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-danger/80 hover:bg-danger transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-accent-warning/80 hover:bg-accent-warning transition-colors"></div>
                <div class="w-3 h-3 rounded-full bg-accent-primary/80 hover:bg-accent-primary transition-colors"></div>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
                <span class="text-text-muted text-xs font-mono">clawpal terminal</span>
              </div>
              <div class="w-16"></div>
            </div>

            <!-- Terminal content -->
            <div class="p-5 font-mono text-sm space-y-4 min-h-[280px]">
              <!-- Wallet indicator -->
              <div class="flex items-center justify-between text-xs border-b border-border/50 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span class="text-text-muted">connected:</span>
                  <span class="text-text-secondary">7xKp...3mNq</span>
                </div>
                <span class="text-text-muted">23.4 SOL</span>
              </div>

              <!-- User input -->
              <div class="flex items-start gap-2">
                <span class="text-accent-primary font-bold">→</span>
                <span class="text-text-primary">
                  {typedText}<span class="animate-blink {typingComplete ? 'opacity-0' : ''}">▋</span>
                </span>
              </div>

              <!-- Response (appears after typing) -->
              {#if typingComplete}
                <div class="space-y-3 animate-fade-in-up">
                  <div class="flex items-center gap-2 text-text-muted text-xs">
                    <div class="w-3 h-3 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>scanning 12 DEXs for best route...</span>
                  </div>

                  <div class="bg-bg-secondary/80 rounded-xl p-4 space-y-3 border border-border/50">
                    <div class="flex items-center justify-between text-xs text-text-muted mb-2">
                      <span>best route found</span>
                      <span class="text-accent-primary">via Jupiter</span>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-border/30">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center text-[10px] font-bold text-white">S</div>
                        <span class="text-text-secondary">You send</span>
                      </div>
                      <span class="text-text-primary font-semibold">50 SOL</span>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-border/30">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-[#2775CA] flex items-center justify-center text-[10px] font-bold text-white">$</div>
                        <span class="text-text-secondary">You get</span>
                      </div>
                      <span class="text-accent-primary font-bold text-lg">≈ 8,420 USDC</span>
                    </div>

                    <div class="grid grid-cols-3 gap-2 pt-2 text-xs">
                      <div class="text-center">
                        <p class="text-text-muted">Rate</p>
                        <p class="text-text-primary">$168.40/SOL</p>
                      </div>
                      <div class="text-center">
                        <p class="text-text-muted">Slippage</p>
                        <p class="text-text-primary">0.1%</p>
                      </div>
                      <div class="text-center">
                        <p class="text-text-muted">Fee</p>
                        <p class="text-accent-primary">$0.02</p>
                      </div>
                    </div>
                  </div>

                  {#if showConfirm}
                    <div class="flex items-center gap-2 text-accent-primary animate-fade-in-up">
                      <Check size={16} />
                      <span>ready to swap. type <span class="bg-accent-primary/20 px-1.5 py-0.5 rounded">"send it"</span> to confirm</span>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        </a>

        <!-- Integration badges -->
        <div class="flex items-center justify-center gap-3 mt-6">
          <span class="text-text-muted text-xs">powered by:</span>
          <div class="flex items-center gap-2">
            {#each INTEGRATIONS as integration}
              <div
                class="px-2 py-1 bg-bg-card/60 border border-border/50 rounded-md text-xs text-text-secondary hover:border-border transition-colors"
                style="--int-color: {integration.color}"
              >
                {integration.name}
              </div>
            {/each}
          </div>
        </div>
      </div>

    </div>

    <!-- Stats bar -->
    <div
      class="mt-20 pt-8 border-t border-border/30 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.6s"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center md:text-left">
          <p class="text-3xl font-bold text-text-primary">{usersCount}K+</p>
          <p class="text-text-muted text-sm">active users</p>
        </div>
        <div class="text-center md:text-left">
          <p class="text-3xl font-bold text-accent-primary">${volumeCount}M+</p>
          <p class="text-text-muted text-sm">volume routed</p>
        </div>
        <div class="text-center md:text-left">
          <p class="text-3xl font-bold text-text-primary">1.2s</p>
          <p class="text-text-muted text-sm">avg execution</p>
        </div>
        <div class="text-center md:text-left">
          <p class="text-3xl font-bold text-accent-secondary">99.9%</p>
          <p class="text-text-muted text-sm">uptime</p>
        </div>
      </div>
    </div>

  </div>
</section>
