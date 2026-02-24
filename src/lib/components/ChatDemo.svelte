<script lang="ts">
  import { RotateCcw, Sparkles, Check, MessageCircle, Zap, ArrowRightLeft, Wallet, TrendingUp } from 'lucide-svelte';
  import { onMount } from 'svelte';

  // Import sub-components
  import {
    BalanceCard,
    SwapCard,
    PriceCard,
    PortfolioCard,
    HistoryCard,
    StakeCard,
    GasCard,
    NFTCard,
    ConfirmCard,
    ChatInput,
    SuggestionSidebar
  } from './chat';

  // Import data and utilities
  import { type MessageType, getResponse, welcomeMessage } from '$lib/data/mockData';
  import { createVisibilityObserver, getCurrentTime, copyToClipboard, delay, scrollToBottom, generateId } from '$lib/utils';
  import { CHAT_CONFIG, DEMO_STATS } from '$lib/constants';

  interface Message {
    id: number;
    role: 'user' | 'bot';
    text: string;
    type?: MessageType;
    meta?: string;
    data?: unknown;
    timestamp?: string;
  }

  let messages = $state<Message[]>([]);
  let input = $state('');
  let isThinking = $state(false);
  let chatEl: HTMLDivElement;
  let visible = $state(false);
  let copiedTx = $state(false);
  let hasInteracted = $state(false);
  let showIdleHint = $state(false);
  let idleTimer: ReturnType<typeof setTimeout>;

  // Quick actions shown above input
  const quickActions = [
    { text: "What's my balance?", icon: Wallet, color: 'accent-primary' },
    { text: "Swap 10 SOL to USDC", icon: ArrowRightLeft, color: 'accent-secondary' },
    { text: "SOL price?", icon: TrendingUp, color: 'accent-warning' }
  ];

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    showIdleHint = false;
    if (!hasInteracted) {
      idleTimer = setTimeout(() => {
        showIdleHint = true;
      }, 5000);
    }
  }

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg) return;

    hasInteracted = true;
    showIdleHint = false;
    clearTimeout(idleTimer);
    input = '';
    const timestamp = getCurrentTime();

    messages = [...messages, { id: generateId(), role: 'user', text: msg, timestamp }];
    scrollToBottom(chatEl);

    isThinking = true;
    const thinkingTime = CHAT_CONFIG.THINKING_MIN_MS + Math.random() * CHAT_CONFIG.THINKING_RANDOM_MS;
    await delay(thinkingTime);
    isThinking = false;

    const { response, type, meta, data } = getResponse(msg);
    messages = [...messages, { id: generateId(), role: 'bot', text: response, type, meta, data, timestamp: getCurrentTime() }];
    scrollToBottom(chatEl);
  }

  function reset() {
    messages = [];
    hasInteracted = false;
    showIdleHint = false;
    resetIdleTimer();
    setTimeout(() => {
      messages = [{
        ...welcomeMessage,
        timestamp: getCurrentTime()
      }];
    }, 100);
  }

  async function handleCopyToClipboard(text: string) {
    const success = await copyToClipboard(text);
    if (success) {
      copiedTx = true;
      setTimeout(() => copiedTx = false, CHAT_CONFIG.COPY_FEEDBACK_MS);
    }
  }

  function handleInputChange(value: string) {
    input = value;
  }

  function handleSuggestionClick(text: string) {
    sendMessage(text);
  }

  onMount(() => {
    messages = [{
      ...welcomeMessage,
      timestamp: getCurrentTime()
    }];

    // Start idle timer
    resetIdleTimer();

    const cleanup = createVisibilityObserver('demo', (isVisible) => {
      visible = isVisible;
      if (isVisible && !hasInteracted) {
        resetIdleTimer();
      }
    });

    return () => {
      cleanup();
      clearTimeout(idleTimer);
    };
  });
</script>

