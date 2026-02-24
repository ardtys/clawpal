<script lang="ts">
  import { ArrowRight, Check, Loader2, AlertCircle, X, Users, Sparkles } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { createVisibilityObserver, isValidEmail, delay } from '$lib/utils';
  import { WAITLIST_CONFIG } from '$lib/constants';

  let visible = $state(false);
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  // Waitlist counter
  let waitlistCount = $state(2847);
  let userPosition = $state(0);

  // Simulate live counter updates
  onMount(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        waitlistCount++;
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  onMount(() => {
    return createVisibilityObserver('waitlist', (isVisible) => {
      visible = isVisible;
    });
  });

  function validateEmail(): string | null {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return 'Please enter your email address';
    }

    if (trimmedEmail.length < WAITLIST_CONFIG.MIN_EMAIL_LENGTH) {
      return 'Email address is too short';
    }

    if (!isValidEmail(trimmedEmail)) {
      return 'Please enter a valid email address';
    }

    return null;
  }

  async function submit(e: Event) {
    e.preventDefault();

    // Reset error state
    errorMessage = '';

    // Validate email
    const validationError = validateEmail();
    if (validationError) {
      errorMessage = validationError;
      status = 'error';
      return;
    }

    status = 'loading';

    try {
      // Simulate API call - replace with actual API integration
      await delay(WAITLIST_CONFIG.SUBMIT_DELAY_MS);

      // Simulate random failure for demo (10% chance)
      // Remove this in production
      if (Math.random() < 0.1) {
        throw new Error('Server temporarily unavailable. Please try again.');
      }

      status = 'success';
      userPosition = waitlistCount + 1;
      waitlistCount++;
      email = '';
    } catch (error) {
      status = 'error';
      errorMessage = error instanceof Error
        ? error.message
        : 'Something went wrong. Please try again.';
    }
  }

  function dismissError() {
    status = 'idle';
    errorMessage = '';
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    email = target.value;

    // Clear error when user starts typing
    if (status === 'error') {
      status = 'idle';
      errorMessage = '';
    }
  }
</script>

<section id="waitlist" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background decorations -->
  <div class="absolute top-0 left-1/4 w-64 h-64 bg-accent-primary/10 rounded-full blur-[100px]"></div>
  <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-accent-secondary/10 rounded-full blur-[80px]"></div>

  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

    <div
      class="opacity-0"
      class:animate-scale-in={visible}
    >
      <!-- Simple headline -->
      <h2 class="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
        want <span class="gradient-text">early access</span>?
      </h2>
      <p class="text-text-secondary mb-8">
        we're rolling out slowly. drop your email and we'll let you know when you're in.
      </p>

      <!-- Live counter -->
      <div class="flex items-center justify-center gap-6 mb-8">
        <div class="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-full">
          <Users size={16} class="text-accent-primary" />
          <span class="text-text-primary font-bold">{waitlistCount.toLocaleString()}</span>
          <span class="text-text-muted text-sm">on the list</span>
          <div class="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Success state -->
      {#if status === 'success'}
        <div class="p-6 bg-accent-primary/10 border border-accent-primary/20 rounded-2xl animate-fade-in-up">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <Sparkles class="text-accent-primary" size={24} />
            </div>
          </div>
          <h3 class="text-xl font-bold text-text-primary text-center mb-2">You're In!</h3>
          <p class="text-text-secondary text-center mb-4">
            You're <span class="text-accent-primary font-bold">#{userPosition.toLocaleString()}</span> on the waitlist
          </p>
          <div class="flex items-center justify-center gap-4 text-sm">
            <div class="text-center">
              <p class="text-accent-primary font-bold">{userPosition}</p>
              <p class="text-text-muted text-xs">Your Position</p>
            </div>
            <div class="w-px h-8 bg-border"></div>
            <div class="text-center">
              <p class="text-text-primary font-bold">{waitlistCount.toLocaleString()}</p>
              <p class="text-text-muted text-xs">Total Waitlist</p>
            </div>
            <div class="w-px h-8 bg-border"></div>
            <div class="text-center">
              <p class="text-accent-warning font-bold">53</p>
              <p class="text-text-muted text-xs">Beta Spots Left</p>
            </div>
          </div>
          <p class="text-text-muted text-xs text-center mt-4">
            Check your inbox for confirmation. We'll notify you when it's your turn!
          </p>
        </div>

      <!-- Error state -->
      {:else if status === 'error' && errorMessage}
        <div class="mb-6 animate-fade-in-up">
          <div class="flex items-center justify-between gap-3 p-4 bg-danger/10 border border-danger/20 rounded-xl">
            <div class="flex items-center gap-3">
              <AlertCircle class="text-danger flex-shrink-0" size={20} />
              <p class="text-danger text-sm text-left">{errorMessage}</p>
            </div>
            <button
              onclick={dismissError}
              class="p-1 hover:bg-danger/20 rounded-lg transition-colors"
              aria-label="Dismiss error"
            >
              <X size={16} class="text-danger" />
            </button>
          </div>
        </div>

        <!-- Show form again after error -->
        <form onsubmit={submit} class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            oninput={handleInput}
            placeholder="your@email.com"
            required
            aria-invalid={true}
            class="flex-1 bg-bg-card border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none transition-colors border-danger focus:border-danger"
          />
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 bg-accent-primary text-bg-primary font-semibold px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            join
            <ArrowRight size={18} />
          </button>
        </form>

      <!-- Default/idle state -->
      {:else}
        <form onsubmit={submit} class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            oninput={handleInput}
            placeholder="your@email.com"
            required
            class="flex-1 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            class="inline-flex items-center justify-center gap-2 bg-accent-primary text-bg-primary font-semibold px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {#if status === 'loading'}
              <Loader2 size={18} class="animate-spin" />
              <span>joining...</span>
            {:else}
              join
              <ArrowRight size={18} />
            {/if}
          </button>
        </form>

        <p class="text-text-muted text-xs mt-4">
          no spam. just updates when something cool happens.
        </p>
      {/if}
    </div>

  </div>
</section>
