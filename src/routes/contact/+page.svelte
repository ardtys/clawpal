<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Mail, MessageSquare, Twitter, Send, CheckCircle, Loader2, HelpCircle, Briefcase, Shield, Newspaper } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);
  let formStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
  let selectedTopic = $state('general');

  onMount(() => {
    visible = true;
  });

  const topics = [
    { id: 'general', label: 'General Question', icon: HelpCircle },
    { id: 'support', label: 'Tech Support', icon: Shield },
    { id: 'business', label: 'Business Inquiry', icon: Briefcase },
    { id: 'press', label: 'Press/Media', icon: Newspaper }
  ];

  const contactMethods = [
    {
      icon: MessageSquare,
      title: 'Discord',
      description: 'Fastest way to reach us. Join the community and drop a message.',
      action: 'Join Discord',
      link: '#'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      description: 'DMs open. Slide in for quick questions or just to say hi.',
      action: '@palclaw_io',
      link: '#'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'For formal inquiries. We\'ll get back within 24 hours.',
      action: 'gm@palclaw.io',
      link: 'mailto:gm@palclaw.io'
    }
  ];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    formStatus = 'loading';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    formStatus = 'success';
  }
</script>

<svelte:head>
  <title>Contact Us | Pal Claw - Get in Touch</title>
  <meta name="description" content="Got questions? We got answers. Reach out via Discord, Twitter, or email. We're here to help, fam." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>
  <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-[128px]"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Contact"
      badgeColor="secondary"
      title="Let's "
      highlight="Chat"
      description="Got questions, feedback, or just wanna say gm? We're all ears. Hit us up through any of these channels and we'll get back to you ASAP."
    />

    <!-- Contact Methods -->
    <div class="grid md:grid-cols-3 gap-6 mb-16">
      {#each contactMethods as method, i}
        <a
          href={method.link}
          class="glass-card p-6 text-center hover:scale-[1.02] transition-all duration-300 group opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: {i * 0.1}s"
        >
          <div class="w-14 h-14 rounded-xl bg-accent-primary/20 text-accent-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-primary group-hover:text-bg-primary transition-colors">
            <method.icon size={28} />
          </div>
          <h3 class="font-heading font-semibold text-lg text-text-primary mb-2">{method.title}</h3>
          <p class="text-text-secondary text-sm mb-4">{method.description}</p>
          <span class="text-accent-primary font-mono text-sm">{method.action}</span>
        </a>
      {/each}
    </div>

    <!-- Contact Form -->
    <div class="grid lg:grid-cols-2 gap-12 items-start">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
        style="animation-delay: 0.3s"
      >
        <h2 class="font-heading text-2xl font-bold text-text-primary mb-4">
          Drop Us a Line
        </h2>
        <p class="text-text-secondary mb-8">
          Prefer email? No problem. Fill out the form and we'll get back to you within 24 hours. For urgent stuff, Discord is faster tho.
        </p>

        <!-- Topic Selection -->
        <div class="mb-6">
          <label class="block text-text-primary font-medium mb-3">What's this about?</label>
          <div class="grid grid-cols-2 gap-3">
            {#each topics as topic}
              <button
                type="button"
                onclick={() => selectedTopic = topic.id}
                class="flex items-center gap-3 p-4 rounded-xl border transition-all {
                  selectedTopic === topic.id
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-border bg-bg-secondary text-text-secondary hover:border-accent-primary/50'
                }"
              >
                <topic.icon size={18} />
                <span class="text-sm font-medium">{topic.label}</span>
              </button>
            {/each}
          </div>
        </div>

        {#if formStatus === 'success'}
          <div class="glass-card p-8 text-center">
            <CheckCircle class="text-accent-primary mx-auto mb-4" size={48} />
            <h3 class="font-heading font-semibold text-xl text-text-primary mb-2">Message Sent!</h3>
            <p class="text-text-secondary">
              We got your message, fam. Expect a reply within 24 hours. In the meantime, feel free to join our Discord for faster support.
            </p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-6">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-text-primary font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  class="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
              <div>
                <label class="block text-text-primary font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  class="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label class="block text-text-primary font-medium mb-2">Subject</label>
              <input
                type="text"
                required
                placeholder="What's on your mind?"
                class="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>

            <div>
              <label class="block text-text-primary font-medium mb-2">Message</label>
              <textarea
                required
                rows="5"
                placeholder="Tell us what's up..."
                class="w-full bg-bg-secondary border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={formStatus === 'loading'}
              class="btn-primary w-full flex items-center justify-center gap-2 {formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}"
            >
              {#if formStatus === 'loading'}
                <Loader2 size={20} class="animate-spin" />
                <span>Sending...</span>
              {:else}
                <span>Send Message</span>
                <Send size={18} />
              {/if}
            </button>
          </form>
        {/if}
      </div>

      <!-- FAQ Preview -->
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
        style="animation-delay: 0.5s"
      >
        <div class="glass-card p-8">
          <h3 class="font-heading font-semibold text-xl text-text-primary mb-6">Before You Reach Out...</h3>
          <p class="text-text-secondary mb-6">
            Check if your question is already answered. We've got a pretty solid FAQ that covers the common stuff.
          </p>

          <div class="space-y-4 mb-6">
            <div class="p-4 rounded-lg bg-bg-secondary">
              <h4 class="font-semibold text-text-primary mb-1">Is Pal Claw safe to use?</h4>
              <p class="text-text-secondary text-sm">100%. We're non-custodial - we never touch your keys.</p>
            </div>
            <div class="p-4 rounded-lg bg-bg-secondary">
              <h4 class="font-semibold text-text-primary mb-1">What chains do you support?</h4>
              <p class="text-text-secondary text-sm">Solana and Base right now, more coming soon.</p>
            </div>
            <div class="p-4 rounded-lg bg-bg-secondary">
              <h4 class="font-semibold text-text-primary mb-1">How do I get API access?</h4>
              <p class="text-text-secondary text-sm">API access is Whale tier only ($99/mo).</p>
            </div>
          </div>

          <a href="/#faq" class="btn-secondary w-full text-center">
            View Full FAQ
          </a>
        </div>

        <!-- Response Time -->
        <div class="glass-card p-6 mt-6">
          <h4 class="font-heading font-semibold text-text-primary mb-3">Response Times</h4>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-text-secondary">Discord</span>
              <span class="text-accent-primary font-mono text-sm">&lt; 1 hour</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-text-secondary">Twitter DM</span>
              <span class="text-accent-primary font-mono text-sm">&lt; 4 hours</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-text-secondary">Email</span>
              <span class="text-accent-primary font-mono text-sm">&lt; 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<Footer />
