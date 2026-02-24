<script lang="ts">
  import { X, Gift, ArrowRight, Clock, Sparkles } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { isValidEmail } from '$lib/utils';

  let showPopup = $state(false);
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
  let hasShown = $state(false);

  onMount(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exitPopupShown')) {
      hasShown = true;
      return;
    }

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        showPopup = true;
        hasShown = true;
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Also show after 45 seconds of inactivity
    const timeoutId = setTimeout(() => {
      if (!hasShown) {
        showPopup = true;
        hasShown = true;
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  });

  function closePopup() {
    showPopup = false;
  }

  async function submit(e: Event) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      status = 'error';
      return;
    }

    status = 'loading';
    await new Promise(r => setTimeout(r, 1000));
    status = 'success';
  }
</script>

{#if showPopup}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] animate-fade-in"
    onclick={closePopup}
    role="button"
    tabindex="-1"
    aria-label="Close popup"
    onkeydown={(e) => e.key === 'Escape' && closePopup()}
  ></div>

  <!-- Popup -->
  <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4 animate-scale-in">
    <div class="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">

      <!-- Header with gradient -->
      <div class="relative bg-gradient-to-r from-accent-primary to-accent-secondary p-6 text-center">
        <button
          onclick={closePopup}
          class="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
          <Gift size={32} class="text-white" />
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">Wait! Don't Leave Empty-Handed</h2>
        <p class="text-white/80">Get exclusive early access + special launch pricing</p>
      </div>

      <!-- Content -->
      <div class="p-6">
        {#if status === 'success'}
          <div class="text-center py-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-accent-primary/20 rounded-full mb-4">
              <Sparkles size={32} class="text-accent-primary" />
            </div>
            <h3 class="text-xl font-bold text-text-primary mb-2">You're In!</h3>
            <p class="text-text-secondary">
              Check your inbox for your exclusive discount code.
              We'll also notify you when we launch!
            </p>
          </div>
        {:else}
          <!-- Offer details -->
          <div class="space-y-4 mb-6">
            <div class="flex items-center gap-3 p-3 bg-accent-primary/10 border border-accent-primary/20 rounded-xl">
              <div class="flex-shrink-0 w-10 h-10 bg-accent-primary/20 rounded-full flex items-center justify-center">
                <span class="text-accent-primary font-bold">50%</span>
              </div>
              <div>
                <p class="text-text-primary font-medium">50% Off Pro Plan for Life</p>
                <p class="text-text-muted text-sm">For the first 100 users only</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-3 bg-bg-secondary rounded-xl">
              <Clock size={20} class="text-accent-warning" />
              <div>
                <p class="text-text-primary font-medium">Limited Time Offer</p>
                <p class="text-text-muted text-sm">Expires when beta spots are filled</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form onsubmit={submit} class="space-y-4">
            <input
              type="email"
              bind:value={email}
              placeholder="Enter your email"
              required
              class="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors
                {status === 'error' ? 'border-danger' : ''}"
            />

            {#if status === 'error'}
              <p class="text-danger text-sm">Please enter a valid email address</p>
            {/if}

            <button
              type="submit"
              disabled={status === 'loading'}
              class="w-full py-3 bg-accent-primary text-bg-primary rounded-xl font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
            >
              {#if status === 'loading'}
                <span class="animate-spin">⏳</span>
                <span>Claiming...</span>
              {:else}
                <span>Claim My 50% Discount</span>
                <ArrowRight size={18} />
              {/if}
            </button>
          </form>

          <!-- Trust line -->
          <p class="text-text-muted text-xs text-center mt-4">
            🔒 No spam, ever. Unsubscribe anytime.
          </p>
        {/if}
      </div>

    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
</style>
