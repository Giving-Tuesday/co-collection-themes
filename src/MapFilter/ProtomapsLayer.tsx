import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { Layer } from 'leaflet';
import * as protomapsL from 'protomaps-leaflet';

interface ProtomapsLayerProps {
  url: string;
  flavor?: string | undefined;
}

const ProtomapsLayer = ({ url, flavor = 'light' }: ProtomapsLayerProps) => {
  const map = useMap();

  useEffect(() => {
    const layer = protomapsL.leafletLayer({
      url,
      flavor,
    }) as unknown as Layer;
    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, url, flavor]);

  return null;
};

export default ProtomapsLayer;
