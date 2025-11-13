import * as cheerio from 'cheerio';
import { browserActClient } from './browseract-client';

export interface DirectoryData {
  name: string;
  address: string;
  phone: string;
  listed: boolean;
  error?: string;
}

/**
 * Scrape Bing Places for practice information
 */
export async function scrapeBingPlaces(
  practiceName: string,
  city: string,
  state: string
): Promise<DirectoryData> {
  const searchUrl = `https://www.bing.com/maps?q=${encodeURIComponent(practiceName + ' ' + city + ' ' + state)}`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    return {
      name: $('.businessName').first().text().trim() || '',
      address: $('.address').first().text().trim() || '',
      phone: $('.phone').first().text().trim() || '',
      listed: $('.businessName').length > 0
    };
  } catch (error: any) {
    console.error(`Bing Places scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}

/**
 * Scrape Facebook Business Page
 */
export async function scrapeFacebookBusiness(
  practiceName: string,
  city: string
): Promise<DirectoryData> {
  const searchUrl = `https://www.facebook.com/search/pages/?q=${encodeURIComponent(practiceName + ' ' + city)}`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    return {
      name: $('[data-testid="page-name"]').first().text().trim() || '',
      address: $('[data-testid="page-address"]').first().text().trim() || '',
      phone: $('[data-testid="page-phone"]').first().text().trim() || '',
      listed: $('[data-testid="page-name"]').length > 0
    };
  } catch (error: any) {
    console.error(`Facebook Business scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}

/**
 * Scrape Healthgrades
 */
export async function scrapeHealthgrades(
  practiceName: string,
  city: string,
  state: string
): Promise<DirectoryData> {
  const searchUrl = `https://www.healthgrades.com/search?what=${encodeURIComponent(practiceName)}&where=${encodeURIComponent(city + ', ' + state)}&category=dentist`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    return {
      name: $('.provider-name').first().text().trim() || '',
      address: $('.provider-address').first().text().trim() || '',
      phone: $('.provider-phone').first().text().trim() || '',
      listed: $('.provider-name').length > 0
    };
  } catch (error: any) {
    console.error(`Healthgrades scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}

/**
 * Scrape Zocdoc
 */
export async function scrapeZocdoc(
  practiceName: string,
  city: string,
  state: string
): Promise<DirectoryData> {
  const searchUrl = `https://www.zocdoc.com/search/?dr_specialty=122&address=${encodeURIComponent(city + ', ' + state)}&insurance_carrier=-1`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    // Search results, then filter by practice name
    let found: DirectoryData | null = null;

    $('.provider-card').each((i, elem) => {
      const name = $(elem).find('.provider-name').text().trim();
      if (name.toLowerCase().includes(practiceName.toLowerCase())) {
        found = {
          name: name,
          address: $(elem).find('.practice-address').text().trim() || '',
          phone: $(elem).find('.practice-phone').text().trim() || '',
          listed: true
        };
        return false; // Break the loop
      }
    });

    return found || { name: '', address: '', phone: '', listed: false };
  } catch (error: any) {
    console.error(`Zocdoc scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}

/**
 * Scrape WebMD
 */
export async function scrapeWebMD(
  practiceName: string,
  city: string,
  state: string
): Promise<DirectoryData> {
  const searchUrl = `https://doctor.webmd.com/results?pagenumber=1&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&searchtype=specialty&specid=160`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    // Search results, filter by practice name
    let found: DirectoryData | null = null;

    $('.doctor-profile').each((i, elem) => {
      const name = $(elem).find('.doctor-name').text().trim();
      if (name.toLowerCase().includes(practiceName.toLowerCase())) {
        found = {
          name: name,
          address: $(elem).find('.practice-address').text().trim() || '',
          phone: $(elem).find('.practice-phone').text().trim() || '',
          listed: true
        };
        return false;
      }
    });

    return found || { name: '', address: '', phone: '', listed: false };
  } catch (error: any) {
    console.error(`WebMD scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}

/**
 * Scrape Vitals
 */
export async function scrapeVitals(
  practiceName: string,
  city: string,
  state: string
): Promise<DirectoryData> {
  const searchUrl = `https://www.vitals.com/search?utf8=%E2%9C%93&type=specialty&q=dentist&loc=${encodeURIComponent(city + ', ' + state)}`;

  try {
    const html = await browserActClient.scrapeWithRetry(searchUrl);

    if (!html) {
      return { name: '', address: '', phone: '', listed: false, error: 'Failed to fetch' };
    }

    const $ = cheerio.load(html);

    let found: DirectoryData | null = null;

    $('.provider-card').each((i, elem) => {
      const name = $(elem).find('.provider-name').text().trim();
      if (name.toLowerCase().includes(practiceName.toLowerCase())) {
        found = {
          name: name,
          address: $(elem).find('.provider-address').text().trim() || '',
          phone: $(elem).find('.provider-phone').text().trim() || '',
          listed: true
        };
        return false;
      }
    });

    return found || { name: '', address: '', phone: '', listed: false };
  } catch (error: any) {
    console.error(`Vitals scrape error: ${error.message}`);
    return { name: '', address: '', phone: '', listed: false, error: error.message };
  }
}
