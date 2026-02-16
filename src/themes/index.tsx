import { cardThemeEntries } from './cards';
import { itemPageThemeEntries } from './item-pages';

// Re-export individual components for backward compatibility
export * from './cards';
export * from './item-pages';

// Combined theme entries for utilities that need both
export const themeEntries = cardThemeEntries.map((cardEntry) => {
  const itemPageEntry = itemPageThemeEntries.find((itemEntry) =>
    itemEntry.themeName.some((name) => cardEntry.themeName.includes(name)),
  );

  return {
    ...cardEntry,
    ItemPageComponent: itemPageEntry?.ItemPageComponent,
  };
});
