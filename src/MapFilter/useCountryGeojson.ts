import { useState, useEffect } from 'react';
import type { FeatureCollection } from 'geojson';

const GEOJSON_URL =
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector/geojson/ne_110m_admin_0_countries.geojson';

/**
 * Fetches Natural Earth 110m country GeoJSON from CDN.
 * Features include `iso_a3` in properties, eliminating numeric→alpha lookup.
 */
export function useCountryGeojson() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(GEOJSON_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`GeoJSON fetch failed: ${r.status}`);
        return r.json() as Promise<FeatureCollection>;
      })
      .then((data) => {
        if (!cancelled) setGeojson(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { geojson, error };
}
