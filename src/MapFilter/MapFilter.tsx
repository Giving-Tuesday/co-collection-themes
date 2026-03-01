import { useCallback, useMemo, useRef, useState } from 'react';
import {
  Map,
  Source,
  Layer,
  Popup,
  NavigationControl,
} from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre';
import type { FeatureCollection } from 'geojson';
import styles from './MapFilter.module.css';
import { resolveIsoCodes, isoToOptions } from './regions';
import { useCountryGeojson } from './useCountryGeojson';
import {
  MAP_STYLE,
  buildFillColorExpression,
  FILL_OPACITY_EXPRESSION,
} from './mapStyles';

export interface MarkerData {
  longitude: number;
  latitude: number;
  label?: string;
  [key: string]: unknown;
}

export interface MapFilterProps {
  availableOptions: string[];
  selectedOptions?: string[];
  onSelect: (option: string) => void;
  markers?: MarkerData[];
  onMarkerClick?: (marker: MarkerData) => void;
}

export const MapFilter = ({
  availableOptions,
  selectedOptions = [],
  onSelect,
  markers,
  onMarkerClick,
}: MapFilterProps) => {
  const { geojson } = useCountryGeojson();
  const mapRef = useRef<MapRef>(null);
  const hoveredIdRef = useRef<number | null>(null);
  const hoveredMarkerIdRef = useRef<number | null>(null);
  const [popupInfo, setPopupInfo] = useState<{
    lng: number;
    lat: number;
    label: string;
  } | null>(null);
  const [markerPopupInfo, setMarkerPopupInfo] = useState<{
    lng: number;
    lat: number;
    label: string;
  } | null>(null);
  const [pinnedMarkerInfo, setPinnedMarkerInfo] = useState<{
    lng: number;
    lat: number;
    marker: MarkerData;
  } | null>(null);

  const markersGeojson = useMemo((): FeatureCollection | null => {
    if (!markers?.length) return null;
    return {
      type: 'FeatureCollection',
      features: markers.map((m, i) => ({
        type: 'Feature' as const,
        id: i,
        geometry: {
          type: 'Point' as const,
          coordinates: [m.longitude, m.latitude],
        },
        properties: { label: m.label ?? '', ...m },
      })),
    };
  }, [markers]);

  const availableCodes = useMemo(
    () => resolveIsoCodes(availableOptions),
    [availableOptions],
  );
  const selectedCodes = useMemo(
    () => resolveIsoCodes(selectedOptions),
    [selectedOptions],
  );

  const fillColor = useMemo(
    () => buildFillColorExpression(availableCodes, selectedCodes),
    [availableCodes, selectedCodes],
  );

  const allOptions = useMemo(
    () => [...availableOptions, ...selectedOptions],
    [availableOptions, selectedOptions],
  );

  const getIso3FromFeature = useCallback(
    (e: MapLayerMouseEvent): string | undefined => {
      const feature = e.features?.[0];
      if (!feature) return undefined;
      return (feature.properties?.['ISO_A3'] as string) ?? undefined;
    },
    [],
  );

  const isClickable = useCallback(
    (iso3: string | undefined): boolean => {
      if (!iso3) return false;
      return availableCodes.has(iso3) || selectedCodes.has(iso3);
    },
    [availableCodes, selectedCodes],
  );

  const clearHoverState = useCallback(() => {
    const map = mapRef.current;
    if (hoveredIdRef.current !== null && map) {
      map.setFeatureState(
        { source: 'countries', id: hoveredIdRef.current },
        { hover: false },
      );
      hoveredIdRef.current = null;
    }
  }, []);

  const clearMarkerHoverState = useCallback(() => {
    const map = mapRef.current;
    if (hoveredMarkerIdRef.current !== null && map) {
      map.setFeatureState(
        { source: 'markers', id: hoveredMarkerIdRef.current },
        { hover: false },
      );
      hoveredMarkerIdRef.current = null;
    }
  }, []);

  // Ensure marker layers always render above choropleth layers.
  // react-map-gl manages layer lifecycle and may re-insert them in
  // declaration order on re-render, so we enforce order on every render frame.
  const onRender = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const style = map.getStyle();
    if (!style?.layers) return;
    const layerIds = style.layers.map((l) => l.id);
    const markerLayerIds = ['clusters', 'cluster-count', 'unclustered-point'];
    const borderIdx = layerIds.indexOf('countries-border');
    if (borderIdx === -1) return;
    for (const id of markerLayerIds) {
      const idx = layerIds.indexOf(id);
      if (idx !== -1 && idx < borderIdx) {
        map.moveLayer(id);
      }
    }
  }, []);

  const onMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const feature = e.features?.[0];
      const layerId = feature?.layer?.id;

      // Handle marker layers
      if (layerId === 'unclustered-point') {
        clearHoverState();
        clearMarkerHoverState();
        setPopupInfo(null);
        map.getCanvas().style.cursor = 'pointer';

        // Set hover feature state on the marker
        const featureId = feature!.id as number;
        hoveredMarkerIdRef.current = featureId;
        map.setFeatureState(
          { source: 'markers', id: featureId },
          { hover: true },
        );

        const label = feature?.properties?.label;
        if (label) {
          setMarkerPopupInfo({ lng: e.lngLat.lng, lat: e.lngLat.lat, label });
        }
        return;
      }

      if (layerId === 'clusters') {
        clearHoverState();
        clearMarkerHoverState();
        setPopupInfo(null);
        map.getCanvas().style.cursor = 'pointer';

        // Show cluster count tooltip
        const count = feature?.properties?.point_count;
        if (count != null) {
          setMarkerPopupInfo({
            lng: e.lngLat.lng,
            lat: e.lngLat.lat,
            label: `${count} points — click to expand`,
          });
        }
        return;
      }

      // Clear marker hover + popup when hovering countries
      clearMarkerHoverState();
      setMarkerPopupInfo(null);

      const iso3 = getIso3FromFeature(e);

      // Clear previous hover
      clearHoverState();

      if (!feature || !isClickable(iso3)) {
        setPopupInfo(null);
        map.getCanvas().style.cursor = '';
        return;
      }

      // Set hover state on new feature
      const featureId = feature.id as number;
      hoveredIdRef.current = featureId;
      map.setFeatureState(
        { source: 'countries', id: featureId },
        { hover: true },
      );
      map.getCanvas().style.cursor = 'pointer';

      // Show popup
      const matched = isoToOptions(iso3!, allOptions);
      if (matched[0]) {
        setPopupInfo({ lng: e.lngLat.lng, lat: e.lngLat.lat, label: matched[0] });
      }
    },
    [getIso3FromFeature, isClickable, clearHoverState, allOptions],
  );

  const onMouseLeave = useCallback(() => {
    clearHoverState();
    clearMarkerHoverState();
    setPopupInfo(null);
    setMarkerPopupInfo(null);
    const map = mapRef.current;
    if (map) map.getCanvas().style.cursor = '';
  }, [clearHoverState, clearMarkerHoverState]);

  const onClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const feature = e.features?.[0];
      const layerId = feature?.layer?.id;

      // Click on cluster → zoom to expand
      if (layerId === 'clusters') {
        const clusterId = feature?.properties?.cluster_id;
        const source = map.getSource('markers');
        if (source && clusterId != null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (source as any).getClusterExpansionZoom(clusterId, (err: Error | null, zoom: number) => {
            if (err) return;
            map.easeTo({
              center: (feature!.geometry as GeoJSON.Point).coordinates as [number, number],
              zoom,
            });
          });
        }
        return;
      }

      // Click on unclustered marker → pin info window
      if (layerId === 'unclustered-point' && markers) {
        const props = feature?.properties;
        if (props) {
          const marker = markers.find(
            (m) =>
              m.longitude === props.longitude && m.latitude === props.latitude,
          );
          if (marker) {
            setPinnedMarkerInfo({
              lng: marker.longitude,
              lat: marker.latitude,
              marker,
            });
            if (onMarkerClick) onMarkerClick(marker);
          }
        }
        return;
      }

      // Country click
      const iso3 = getIso3FromFeature(e);
      if (!isClickable(iso3)) return;

      const matched = isoToOptions(iso3!, allOptions);
      if (matched[0]) onSelect(matched[0]);
    },
    [getIso3FromFeature, isClickable, allOptions, onSelect, onMarkerClick, markers],
  );

  return (
    <div className={styles.container}>
      <Map
        ref={mapRef}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mapStyle={MAP_STYLE as any}
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 1.2,
        }}
        interactiveLayerIds={[
          ...(geojson ? ['countries-fill'] : []),
          ...(markersGeojson ? ['clusters', 'unclustered-point'] : []),
        ]}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onRender={onRender}
        attributionControl={false}
      >
        {geojson && (
          <Source id="countries" type="geojson" data={geojson} generateId>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Layer
              id="countries-fill"
              type="fill"
              paint={{
                'fill-color': fillColor,
                'fill-opacity': FILL_OPACITY_EXPRESSION,
              } as any}
            />
            <Layer
              id="countries-border"
              type="line"
              paint={{ 'line-color': '#ffffff', 'line-width': 0.5 } as any}
            />
          </Source>
        )}

        {markersGeojson && (
          <Source
            id="markers"
            type="geojson"
            data={markersGeojson}
            cluster
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            {/* Cluster circles — sized by point_count */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Layer
              id="clusters"
              type="circle"
              filter={['has', 'point_count']}
              paint={{
                'circle-color': [
                  'step', ['get', 'point_count'],
                  '#e8723a', 10,
                  '#d94f1e', 50,
                  '#b83214',
                ],
                'circle-radius': [
                  'step', ['get', 'point_count'],
                  14, 10,
                  18, 50,
                  24,
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#fff',
                'circle-opacity': 0.9,
              } as any}
            />
            {/* Cluster count label */}
            <Layer
              id="cluster-count"
              type="symbol"
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-size': 11,
              }}
              paint={{
                'text-color': '#ffffff',
              }}
            />
            {/* Unclustered individual markers — with hover effect via feature-state */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Layer
              id="unclustered-point"
              type="circle"
              filter={['!', ['has', 'point_count']]}
              paint={{
                'circle-color': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  '#d94f1e',
                  '#e8723a',
                ],
                'circle-radius': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  8,
                  5,
                ],
                'circle-stroke-width': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  2.5,
                  1.5,
                ],
                'circle-stroke-color': '#fff',
              } as any}
            />
          </Source>
        )}

        {markerPopupInfo && (
          <Popup
            longitude={markerPopupInfo.lng}
            latitude={markerPopupInfo.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            className={styles.markerPopup ?? ''}
          >
            {markerPopupInfo.label}
          </Popup>
        )}

        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            closeButton={false}
            closeOnClick={false}
            anchor="bottom"
            className={styles.popup ?? ''}
          >
            {popupInfo.label}
          </Popup>
        )}

        {pinnedMarkerInfo && (
          <Popup
            longitude={pinnedMarkerInfo.lng}
            latitude={pinnedMarkerInfo.lat}
            closeButton
            closeOnClick={false}
            anchor="bottom"
            offset={12}
            className={styles.infoWindow ?? ''}
            onClose={() => setPinnedMarkerInfo(null)}
          >
            <div className={styles.infoWindowContent}>
              {pinnedMarkerInfo.marker.label && (
                <strong>{pinnedMarkerInfo.marker.label}</strong>
              )}
              <span className={styles.infoWindowCoords}>
                {pinnedMarkerInfo.lat.toFixed(4)}, {pinnedMarkerInfo.lng.toFixed(4)}
              </span>
            </div>
          </Popup>
        )}

        <NavigationControl position="bottom-right" showCompass={false} />
      </Map>
    </div>
  );
};

export default MapFilter;
