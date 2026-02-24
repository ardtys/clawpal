<script lang="ts">
  import { Send } from 'lucide-svelte';

  interface Props {
    value: string;
    disabled?: boolean;
    onsubmit: (text: string) => void;
    onchange: (value: string) => void;
  }

  let { value, disabled = false, onsubmit, onchange }: Props = $props();

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onsubmit(value.trim());
      }
    }
  }

  function handleSubmit() {
    if (value.trim()) {
      onsubmit(value.trim());
    }
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    onchange(target.value);
  }
</script>

<div class="p-4 border-t border-border bg-bg-secondary/20">
  <div class="flex gap-3">
    <input
      type="text"
      {value}
      oninput={handleInput}
      onkeydown={handleKeydown}
      placeholder="Ask me anything... (e.g., 'swap 10 SOL to USDC')"
      class="flex-1 bg-bg-card border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/20 transition-all"
    />
    <button
      onclick={handleSubmit}
      disabled={!value.trim() || disabled}
      class="px-5 py-3 bg-accent-primary text-bg-primary rounded-xl hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 font-medium"
    >
      <Send size={18} />
      <span class="hidden sm:inline">Send</span>
    </button>
  </div>
</div>
