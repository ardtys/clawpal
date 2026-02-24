<script lang="ts">
  import { X, Zap, Clock, Users } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(true);
  let spotsLeft = $state(53);
  let timeLeft = $state({ days: 3, hours: 14, minutes: 27, seconds: 45 });

  // Countdown timer
  onMount(() => {
    const interval = setInterval(() => {
      if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
      } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
      } else if (timeLeft.hours > 0) {
        timeLeft.hours--;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
      } else if (timeLeft.days > 0) {
        timeLeft.days--;
        timeLeft.hours = 23;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
      }

      // Randomly decrease spots (for demo effect)
      if (Math.random() < 0.01 && spotsLeft > 10) {
        spotsLeft--;
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  function dismiss() {
    visible = false;
  }

  function padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
</script>

{#if visible}
  <div class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_100%] animate-gradient">
    <div class="max-w-7xl mx-auto px-4 py-2.5">
      <div class="flex items-center justify-center gap-4 sm:gap-8 text-bg-primary text-sm font-medium">

        <!-- Spots remaining -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded-full">
            <Zap size={14} class="animate-pulse" />
            <span class="font-bold">{spotsLeft}</span>
          </div>
          <span class="hidden sm:inline">beta spots left</span>
          <span class="sm:hidden">spots</span>
        </div>

        <!-- Divider -->
        <div class="w-px h-4 bg-white/30"></div>

        <!-- Countdown -->
        <div class="flex items-center gap-2">
          <Clock size={14} />
          <span class="hidden sm:inline">Early bird pricing ends in:</span>
          <div class="flex items-center gap-1 font-mono font-bold">
            <span class="bg-white/20 px-1.5 py-0.5 rounded">{timeLeft.days}d</span>
            <span>:</span>
            <span class="bg-white/20 px-1.5 py-0.5 rounded">{padZero(timeLeft.hours)}h</span>
            <span>:</span>
            <span class="bg-white/20 px-1.5 py-0.5 rounded">{padZero(timeLeft.minutes)}m</span>
            <span class="hidden sm:inline">:</span>
            <span class="hidden sm:inline bg-white/20 px-1.5 py-0.5 rounded">{padZero(timeLeft.seconds)}s</span>
          </div>
        </div>

        <!-- CTA -->
        <a
          href="#waitlist"
          class="hidden md:flex items-center gap-1.5 px-3 py-1 bg-bg-primary text-accent-primary rounded-full text-xs font-bold hover:bg-bg-secondary transition-colors"
        >
          Claim Your Spot
          <span class="text-[10px]">→</span>
        </a>

        <!-- Close button -->
        <button
          onclick={dismiss}
          class="absolute right-2 sm:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  </div>

  <!-- Spacer to prevent content from hiding behind fixed banner -->
  <div class="h-10"></div>
{/if}
