// Mock data for ChatDemo component
// This file contains all the simulated responses for the demo chat interface

export type MessageType = 'text' | 'swap' | 'balance' | 'portfolio' | 'price' | 'confirm' | 'history' | 'stake' | 'nft' | 'gas';

export interface Token {
  symbol: string;
  name: string;
  amount: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
}

export interface SwapData {
  from: { symbol: string; amount: string; logo: string; name: string };
  to: { symbol: string; amount: string; logo: string; name: string };
  rate: string;
  slippage: string;
  fee: string;
  networkFee: string;
  route: string[];
  priceImpact: string;
  savings: string;
  minReceived: string;
  estimatedTime: string;
}

export interface PriceData {
  symbol: string;
  name: string;
  price: string;
  change1h: string;
  change24h: string;
  change7d: string;
  high24h: string;
  low24h: string;
  volume: string;
  marketCap: string;
  rank: string;
  ath: string;
  athDate: string;
  positive: boolean;
}

export interface PortfolioAllocation {
  token: string;
  percent: number;
  color: string;
  value: string;
}

export interface Transaction {
  type: 'Swap' | 'Send' | 'Receive';
  from?: string;
  to?: string;
  amount?: string;
  time: string;
  status: string;
  hash: string;
}

export interface StakeOption {
  validator: string;
  apy: string;
  minStake: string;
  lockup: string;
  recommended: boolean;
}

export interface NFT {
  name: string;
  collection: string;
  floor: string;
  rarity: string;
}

export interface ScenarioResponse {
  response: string;
  type?: MessageType;
  meta?: string;
  data?: unknown;
}

