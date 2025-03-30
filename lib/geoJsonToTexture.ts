// lib/geoJsonToTexture.ts
import * as THREE from 'three';

export function createHotspotTexture(
  geojson: any, 
  width = 4096, 
  height = 2048, 
  categoryColors: { [key: string]: string },
  opacity = 0.6
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  ctx.clearRect(0, 0, width, height);
  
  // Loop over features and draw them with their specific color.
  if (!geojson || !geojson.features || !Array.isArray(geojson.features)) {
    console.warn('Invalid GeoJSON data', geojson);
    return new THREE.CanvasTexture(canvas);
  }
  
  geojson.features.forEach((feature: any) => {
    let fillColor = '#FF0000'; // default fallback color

    // Check if this is an ArcGIS response (attributes) or standard GeoJSON (properties)
    let rawCategory = '';
    if (feature.attributes) {
      rawCategory = feature.attributes.PATTERN || '';
    } else if (feature.properties) {
      rawCategory = feature.properties.PATTERN || '';
    }
    // Normalize the category by removing " Hot Spot" if present.
    const normalizedCategory = rawCategory.replace(" Hot Spot", "");
    if (categoryColors[normalizedCategory]) {
      fillColor = categoryColors[normalizedCategory];
    }
    
    // Set the fill style for this feature.
    ctx.fillStyle = fillColor;
    ctx.globalAlpha = opacity;
    
    // Handle ArcGIS geometry (rings) and standard GeoJSON
    if (feature.geometry?.rings) {
      feature.geometry.rings.forEach((ring: number[][]) => {
        drawPolygon(ctx, ring, width, height);
      });
    } else if (feature.geometry?.coordinates) {
      if (feature.geometry.type === 'Polygon') {
        drawPolygon(ctx, feature.geometry.coordinates[0], width, height);
      } else if (feature.geometry.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((polygon: any) => {
          drawPolygon(ctx, polygon[0], width, height);
        });
      }
    }
  });
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function drawPolygon(
  ctx: CanvasRenderingContext2D, 
  coordinates: number[][],
  width: number,
  height: number
) {
  if (!coordinates || coordinates.length === 0) return;
  ctx.beginPath();
  coordinates.forEach((coord, i) => {
    if (!Array.isArray(coord) || coord.length < 2) return;
    const [lon, lat] = coord;
    // Convert lon/lat to canvas coordinates.
    const x = ((lon + 180) / 360) * width;
    const y = ((90 - lat) / 180) * height;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fill();
}

