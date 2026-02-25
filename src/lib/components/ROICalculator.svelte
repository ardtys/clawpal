<script lang="ts">
  import { Calculator, TrendingUp, DollarSign, Sparkles, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let monthlyVolume = $state(5000);
  let tradesPerMonth = $state(20);

  // Calculation based on typical DEX fees
  const avgDexFee = 0.003; // 0.3% typical swap fee
  const clawpalSavings = 0.15; // 15% savings through better routing
  const avgGasSavings = 0.5; // $0.50 per transaction gas optimization

  let monthlySavings = $derived(() => {
    const feeSavings = monthlyVolume * avgDexFee * clawpalSavings;
    const gasSavings = tradesPerMonth * avgGasSavings;
    return feeSavings + gasSavings;
  });

  let yearlySavings = $derived(() => monthlySavings() * 12);

  let timeSavedHours = $derived(() => {
    // Average 5 minutes saved per trade (finding best routes, etc.)
    return (tradesPerMonth * 5) / 60;
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('calculator');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  function formatCurrency(value: number): string {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }
</script>

<section id="calculator" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent-warning/5 rounded-full blur-[150px]"></div>
  <div class="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px]"></div>

  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-12">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-warning/10 border border-accent-warning/20 rounded-full mb-6">
          <Calculator size={16} class="text-accent-warning" />
          <span class="text-accent-warning text-sm font-medium">Savings Calculator</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          How Much Can <span class="gradient-text-warm">You Save</span>?
        </h2>
        <p class="text-text-secondary text-lg">
          See how much money and time Pal Claw can save you every month
        </p>
      </div>
    </div>

    <!-- Calculator Card -->
    <div
      class="bg-bg-card border border-border rounded-2xl overflow-hidden opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      <div class="grid md:grid-cols-2">

        <!-- Input Side -->
        <div class="p-8 border-b md:border-b-0 md:border-r border-border">
          <h3 class="text-text-primary font-bold text-lg mb-6">Your Trading Activity</h3>

          <!-- Monthly Volume Slider -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
              <label for="monthly-volume" class="text-text-secondary text-sm">Monthly Trading Volume</label>
              <span class="text-accent-primary font-bold">{formatCurrency(monthlyVolume)}</span>
            </div>
            <input
              id="monthly-volume"
              type="range"
              bind:value={monthlyVolume}
              min="1000"
              max="100000"
              step="1000"
              class="w-full h-2 bg-bg-secondary rounded-full appearance-none cursor-pointer accent-accent-primary"
            />
            <div class="flex justify-between text-text-muted text-xs mt-1">
              <span>$1K</span>
              <span>$100K</span>
            </div>
          </div>

          <!-- Trades Per Month Slider -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
              <label for="trades-per-month" class="text-text-secondary text-sm">Trades Per Month</label>
              <span class="text-accent-primary font-bold">{tradesPerMonth} trades</span>
            </div>
            <input
              id="trades-per-month"
              type="range"
              bind:value={tradesPerMonth}
              min="5"
              max="200"
              step="5"
              class="w-full h-2 bg-bg-secondary rounded-full appearance-none cursor-pointer accent-accent-primary"
            />
            <div class="flex justify-between text-text-muted text-xs mt-1">
              <span>5</span>
              <span>200</span>
            </div>
          </div>

          <!-- Info -->
          <div class="p-4 bg-bg-secondary/50 rounded-xl">
            <p class="text-text-muted text-sm">
              <strong class="text-text-secondary">How we calculate:</strong> Pal Claw finds the best routes across 12+ DEXs,
              saving you ~15% on swap fees plus gas optimization.
            </p>
          </div>
        </div>

        <!-- Results Side -->
        <div class="p-8 bg-gradient-to-br from-bg-secondary/50 to-bg-card">
          <h3 class="text-text-primary font-bold text-lg mb-6">Your Estimated Savings</h3>

          <!-- Monthly Savings -->
          <div class="mb-6 p-6 bg-bg-card border border-accent-primary/30 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center">
                <DollarSign size={20} class="text-accent-primary" />
              </div>
              <span class="text-text-secondary text-sm">Monthly Savings</span>
            </div>
            <p class="text-4xl font-bold text-accent-primary">
              {formatCurrency(monthlySavings())}
            </p>
          </div>

          <!-- Additional stats -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-bg-card rounded-xl">
              <p class="text-text-muted text-xs mb-1">Yearly Savings</p>
              <p class="text-text-primary font-bold text-xl">{formatCurrency(yearlySavings())}</p>
            </div>
            <div class="p-4 bg-bg-card rounded-xl">
              <p class="text-text-muted text-xs mb-1">Time Saved/Month</p>
              <p class="text-text-primary font-bold text-xl">{timeSavedHours().toFixed(1)} hrs</p>
            </div>
          </div>

          <!-- Highlight -->
          <div class="p-4 bg-accent-primary/10 border border-accent-primary/20 rounded-xl mb-6">
            <div class="flex items-center gap-2 mb-2">
              <Sparkles size={16} class="text-accent-primary" />
              <span class="text-accent-primary font-medium text-sm">Pro Tip</span>
            </div>
            <p class="text-text-secondary text-sm">
              With Pro plan ($19/mo), you'd still save <strong class="text-accent-primary">{formatCurrency(monthlySavings() - 19)}/month</strong> net!
            </p>
          </div>

          <!-- CTA -->
          <a
            href="#waitlist"
            class="w-full py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Start Saving Now
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </div>

  </div>
</section>

<style>
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-accent-primary);
    cursor: pointer;
    border: 3px solid var(--color-bg-card);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-accent-primary);
    cursor: pointer;
    border: 3px solid var(--color-bg-card);
  }
</style>
