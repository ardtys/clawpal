<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { Shield } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });

  const sections = [
    {
      title: 'The TL;DR',
      content: `Look, we know nobody reads these things. So here's the deal in plain English:

• We don't have access to your private keys. Ever. Period.
• We collect basic usage data to make the product better.
• We don't sell your data to anyone. That's wack.
• You can delete your account and all associated data anytime.

That's basically it. The rest below is the lawyer-approved version for those who want the full details.`
    },
    {
      title: 'What We Collect',
      content: `When you use ClawPal, we collect:

**Account Information**: Your email address when you sign up. That's how we reach you.

**Wallet Addresses**: The public wallet addresses you connect. These are public on-chain anyway, but we store them to show you your stuff.

**Usage Data**: What features you use, how often, error logs. This helps us fix bugs and make things better.

**Chat History**: Your conversations with ClawPal. This is encrypted and used to improve our AI. You can delete this anytime.

**Device Information**: Basic stuff like browser type, device type, IP address. Standard web stuff.

We do NOT collect:
• Private keys (we literally can't)
• Passwords (we use wallet-based auth)
• Your transaction contents beyond what's needed to execute your request`
    },
    {
      title: 'How We Use Your Data',
      content: `We use your data to:

• **Provide the service**: Show your balances, execute transactions, etc.
• **Improve our AI**: Your chat data helps us understand natural language better.
• **Fix bugs**: Error logs help us squash issues fast.
• **Send important updates**: Account stuff, security alerts, big announcements.
• **Analytics**: Understand how people use ClawPal so we can make it better.

We don't use your data to:
• Sell to advertisers
• Make trading decisions against you
• Share with third parties for marketing
• Anything sketchy`
    },
    {
      title: 'Data Security',
      content: `We take security seriously because we know what's at stake:

• **Encryption**: All data is encrypted at rest and in transit.
• **Non-custodial**: We never have access to your private keys. Transactions require your wallet signature.
• **Access Controls**: Only essential team members can access production data, with audit logs.
• **Regular Audits**: We do security audits and pen testing regularly.
• **Bug Bounty**: We have a bug bounty program for responsible disclosure.

If we ever have a security incident (knock on wood), we'll notify affected users within 72 hours.`
    },
    {
      title: 'Third-Party Services',
      content: `We use some third-party services to run ClawPal:

• **Cloud Infrastructure**: AWS/GCP for hosting
• **Analytics**: Privacy-focused analytics (no Google Analytics)
• **RPC Providers**: For blockchain data (Helius, Alchemy, etc.)
• **Email**: For transactional emails

These providers are vetted and have their own privacy policies. We don't share more data with them than necessary.`
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• **Access**: Request a copy of all data we have on you
• **Delete**: Request deletion of your account and all data
• **Correct**: Fix any inaccurate information
• **Export**: Get your data in a portable format
• **Opt-out**: Unsubscribe from marketing emails (but not security alerts)

To exercise these rights, hit us up at privacy@clawpal.io or through our contact page.`
    },
    {
      title: 'Cookies',
      content: `We use cookies for:

• **Essential**: Keeping you logged in, remembering your preferences
• **Analytics**: Understanding how you use the site (aggregate, anonymous)

We don't use tracking cookies for advertising. We're not trying to follow you around the internet.`
    },
    {
      title: 'Updates to This Policy',
      content: `We might update this policy as we add features or laws change. When we do:

• We'll post the new version here with a date
• If it's a major change, we'll email you
• Your continued use = acceptance of the new policy

Check back occasionally if you're into that sort of thing.`
    }
  ];
</script>

<svelte:head>
  <title>Privacy Policy | ClawPal</title>
  <meta name="description" content="ClawPal Privacy Policy. How we handle your data, what we collect, and your rights. Written in plain English." />
</svelte:head>

<Navbar />

<main class="relative z-10 min-h-screen">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>

  <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <!-- Header -->
    <div
      class="text-center mb-16 opacity-0"
      class:animate-fade-in-up={visible}
    >
      <div class="w-16 h-16 rounded-2xl bg-accent-primary/20 text-accent-primary flex items-center justify-center mx-auto mb-6">
        <Shield size={32} />
      </div>
      <h1 class="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">Privacy Policy</h1>
      <p class="text-text-secondary">Last updated: February 2025</p>
    </div>

    <!-- Content -->
    <div class="space-y-12">
      {#each sections as section, i}
        <section
          class="glass-card p-8 opacity-0"
          class:animate-fade-in-up={visible}
          style="animation-delay: {0.1 + i * 0.05}s"
        >
          <h2 class="font-heading text-xl font-bold text-text-primary mb-4">{section.title}</h2>
          <div class="prose prose-invert max-w-none">
            <p class="text-text-secondary whitespace-pre-line leading-relaxed">{section.content}</p>
          </div>
        </section>
      {/each}
    </div>

    <!-- Contact -->
    <div
      class="mt-12 glass-card p-8 text-center opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.5s"
    >
      <h3 class="font-heading font-semibold text-text-primary mb-2">Questions?</h3>
      <p class="text-text-secondary text-sm mb-4">
        If you have any questions about this policy, hit us up at{' '}
        <a href="mailto:privacy@clawpal.io" class="text-accent-primary hover:underline">privacy@clawpal.io</a>
      </p>
    </div>
  </div>
</main>

<Footer />
