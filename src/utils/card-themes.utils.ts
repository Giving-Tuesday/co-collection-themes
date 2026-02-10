import { cardThemeEntries } from '../themes/cards';

// Build the theme map automatically from entries list.
const THEME_CARD_MAP = cardThemeEntries.reduce((acc, entry) => {
  const { themeName, CardComponent } = entry;

  if (!CardComponent) return acc;

  const names = Array.isArray(themeName) ? themeName : [themeName];

  names.forEach((name) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (acc[name]) {
      // eslint-disable-next-line no-console
      console.warn(`[co-collection-themes] Duplicate theme name detected: ${name}`);
    }
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    acc[name] = CardComponent;
  });

  return acc;
}, {});

export const getThemeCard = (themeName: any) => {
  // Accept a single name; if an array is passed, return first match that exists.
  if (Array.isArray(themeName)) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return themeName.map((n) => THEME_CARD_MAP[n]).find(Boolean);
  }

  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return THEME_CARD_MAP[themeName];
};

export const cardThemes = Object.freeze({ ...THEME_CARD_MAP });
