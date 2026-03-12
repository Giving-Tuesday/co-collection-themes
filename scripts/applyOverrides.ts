/**
 * Reads geo-config/base.json and geo-config/overrides.json, deep-merges
 * overrides on top of the base by ISO code, and writes geo-config/config.json.
 *
 * overrides.json format — array of partial entries keyed by "iso":
 * [
 *   {
 *     "iso": "CA",
 *     "groupByRegion": true,
 *     "groups": [
 *       { "name": "Western Canada", "subdivisions": ["BC", "AB", "SK", "MB"] }
 *     ]
 *   },
 * ]
 *
 * Supported override fields:
 *   - groupByRegion: set to true to enable region-based grouping
 *   - groups: array of group definitions for subdivision grouping
 *   - name: override the display name
 *
 * Only the fields you specify are merged; the rest of the base entry is preserved.
 */
import { readFile, writeFile, mkdir } from 'fs/promises';
import { GeoConfigEntry } from '../src/types';

type Override = Partial<GeoConfigEntry> & { iso: string };

function deepMerge(target: GeoConfigEntry, source: Override): GeoConfigEntry {
  const result: Record<string, unknown> = { ...target };
  for (const [key, srcVal] of Object.entries(source)) {
    const tgtVal = result[key];
    if (
      srcVal !== null &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      tgtVal !== null &&
      typeof tgtVal === 'object' &&
      !Array.isArray(tgtVal)
    ) {
      result[key] = {
        ...(tgtVal as Record<string, unknown>),
        ...(srcVal as Record<string, unknown>),
      };
    } else {
      result[key] = srcVal;
    }
  }
  return result as unknown as GeoConfigEntry;
}

async function main(): Promise<void> {
  const baseRaw = await readFile('geo-config/base.json', 'utf-8');
  const base: GeoConfigEntry[] = JSON.parse(baseRaw) as GeoConfigEntry[];

  const overridesRaw = await readFile('geo-config/overrides.json', 'utf-8');
  const overrides: Override[] = JSON.parse(overridesRaw) as Override[];

  const overrideMap = new Map<string, Override>();
  for (const entry of overrides) {
    overrideMap.set(entry.iso, entry);
  }

  const merged = base.map((country) => {
    const override = overrideMap.get(country.iso);
    if (!override) return country;
    return deepMerge(country, override);
  });

  await mkdir('geo-config', { recursive: true });
  await writeFile('geo-config/config.json', JSON.stringify(merged, null, 2) + '\n');
  console.log(`Merged ${overrides.length} override(s) into ${base.length} base entries.`);
  console.log('Wrote geo-config/config.json.');
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
