<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { FileText } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const sections = [
    {
      title: 'The Quick Version',
      content: `Before the legal stuff, here's what you need to know:

• ClawPal is a tool to interact with blockchains. We don't control the blockchains.
• Crypto is risky. You could lose money. That's on you, not us.
• Don't use ClawPal for illegal stuff. Seriously.
• We can update these terms and the service at any time.
• Your keys, your crypto, your responsibility.

By using ClawPal, you agree to these terms. If you don't agree, don't use the service.`
    },
    {
      title: '1. What ClawPal Is',
      content: `ClawPal is a natural language interface for interacting with blockchain networks (currently Solana and Base). We help you:

• Check balances and portfolio values
• Execute token swaps through DEX aggregation
• Send tokens to other addresses
• Get information about tokens and markets

We are NOT:
• A financial advisor
• A custodian of your assets
• An exchange or broker
• Responsible for blockchain network issues

We provide the interface. You make the decisions.`
    },
    {
      title: '2. Eligibility',
      content: `To use ClawPal, you must:

• Be at least 18 years old (or legal adult age in your jurisdiction)
• Not be on any sanctions lists or located in a sanctioned country
• Have the legal capacity to enter into these terms
• Not have been previously banned from the service

By using ClawPal, you represent and warrant all of the above. If any of these become untrue, you must stop using the service immediately.`
    },
    {
      title: '3. Your Responsibilities',
      content: `When using ClawPal, you agree to:

• **Keep your wallet secure**: We never touch your keys, so your wallet security is 100% on you.
• **Verify before signing**: Always check transaction details before signing. Once it's on-chain, it's done.
• **Understand the risks**: Crypto is volatile. Transactions are irreversible. Smart contracts can have bugs.
• **Comply with laws**: You're responsible for knowing and following the laws in your jurisdiction.
• **Not abuse the service**: No bots, scraping, or anything that could harm the service or other users.

If you mess up, that's on you. We're not your mom.`
    },
    {
      title: '4. No Financial Advice',
      content: `Let's be crystal clear:

**CLAWPAL DOES NOT PROVIDE FINANCIAL, INVESTMENT, TAX, OR LEGAL ADVICE.**

Any information provided through ClawPal is for informational purposes only. It should not be construed as financial advice or a recommendation to buy, sell, or hold any asset.

Do your own research. Consult professionals. We're just a chat interface, not your financial advisor.`
    },
    {
      title: '5. Service Availability',
      content: `We do our best to keep ClawPal running smoothly, but:

• We don't guarantee 100% uptime
• We may need to take the service down for maintenance
• Third-party services (blockchain networks, RPCs) may have issues
• Features may change without notice

We're not liable for any losses due to service unavailability or changes.`
    },
    {
      title: '6. Fees',
      content: `ClawPal subscription tiers have associated fees as shown on our pricing page. Additionally:

• **Blockchain fees**: Network gas/transaction fees are paid by you, not us
• **DEX fees**: Swaps may have fees from the underlying protocols
• **No hidden fees**: What you see is what you pay

We may update pricing with notice. If you don't agree with new pricing, cancel your subscription.`
    },
    {
      title: '7. Limitation of Liability',
      content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:

• ClawPal is provided "as is" without warranties of any kind
• We are not liable for any indirect, incidental, or consequential damages
• Our total liability is limited to the amount you paid us in the last 12 months
• We are not responsible for losses due to user error, market conditions, or blockchain issues

This isn't us being shady - it's standard for software services, especially in crypto.`
    },
    {
      title: '8. Indemnification',
      content: `You agree to indemnify and hold harmless ClawPal, its team, and affiliates from any claims, damages, or expenses arising from:

• Your use of the service
• Your violation of these terms
• Your violation of any third-party rights
• Any transactions you execute through the service

Basically, if you cause problems, you deal with them.`
    },
    {
      title: '9. Termination',
      content: `Either of us can end this relationship:

**You can**: Delete your account at any time. Your data will be removed per our privacy policy.

**We can**: Suspend or terminate your access if you violate these terms, abuse the service, or for any other reason at our discretion.

Upon termination, these terms survive to the extent necessary (liability, indemnification, etc.).`
    },
    {
      title: '10. Changes to Terms',
      content: `We may update these terms from time to time:

• We'll post updated terms on this page
• Material changes will be communicated via email or in-app notice
• Continued use after changes means you accept them
• If you disagree with changes, stop using the service

Check back occasionally or wait for our notifications.`
    },
    {
      title: '11. Governing Law',
      content: `These terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles.

Any disputes will be resolved through binding arbitration, not courts. Class actions are waived.

This is standard stuff - we'd rather work things out than lawyer up.`
    },
    {
      title: '12. Contact',
      content: `Questions about these terms? Reach out:

• Email: legal@clawpal.io
• Contact page: clawpal.io/contact

We'll do our best to respond within a reasonable timeframe.`
    }
  ];
</script>

<svelte:head>
  <title>Terms of Service | ClawPal</title>
  <meta name="description" content="ClawPal Terms of Service. The rules of engagement for using our service. Written as clearly as legal stuff allows." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 grid-pattern opacity-30"></div>

  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <!-- Header -->
    <div
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="w-16 h-16 rounded-2xl bg-accent-secondary/20 text-accent-secondary flex items-center justify-center mx-auto mb-6">
        <FileText size={32} />
      </div>
      <h1 class="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">Terms of Service</h1>
      <p class="text-text-secondary">Last updated: February 2025</p>
    </div>

    <!-- Content -->
    <div class="space-y-8">
      {#each sections as section, i}
        <section
          class="glass-card p-8 opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: {0.05 + i * 0.03}s"
        >
          <h2 class="font-heading text-xl font-bold text-text-primary mb-4">{section.title}</h2>
          <div class="prose prose-invert max-w-none">
            <p class="text-text-secondary whitespace-pre-line leading-relaxed">{section.content}</p>
          </div>
        </section>
      {/each}
    </div>

    <!-- Acknowledgment -->
    <div
      class="mt-12 glass-card p-8 text-center border-accent-warning/50 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.4s"
    >
      <h3 class="font-heading font-semibold text-text-primary mb-2">By Using ClawPal, You Agree to These Terms</h3>
      <p class="text-text-secondary text-sm">
        If you don't agree, please don't use the service. Questions? Hit up{' '}
        <a href="mailto:legal@clawpal.io" class="text-accent-primary hover:underline">legal@clawpal.io</a>
      </p>
    </div>
  </div>
</main>

<Footer />
