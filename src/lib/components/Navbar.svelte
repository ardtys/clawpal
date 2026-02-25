<script lang="ts">
  import { Menu, X } from 'lucide-svelte';

  let mobileOpen = $state(false);
</script>

<nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-14">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <img
          src="/palclaw-logo.png"
          alt="ClawPal Logo"
          class="w-8 h-8 rounded-lg group-hover:scale-105 transition-transform"
        />
        <span class="font-bold text-text-primary group-hover:text-accent-primary transition-colors">palclaw</span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/features" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">features</a>
        <a href="/#demo" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">demo</a>
        <a href="/#pricing" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">pricing</a>
        <a href="/docs" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">docs</a>
      </div>

      <!-- CTA -->
      <div class="hidden md:block">
        <a
          href="/#waitlist"
          class="inline-flex items-center gap-2 bg-accent-primary text-bg-primary text-sm font-medium px-4 py-2 rounded-lg btn-glow hover:opacity-90 transition-all"
        >
          get early access
        </a>
      </div>

      <!-- Mobile toggle -->
      <button
        onclick={() => mobileOpen = !mobileOpen}
        class="md:hidden p-2 text-text-secondary"
      >
        {#if mobileOpen}
          <X size={20} />
        {:else}
          <Menu size={20} />
        {/if}
      </button>

    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="md:hidden bg-bg-primary border-t border-border">
      <div class="px-4 py-4 space-y-3">
        <a href="/features" onclick={() => mobileOpen = false} class="block text-text-secondary hover:text-text-primary transition-colors">features</a>
        <a href="/#demo" onclick={() => mobileOpen = false} class="block text-text-secondary hover:text-text-primary transition-colors">demo</a>
        <a href="/#pricing" onclick={() => mobileOpen = false} class="block text-text-secondary hover:text-text-primary transition-colors">pricing</a>
        <a href="/docs" onclick={() => mobileOpen = false} class="block text-text-secondary hover:text-text-primary transition-colors">docs</a>
        <div class="pt-3">
          <a
            href="/#waitlist"
            onclick={() => mobileOpen = false}
            class="block w-full text-center bg-text-primary text-bg-primary font-medium px-4 py-2 rounded-lg"
          >
            get early access
          </a>
        </div>
      </div>
    </div>
  {/if}
</nav>
