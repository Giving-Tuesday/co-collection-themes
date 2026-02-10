import { itemPageThemeEntries } from '../themes/item-pages';

// Build the item page map automatically from entries list.
const THEME_ITEM_PAGE_MAP = itemPageThemeEntries.reduce((acc, entry) => {
  const { themeName, ItemPageComponent } = entry;

  if (!ItemPageComponent) return acc;

  const names = Array.isArray(themeName) ? themeName : [themeName];

  names.forEach((name) => {
    if (acc[name]) {
      // eslint-disable-next-line no-console
      console.warn(`[co-collection-themes] Duplicate item page theme detected: ${name}`);
    }
    acc[name] = ItemPageComponent;
  });

  return acc;
}, {});

export function getThemeItemPage(themeName) {
  // Accept a single name; if an array is passed, return first match that exists.
  if (Array.isArray(themeName)) {
    return themeName.map((n) => THEME_ITEM_PAGE_MAP[n]).find(Boolean);
  }

  return THEME_ITEM_PAGE_MAP[themeName];
}

export const itemPageThemes = Object.freeze({ ...THEME_ITEM_PAGE_MAP });
