/** Minimal inline map style — ocean background, no tile server needed. */
export const MAP_STYLE = {
  version: 8 as const,
  sources: {},
  layers: [
    {
      id: 'background',
      type: 'background' as const,
      paint: { 'background-color': '#dbe9f4' },
    },
  ],
};

const UNAVAILABLE_COLOR = '#d1d5db';
const AVAILABLE_COLOR = '#6cb4e4';
const SELECTED_COLOR = '#1a56a0';

/**
 * Build a MapLibre `match` expression that maps ISO3 codes to fill colors.
 * Codes in `selectedCodes` → dark blue, `availableCodes` → blue, else → grey.
 */
export function buildFillColorExpression(
  availableCodes: Set<string>,
  selectedCodes: Set<string>,
): unknown[] {
  const parts: string[] = [];

  // selected codes first (higher priority)
  for (const code of selectedCodes) {
    parts.push(code, SELECTED_COLOR);
  }

  // available but not selected
  for (const code of availableCodes) {
    if (!selectedCodes.has(code)) {
      parts.push(code, AVAILABLE_COLOR);
    }
  }

  return ['match', ['get', 'ISO_A3'], ...parts, UNAVAILABLE_COLOR];
}

/**
 * Hover opacity expression.
 * Uses feature-state `hover` set via setFeatureState.
 */
export const FILL_OPACITY_EXPRESSION = [
  'case',
  ['boolean', ['feature-state', 'hover'], false],
  0.7,
  1,
];
