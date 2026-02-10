import { cardThemeEntries } from '../themes/cards';

// Build the theme map automatically from entries list.
const THEME_CARD_MAP = cardThemeEntries.reduce((acc, entry) => {
  const { themeName, CardComponent } = entry;

  if (!CardComponent) return acc;

  const names = Array.isArray(themeName) ? themeName : [themeName];

  names.forEach((name) => {
    if (acc[name]) {
      // eslint-disable-next-line no-console
      console.warn(`[co-collection-themes] Duplicate theme name detected: ${name}`);
    }
    acc[name] = CardComponent;
  });

  return acc;
}, {});

export const getThemeCard = (themeName) => {
  // Accept a single name; if an array is passed, return first match that exists.
  if (Array.isArray(themeName)) {
    return themeName.map((n) => THEME_CARD_MAP[n]).find(Boolean);
  }

  return THEME_CARD_MAP[themeName];
};

export const cardThemes = Object.freeze({ ...THEME_CARD_MAP });
