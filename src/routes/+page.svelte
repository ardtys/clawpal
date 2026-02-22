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
</script>

<svelte:head>
  <title>clawpal – talk to your crypto wallet</title>
  <meta name="description" content="swap, send, and manage your crypto by just typing what you want. your AI-powered crypto assistant." />
</svelte:head>

<Navbar />

<main>
  <Hero />
  <ChatDemo />
  <Features />
  <HowItWorks />
  <Testimonials />
  <Pricing />
  <FAQ />
  <Waitlist />
</main>

<Footer />
