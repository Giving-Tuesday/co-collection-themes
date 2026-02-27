import { useEffect, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import styles from './MapFilter.module.css';
import { resolveIsoCodes, isoToOptions } from './regions';
import clsx from 'clsx';

const WORLD_TOPO_URL =
  'https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@1/world/110m.json';

// ISO numeric → ISO alpha-3 lookup (110m world atlas uses numeric codes)
const NUMERIC_TO_ISO3: Record<number, string> = {
  4: 'AFG',
  8: 'ALB',
  12: 'DZA',
  24: 'AGO',
  28: 'ATG',
  31: 'AZE',
  32: 'ARG',
  36: 'AUS',
  40: 'AUT',
  44: 'BHS',
  48: 'BHR',
  50: 'BGD',
  51: 'ARM',
  52: 'BRB',
  56: 'BEL',
  64: 'BTN',
  68: 'BOL',
  70: 'BIH',
  72: 'BWA',
  76: 'BRA',
  84: 'BLZ',
  90: 'SLB',
  96: 'BRN',
  100: 'BGR',
  104: 'MMR',
  108: 'BDI',
  112: 'BLR',
  116: 'KHM',
  120: 'CMR',
  124: 'CAN',
  140: 'CAF',
  144: 'LKA',
  148: 'TCD',
  152: 'CHL',
  156: 'CHN',
  158: 'TWN',
  170: 'COL',
  174: 'COM',
  178: 'COG',
  180: 'COD',
  188: 'CRI',
  191: 'HRV',
  192: 'CUB',
  196: 'CYP',
  203: 'CZE',
  204: 'BEN',
  208: 'DNK',
  212: 'DMA',
  214: 'DOM',
  218: 'ECU',
  222: 'SLV',
  226: 'GNQ',
  231: 'ETH',
  232: 'ERI',
  233: 'EST',
  242: 'FJI',
  246: 'FIN',
  250: 'FRA',
  262: 'DJI',
  266: 'GAB',
  268: 'GEO',
  275: 'PSE',
  276: 'DEU',
  288: 'GHA',
  296: 'KIR',
  300: 'GRC',
  308: 'GRD',
  320: 'GTM',
  324: 'GIN',
  328: 'GUY',
  332: 'HTI',
  340: 'HND',
  348: 'HUN',
  356: 'IND',
  360: 'IDN',
  364: 'IRN',
  368: 'IRQ',
  372: 'IRL',
  376: 'ISR',
  380: 'ITA',
  384: 'CIV',
  388: 'JAM',
  392: 'JPN',
  398: 'KAZ',
  400: 'JOR',
  404: 'KEN',
  408: 'PRK',
  410: 'KOR',
  414: 'KWT',
  417: 'KGZ',
  418: 'LAO',
  422: 'LBN',
  426: 'LSO',
  428: 'LVA',
  430: 'LBR',
  434: 'LBY',
  440: 'LTU',
  450: 'MDG',
  454: 'MWI',
  458: 'MYS',
  466: 'MLI',
  478: 'MRT',
  484: 'MEX',
  496: 'MNG',
  498: 'MDA',
  499: 'MNE',
  504: 'MAR',
  508: 'MOZ',
  512: 'OMN',
  516: 'NAM',
  520: 'NRU',
  524: 'NPL',
  528: 'NLD',
  548: 'VUT',
  554: 'NZL',
  558: 'NIC',
  562: 'NER',
  566: 'NGA',
  578: 'NOR',
  583: 'FSM',
  584: 'MHL',
  585: 'PLW',
  586: 'PAK',
  591: 'PAN',
  598: 'PNG',
  600: 'PRY',
  604: 'PER',
  608: 'PHL',
  616: 'POL',
  620: 'PRT',
  624: 'GNB',
  626: 'TLS',
  630: 'PRI',
  634: 'QAT',
  642: 'ROU',
  643: 'RUS',
  646: 'RWA',
  659: 'KNA',
  662: 'LCA',
  670: 'VCT',
  678: 'STP',
  682: 'SAU',
  686: 'SEN',
  688: 'SRB',
  694: 'SLE',
  702: 'SGP',
  703: 'SVK',
  704: 'VNM',
  705: 'SVN',
  706: 'SOM',
  710: 'ZAF',
  716: 'ZWE',
  724: 'ESP',
  728: 'SSD',
  729: 'SDN',
  740: 'SUR',
  748: 'SWZ',
  752: 'SWE',
  756: 'CHE',
  760: 'SYR',
  762: 'TJK',
  764: 'THA',
  768: 'TGO',
  776: 'TON',
  780: 'TTO',
  784: 'ARE',
  788: 'TUN',
  792: 'TUR',
  795: 'TKM',
  798: 'TUV',
  800: 'UGA',
  804: 'UKR',
  807: 'MKD',
  818: 'EGY',
  826: 'GBR',
  834: 'TZA',
  840: 'USA',
  854: 'BFA',
  858: 'URY',
  860: 'UZB',
  862: 'VEN',
  882: 'WSM',
  887: 'YEM',
  894: 'ZMB',
};

interface CountryFeature {
  type: 'Feature';
  id: string;
  properties: Record<string, unknown>;
  geometry: { type: string; coordinates: unknown[] };
}

interface TooltipState {
  x: number;
  y: number;
  label: string;
}

export interface MapFilterProps {
  availableOptions: string[];
  selectedOptions?: string[];
  onSelect: (option: string) => void;
}

const WIDTH = 960;
const HEIGHT = 500;

const projection = geoNaturalEarth1()
  .scale(153)
  .translate([WIDTH / 2, HEIGHT / 2]);

const pathGenerator = geoPath(projection);

export const MapFilter = ({
  availableOptions,
  selectedOptions = [],
  onSelect,
}: MapFilterProps) => {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const availableCodes = resolveIsoCodes(availableOptions);
  const selectedCodes = resolveIsoCodes(selectedOptions);

  useEffect(() => {
    fetch(WORLD_TOPO_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const worldFeatures = feature(
          topo,
          topo.objects['countries'] as GeometryCollection,
        );
        setCountries(worldFeatures.features as CountryFeature[]);
      })
      .catch(console.error);
  }, []);

  const getIso3 = (numericId: string): string | undefined =>
    NUMERIC_TO_ISO3[parseInt(numericId, 10)];

  const getCountryState = (
    iso3: string | undefined,
  ): 'unavailable' | 'available' | 'selected' => {
    if (!iso3) return 'unavailable';
    if (selectedCodes.has(iso3)) return 'selected';
    if (availableCodes.has(iso3)) return 'available';
    return 'unavailable';
  };

  const handleClick = (numericId: string) => {
    const iso3 = getIso3(numericId);
    if (!iso3) return;
    const state = getCountryState(iso3);
    if (state === 'unavailable') return;

    // Find which option string(s) this country belongs to and fire the first match
    const matched = isoToOptions(iso3, [...availableOptions, ...selectedOptions]);
    if (matched[0]) onSelect(matched[0]);
  };

  const handleMouseMove = (e: React.MouseEvent, numericId: string) => {
    const iso3 = getIso3(numericId);
    if (!iso3) return;
    const state = getCountryState(iso3);
    if (state === 'unavailable') return;

    const matched = isoToOptions(iso3, [...availableOptions, ...selectedOptions]);
    if (!matched[0]) return;

    setTooltip({ x: e.clientX, y: e.clientY, label: matched[0] });
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className={styles.container}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={styles.svg}
        aria-label="World map filter"
      >
        {countries.map((country) => {
          const iso3 = getIso3(country.id);
          const state = getCountryState(iso3);
          const d = pathGenerator(
            country as unknown as Parameters<typeof pathGenerator>[0],
          );
          if (!d) return null;

          return (
            <path
              key={country.id}
              d={d}
              className={clsx(styles.country, styles[state])}
              onClick={() => handleClick(country.id)}
              onMouseMove={(e) => handleMouseMove(e, country.id)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>

      {tooltip && (
        <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.label}
        </div>
      )}
    </div>
  );
};

export default MapFilter;
