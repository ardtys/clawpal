<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Heart, Target, Rocket, Users, Shield, Zap, Twitter, Github, Linkedin } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We will NEVER compromise on security. Your keys stay yours. Every decision we make puts your safety first. No exceptions, no shortcuts.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'We build for the community. Your feedback shapes our roadmap. We\'re in this together, and we win together. WAGMI isn\'t just a meme, it\'s how we operate.'
    },
    {
      icon: Zap,
      title: 'Ship Fast',
      description: 'We move quick. New features every week. We\'d rather ship something good today than something perfect never. Iterate, improve, repeat.'
    },
    {
      icon: Heart,
      title: 'No BS',
      description: 'We say what we mean and mean what we say. No marketing fluff, no vaporware promises. If we can\'t do something, we\'ll tell you straight up.'
    }
  ];

  const team = [
    {
      name: 'Alex "Degen" Chen',
      role: 'Co-Founder & CEO',
      bio: 'Former trading desk at Jump. Lost his shirt in 2022, learned his lesson. Now building the tools he wished existed.',
      avatar: '👨‍💻',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Sarah "Ape" Williams',
      role: 'Co-Founder & CTO',
      bio: 'Ex-Solana Labs engineer. Shipped code at 3am more times than she\'d like to admit. Probably doing it right now.',
      avatar: '👩‍💻',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Mike "HODL" Johnson',
      role: 'Head of Product',
      bio: 'Product guy who actually uses crypto. Still holding bags from 2017. Dreams in gas fees.',
      avatar: '🧑‍💻',
      twitter: '#'
    },
    {
      name: 'Lisa "LFG" Park',
      role: 'Head of Community',
      bio: 'Managed communities at Phantom and Magic Eden. Will respond to your Discord message at 2am.',
      avatar: '👩‍🎤',
      twitter: '#'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Transactions Processed' },
    { value: '10K+', label: 'Happy Degens' },
    { value: '99.9%', label: 'Uptime' },
    { value: '$50M+', label: 'Volume Routed' }
  ];

  const timeline = [
    { date: 'Q1 2024', title: 'The Idea', description: 'Tired of clicking through 10 tabs to make a swap, we started building.' },
    { date: 'Q2 2024', title: 'First Prototype', description: 'Built a janky MVP. It barely worked but people loved the concept.' },
    { date: 'Q3 2024', title: 'Private Beta', description: 'Invited 500 degens to break things. They did. We fixed it. Repeat.' },
    { date: 'Q4 2024', title: 'Public Launch', description: 'Opened the doors. The rest is history being written.' },
    { date: '2025+', title: 'World Domination', description: 'Multi-chain expansion, mobile app, and features you haven\'t even thought of yet.' }
  ];
</script>

<svelte:head>
  <title>About Us | ClawPal - Meet the Team Behind Your Crypto Bestie</title>
  <meta name="description" content="Meet the team building ClawPal. We're degens who got tired of complex UIs and decided to fix crypto UX ourselves." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>
  <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[128px]"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="About Us"
      badgeColor="secondary"
      title="We're Just Degens Who Got "
      highlight="Fed Up"
      description="Tired of clicking through endless UIs just to make a swap? Yeah, us too. So we built the tool we wished existed. Now we're sharing it with the world."
    />

    <!-- Mission -->
    <section
      class="mb-24 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="glass-card p-8 md:p-12 text-center">
        <Target class="text-accent-primary mx-auto mb-6" size={48} />
        <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
        <p class="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
          To make crypto actually usable for normal humans. No more memorizing addresses, navigating complex UIs, or feeling like you need a PhD in DeFi. Just tell us what you want, and we'll make it happen. <span class="text-accent-primary font-semibold">Blockchain without the BS.</span>
        </p>
      </div>
    </section>

    <!-- Stats -->
    <section class="mb-24">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {#each stats as stat, i}
          <div
            class="glass-card p-6 text-center opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.1 + i * 0.1}s"
          >
            <div class="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
            <div class="text-text-muted text-sm">{stat.label}</div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Values -->
    <section class="mb-24">
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary text-center mb-12">
        What We <span class="gradient-text">Stand For</span>
      </h2>

      <div class="grid sm:grid-cols-2 gap-6">
        {#each values as value, i}
          <div
            class="glass-card p-8 hover:scale-[1.02] transition-all duration-300 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.5 + i * 0.1}s"
          >
            <div class="w-12 h-12 rounded-xl bg-accent-primary/20 text-accent-primary flex items-center justify-center mb-4">
              <value.icon size={24} />
            </div>
            <h3 class="font-heading font-semibold text-xl text-text-primary mb-3">{value.title}</h3>
            <p class="text-text-secondary leading-relaxed">{value.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Team -->
    <section class="mb-24">
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary text-center mb-4">
        Meet the <span class="gradient-text">Squad</span>
      </h2>
      <p class="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
        A bunch of crypto nerds who've been in the trenches. We've made the mistakes so you don't have to.
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each team as member, i}
          <div
            class="glass-card p-6 text-center hover:scale-[1.02] transition-all duration-300 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.9 + i * 0.1}s"
          >
            <div class="text-5xl mb-4">{member.avatar}</div>
            <h3 class="font-heading font-semibold text-text-primary mb-1">{member.name}</h3>
            <p class="text-accent-primary text-sm font-medium mb-3">{member.role}</p>
            <p class="text-text-secondary text-sm mb-4">{member.bio}</p>
            <div class="flex items-center justify-center gap-3">
              <a href={member.twitter} class="p-2 rounded-lg bg-bg-secondary text-text-muted hover:text-accent-primary transition-colors">
                <Twitter size={16} />
              </a>
              {#if member.github}
                <a href={member.github} class="p-2 rounded-lg bg-bg-secondary text-text-muted hover:text-accent-primary transition-colors">
                  <Github size={16} />
                </a>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Timeline -->
    <section class="mb-24">
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary text-center mb-12">
        Our <span class="gradient-text">Journey</span>
      </h2>

      <div class="relative">
        <!-- Line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5"></div>

        <div class="space-y-8">
          {#each timeline as item, i}
            <div
              class="relative flex items-start gap-8 opacity-0 {i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}"
              class:animate-fade-in-up={visible}
              style="animation-delay: {1.3 + i * 0.1}s"
            >
              <div class="hidden md:block md:w-1/2 {i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}">
                <span class="font-mono text-accent-primary">{item.date}</span>
              </div>

              <!-- Dot -->
              <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-accent-primary rounded-full -translate-x-1/2 mt-1.5 glow-primary"></div>

              <div class="ml-12 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}">
                <span class="font-mono text-accent-primary md:hidden">{item.date}</span>
                <h3 class="font-heading font-semibold text-text-primary text-lg">{item.title}</h3>
                <p class="text-text-secondary text-sm">{item.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div
      class="text-center glass-card p-12 glow-secondary opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 1.8s"
    >
      <Rocket class="text-accent-secondary mx-auto mb-6" size={48} />
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4">
        Want to Join the Mission?
      </h2>
      <p class="text-text-secondary mb-8 max-w-xl mx-auto">
        We're always looking for talented degens to join the squad. If you're passionate about making crypto better, we want to hear from you.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/careers" class="btn-primary">View Open Roles</a>
        <a href="/contact" class="btn-secondary">Get in Touch</a>
      </div>
    </div>
  </div>
</main>

<Footer />
