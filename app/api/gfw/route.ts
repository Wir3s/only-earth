// app/api/gfw/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Construct the ArcGIS query URL
  const url = new URL('https://services2.arcgis.com/g8WusZB13b9OegfU/arcgis/rest/services/Emerging_Hot_Spots_2023/FeatureServer/0/query');
  url.searchParams.append('where', '1=1');
  url.searchParams.append('outFields', '*');
  url.searchParams.append('outSR', '4326');
  url.searchParams.append('f', 'json');

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch deforestation data:", error);
    return NextResponse.json(
      { error: 'Failed to fetch data from GFW API' },
      { status: 500 }
    );
  }
}
