<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { CheckCircle, AlertCircle, Clock, Activity, Server, Globe, Zap, Database } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const services = [
    { name: 'Chat API', status: 'operational', latency: '45ms', icon: Activity },
    { name: 'Solana RPC', status: 'operational', latency: '120ms', icon: Server },
    { name: 'Base RPC', status: 'operational', latency: '89ms', icon: Server },
    { name: 'Swap Engine', status: 'operational', latency: '200ms', icon: Zap },
    { name: 'Price Feed', status: 'operational', latency: '30ms', icon: Database },
    { name: 'Website', status: 'operational', latency: '25ms', icon: Globe }
  ];

  const incidents = [
    {
      date: 'Feb 20, 2025',
      title: 'Elevated Latency on Solana RPC',
      status: 'resolved',
      description: 'Some users experienced slower response times due to Solana network congestion. We spun up additional RPC nodes and things are back to normal.',
      duration: '45 minutes'
    },
    {
      date: 'Feb 15, 2025',
      title: 'Scheduled Maintenance',
      status: 'completed',
      description: 'Performed scheduled maintenance to upgrade our infrastructure. No user impact during the maintenance window.',
      duration: '2 hours'
    },
    {
      date: 'Feb 8, 2025',
      title: 'Brief API Outage',
      status: 'resolved',
      description: 'The chat API was briefly unavailable due to a deployment issue. Rolled back immediately. Sorry for any inconvenience.',
      duration: '12 minutes'
    }
  ];

  const uptimeData = [
    { month: 'Jan', uptime: 99.95 },
    { month: 'Feb', uptime: 99.92 },
    { month: 'Mar', uptime: 99.99 },
    { month: 'Apr', uptime: 99.97 },
    { month: 'May', uptime: 99.98 },
    { month: 'Jun', uptime: 99.96 }
  ];
</script>

<svelte:head>
  <title>Status | Pal Claw - System Status & Uptime</title>
  <meta name="description" content="Pal Claw system status. Check real-time availability of all services and historical uptime data." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>

  <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    <PageHeader
      badge="Status"
      badgeColor="primary"
      title="All Systems "
      highlight="Operational"
      description="Real-time status of all Pal Claw services. We aim for 99.9% uptime because your bags don't wait."
    />

    <!-- Overall Status -->
    <div
      class="glass-card p-6 mb-8 border-accent-primary/50 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
          <CheckCircle class="text-accent-primary" size={24} />
        </div>
        <div>
          <h2 class="font-heading font-semibold text-xl text-text-primary">All Systems Operational</h2>
          <p class="text-text-secondary text-sm">Last updated: Just now</p>
        </div>
        <div class="ml-auto text-right">
          <div class="font-heading text-2xl font-bold text-accent-primary">99.9%</div>
          <div class="text-text-muted text-sm">30-day uptime</div>
        </div>
      </div>
    </div>

    <!-- Services -->
    <section class="mb-12">
      <h2 class="font-heading text-xl font-bold text-text-primary mb-6">Services</h2>
      <div class="space-y-3">
        {#each services as service, i}
          <div
            class="glass-card p-4 flex items-center justify-between opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.1 + i * 0.05}s"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center text-text-muted">
                <service.icon size={20} />
              </div>
              <span class="font-medium text-text-primary">{service.name}</span>
            </div>
            <div class="flex items-center gap-6">
              <span class="text-text-muted text-sm font-mono">{service.latency}</span>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
                <span class="text-accent-primary text-sm font-medium capitalize">{service.status}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Uptime Chart -->
    <section class="mb-12">
      <h2 class="font-heading text-xl font-bold text-text-primary mb-6">Uptime History</h2>
      <div
        class="glass-card p-6 opacity-0"
        class:animate-fade-in-up={visible}
        style="animation-delay: 0.4s"
      >
        <div class="flex items-end justify-between gap-2 h-32 mb-4">
          {#each uptimeData as data}
            <div class="flex-1 flex flex-col items-center gap-2">
              <div
                class="w-full bg-accent-primary/80 rounded-t"
                style="height: {(data.uptime - 99) * 100}%"
              ></div>
              <span class="text-text-muted text-xs">{data.month}</span>
            </div>
          {/each}
        </div>
        <p class="text-text-secondary text-sm text-center">
          Historical uptime percentage over the last 6 months
        </p>
      </div>
    </section>

    <!-- Incidents -->
    <section>
      <h2 class="font-heading text-xl font-bold text-text-primary mb-6">Recent Incidents</h2>
      <div class="space-y-4">
        {#each incidents as incident, i}
          <div
            class="glass-card p-6 opacity-0"
            class:animate-fade-in-up={visible}
            style="animation-delay: {0.5 + i * 0.1}s"
          >
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="font-heading font-semibold text-text-primary">{incident.title}</h3>
                  <span class="px-2 py-0.5 rounded-full text-xs font-medium {
                    incident.status === 'resolved'
                      ? 'bg-accent-primary/20 text-accent-primary'
                      : 'bg-accent-warning/20 text-accent-warning'
                  }">
                    {incident.status}
                  </span>
                </div>
                <span class="text-text-muted text-sm">{incident.date}</span>
              </div>
              <span class="text-text-muted text-sm flex items-center gap-1">
                <Clock size={14} />
                {incident.duration}
              </span>
            </div>
            <p class="text-text-secondary text-sm">{incident.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Subscribe -->
    <div
      class="mt-12 glass-card p-6 text-center opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.8s"
    >
      <h3 class="font-heading font-semibold text-text-primary mb-2">Get Notified</h3>
      <p class="text-text-secondary text-sm mb-4">
        Subscribe to status updates and be the first to know when something's up.
      </p>
      <button class="btn-secondary text-sm">Subscribe to Updates</button>
    </div>
  </div>
</main>

<Footer />
