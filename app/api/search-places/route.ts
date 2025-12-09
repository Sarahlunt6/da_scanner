import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { query, city, state } = await request.json();

    if (!query || query.trim().length < 3) {
      return NextResponse.json({ places: [] });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.error("Google Places API key not configured");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Build the search query with location context if provided
    let searchQuery = query;
    if (city && state) {
      searchQuery = `${query} ${city}, ${state}`;
    } else if (state) {
      searchQuery = `${query} ${state}`;
    }

    // Use Google Places Text Search API
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&type=dentist&key=${apiKey}`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error("Google Places API error:", data.status, data.error_message);
      return NextResponse.json({ places: [] });
    }

    // Transform results to match our PlaceSuggestion interface
    const places = (data.results || []).slice(0, 5).map((place: any) => {
      // Extract address components
      const addressComponents = place.formatted_address?.split(',') || [];
      const streetAddress = addressComponents[0] || '';
      const cityName = addressComponents[1]?.trim() || city || '';
      const stateAbbr = addressComponents[2]?.trim().split(' ')[0] || state || '';

      return {
        name: place.name,
        address: streetAddress,
        fullAddress: place.formatted_address || '',
        phone: '', // Text Search doesn't include phone by default
        website: '', // Text Search doesn't include website by default
        city: cityName,
        state: stateAbbr,
        placeId: place.place_id, // Include for potential detailed lookup later
      };
    });

    return NextResponse.json({ places });
  } catch (error) {
    console.error("Error in search-places API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
