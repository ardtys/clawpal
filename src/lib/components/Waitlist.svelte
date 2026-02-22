<script lang="ts">
  import { ArrowRight, Check, Loader2 } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let email = $state('');
  let status = $state<'idle' | 'loading' | 'done'>('idle');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('waitlist');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  async function submit(e: Event) {
    e.preventDefault();
    if (!email.includes('@')) return;

    status = 'loading';
    await new Promise(r => setTimeout(r, 1200));
    status = 'done';
    email = '';
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

      <!-- Form -->
      {#if status === 'done'}
        <div class="flex items-center justify-center gap-3 py-4">
          <div class="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Check class="text-accent-primary" size={20} />
          </div>
          <p class="text-text-primary">you're on the list. we'll be in touch.</p>
        </div>
      {:else}
        <form onsubmit={submit} class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            bind:value={email}
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
