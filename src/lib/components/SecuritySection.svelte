<script lang="ts">
  import { Shield, Lock, Eye, Key, CheckCircle, ExternalLink } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('security');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const securityFeatures = [
    {
      icon: Key,
      title: 'Non-Custodial',
      description: 'Your private keys never leave your device. We never have access to your funds.',
      highlight: 'Your keys, your crypto'
    },
    {
      icon: Lock,
      title: 'End-to-End Encrypted',
      description: 'All communications are encrypted. Your data stays private and secure.',
      highlight: 'Military-grade encryption'
    },
    {
      icon: Eye,
      title: 'Open Source',
      description: 'Our smart contracts are verified and auditable. Transparency is our priority.',
      highlight: 'Fully auditable'
    },
    {
      icon: Shield,
      title: 'Battle Tested',
      description: 'Built on proven infrastructure. Jupiter, Raydium, and Orca integrations.',
      highlight: '$50M+ secured'
    }
  ];

  const audits = [
    { name: 'OtterSec', status: 'Completed', date: 'Jan 2025' },
    { name: 'Halborn', status: 'In Progress', date: 'Q1 2025' }
  ];

  const stats = [
    { value: '0', label: 'Security Incidents' },
    { value: '99.99%', label: 'Uptime' },
    { value: '24/7', label: 'Monitoring' }
  ];
</script>

<section id="security" class="py-24 bg-bg-secondary/30 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 dot-bg opacity-30"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[200px]"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
          <Shield size={16} class="text-accent-primary" />
          <span class="text-accent-primary text-sm font-medium">Security First</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Your Crypto is <span class="gradient-text">Safe</span> With Us
        </h2>
        <p class="text-text-secondary text-lg">
          Non-custodial by design. We never touch your private keys.
          Your funds remain in your wallet at all times.
        </p>
      </div>
    </div>

    <!-- Security Features Grid -->
    <div
      class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each securityFeatures as feature, i}
        <div class="group bg-bg-card border border-border rounded-2xl p-6 hover:border-accent-primary/50 transition-all duration-300">
          <div class="w-14 h-14 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <feature.icon size={28} class="text-accent-primary" />
          </div>
          <h3 class="text-text-primary font-bold text-lg mb-2">{feature.title}</h3>
          <p class="text-text-secondary text-sm mb-3">{feature.description}</p>
          <div class="flex items-center gap-2 text-accent-primary text-xs font-medium">
            <CheckCircle size={14} />
            <span>{feature.highlight}</span>
          </div>
        </div>
      {/each}
    </div>

    <!-- Trust Bar -->
    <div
      class="bg-bg-card border border-border rounded-2xl p-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      <div class="grid md:grid-cols-3 gap-8">

        <!-- Stats -->
        <div>
          <h3 class="text-text-primary font-bold mb-4">Security Stats</h3>
          <div class="space-y-3">
            {#each stats as stat}
              <div class="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span class="text-text-secondary text-sm">{stat.label}</span>
                <span class="text-accent-primary font-bold">{stat.value}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Audits -->
        <div>
          <h3 class="text-text-primary font-bold mb-4">Security Audits</h3>
          <div class="space-y-3">
            {#each audits as audit}
              <div class="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div class="flex items-center gap-2">
                  <span class="text-text-primary text-sm font-medium">{audit.name}</span>
                  <ExternalLink size={12} class="text-text-muted" />
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-xs px-2 py-0.5 rounded-full
                    {audit.status === 'Completed' ? 'bg-accent-primary/10 text-accent-primary' : 'bg-accent-warning/10 text-accent-warning'}">
                    {audit.status}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Promise -->
        <div class="bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 rounded-xl p-6 border border-accent-primary/20">
          <h3 class="text-text-primary font-bold mb-3">Our Security Promise</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle size={16} class="text-accent-primary flex-shrink-0 mt-0.5" />
              <span>Your keys never leave your device</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle size={16} class="text-accent-primary flex-shrink-0 mt-0.5" />
              <span>We cannot access or move your funds</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle size={16} class="text-accent-primary flex-shrink-0 mt-0.5" />
              <span>All transactions require your approval</span>
            </li>
            <li class="flex items-start gap-2 text-sm text-text-secondary">
              <CheckCircle size={16} class="text-accent-primary flex-shrink-0 mt-0.5" />
              <span>Open source and fully auditable</span>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </div>
</section>
