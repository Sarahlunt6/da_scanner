import { NextResponse } from "next/server";
import { checkNAPConsistency } from "@/lib/scraping/nap-consistency";

export async function GET(request: Request) {
  try {
    // Test with a sample dental practice
    const result = await checkNAPConsistency({
      practice_name: "Dental Excellence",
      website_url: "https://dentalexcellence.com",
      city: "Austin",
      state: "TX",
      referenceNAP: {
        name: "Dental Excellence",
        address: "123 Main St, Austin, TX 78701",
        phone: "(512) 555-1234"
      }
    });

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error: any) {
    console.error("BrowserAct test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