export const scenarios: Record<string, ScenarioResponse> = {
  'balance': {
    response: "Here's your current wallet balance:",
    type: 'balance',
    meta: 'Synced just now',
    data: {
      tokens: [
        { symbol: 'SOL', name: 'Solana', amount: '23.4521', value: '$3,978.42', change: '+4.2%', positive: true, icon: 'S' },
        { symbol: 'USDC', name: 'USD Coin', amount: '1,250.00', value: '$1,250.00', change: '0%', positive: true, icon: '$' },
        { symbol: 'JUP', name: 'Jupiter', amount: '500', value: '$425.00', change: '+12.3%', positive: true, icon: 'J' },
        { symbol: 'BONK', name: 'Bonk', amount: '2,500,000', value: '$62.50', change: '-2.1%', positive: false, icon: 'B' },
      ] as Token[],
      total: '$5,715.92',
      change24h: '+$342.18',
      changePercent: '+6.37%'
    }
  },
  'swap': {
    response: "Found the best route across 12 DEXs:",
    type: 'swap',
    meta: 'Route optimized via Jupiter',
    data: {
      from: { symbol: 'SOL', amount: '10', logo: 'S', name: 'Solana' },
      to: { symbol: 'USDC', amount: '1,687.23', logo: '$', name: 'USD Coin' },
      rate: '168.72',
      slippage: '0.5%',
      fee: '$0.003',
      networkFee: '0.000005 SOL',
      route: ['Jupiter', 'Raydium'],
      priceImpact: '0.02%',
      savings: '$2.34',
      minReceived: '1,678.79 USDC',
      estimatedTime: '~15 seconds'
    } as SwapData
  },
  'send': {
    response: "Ready to send. Please review the details:",
    type: 'confirm',
    meta: 'Recipient verified',
    data: {
      action: 'Send',
      amount: '5 SOL',
      value: '$850.00',
      to: '7xKp...3mNq',
      toFull: '7xKpV8mRjU9kLmNq4wE2dF5gH6jK8pL9',
      fee: '0.000005 SOL',
      feeUsd: '$0.0008',
      network: 'Solana Mainnet',
      estimatedTime: '~400ms'
    }
  },
  'price': {
    response: "Here's the latest market data for SOL:",
    type: 'price',
    data: {
      symbol: 'SOL',
      name: 'Solana',
      price: '$169.82',
      change1h: '+0.8%',
      change24h: '+4.2%',
      change7d: '+12.5%',
      high24h: '$172.50',
      low24h: '$162.30',
      volume: '$2.1B',
      marketCap: '$78.2B',
      rank: '#5',
      ath: '$260.06',
      athDate: 'Nov 2021',
      positive: true
    } as PriceData
  },
  'portfolio': {
    response: "Your portfolio breakdown:",
    type: 'portfolio',
    meta: 'Live data',
    data: {
      total: '$5,715.92',
      change: '+$342.18',
      changePercent: '+6.37%',
      positive: true,
      pnlAllTime: '+$1,240.50',
      pnlPercent: '+27.7%',
      allocation: [
        { token: 'SOL', percent: 70, color: '#14F195', value: '$3,978.42' },
        { token: 'USDC', percent: 22, color: '#2775CA', value: '$1,250.00' },
        { token: 'JUP', percent: 7, color: '#00D18C', value: '$425.00' },
        { token: 'Other', percent: 1, color: '#8B8BA3', value: '$62.50' }
      ] as PortfolioAllocation[],
      topPerformer: { token: 'JUP', change: '+12.3%' },
      worstPerformer: { token: 'BONK', change: '-2.1%' }
    }
  },
  'history': {
    response: "Here are your recent transactions:",
    type: 'history',
    meta: 'Last 5 transactions',
    data: {
      transactions: [
        { type: 'Swap', from: '5 SOL', to: '845 USDC', time: '2 hours ago', status: 'completed', hash: '4xK7...mN9q' },
        { type: 'Receive', amount: '10 SOL', from: '8pLm...4kWq', time: '5 hours ago', status: 'completed', hash: '7hJ2...pL5r' },
        { type: 'Send', amount: '100 USDC', to: 'alice.sol', time: '1 day ago', status: 'completed', hash: '9nM4...qR8s' },
        { type: 'Swap', from: '1000 BONK', to: '0.025 SOL', time: '2 days ago', status: 'completed', hash: '2kP9...nT6v' },
      ] as Transaction[]
    }
  },
  'stake': {
    response: "Here are the best staking options for SOL:",
    type: 'stake',
    meta: 'Updated 5 min ago',
    data: {
      options: [
        { validator: 'Marinade', apy: '7.2%', minStake: '0.01 SOL', lockup: 'Liquid', recommended: true },
        { validator: 'Jito', apy: '7.8%', minStake: '0.1 SOL', lockup: 'Liquid', recommended: false },
        { validator: 'Blaze', apy: '6.9%', minStake: '0.01 SOL', lockup: 'Liquid', recommended: false },
      ] as StakeOption[],
      currentStaked: '0 SOL',
      availableToStake: '23.45 SOL'
    }
  },
  'gas': {
    response: "Current network conditions:",
    type: 'gas',
    meta: 'Real-time data',
    data: {
      network: 'Solana',
      status: 'Normal',
      statusColor: 'green',
      avgFee: '0.000005 SOL',
      avgFeeUsd: '$0.0008',
      tps: '3,245',
      blockTime: '400ms',
      congestion: 'Low',
      recommendation: 'Good time to transact - fees are minimal'
    }
  },
  'nft': {
    response: "Here are your NFTs:",
    type: 'nft',
    meta: '4 NFTs found',
    data: {
      nfts: [
        { name: 'Mad Lad #4521', collection: 'Mad Lads', floor: '85 SOL', rarity: 'Top 10%' },
        { name: 'Okay Bear #2341', collection: 'Okay Bears', floor: '42 SOL', rarity: 'Top 25%' },
        { name: 'DeGod #8891', collection: 'DeGods', floor: '28 SOL', rarity: 'Top 50%' },
      ] as NFT[],
      totalValue: '~155 SOL',
      totalUsd: '~$26,321'
    }
  }
};

// Keyword mappings for response matching
export const keywordMappings: Record<string, string[]> = {
  'balance': ['balance', 'how much', 'what do i have'],
  'swap': ['swap', 'trade', 'buy', 'convert', 'exchange'],
  'send': ['send', 'transfer'],
  'price': ['price', 'worth', 'how much is', 'cost'],
  'portfolio': ['portfolio', 'bags', 'holdings', 'overview'],
  'history': ['history', 'transactions', 'activity', 'recent'],
  'stake': ['stake', 'staking', 'yield', 'earn'],
  'gas': ['gas', 'fee', 'network', 'congestion'],
  'nft': ['nft', 'collectible', 'jpeg']
};

export function getResponse(text: string): ScenarioResponse {
  const lower = text.toLowerCase();

  for (const [scenarioKey, keywords] of Object.entries(keywordMappings)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return scenarios[scenarioKey];
    }
  }

  return {
    response: `I understand you want to "${text}". This is a demo environment - in the full version, I can help you with swaps, transfers, portfolio tracking, staking, and much more. Try one of the quick actions to see what I can do!`
  };
}

// Initial welcome message
export const welcomeMessage = {
  id: 1,
  role: 'bot' as const,
  text: "Hey! I'm ClawPal, your AI crypto assistant. I can help you swap tokens, check balances, track your portfolio, and more. What would you like to do?",
  type: 'text' as MessageType
};
