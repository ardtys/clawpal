<script lang="ts">
  import { onMount } from 'svelte';
  import { CheckCircle, UserPlus, ArrowRightLeft, TrendingUp } from 'lucide-svelte';

  interface Activity {
    id: number;
    type: 'join' | 'swap' | 'milestone';
    message: string;
    time: string;
    icon: typeof CheckCircle;
  }

  let activities = $state<Activity[]>([]);
  let currentActivity = $state<Activity | null>(null);
  let showNotification = $state(false);

  const names = [
    'Alex', 'Sarah', 'Mike', 'Emma', 'David', 'Lisa', 'James', 'Anna',
    'Chris', 'Maria', 'Tom', 'Julia', 'Kevin', 'Nina', 'Ryan', 'Sophie'
  ];

  const locations = [
    'Singapore', 'Tokyo', 'London', 'New York', 'Dubai', 'Sydney',
    'Berlin', 'Paris', 'Seoul', 'Toronto', 'Mumbai', 'Jakarta'
  ];

  const swapPairs = [
    { from: 'SOL', to: 'USDC', amount: '25' },
    { from: 'ETH', to: 'SOL', amount: '2' },
    { from: 'USDC', to: 'JUP', amount: '500' },
    { from: 'SOL', to: 'BONK', amount: '10' },
    { from: 'USDT', to: 'SOL', amount: '1000' },
  ];

  function generateActivity(): Activity {
    const random = Math.random();

    if (random < 0.6) {
      // Join activity (60%)
      const name = names[Math.floor(Math.random() * names.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      return {
        id: Date.now(),
        type: 'join',
        message: `${name} from ${location} just joined the waitlist`,
        time: 'Just now',
        icon: UserPlus
      };
    } else if (random < 0.9) {
      // Swap activity (30%)
      const swap = swapPairs[Math.floor(Math.random() * swapPairs.length)];
      return {
        id: Date.now(),
        type: 'swap',
        message: `Someone swapped ${swap.amount} ${swap.from} → ${swap.to}`,
        time: 'Just now',
        icon: ArrowRightLeft
      };
    } else {
      // Milestone activity (10%)
      const milestones = [
        '10,000+ users on waitlist!',
        '$50M+ volume routed this week',
        'New DEX integration added',
        '99.99% uptime this month'
      ];
      return {
        id: Date.now(),
        type: 'milestone',
        message: milestones[Math.floor(Math.random() * milestones.length)],
        time: 'Just now',
        icon: TrendingUp
      };
    }
  }

  function showActivity(activity: Activity) {
    currentActivity = activity;
    showNotification = true;

    setTimeout(() => {
      showNotification = false;
    }, 4000);
  }

  onMount(() => {
    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showActivity(generateActivity());
    }, 5000);

    // Then show new notifications every 15-30 seconds
    const interval = setInterval(() => {
      const delay = 15000 + Math.random() * 15000;
      setTimeout(() => {
        showActivity(generateActivity());
      }, delay);
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  });
</script>

<!-- Toast notification -->
{#if showNotification && currentActivity}
  <div
    class="fixed bottom-6 left-6 z-50 animate-slide-in-left"
    role="status"
    aria-live="polite"
  >
    <div class="flex items-center gap-3 px-4 py-3 bg-bg-card border border-border rounded-xl shadow-2xl max-w-sm">
      <!-- Icon -->
      <div class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        {currentActivity.type === 'join' ? 'bg-accent-primary/20 text-accent-primary' :
         currentActivity.type === 'swap' ? 'bg-accent-secondary/20 text-accent-secondary' :
         'bg-accent-warning/20 text-accent-warning'}">
        <currentActivity.icon size={20} />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="text-text-primary text-sm font-medium truncate">
          {currentActivity.message}
        </p>
        <p class="text-text-muted text-xs">{currentActivity.time}</p>
      </div>

      <!-- Live indicator -->
      <div class="flex-shrink-0 flex items-center gap-1.5">
        <div class="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></div>
        <span class="text-text-muted text-xs">Live</span>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.4s ease-out forwards;
  }
</style>
