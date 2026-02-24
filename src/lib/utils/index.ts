// Utility functions for CLAWPAL

/**
 * Creates an Intersection Observer that triggers visibility state
 * @param elementId - The ID of the element to observe
 * @param callback - Function to call when element becomes visible
 * @param options - IntersectionObserver options
 * @returns Cleanup function
 */
export function createVisibilityObserver(
  elementId: string,
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): () => void {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      callback(true);
    }
  }, options);

  const element = document.getElementById(elementId);
  if (element) {
    observer.observe(element);
  }

  return () => observer.disconnect();
}

/**
 * Formats current time as HH:MM AM/PM
 */
export function getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Safely copies text to clipboard with error handling
 * @param text - Text to copy
 * @returns Promise<boolean> - true if successful, false if failed
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns boolean - true if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Creates a delay promise
 * @param ms - Milliseconds to wait
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Scrolls element to bottom smoothly
 * @param element - HTML element to scroll
 * @param delayMs - Optional delay before scrolling
 */
export function scrollToBottom(element: HTMLElement | null, delayMs: number = 50): void {
  if (!element) return;

  setTimeout(() => {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    });
  }, delayMs);
}

/**
 * Generates a unique ID
 */
export function generateId(): number {
  return Date.now() + Math.random();
}
