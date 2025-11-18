import axios from 'axios';

const BROWSERACT_API_KEY = process.env.BROWSERACT_API_KEY;
const BROWSERACT_API_URL = 'https://api.browseract.com';

// Workflow IDs from environment
const WORKFLOW_BING = process.env.BROWSERACT_WORKFLOW_BING;
const WORKFLOW_YELLOWPAGES = process.env.BROWSERACT_WORKFLOW_YELLOWPAGES;

export interface WorkflowResult {
  name: string;
  address: string;
  phone: string;
  listed: boolean;
  error?: string;
}

export class BrowserActClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl?: string) {
    this.apiKey = apiKey || BROWSERACT_API_KEY || '';
    this.baseUrl = baseUrl || BROWSERACT_API_URL;

    if (!this.apiKey) {
      console.warn('BROWSERACT_API_KEY is not configured. Scraping features will not work.');
    }
  }

  /**
   * Run a BrowserAct workflow with input parameters
   */
  async runWorkflow(
    workflowId: string,
    inputs: Record<string, string>
  ): Promise<WorkflowResult> {
    if (!this.apiKey) {
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: 'API key not configured'
      };
    }

    try {
      // Start the workflow run
      const runResponse = await axios.post(
        `${this.baseUrl}/v1/workflows/${workflowId}/runs`,
        {
          inputs: inputs
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const runId = runResponse.data.id || runResponse.data.runId;

      if (!runId) {
        // If the response contains the result directly
        if (runResponse.data.output || runResponse.data.result) {
          const output = runResponse.data.output || runResponse.data.result;
          return {
            name: output.name || '',
            address: output.address || '',
            phone: output.phone || '',
            listed: !!(output.name || output.address || output.phone)
          };
        }
        throw new Error('No run ID returned from workflow');
      }

      // Poll for completion
      let attempts = 0;
      const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const statusResponse = await axios.get(
          `${this.baseUrl}/v1/workflows/${workflowId}/runs/${runId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`
            }
          }
        );

        const status = statusResponse.data.status;

        if (status === 'completed' || status === 'success') {
          const output = statusResponse.data.output || statusResponse.data.result || {};
          return {
            name: output.name || '',
            address: output.address || '',
            phone: output.phone || '',
            listed: !!(output.name || output.address || output.phone)
          };
        }

        if (status === 'failed' || status === 'error') {
          return {
            name: '',
            address: '',
            phone: '',
            listed: false,
            error: statusResponse.data.error || 'Workflow failed'
          };
        }

        attempts++;
      }

      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: 'Workflow timed out'
      };

    } catch (error: any) {
      console.error(`BrowserAct workflow failed:`, error.message);
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: error.message
      };
    }
  }

  /**
   * Run Bing Places workflow
   */
  async scrapeBingPlaces(
    practiceName: string,
    city: string,
    state: string
  ): Promise<WorkflowResult> {
    if (!WORKFLOW_BING) {
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: 'Bing workflow ID not configured'
      };
    }

    return this.runWorkflow(WORKFLOW_BING, {
      practice_name: practiceName,
      city: city,
      state: state
    });
  }

  /**
   * Run Yellow Pages workflow
   */
  async scrapeYellowPages(
    practiceName: string,
    city: string,
    state: string
  ): Promise<WorkflowResult> {
    if (!WORKFLOW_YELLOWPAGES) {
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: 'Yellow Pages workflow ID not configured'
      };
    }

    return this.runWorkflow(WORKFLOW_YELLOWPAGES, {
      practice_name: practiceName,
      city: city,
      state: state
    });
  }
}

export const browserActClient = new BrowserActClient();
