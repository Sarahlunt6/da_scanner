import axios from 'axios';

const BROWSERACT_API_KEY = process.env.BROWSERACT_API_KEY;
const BROWSERACT_API_URL = 'https://api.browseract.com/v1';

export interface BrowserActSession {
  sessionId: string;
  html: string;
}

export class BrowserActClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || BROWSERACT_API_KEY || '';
    this.baseUrl = baseUrl || BROWSERACT_API_URL;

    if (!this.apiKey) {
      throw new Error('BROWSERACT_API_KEY is not configured');
    }
  }

  /**
   * Start a browser session and get rendered HTML
   */
  async scrapeUrl(url: string, options: {
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
    timeout?: number;
  } = {}): Promise<string | null> {
    let sessionId: string | null = null;

    try {
      // Start a browser session
      const sessionResponse = await axios.post(
        `${this.baseUrl}/sessions`,
        {
          url: url,
          waitUntil: options.waitUntil || 'networkidle2',
          timeout: options.timeout || 30000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      sessionId = sessionResponse.data.sessionId;

      // Get the rendered HTML
      const contentResponse = await axios.get(
        `${this.baseUrl}/sessions/${sessionId}/content`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      return contentResponse.data.html;

    } catch (error: any) {
      console.error(`BrowserAct scraping failed for ${url}:`, error.message);
      return null;
    } finally {
      // Always try to close the session
      if (sessionId) {
        try {
          await axios.delete(
            `${this.baseUrl}/sessions/${sessionId}`,
            {
              headers: {
                'Authorization': `Bearer ${this.apiKey}`
              }
            }
          );
        } catch (cleanupError) {
          console.error('Failed to close session:', sessionId);
        }
      }
    }
  }

  /**
   * Scrape with automatic retry logic
   */
  async scrapeWithRetry(
    url: string,
    maxRetries: number = 3,
    options?: {
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
      timeout?: number;
    }
  ): Promise<string | null> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const html = await this.scrapeUrl(url, options);

        if (html) {
          return html;
        }

        // If no HTML, retry
        if (attempt < maxRetries) {
          console.log(`Attempt ${attempt} failed for ${url}, retrying...`);
          await new Promise(resolve => setTimeout(resolve, 2000 * attempt)); // Exponential backoff
        }
      } catch (error: any) {
        console.error(`Attempt ${attempt} error for ${url}:`, error.message);

        if (attempt === maxRetries) {
          return null;
        }

        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      }
    }

    return null;
  }
}

// Export singleton instance
export const browserActClient = new BrowserActClient();
