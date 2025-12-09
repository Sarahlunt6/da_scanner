import { sql } from '@vercel/postgres';

export interface Scan {
  id: number;
  token: string;
  practice_name: string;
  website_url: string;
  email: string;
  phone?: string;
  contact_name: string;
  address: string;
  city: string;
  state: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  results_json?: any;
  error_message?: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
}

export const db = {
  // Create a new scan
  async createScan(data: {
    token: string;
    practice_name: string;
    website_url: string;
    email: string;
    phone?: string;
    contact_name: string;
    address: string;
    city: string;
    state: string;
  }) {
    const result = await sql`
      INSERT INTO scans (
        token, practice_name, website_url, email, phone,
        contact_name, address, city, state, status,
        created_at, updated_at, expires_at
      )
      VALUES (
        ${data.token}, ${data.practice_name}, ${data.website_url},
        ${data.email}, ${data.phone || null}, ${data.contact_name},
        ${data.address}, ${data.city}, ${data.state}, 'pending',
        NOW(), NOW(), NOW() + INTERVAL '7 days'
      )
      RETURNING *
    `;
    return result.rows[0] as Scan;
  },

  // Get scan by token
  async getScanByToken(token: string) {
    const result = await sql`
      SELECT * FROM scans WHERE token = ${token} LIMIT 1
    `;
    return result.rows[0] as Scan | undefined;
  },

  // Get scan by ID
  async getScanById(id: number) {
    const result = await sql`
      SELECT * FROM scans WHERE id = ${id} LIMIT 1
    `;
    return result.rows[0] as Scan | undefined;
  },

  // Update scan status
  async updateScanStatus(
    id: number,
    status: 'pending' | 'processing' | 'completed' | 'failed',
    errorMessage?: string
  ) {
    await sql`
      UPDATE scans
      SET status = ${status},
          error_message = ${errorMessage || null},
          updated_at = NOW()
      WHERE id = ${id}
    `;
  },

  // Update scan results
  async updateScanResults(id: number, results: any) {
    await sql`
      UPDATE scans
      SET status = 'completed',
          results_json = ${JSON.stringify(results)},
          updated_at = NOW()
      WHERE id = ${id}
    `;
  },

  // Get pending scans
  async getPendingScans() {
    const result = await sql`
      SELECT * FROM scans
      WHERE status = 'pending'
      ORDER BY created_at ASC
      LIMIT 10
    `;
    return result.rows as Scan[];
  },

  // Delete expired scans
  async deleteExpiredScans() {
    const result = await sql`
      DELETE FROM scans
      WHERE expires_at < NOW()
      RETURNING id
    `;
    return result.rows.length;
  },

  // Check if email exists in recent scans
  async checkRecentScan(email: string, hoursAgo: number = 24) {
    const result = await sql`
      SELECT * FROM scans
      WHERE email = ${email}
        AND created_at > NOW() - INTERVAL '${hoursAgo} hours'
      ORDER BY created_at DESC
      LIMIT 1
    `;
    return result.rows[0] as Scan | undefined;
  }
};
