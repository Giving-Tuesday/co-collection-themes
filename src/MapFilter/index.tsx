import { useRef, useEffect } from 'react';
import { Map, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './MapFilter.module.css';

const STYLE_URL =
  'https://api.protomaps.com/styles/v5/light/en.json?key=83f3bba9f012d1fc';

export const MapFilter = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new Map({
      container: mapContainer.current,
      style: STYLE_URL,
      center: [0, 0],
      zoom: 1,
    });
    map.current.addControl(new NavigationControl(), 'bottom-right');
    return () => {};
  }, []);

  return <div ref={mapContainer} className={styles['map']} />;
};
