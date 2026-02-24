// Application constants

// Hero section animated counter targets
export const HERO_STATS = {
  VOLUME_TARGET: 47,        // $47M+ volume routed
  USERS_TARGET: 10,         // 10K+ active users
  VOLUME_INCREMENT_MS: 50,  // Animation speed for volume counter
  USERS_INCREMENT_MS: 100,  // Animation speed for users counter
  TYPING_SPEED_MS: 80,      // Typing animation speed
  CONFIRM_DELAY_MS: 1500    // Delay before showing confirm message
} as const;

// Chat demo configuration
export const CHAT_CONFIG = {
  THINKING_MIN_MS: 800,     // Minimum thinking delay
  THINKING_RANDOM_MS: 800,  // Additional random delay (0-800ms)
  SCROLL_DELAY_MS: 50,      // Delay before scrolling to bottom
  COPY_FEEDBACK_MS: 2000    // How long to show "copied" feedback
} as const;

// Waitlist form configuration
export const WAITLIST_CONFIG = {
  SUBMIT_DELAY_MS: 1200,    // Simulated API delay
  MIN_EMAIL_LENGTH: 5       // Minimum email length
} as const;

// Animation delays (in seconds, for CSS)
export const ANIMATION_DELAYS = {
  STATS_BAR: 0.1,
  CHAT_CONTAINER: 0.2,
  SUGGESTIONS: 0.4,
  FEATURES_LIST: 0.6,
  DEMO_NOTICE: 0.8
} as const;

// Demo chat suggestions
export const CHAT_SUGGESTIONS = [
  { text: "What's my balance?", category: 'Wallet' },
  { text: "Swap 10 SOL to USDC", category: 'Trade' },
  { text: "Show my portfolio", category: 'Analytics' },
  { text: "What's the price of SOL?", category: 'Market' },
  { text: "Show transaction history", category: 'Activity' },
  { text: "Staking options for SOL", category: 'DeFi' },
  { text: "Check gas fees", category: 'Network' },
  { text: "Show my NFTs", category: 'NFTs' }
] as const;

// Demo stats displayed in chat
export const DEMO_STATS = [
  { label: 'DEXs Integrated', value: '12+' },
  { label: 'Avg. Response', value: '< 1s' },
  { label: 'Tokens Supported', value: '1000+' },
  { label: 'Networks', value: '2' }
] as const;

// Feature highlights for demo sidebar
export const DEMO_FEATURES = [
  { text: "Instant execution" },
  { text: "Non-custodial" },
  { text: "Real-time prices" },
  { text: "Multi-chain ready" }
] as const;

// Integration partners shown in Hero
export const INTEGRATIONS = [
  { name: 'Jupiter', color: '#00D18C' },
  { name: 'Raydium', color: '#5AC4BE' },
  { name: 'Orca', color: '#FFD15C' },
  { name: 'Phantom', color: '#AB9FF2' }
] as const;
