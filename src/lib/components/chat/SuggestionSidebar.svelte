<script lang="ts">
  import {
    Sparkles, Wallet, ArrowRightLeft, PieChart, TrendingUp,
    History, Coins, Zap, Image, ChevronRight, AlertCircle,
    Shield, RefreshCw, Globe
  } from 'lucide-svelte';
  import { CHAT_SUGGESTIONS, DEMO_FEATURES } from '$lib/constants';

  interface Props {
    visible: boolean;
    onSuggestionClick: (text: string) => void;
  }

  let { visible, onSuggestionClick }: Props = $props();

  const iconMap: Record<string, typeof Wallet> = {
    'Wallet': Wallet,
    'Trade': ArrowRightLeft,
    'Analytics': PieChart,
    'Market': TrendingUp,
    'Activity': History,
    'DeFi': Coins,
    'Network': Zap,
    'NFTs': Image
  };

  const featureIconMap: Record<string, typeof Zap> = {
    'Instant execution': Zap,
    'Non-custodial': Shield,
    'Real-time prices': RefreshCw,
    'Multi-chain ready': Globe
  };
</script>

<div class="lg:col-span-4 space-y-6">
  <!-- Quick suggestions -->
  <div
    class="opacity-0"
    class:animate-slide-in-right={visible}
    style="animation-delay: 0.4s"
  >
    <p class="text-text-primary font-semibold mb-4 flex items-center gap-2">
      <Sparkles size={16} class="text-accent-secondary" />
      Try These Commands
    </p>
    <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {#each CHAT_SUGGESTIONS as suggestion}
        {@const IconComponent = iconMap[suggestion.category] || Wallet}
        <button
          onclick={() => onSuggestionClick(suggestion.text)}
          class="w-full flex items-center gap-3 px-4 py-3 bg-bg-card border border-border rounded-xl text-left hover:border-accent-primary/50 hover:bg-accent-primary/5 transition-all duration-300 group"
        >
          <div class="w-9 h-9 rounded-lg bg-bg-secondary flex items-center justify-center group-hover:bg-accent-primary/10 transition-colors flex-shrink-0">
            <IconComponent size={16} class="text-text-muted group-hover:text-accent-primary transition-colors" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-text-secondary text-sm truncate group-hover:text-accent-primary transition-colors">"{suggestion.text}"</p>
            <p class="text-text-muted text-xs">{suggestion.category}</p>
          </div>
          <ChevronRight size={16} class="text-text-muted group-hover:text-accent-primary transition-colors flex-shrink-0" />
        </button>
      {/each}
    </div>
  </div>

  <!-- Features list -->
  <div
    class="bg-bg-card border border-border rounded-xl p-5 opacity-0"
    class:animate-slide-in-right={visible}
    style="animation-delay: 0.6s"
  >
    <p class="text-text-primary font-semibold mb-4">Powered By</p>
    <div class="grid grid-cols-2 gap-3">
      {#each DEMO_FEATURES as feature}
        {@const FeatureIcon = featureIconMap[feature.text] || Zap}
        <div class="flex items-center gap-2 p-2 bg-bg-secondary/50 rounded-lg">
          <FeatureIcon size={14} class="text-accent-primary" />
          <span class="text-text-secondary text-xs">{feature.text}</span>
        </div>
      {/each}
    </div>
  </div>

  <!-- Demo notice -->
  <div
    class="bg-accent-warning/5 border border-accent-warning/20 rounded-xl p-4 opacity-0"
    class:animate-slide-in-right={visible}
    style="animation-delay: 0.8s"
  >
    <div class="flex items-start gap-3">
      <AlertCircle size={18} class="text-accent-warning flex-shrink-0 mt-0.5" />
      <div>
        <p class="text-text-primary text-sm font-medium mb-1">Demo Mode</p>
        <p class="text-text-muted text-xs leading-relaxed">
          This is a simulation with sample data. No real transactions are executed.
          Join the waitlist to access the full version with real blockchain interactions.
        </p>
        <a href="/#waitlist" class="inline-flex items-center gap-1 text-accent-warning text-xs font-medium mt-2 hover:underline">
          Join Waitlist
          <ChevronRight size={12} />
        </a>
      </div>
    </div>
  </div>
</div>
