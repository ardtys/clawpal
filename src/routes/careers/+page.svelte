<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { Briefcase, MapPin, Clock, DollarSign, ArrowRight, Coffee, Gamepad2, Heart, Rocket, Globe, Zap } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const perks = [
    { icon: DollarSign, title: 'Competitive Pay', description: 'Top-of-market salaries plus equity. We want you invested in the mission.' },
    { icon: Globe, title: 'Remote First', description: 'Work from wherever. Beach? Mountain? Your mom\'s basement? We don\'t care as long as you ship.' },
    { icon: Coffee, title: 'Unlimited PTO', description: 'Take time when you need it. We trust you to manage your own schedule like an adult.' },
    { icon: Zap, title: 'Latest Gear', description: 'MacBook Pro, monitors, chairs - whatever you need to do your best work.' },
    { icon: Gamepad2, title: 'Team Offsites', description: 'Quarterly meetups in cool places. Work hard, play harder.' },
    { icon: Heart, title: 'Health & Wellness', description: 'Full health/dental/vision coverage. Mental health days encouraged.' }
  ];

  const positions = [
    {
      title: 'Senior Solana Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$180K - $250K + Equity',
      description: 'Ship production-grade Solana code. You know your way around Anchor, understand the runtime, and can optimize programs in your sleep.',
      requirements: ['3+ years Solana/Rust', 'Production dApp experience', 'Security-minded']
    },
    {
      title: 'Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$150K - $200K + Equity',
      description: 'Build the interfaces that make crypto feel easy. React/Next.js on the frontend, Node/Python on the backend. Make it fast, make it pretty.',
      requirements: ['4+ years full stack', 'React/TypeScript expert', 'Crypto native preferred']
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$170K - $230K + Equity',
      description: 'Make our AI actually understand crypto slang. Fine-tune models, improve intent recognition, make the chat experience magical.',
      requirements: ['NLP experience', 'LLM fine-tuning', 'Python/PyTorch']
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$140K - $180K + Equity',
      description: 'Design the future of crypto UX. Make complex things simple. Understand that good design in web3 is rare and valuable.',
      requirements: ['4+ years product design', 'Figma master', 'Crypto/fintech experience']
    },
    {
      title: 'Developer Relations',
      department: 'Growth',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130K - $170K + Equity',
      description: 'Help developers build on our API. Write docs, create tutorials, hang out in Discord. Be the bridge between us and the builder community.',
      requirements: ['Technical background', 'Content creation skills', 'Community building']
    },
    {
      title: 'Community Manager',
      department: 'Growth',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80K - $120K + Equity',
      description: 'Be the voice of ClawPal. Manage Discord, Twitter, support. Know when to meme and when to be serious. Crypto native required.',
      requirements: ['Crypto community experience', 'Meme fluency', 'Patience of a saint']
    }
  ];

  const values = [
    'Ship fast, iterate faster',
    'Default to transparency',
    'Users > everything',
    'Strong opinions, loosely held',
    'No ego, just good ideas',
    'WAGMI mentality'
  ];
</script>

<svelte:head>
  <title>Careers | ClawPal - Join the Squad</title>
  <meta name="description" content="Join ClawPal and help us make crypto usable for everyone. Remote-first, competitive pay, and a mission that actually matters." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>
  <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-[128px]"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Careers"
      badgeColor="primary"
      title="Come Build the "
      highlight="Future"
      description="We're looking for talented degens who want to fix crypto UX forever. Remote-first, competitive pay, and a team that actually ships. If that sounds like your vibe, keep reading."
    />

    <!-- Values -->
    <section
      class="mb-24 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="glass-card p-8 md:p-12 text-center">
        <h2 class="font-heading text-2xl font-bold text-text-primary mb-6">Our Culture in 6 Lines</h2>
        <div class="flex flex-wrap justify-center gap-3">
          {#each values as value}
            <span class="px-4 py-2 rounded-full bg-bg-secondary border border-border text-text-secondary font-mono text-sm">
              {value}
            </span>
          {/each}
        </div>
      </div>
    </section>

    <!-- Perks -->
    <section class="mb-24">
      <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary text-center mb-12">
        Why You'll <span class="gradient-text">Love It Here</span>
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each perks as perk, i}
          <div
            class="glass-card p-6 hover:scale-[1.02] transition-all duration-300 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.1 + i * 0.1}s"
          >
            <div class="w-12 h-12 rounded-xl bg-accent-secondary/20 text-accent-secondary flex items-center justify-center mb-4">
              <perk.icon size={24} />
            </div>
            <h3 class="font-heading font-semibold text-lg text-text-primary mb-2">{perk.title}</h3>
            <p class="text-text-secondary text-sm">{perk.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Open Positions -->
    <section class="mb-24">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          Open <span class="gradient-text">Positions</span>
        </h2>
        <span class="text-text-muted font-mono">{positions.length} roles</span>
      </div>

      <div class="space-y-4">
        {#each positions as position, i}
          <div
            class="glass-card p-6 hover:scale-[1.01] transition-all duration-300 group cursor-pointer opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.4 + i * 0.1}s"
          >
            <div class="flex flex-col lg:flex-row lg:items-center gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="font-heading font-semibold text-xl text-text-primary group-hover:text-accent-primary transition-colors">
                    {position.title}
                  </h3>
                  <span class="px-2 py-1 rounded bg-accent-primary/20 text-accent-primary text-xs font-mono">
                    {position.department}
                  </span>
                </div>

                <p class="text-text-secondary text-sm mb-3">{position.description}</p>

                <div class="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  <span class="flex items-center gap-1">
                    <MapPin size={14} />
                    {position.location}
                  </span>
                  <span class="flex items-center gap-1">
                    <Clock size={14} />
                    {position.type}
                  </span>
                  <span class="flex items-center gap-1 text-accent-primary">
                    <DollarSign size={14} />
                    {position.salary}
                  </span>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="hidden md:flex flex-wrap gap-2">
                  {#each position.requirements as req}
                    <span class="px-2 py-1 rounded bg-bg-secondary text-text-muted text-xs">
                      {req}
                    </span>
                  {/each}
                </div>
                <button class="btn-primary py-2 px-4 flex items-center gap-2 whitespace-nowrap">
                  Apply <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- CTA -->
    <div
      class="text-center glass-card p-12 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 1s"
    >
      <Rocket class="text-accent-primary mx-auto mb-6" size={48} />
      <h2 class="font-heading text-2xl font-bold text-text-primary mb-4">
        Don't See Your Role?
      </h2>
      <p class="text-text-secondary mb-8 max-w-xl mx-auto">
        We're always looking for exceptional people. If you think you'd be a great fit but don't see a matching role, reach out anyway. Worst case, we keep you in mind for the future.
      </p>
      <a href="/contact" class="btn-secondary inline-flex items-center gap-2">
        Send Us a Note <ArrowRight size={16} />
      </a>
    </div>
  </div>
</main>

<Footer />
