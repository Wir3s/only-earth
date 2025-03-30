// scripts/test-gfw-api.js
// Run with: node scripts/test-gfw-api.js YOUR_API_KEY

const apiKey = process.argv[2];

if (!apiKey) {
  console.error("Please provide your API key as an argument");
  process.exit(1);
}

const url = new URL('https://data-api.globalforestwatch.org/dataset/gfw_emerging_hot_spots/latest/download');
url.searchParams.append('format', 'geojson');
url.searchParams.append('geostore_id', 'global');
url.searchParams.append('geostore_origin', 'gadm');

console.log("Testing GFW API with URL:", url.toString());

fetch(url.toString(), {
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log("Status:", response.status, response.statusText);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log("Success! Found features:", data.features?.length || 0);
  console.log("Sample feature:", data.features?.[0]);
})
.catch(error => {
  console.error("Error testing API:", error);
});