<section id="demo" class="py-24 relative overflow-hidden">
  <!-- Background decorations -->
  <div class="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-[150px]"></div>
  <div class="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px]"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

    <!-- Section intro -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <div
        class="opacity-0"
        class:animate-fade-in-up={visible}
      >
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6 animate-pulse">
          <MessageCircle size={16} class="text-accent-primary" />
          <span class="text-accent-primary text-sm font-medium">Try It Now - It's Free!</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Go Ahead, <span class="gradient-text">Try It</span>
        </h2>
        <p class="text-text-secondary text-lg mb-6">
          Type naturally, like you're chatting with a friend. No sign-up needed.
          Just start typing and see the magic happen.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border rounded-full text-sm text-text-muted">
            <Zap size={14} class="text-accent-warning" />
            Instant responses
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border rounded-full text-sm text-text-muted">
            <Check size={14} class="text-accent-primary" />
            No account needed
          </span>
          <span class="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border rounded-full text-sm text-text-muted">
            <Sparkles size={14} class="text-accent-secondary" />
            Real AI responses
          </span>
        </div>
      </div>
    </div>

    <!-- Stats bar -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.1s"
    >
      {#each DEMO_STATS as stat}
        <div class="bg-bg-card/50 border border-border rounded-xl p-4 text-center">
          <p class="text-2xl font-bold text-accent-primary">{stat.value}</p>
          <p class="text-text-muted text-sm">{stat.label}</p>
        </div>
      {/each}
    </div>

    <!-- Chat container -->
    <div
      class="grid lg:grid-cols-12 gap-8 opacity-0"
      class:animate-fade-in-up={visible}
      style="animation-delay: 0.2s"
    >

      <!-- Main chat window -->
      <div class="lg:col-span-8">
        <div class="relative">
          <!-- Glow behind chat -->
          <div class="absolute -inset-2 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-3xl blur-xl opacity-60"></div>

          <div class="relative bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-border bg-bg-secondary/30">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <img
                    src="/clawpal-logo.png"
                    alt="ClawPal"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-primary rounded-full border-2 border-bg-card"></div>
                </div>
                <div>
                  <p class="text-text-primary font-semibold">ClawPal Assistant</p>
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 bg-accent-primary rounded-full animate-pulse"></div>
                    <p class="text-text-muted text-xs">Online</p>
                    <span class="text-text-muted text-xs">•</span>
                    <p class="text-text-muted text-xs">Demo Mode</p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-secondary rounded-lg">
                  <div class="w-2 h-2 bg-accent-primary rounded-full"></div>
                  <span class="text-text-secondary text-xs">Solana</span>
                </div>
                <div class="px-2 py-1 bg-accent-warning/10 border border-accent-warning/20 rounded-md">
                  <span class="text-accent-warning text-xs font-mono">devnet</span>
                </div>
                <button onclick={reset} class="p-2 text-text-muted hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-all" title="Reset chat">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>

            <!-- Messages -->
            <div bind:this={chatEl} class="h-[500px] overflow-y-auto p-5 space-y-4">
              {#each messages as msg (msg.id)}
                <div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up">
                  <div class="max-w-[90%]">
                    <!-- Text message -->
                    <div class="{msg.role === 'user'
                      ? 'bg-accent-primary text-bg-primary'
                      : 'bg-bg-secondary text-text-primary'} px-4 py-3 rounded-2xl {msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'}">
                      <p class="text-sm">{msg.text}</p>
                    </div>

                    <!-- Render appropriate card based on message type -->
                    {#if msg.type === 'balance' && msg.data}
                      <BalanceCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'swap' && msg.data}
                      <SwapCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'price' && msg.data}
                      <PriceCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'portfolio' && msg.data}
                      <PortfolioCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'history' && msg.data}
                      <HistoryCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'stake' && msg.data}
                      <StakeCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'gas' && msg.data}
                      <GasCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'nft' && msg.data}
                      <NFTCard data={msg.data as any} />
                    {/if}

                    {#if msg.type === 'confirm' && msg.data}
                      <ConfirmCard data={msg.data as any} />
                    {/if}

                    <!-- Meta info -->
                    {#if msg.meta}
                      <p class="text-xs text-text-muted mt-2 flex items-center gap-1">
                        <Check size={12} class="text-accent-primary" />
                        {msg.meta}
                      </p>
                    {/if}

                    <!-- Timestamp -->
                    {#if msg.timestamp}
                      <p class="text-xs text-text-muted mt-1 {msg.role === 'user' ? 'text-right' : ''}">{msg.timestamp}</p>
                    {/if}
                  </div>
                </div>
              {/each}

              {#if isThinking}
                <div class="flex justify-start animate-fade-in-up">
                  <div class="bg-bg-secondary px-4 py-3 rounded-2xl rounded-bl-md">
                    <div class="flex items-center gap-2">
                      <div class="flex gap-1">
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                        <span class="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                      </div>
                      <span class="text-text-muted text-xs ml-2">Analyzing your request...</span>
                    </div>
                  </div>
                </div>
              {/if}
            </div>

            <!-- Quick actions (shown when no interaction yet) -->
            {#if !hasInteracted && messages.length <= 1}
              <div class="px-4 py-3 border-t border-border bg-bg-secondary/30">
                <p class="text-text-muted text-xs mb-2 text-center">Quick start - click to try:</p>
                <div class="flex flex-wrap gap-2 justify-center">
                  {#each quickActions as action}
                    <button
                      onclick={() => sendMessage(action.text)}
                      class="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border rounded-full text-sm text-text-secondary hover:border-accent-primary hover:text-accent-primary transition-all group"
                    >
                      <action.icon size={14} class="text-text-muted group-hover:text-accent-primary transition-colors" />
                      {action.text}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Idle hint animation -->
            {#if showIdleHint && !hasInteracted}
              <div class="px-4 py-2 bg-accent-primary/5 border-t border-accent-primary/20 animate-fade-in-up">
                <p class="text-accent-primary text-sm text-center flex items-center justify-center gap-2">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-primary"></span>
                  </span>
                  Try typing something or click a suggestion above!
                </p>
              </div>
            {/if}

            <!-- Input -->
            <ChatInput
              value={input}
              disabled={isThinking}
              onsubmit={sendMessage}
              onchange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <SuggestionSidebar
        {visible}
        onSuggestionClick={handleSuggestionClick}
      />

    </div>
  </div>
</section>
