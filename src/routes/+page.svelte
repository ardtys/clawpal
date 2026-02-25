<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ChatDemo from '$lib/components/ChatDemo.svelte';
  import Features from '$lib/components/Features.svelte';
  import HowItWorks from '$lib/components/HowItWorks.svelte';
  import Testimonials from '$lib/components/Testimonials.svelte';
  import Pricing from '$lib/components/Pricing.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import Waitlist from '$lib/components/Waitlist.svelte';
  import Footer from '$lib/components/Footer.svelte';

  // New conversion-focused components
  import LiveActivityFeed from '$lib/components/LiveActivityFeed.svelte';
  import SecuritySection from '$lib/components/SecuritySection.svelte';
  import ROICalculator from '$lib/components/ROICalculator.svelte';
  import ComparisonTable from '$lib/components/ComparisonTable.svelte';
  import ExitIntentPopup from '$lib/components/ExitIntentPopup.svelte';
  import ContractAddress from '$lib/components/ContractAddress.svelte';

  // Real-time interactive components
  import LivePriceTicker from '$lib/components/LivePriceTicker.svelte';
  import SwapCalculator from '$lib/components/SwapCalculator.svelte';
  import WalletLookup from '$lib/components/WalletLookup.svelte';
</script>

<svelte:head>
  <title>Pal Claw – Talk to Your Crypto Wallet | AI-Powered Assistant</title>
  <meta name="description" content="Swap, send, and manage your crypto by just typing what you want. Pal Claw is your AI-powered crypto assistant with natural language commands." />
  <meta name="keywords" content="crypto wallet, AI assistant, Solana, DeFi, swap tokens, natural language crypto" />
  <meta property="og:title" content="Pal Claw – Talk to Your Crypto Wallet" />
  <meta property="og:description" content="Your AI-powered crypto bestie. Swap, send, and manage crypto with natural language." />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- Live Activity Notifications -->
<LiveActivityFeed />

<!-- Exit Intent Popup -->
<ExitIntentPopup />

<Navbar />

<!-- Live Price Ticker -->
<LivePriceTicker />

<main>
  <!-- Hero Section -->
  <Hero />

  <!-- Contract Address -->
  <ContractAddress />

  <!-- Interactive Demo -->
  <ChatDemo />

  <!-- Live Swap Calculator -->
  <SwapCalculator />

  <!-- Wallet Lookup -->
  <WalletLookup />

  <!-- Features Overview -->
  <Features />

  <!-- ROI Calculator (NEW) -->
  <ROICalculator />

  <!-- How It Works -->
  <HowItWorks />

  <!-- Comparison Table (NEW) -->
  <ComparisonTable />

  <!-- Social Proof / Testimonials -->
  <Testimonials />

  <!-- Security Section (NEW) -->
  <SecuritySection />


  <!-- Pricing -->
  <Pricing />

  <!-- FAQ -->
  <FAQ />

  <!-- Waitlist with Counter -->
  <Waitlist />
</main>

<Footer />
