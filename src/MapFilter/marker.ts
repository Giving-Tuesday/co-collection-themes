import { Map } from 'maplibre-gl';
import { type Country, type Location } from '.';

const MARKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115" width="100" height="115">
  <path d="M50 4 C28 4 10 22 10 44 C10 68 50 111 50 111 C50 111 90 68 90 44 C90 22 72 4 50 4 Z" fill="#E8456A"/>
</svg>`;

export const loadMarkerImage = (map: Map): Promise<void> => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([MARKER_SVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image(100, 115);

    img.onload = () => {
      map.addImage('pin-marker', img, { pixelRatio: 2 });
      URL.revokeObjectURL(url);
      resolve();
    };

    img.onerror = reject;
    img.src = url;
  });
};

export const placeToGeoJSON = (options: Location[]): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: options.map((option) => {
      const properties = {
        id: option.placeString,
        title: option.placeString,
        ...(option.description ? { description: option.description } : {}),
        ...(option.resourceUrl ? { resourceUrl: option.resourceUrl } : {}),
      };
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: option.coordinates },
        properties,
      };
    }),
  };
};

export const countryCountsGeoJSON = (options: Country[]): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: options.map((c) => {
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: c.coordinates },
        properties: { placeString: c.placeString, count: c.count },
      };
    }),
  };
};
