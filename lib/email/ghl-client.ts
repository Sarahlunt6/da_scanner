/**
 * GoHighLevel Email Client
 * Handles sending transactional emails via GHL API
 */

interface GHLEmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

interface GHLContactParams {
  email: string;
  name: string;
  phone: string;
  customFields?: Record<string, string>;
  tags?: string[];
}

class GHLClient {
  private apiKey: string;
  private locationId: string;
  private baseUrl = "https://rest.gohighlevel.com/v1";

  constructor() {
    this.apiKey = process.env.GHL_API_KEY || "";
    this.locationId = process.env.GHL_LOCATION_ID || "";

    if (!this.apiKey || !this.locationId) {
      console.warn("GHL credentials not configured. Email sending will be skipped.");
    }
  }

  /**
   * Create or update a contact in GHL
   */
  async createOrUpdateContact(params: GHLContactParams): Promise<{ contactId: string } | null> {
    if (!this.apiKey || !this.locationId) {
      console.log("GHL not configured - skipping contact creation");
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: params.email,
          name: params.name,
          phone: params.phone,
          locationId: this.locationId,
          customFields: params.customFields || {},
          tags: params.tags || [],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("GHL contact creation failed:", error);
        return null;
      }

      const data = await response.json();
      return { contactId: data.contact?.id };
    } catch (error) {
      console.error("Error creating GHL contact:", error);
      return null;
    }
  }

  /**
   * Send an email via GHL
   * Note: GHL v1 API doesn't support direct transactional emails.
   * Emails should be sent via GHL workflows triggered by contact tags.
   * This method now just logs and returns true since workflows handle emails.
   */
  async sendEmail(params: GHLEmailParams): Promise<boolean> {
    if (!this.apiKey || !this.locationId) {
      console.log("GHL not configured - skipping email send");
      return false;
    }

    // GHL workflows handle email sending based on contact tags
    // The contact creation with tags will trigger the appropriate workflow
    console.log(`Email will be sent via GHL workflow to: ${params.to}`);
    return true;
  }

  /**
   * Add tags to a contact
   */
  async addTagsToContact(contactId: string, tags: string[]): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error adding tags to contact:", error);
      return false;
    }
  }

  /**
   * Update custom fields for a contact
   */
  async updateContactCustomFields(contactId: string, customFields: Record<string, string>): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customFields,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error updating custom fields:", error);
      return false;
    }
  }
}

export const ghlClient = new GHLClient();
