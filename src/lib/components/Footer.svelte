<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="py-16 border-t border-border relative overflow-hidden">
  <!-- Background -->
  <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-primary/5 rounded-full blur-[100px]"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <div class="grid md:grid-cols-4 gap-12 mb-12">

      <!-- Brand -->
      <div class="md:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-4 group">
          <img
            src="/clawpal-logo.png"
            alt="ClawPal Logo"
            class="w-9 h-9 rounded-lg group-hover:scale-105 transition-transform"
          />
          <span class="font-bold text-text-primary group-hover:text-accent-primary transition-colors">clawpal</span>
        </a>
        <p class="text-text-muted text-sm leading-relaxed">
          talk to your wallet like it's your friend.
        </p>
      </div>

      <!-- Product -->
      <div>
        <p class="text-accent-primary text-xs uppercase tracking-wider mb-4 font-mono">product</p>
        <ul class="space-y-3">
          <li><a href="/features" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">features</a></li>
          <li><a href="/#pricing" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">pricing</a></li>
          <li><a href="/#demo" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">demo</a></li>
          <li><a href="/changelog" class="text-text-secondary text-sm hover:text-accent-primary link-underline transition-colors">changelog</a></li>
        </ul>
      </div>

      <!-- Resources -->
      <div>
        <p class="text-accent-secondary text-xs uppercase tracking-wider mb-4 font-mono">resources</p>
        <ul class="space-y-3">
          <li><a href="/docs" class="text-text-secondary text-sm hover:text-accent-secondary link-underline transition-colors">docs</a></li>
          <li><a href="/api" class="text-text-secondary text-sm hover:text-accent-secondary link-underline transition-colors">api</a></li>
          <li><a href="/status" class="text-text-secondary text-sm hover:text-accent-secondary link-underline transition-colors">status</a></li>
          <li><a href="/blog" class="text-text-secondary text-sm hover:text-accent-secondary link-underline transition-colors">blog</a></li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <p class="text-accent-warning text-xs uppercase tracking-wider mb-4 font-mono">company</p>
        <ul class="space-y-3">
          <li><a href="/about" class="text-text-secondary text-sm hover:text-accent-warning link-underline transition-colors">about</a></li>
          <li><a href="/careers" class="text-text-secondary text-sm hover:text-accent-warning link-underline transition-colors">careers</a></li>
          <li><a href="/contact" class="text-text-secondary text-sm hover:text-accent-warning link-underline transition-colors">contact</a></li>
        </ul>
      </div>

    </div>

    <!-- Bottom -->
    <div class="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-text-muted text-sm">
        © {year} clawpal. <span class="text-accent-primary">built for degens.</span>
      </p>

      <div class="flex items-center gap-6">
        <a href="/privacy" class="text-text-muted text-sm hover:text-accent-primary transition-colors">privacy</a>
        <a href="/terms" class="text-text-muted text-sm hover:text-accent-primary transition-colors">terms</a>
        <a href="#" class="text-text-muted text-sm hover:text-accent-primary transition-colors">twitter</a>
        <a href="#" class="text-text-muted text-sm hover:text-accent-primary transition-colors">discord</a>
      </div>
    </div>

  </div>
</footer>
