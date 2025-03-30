// lib/gfwApi.ts
export async function fetchDeforestationData(bounds = [-180, -85, 180, 85]) {
    // Using our own API route as a proxy to protect the API key
    const url = new URL('/api/gfw', window.location.origin);
    
    // Add parameters for the request
    url.searchParams.append('format', 'geojson');
    
    // Add bounds if specified
    if (bounds && bounds.length === 4) {
      url.searchParams.append('bbox', bounds.join(','));
    }
    
    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch deforestation data:", error);
      throw error;
    }
  }
  
  // Add a testing function to verify API connectivity
  export async function testGfwApiConnection() {
    try {
      const data = await fetchDeforestationData();
      console.log("GFW API connection successful");
      return {
        success: true,
        dataPreview: data.features ? data.features.slice(0, 3) : null,
        featureCount: data.features?.length || 0
      };
    } catch (error) {
      console.error("GFW API connection failed:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }