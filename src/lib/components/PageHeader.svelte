<script lang="ts">
  import type { Component } from 'svelte';

  interface Props {
    badge: string;
    badgeColor?: 'primary' | 'secondary' | 'warning';
    title: string;
    highlight?: string;
    description: string;
  }

  let { badge, badgeColor = 'primary', title, highlight, description }: Props = $props();

  const colorClasses = {
    primary: 'bg-accent-primary/20 text-accent-primary',
    secondary: 'bg-accent-secondary/20 text-accent-secondary',
    warning: 'bg-accent-warning/20 text-accent-warning'
  };
</script>

<div class="text-center mb-16 pt-24">
  <span class="inline-block px-4 py-1 rounded-full {colorClasses[badgeColor]} text-sm font-mono mb-4">
    {badge}
  </span>
  <h1 class="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6">
    {title}
    {#if highlight}
      <span class="gradient-text">{highlight}</span>
    {/if}
  </h1>
  <p class="text-text-secondary text-lg sm:text-xl max-w-3xl mx-auto">
    {description}
  </p>
</div>
