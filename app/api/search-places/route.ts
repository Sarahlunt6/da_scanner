import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query, city, state } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Build the search query
    const searchQuery = city && state
      ? `${query} ${city} ${state}`
      : query;

    // Use Text Search API
    const url = `https://places.googleapis.com/v1/places:searchText`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.location,places.addressComponents",
      },
      body: JSON.stringify({
        textQuery: searchQuery,
        maxResultCount: 5,
      }),
    });

    if (!response.ok) {
      console.error("Google Places API error:", response.status, await response.text());
      return NextResponse.json({ error: "Failed to search places" }, { status: 500 });
    }

    const data = await response.json();

    if (!data.places || data.places.length === 0) {
      return NextResponse.json({ places: [] });
    }

    // Format the results
    const places = data.places.map((place: any) => {
      // Extract city and state from address components
      let city = "";
      let state = "";

      if (place.addressComponents) {
        for (const component of place.addressComponents) {
          if (component.types.includes("locality")) {
            city = component.longText || "";
          }
          if (component.types.includes("administrative_area_level_1")) {
            state = component.shortText || "";
          }
        }
      }

      return {
        name: place.displayName?.text || "",
        address: place.formattedAddress || "",
        phone: place.internationalPhoneNumber || "",
        website: place.websiteUri || "",
        city,
        state,
      };
    });

    return NextResponse.json({ places });
  } catch (error) {
    console.error("Error in search-places:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
