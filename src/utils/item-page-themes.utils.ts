import { itemPageThemeEntries } from '../themes/item-pages';

// Build the item page map automatically from entries list.
const THEME_ITEM_PAGE_MAP = itemPageThemeEntries.reduce((acc, entry) => {
  const { themeName, ItemPageComponent } = entry;

  if (!ItemPageComponent) return acc;

  const names = Array.isArray(themeName) ? themeName : [themeName];

  names.forEach((name) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (acc[name]) {
      // eslint-disable-next-line no-console
      console.warn(`[co-collection-themes] Duplicate item page theme detected: ${name}`);
    }
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    acc[name] = ItemPageComponent;
  });

  return acc;
}, {});

export function getThemeItemPage(themeName: any) {
  // Accept a single name; if an array is passed, return first match that exists.
  if (Array.isArray(themeName)) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return themeName.map((n) => THEME_ITEM_PAGE_MAP[n]).find(Boolean);
  }

  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return THEME_ITEM_PAGE_MAP[themeName];
}

export const itemPageThemes = Object.freeze({ ...THEME_ITEM_PAGE_MAP });
