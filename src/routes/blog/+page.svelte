<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Calendar, Clock, ArrowRight, Tag, TrendingUp, Zap, Shield, Lightbulb } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const featuredPost = {
    title: 'Why We Built ClawPal: A Degen\'s Manifesto',
    excerpt: 'We got tired of the same old crypto UX. Click here, confirm there, wait forever, pray it works. So we said "nah" and built something better. This is the story of how ClawPal came to be, and why we think natural language is the future of crypto interactions.',
    date: 'Feb 18, 2025',
    readTime: '8 min read',
    category: 'Company',
    image: '📖'
  };

  const posts = [
    {
      title: 'How Our Smart Routing Saves You Money (No Cap)',
      excerpt: 'Deep dive into how we scan every DEX to find you the best rates. Spoiler: it\'s more complicated than you think, but that\'s our problem, not yours.',
      date: 'Feb 15, 2025',
      readTime: '5 min read',
      category: 'Product',
      icon: TrendingUp
    },
    {
      title: 'Security Deep Dive: How We Keep Your Bags Safe',
      excerpt: 'A technical breakdown of our non-custodial architecture. No marketing fluff, just the real talk on how we handle security.',
      date: 'Feb 12, 2025',
      readTime: '10 min read',
      category: 'Security',
      icon: Shield
    },
    {
      title: 'The Future of Crypto UX (And Why Chat is It)',
      excerpt: 'Everyone\'s building another DEX aggregator. We\'re building something different. Here\'s why we bet big on conversational interfaces.',
      date: 'Feb 8, 2025',
      readTime: '6 min read',
      category: 'Thoughts',
      icon: Lightbulb
    },
    {
      title: 'ClawPal v0.5: Priority Execution is Here',
      excerpt: 'Big update dropping. Premium users now get priority RPC endpoints. What this means for your trades and why it matters.',
      date: 'Feb 5, 2025',
      readTime: '4 min read',
      category: 'Updates',
      icon: Zap
    },
    {
      title: 'Building for Degens: Lessons from Our First 10K Users',
      excerpt: 'What we learned from our first wave of users. The good, the bad, and the "why didn\'t we think of that" moments.',
      date: 'Feb 1, 2025',
      readTime: '7 min read',
      category: 'Company',
      icon: TrendingUp
    },
    {
      title: 'MEV Protection Explained: Don\'t Get Sandwiched',
      excerpt: 'MEV bots are eating your gains. Here\'s how they work, why they suck, and how our Whale tier protects you from them.',
      date: 'Jan 28, 2025',
      readTime: '8 min read',
      category: 'Education',
      icon: Shield
    }
  ];

  const categories = [
    { name: 'All Posts', count: 24, active: true },
    { name: 'Product', count: 8, active: false },
    { name: 'Company', count: 6, active: false },
    { name: 'Security', count: 4, active: false },
    { name: 'Education', count: 4, active: false },
    { name: 'Updates', count: 2, active: false }
  ];
</script>

<svelte:head>
  <title>Blog | ClawPal - Crypto Insights, Updates & Degen Takes</title>
  <meta name="description" content="The ClawPal blog. Product updates, crypto insights, and real talk about building in web3. No marketing fluff, just vibes." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Blog"
      badgeColor="primary"
      title="Thoughts, Updates & "
      highlight="Alpha"
      description="Real talk about building in crypto. Product updates, degen takes, and occasionally useful information. Subscribe to stay in the loop."
    />

    <!-- Categories -->
    <div
      class="flex flex-wrap gap-3 mb-12 opacity-0"
      class:animate-fade-in-up={visible}
    >
      {#each categories as cat}
        <button
          class="px-4 py-2 rounded-full font-mono text-sm transition-all {
            cat.active
              ? 'bg-accent-primary text-bg-primary'
              : 'bg-bg-card border border-border text-text-secondary hover:border-accent-primary hover:text-accent-primary'
          }"
        >
          {cat.name}
          <span class="ml-2 opacity-60">{cat.count}</span>
        </button>
      {/each}
    </div>

    <!-- Featured Post -->
    <div
      class="glass-card overflow-hidden mb-12 hover:scale-[1.01] transition-all duration-300 group cursor-pointer opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      <div class="grid md:grid-cols-2">
        <div class="aspect-video md:aspect-auto bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center">
          <span class="text-8xl group-hover:scale-110 transition-transform">{featuredPost.image}</span>
        </div>
        <div class="p-8">
          <div class="flex items-center gap-4 mb-4">
            <span class="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-xs font-mono">
              {featuredPost.category}
            </span>
            <span class="text-text-muted text-sm flex items-center gap-1">
              <Calendar size={14} />
              {featuredPost.date}
            </span>
            <span class="text-text-muted text-sm flex items-center gap-1">
              <Clock size={14} />
              {featuredPost.readTime}
            </span>
          </div>

          <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors">
            {featuredPost.title}
          </h2>
          <p class="text-text-secondary leading-relaxed mb-6">
            {featuredPost.excerpt}
          </p>
          <span class="inline-flex items-center gap-2 text-accent-primary font-semibold group-hover:gap-4 transition-all">
            Read More <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </div>

    <!-- Posts Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {#each posts as post, i}
        <article
          class="glass-card p-6 hover:scale-[1.02] transition-all duration-300 group cursor-pointer opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: {0.2 + i * 0.1}s"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-accent-secondary/20 text-accent-secondary flex items-center justify-center">
              <post.icon size={18} />
            </div>
            <span class="px-2 py-1 rounded bg-bg-secondary text-text-muted text-xs font-mono">
              {post.category}
            </span>
          </div>

          <h3 class="font-heading font-semibold text-lg text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
            {post.title}
          </h3>
          <p class="text-text-secondary text-sm leading-relaxed mb-4">
            {post.excerpt}
          </p>

          <div class="flex items-center justify-between text-xs text-text-muted">
            <span class="flex items-center gap-1">
              <Calendar size={12} />
              {post.date}
            </span>
            <span class="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
        </article>
      {/each}
    </div>

    <!-- Load More -->
    <div
      class="text-center opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.8s"
    >
      <button class="btn-secondary">
        Load More Posts
      </button>
    </div>

    <!-- Newsletter -->
    <div
      class="mt-24 glass-card p-8 md:p-12 text-center glow-primary opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.9s"
    >
      <h2 class="font-heading text-2xl font-bold text-text-primary mb-4">
        Stay in the Loop, Fam
      </h2>
      <p class="text-text-secondary mb-6 max-w-xl mx-auto">
        Get the latest updates, alpha drops, and degen content straight to your inbox. We only send the good stuff, no spam.
      </p>
      <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="your@email.com"
          class="flex-1 bg-bg-secondary border border-border rounded-xl px-4 py-3 font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
        />
        <button type="submit" class="btn-primary">Subscribe</button>
      </form>
    </div>
  </div>
</main>

<Footer />
