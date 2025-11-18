import axios from 'axios';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export interface GooglePlacesResult {
  name: string;
  address: string;
  phone: string;
  listed: boolean;
  rating?: number;
  review_count?: number;
  error?: string;
}

/**
 * Search for a business using Google Places API (New)
 */
export async function searchGooglePlaces(
  practiceName: string,
  city: string,
  state: string
): Promise<GooglePlacesResult> {
  if (!GOOGLE_PLACES_API_KEY) {
    console.warn('GOOGLE_PLACES_API_KEY is not configured');
    return {
      name: '',
      address: '',
      phone: '',
      listed: false,
      error: 'Google Places API key not configured'
    };
  }

  try {
    // Use Text Search (New) endpoint
    const searchResponse = await axios.post(
      'https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: `${practiceName} dentist ${city} ${state}`,
        maxResultCount: 5
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.rating,places.userRatingCount'
        }
      }
    );

    const places = searchResponse.data.places || [];

    if (places.length === 0) {
      return {
        name: '',
        address: '',
        phone: '',
        listed: false,
        error: 'Business not found on Google'
      };
    }

    // Find best match (first result or name match)
    let bestMatch = places[0];
    for (const place of places) {
      const placeName = place.displayName?.text?.toLowerCase() || '';
      if (placeName.includes(practiceName.toLowerCase()) ||
          practiceName.toLowerCase().includes(placeName)) {
        bestMatch = place;
        break;
      }
    }

    return {
      name: bestMatch.displayName?.text || '',
      address: bestMatch.formattedAddress || '',
      phone: bestMatch.nationalPhoneNumber || '',
      listed: true,
      rating: bestMatch.rating,
      review_count: bestMatch.userRatingCount
    };

  } catch (error: any) {
    console.error('Google Places API error:', error.response?.data || error.message);
    return {
      name: '',
      address: '',
      phone: '',
      listed: false,
      error: error.response?.data?.error?.message || error.message
    };
  }
}
