import { mkdir, readFile, writeFile } from 'fs/promises';
import type { FeatureCollection, Geometry } from 'geojson';
import type { GeoConfigEntry } from '../src/types';

interface CountryProperties {
  ISO_A2: string;
  ISO_A2_EH: string;
  NAME: string;
  NAME_LONG: string;
  CONTINENT: string;
}

const COUNTRIES_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';
const SUBDIVISIONS_URL =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson';

const CONTINENT_TO_M49: Record<string, string> = {
  Africa: '002',
  Antarctica: '010',
  Asia: '142',
  Europe: '150',
  'North America': '019',
  Oceania: '009',
  'South America': '019',
  'Seven seas (open ocean)': '999',
};

async function loadGeoJSON(
  urlOrPath: string,
  label: string,
): Promise<FeatureCollection<Geometry>> {
  if (urlOrPath.startsWith('http')) {
    console.log(`Downloading ${label} from ${urlOrPath} ...`);
    const res = await fetch(urlOrPath);
    if (!res.ok) throw new Error(`Failed to download ${label}: ${res.status}`);
    return (await res.json()) as FeatureCollection<Geometry>;
  }
  console.log(`Reading local ${label} from ${urlOrPath} ...`);
  const raw = await readFile(urlOrPath, 'utf-8');
  return JSON.parse(raw) as FeatureCollection<Geometry>;
}

function resolveISO(props: CountryProperties): string | null {
  const iso = props.ISO_A2 !== '-99' ? props.ISO_A2 : props.ISO_A2_EH;
  return iso && iso !== '-99' ? iso : null;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const localCountries = args.find((a) => a.startsWith('--countries='))?.split('=')[1];
  const localSubdivisions = args
    .find((a) => a.startsWith('--subdivisions='))
    ?.split('=')[1];

  const countriesGeo = await loadGeoJSON(localCountries ?? COUNTRIES_URL, 'countries');
  const subdivisionsGeo = await loadGeoJSON(
    localSubdivisions ?? SUBDIVISIONS_URL,
    'subdivisions',
  );

  console.log(`Processing ${countriesGeo.features.length} country features ...`);

  const entries: GeoConfigEntry[] = [];
  let skipped = 0;

  for (const feature of countriesGeo.features) {
    const props = feature.properties as CountryProperties;
    const iso = resolveISO(props);
    if (!iso) {
      skipped++;
      continue;
    }

    const name = props.NAME || props.NAME_LONG || '';
    const continent = CONTINENT_TO_M49[props.CONTINENT] ?? '999';

    entries.push({
      iso,
      name,
      continent,
      groupByRegion: false,
      groups: [],
    });
  }

  entries.sort((a, b) => a.iso.localeCompare(b.iso));

  console.log(
    `Processed ${entries.length} countries (${skipped} skipped due to missing ISO code).`,
  );
  console.log(
    `Processed ${subdivisionsGeo.features.length} subdivision features (available for overrides).`,
  );

  await mkdir('geo-config', { recursive: true });
  await writeFile('geo-config/base.json', JSON.stringify(entries, null, 2) + '\n');
  console.log(`Wrote geo-config/base.json with ${entries.length} entries.`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
