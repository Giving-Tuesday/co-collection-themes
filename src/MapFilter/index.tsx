import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { Map, NavigationControl, Popup, type GeoJSONSource } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './MapFilter.module.css';
import {
  countryCountsGeoJSON,
  getBounds,
  loadMarkerImage,
  placeToGeoJSON,
} from './marker';
import countryConfig from '../../geo-config/config.json';
import { type Location, type GeoConfigEntry } from '../types';

const STYLE_URL =
  'https://api.protomaps.com/styles/v5/light/en.json?key=83f3bba9f012d1fc';

interface MapFilterProps {
  locations: Location[];
  onCountryFilter?: (name: string) => void;
  onClearFilter?: () => void;
}

export const MapFilter = ({
  locations,
  onCountryFilter,
  onClearFilter,
}: MapFilterProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const mapReady = useRef(false);
  const [hasManualZoom, setHasManualZoom] = useState(false);
  const [hasCountryFilter, setHasCountryFilter] = useState(false);
  const countryCounts = useMemo(
    () => countryCountsGeoJSON(locations, countryConfig as unknown as GeoConfigEntry[]),
    [locations],
  );

  const fitToLocations = useCallback((locations: Location[]) => {
    if (!map.current) return;
    const bounds = getBounds(locations);
    if (!bounds) return;
    const { minLng, maxLng, minLat, maxLat } = bounds;
    map.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 80,
        maxZoom: 10,
        duration: 800,
      },
    );
    setHasManualZoom(false);
  }, []);

  // Initialize map, register all event listeners (runs once)
  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    // Initialize the map instance
    map.current = new Map({
      container: mapContainer.current,
      style: STYLE_URL,
      center: [0, 0],
      zoom: 1,
    });

    // Add zoom and compass controls
    map.current.addControl(new NavigationControl(), 'bottom-right');

    // Detect user-initiated zoom/pan
    map.current.on('movestart', (e) => {
      if (e.originalEvent) {
        setHasManualZoom(true);
      }
    });

    // Load marker image, add GeoJSON source, and render pin layer once map is ready
    map.current.on('load', async () => {
      if (!map.current) return;
      await loadMarkerImage(map.current);

      if (countryCounts) {
        // Register GeoJSON source for country-level aggregate counts
        map.current.addSource('country-counts', {
          type: 'geojson',
          data: countryCounts,
        });
        // Render country counts as scaled circles (visible below zoom 5)
        map.current.addLayer({
          id: 'country-circles',
          type: 'circle',
          source: 'country-counts',
          paint: {
            'circle-color': '#E8456A',
            'circle-radius': [
              'case',
              ['==', ['get', 'count'], 1],
              12,
              ['step', ['get', 'count'], 20, 10, 25, 50, 30],
            ],
            'circle-opacity': 0.9,
          },
          maxzoom: 4,
        });
        // Display the count number inside each country circle
        map.current.addLayer({
          id: 'country-counts-label',
          type: 'symbol',
          source: 'country-counts',
          filter: ['>', ['get', 'count'], 1],
          layout: {
            'text-field': ['get', 'count'],
            'text-size': 13,
            'text-font': ['Open Sans Bold'],
          },
          paint: {
            'text-color': '#ffffff',
          },
          maxzoom: 4,
        });
      }

      // Register GeoJSON source for individual location pins
      map.current.addSource('pins', {
        type: 'geojson',
        data: placeToGeoJSON(locations),
      });
      // Render individual pins as marker icons (visible at zoom 5+)
      map.current.addLayer({
        id: 'pins',
        type: 'symbol',
        source: 'pins',
        layout: {
          'icon-image': 'pin-marker',
          'icon-size': 0.35,
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
        minzoom: 4,
      });

      mapReady.current = true;
    });

    // Zoom into a cluster when it is clicked
    map.current.on('click', 'country-circles', (e) => {
      if (!map.current || !e.features) return;
      if (onCountryFilter) {
        onCountryFilter(e.features[0]?.properties.name);
        setHasCountryFilter(true);
      } else {
        setHasManualZoom(true);
      }
      // @ts-expect-error coordinates
      map.current.easeTo({ center: e.features[0]?.geometry.coordinates, zoom: 5 });
    });

    // Show a popup with location details when a pin is clicked
    map.current.on('click', 'pins', (e) => {
      if (!map.current || !e.features) return;
      // @ts-expect-error coordinates
      const coordinates = e.features[0]?.geometry.coordinates.slice();
      const description = e.features[0]?.properties.description;
      const resourceUrl = e.features[0]?.properties.resourceUrl;
      const html =
        `<h3>${e.features[0]?.properties.title}</h3>` +
        `${description ? `<p>${description}</p>` : ''}` +
        `${resourceUrl ? `<a href="${resourceUrl}">Read More</a>` : ''}`;
      // Adjust for world wrapping so the popup appears near the click
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      new Popup().setLngLat(coordinates).setHTML(html).addTo(map.current);
    });

    // Show pointer cursor on pin hover
    map.current.on('mouseenter', 'pins', () => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = 'pointer';
    });

    // Reset cursor when leaving a pin
    map.current.on('mouseleave', 'pins', () => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = '';
    });

    // Show pointer cursor on country circle hover
    map.current.on('mouseenter', 'pins-clusters', () => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = 'pointer';
    });

    // Reset cursor when leaving a country circle
    map.current.on('mouseleave', 'pins-clusters', () => {
      if (!map.current) return;
      map.current.getCanvas().style.cursor = '';
    });

    return () => {};
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update map data and bounds when locations change
  useEffect(() => {
    if (map.current && mapReady.current) {
      (map.current.getSource('pins') as GeoJSONSource)?.setData(
        placeToGeoJSON(locations),
      );
      if (countryCounts) {
        (map.current.getSource('country-counts') as GeoJSONSource)?.setData(
          countryCounts,
        );
      }
    }
    fitToLocations(locations);
  }, [locations, countryCounts, fitToLocations]);

  const handleResetZoom = () => {
    fitToLocations(locations);
  };

  const handleResetFilter = () => {
    if (onClearFilter) onClearFilter();
    fitToLocations(locations);
    setHasCountryFilter(false);
    setHasManualZoom(false);
  };

  return (
    <div className={styles['mapWrapper']}>
      <div ref={mapContainer} className={styles['map']} />
      {(hasManualZoom || hasCountryFilter) && (
        <div className={styles['overlayButtons']}>
          {hasManualZoom && (
            <button className={styles['overlayButton']} onClick={handleResetZoom}>
              Reset Zoom
            </button>
          )}
          {hasCountryFilter && (
            <button className={styles['overlayButton']} onClick={handleResetFilter}>
              Reset Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};
