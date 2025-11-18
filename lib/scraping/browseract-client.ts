import axios from 'axios';

const BROWSERACT_API_KEY = process.env.BROWSERACT_API_KEY;
const BROWSERACT_API_URL = process.env.BROWSERACT_API_URL || 'https://api.browseract.com';

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
   * Run a BrowserAct workflow with input parameters using v2 API
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
      // Convert inputs to array format required by v2 API
      const inputParameters = Object.entries(inputs).map(([name, value]) => ({
        name,
        value
      }));

      // Start the workflow task using v2 API
      const runResponse = await axios.post(
        `${this.baseUrl}/v2/workflow/run-task`,
        {
          workflow_id: workflowId,
          input_parameters: inputParameters
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const taskId = runResponse.data.id;

      if (!taskId) {
        throw new Error('No task ID returned from workflow');
      }

      // Poll for completion using get-task endpoint
      let attempts = 0;
      const maxAttempts = 60; // 60 attempts * 2 seconds = 120 seconds max

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const statusResponse = await axios.get(
          `${this.baseUrl}/v2/workflow/get-task`,
          {
            params: { task_id: taskId },
            headers: {
              'Authorization': `Bearer ${this.apiKey}`
            }
          }
        );

        const status = statusResponse.data.status;

        if (status === 'finished') {
          // Log the full response to debug output format
          console.log('BrowserAct full response:', JSON.stringify(statusResponse.data, null, 2));

          // Try multiple possible output locations
          const outputData = statusResponse.data.output || statusResponse.data.result || statusResponse.data;
          console.log('Output data:', JSON.stringify(outputData, null, 2));

          // Check for different output formats
          let parsedOutput: any = null;

          // Try output.string (JSON string)
          if (outputData?.string) {
            try {
              const parsed = JSON.parse(outputData.string);
              console.log('Parsed from output.string:', parsed);

              // Handle array of separate objects format: [{name: ...}, {address: ...}, {phone: ...}]
              if (Array.isArray(parsed)) {
                parsedOutput = {};
                for (const item of parsed) {
                  if (typeof item === 'object') {
                    Object.assign(parsedOutput, item);
                  }
                }
                console.log('Merged array into object:', parsedOutput);
              } else {
                parsedOutput = parsed;
              }
            } catch (e) {
              console.log('Could not parse output.string as JSON:', outputData.string);
            }
          }

          // Try output directly as object
          if (!parsedOutput && typeof outputData === 'object') {
            // Check if it has our expected fields directly
            if (outputData.name || outputData.address || outputData.phone) {
              parsedOutput = outputData;
              console.log('Using output directly:', parsedOutput);
            }
            // Check for nested data
            if (outputData.data) {
              parsedOutput = outputData.data;
              console.log('Using output.data:', parsedOutput);
            }
          }

          // Try to find data in any field that looks like our output
          if (!parsedOutput) {
            for (const key of Object.keys(outputData || {})) {
              const val = outputData[key];
              if (typeof val === 'string' && val.includes('{')) {
                try {
                  parsedOutput = JSON.parse(val);
                  console.log(`Parsed from output.${key}:`, parsedOutput);
                  break;
                } catch (e) {
                  // Not JSON, continue
                }
              }
            }
          }

          if (parsedOutput) {
            return {
              name: parsedOutput.name || parsedOutput.business_name || '',
              address: parsedOutput.address || parsedOutput.business_address || '',
              phone: parsedOutput.phone || parsedOutput.business_phone || '',
              listed: !!(parsedOutput.name || parsedOutput.address || parsedOutput.phone ||
                        parsedOutput.business_name || parsedOutput.business_address || parsedOutput.business_phone)
            };
          }

          return {
            name: '',
            address: '',
            phone: '',
            listed: false,
            error: 'Could not find data in workflow output'
          };
        }

        if (status === 'failed' || status === 'canceled') {
          const errorInfo = statusResponse.data.task_failure_info;
          return {
            name: '',
            address: '',
            phone: '',
            listed: false,
            error: errorInfo?.message || 'Workflow failed'
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
      console.error(`BrowserAct workflow failed:`, error.response?.data || error.message);
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: error.response?.data?.message || error.message
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
