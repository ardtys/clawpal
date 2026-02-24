<script lang="ts">
  import { onMount } from 'svelte';
  import { Quote, Star, Twitter, TrendingUp, DollarSign, Clock } from 'lucide-svelte';

  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) visible = true;
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('testimonials');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });

  const testimonials = [
    {
      quote: "finally, a crypto app that doesn't make me feel like i need a CS degree. just told it to swap my SOL and boom, done.",
      author: "cryptopunk.sol",
      role: "DeFi Degen",
      avatar: "🦊",
      rating: 5,
      highlight: true,
      metric: { value: '$847', label: 'saved in fees', icon: DollarSign }
    },
    {
      quote: "been using clawpal for 2 months. saved me probably $200 in fees from better routing alone. the natural language stuff is chef's kiss.",
      author: "wagmi_andy",
      role: "NFT Collector",
      avatar: "🐸",
      rating: 5,
      metric: { value: '2 months', label: 'active user', icon: Clock }
    },
    {
      quote: "i was skeptical at first but holy shit this actually works. asked it to 'ape into bonk with 10 sol' and it understood perfectly.",
      author: "crypto_maxi",
      role: "Trader",
      avatar: "🚀",
      rating: 5,
      metric: { value: '342', label: 'trades executed', icon: TrendingUp }
    },
    {
      quote: "the fact that it's non-custodial is huge for me. my keys stay with me, but i still get this sick UX. best of both worlds fr.",
      author: "defi_sarah",
      role: "Protocol Dev",
      avatar: "👩‍💻",
      rating: 5,
      metric: { value: '$12K+', label: 'volume traded', icon: DollarSign }
    },
    {
      quote: "showed this to my normie friends and they actually understood how to use it. that's never happened with any other crypto app.",
      author: "based_builder",
      role: "Founder",
      avatar: "🏗️",
      rating: 5,
      metric: { value: '5', label: 'friends onboarded', icon: TrendingUp }
    },
    {
      quote: "portfolio tracking + swaps + sends all in one chat interface? yeah this is the future. no more juggling 5 different apps.",
      author: "alpha_hunter",
      role: "Full-time Trader",
      avatar: "🎯",
      rating: 5,
      metric: { value: '4hrs', label: 'saved per week', icon: Clock }
    }
  ];

  const stats = [
    { value: '4.9', label: 'avg rating', suffix: '/5' },
    { value: '10K', label: 'active users', suffix: '+' },
    { value: '98', label: 'would recommend', suffix: '%' },
    { value: '$2.1M', label: 'fees saved', suffix: '' }
  ];
</script>

<section id="testimonials" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-secondary/5 rounded-full blur-[200px]"></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-warning/10 border border-accent-warning/20 rounded-full mb-6">
          <Star size={16} class="text-accent-warning fill-accent-warning" />
          <span class="text-accent-warning text-sm font-medium">Loved by Degens</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Real Results from <span class="gradient-text-warm">Real Users</span>
        </h2>
        <p class="text-text-secondary text-lg">
          Here's what the crypto fam is saying (and saving) with ClawPal
        </p>
      </div>
    </div>

    <!-- Stats bar -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each stats as stat}
        <div class="text-center p-4 bg-bg-card/50 border border-border rounded-xl">
          <p class="text-3xl md:text-4xl font-bold text-text-primary">
            {stat.value}<span class="text-accent-primary">{stat.suffix}</span>
          </p>
          <p class="text-text-muted text-sm">{stat.label}</p>
        </div>
      {/each}
    </div>

    <!-- Testimonials grid -->
    <div
      class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >
      {#each testimonials as testimonial, i}
        <div
          class="group relative bg-bg-card border border-border rounded-2xl p-6 card-hover {testimonial.highlight ? 'md:col-span-2 lg:col-span-1 ring-1 ring-accent-primary/20' : ''}"
          style="animation-delay: {0.1 * i}s"
        >
          <!-- Quote icon -->
          <div class="absolute top-6 right-6 opacity-10">
            <Quote size={32} class="text-accent-primary" />
          </div>

          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            {#each Array(testimonial.rating) as _}
              <Star size={14} class="text-accent-warning fill-accent-warning" />
            {/each}
          </div>

          <!-- Quote -->
          <p class="text-text-primary leading-relaxed mb-4">
            "{testimonial.quote}"
          </p>

          <!-- Metric badge -->
          {#if testimonial.metric}
            <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-4">
              <testimonial.metric.icon size={14} class="text-accent-primary" />
              <span class="text-accent-primary font-bold text-sm">{testimonial.metric.value}</span>
              <span class="text-text-muted text-xs">{testimonial.metric.label}</span>
            </div>
          {/if}

          <!-- Author -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-lg">
                {testimonial.avatar}
              </div>
              <div>
                <p class="text-text-primary font-medium text-sm">{testimonial.author}</p>
                <p class="text-text-muted text-xs">{testimonial.role}</p>
              </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
              <Twitter size={14} class="text-text-muted" />
            </div>
          </div>

          {#if testimonial.highlight}
            <div class="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-t-2xl"></div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Video testimonial teaser -->
    <div
      class="mt-12 p-6 bg-bg-card border border-border rounded-2xl opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.4s"
    >
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="flex -space-x-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-bg-card">A</div>
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold border-2 border-bg-card">S</div>
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold border-2 border-bg-card">M</div>
            <div class="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary font-bold border-2 border-bg-card">+97</div>
          </div>
          <div>
            <p class="text-text-primary font-medium">Join 10,000+ happy users</p>
            <p class="text-text-muted text-sm">Average savings: $127/month</p>
          </div>
        </div>
        <a
          href="#waitlist"
          class="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Get Early Access
          <span>→</span>
        </a>
      </div>
    </div>

  </div>
</section>
