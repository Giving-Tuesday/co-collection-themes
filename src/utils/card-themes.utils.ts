import { cardThemeEntries } from '../themes/cards';

interface ThemeEntry<T> {
  themeName: string | string[];
  CardComponent: T;
}

const createThemeCardMap = <T>(cardThemeEntries: ThemeEntry<T>[]): Record<string, T> =>
  cardThemeEntries.reduce((acc: Record<string, T>, entry) => {
    const { themeName, CardComponent } = entry;
    if (!CardComponent) return acc;
    const names = Array.isArray(themeName) ? themeName : [themeName];
    names.forEach((name) => {
      if (acc[name]) {
        console.warn(`[co-collection-themes] Duplicate theme name detected: ${name}`);
      }
      acc[name] = CardComponent;
    });
    return acc;
  }, {});

const THEME_CARD_MAP = createThemeCardMap(cardThemeEntries);

export const getThemeCard = (themeName: string) => {
  if (Array.isArray(themeName)) {
    return themeName.map((n) => THEME_CARD_MAP[n]).find(Boolean);
  }
  return THEME_CARD_MAP[themeName];
};

export const cardThemes = Object.freeze({ ...THEME_CARD_MAP });
