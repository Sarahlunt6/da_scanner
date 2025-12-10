// Environment variable utilities

/**
 * Get the app URL, with fallback and quote stripping
 */
export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || '';

  // Strip quotes if they exist
  const cleanUrl = url.replace(/^["']|["']$/g, '');

  // Return clean URL or fallback
  return cleanUrl || 'https://da-scanner.vercel.app';
}
