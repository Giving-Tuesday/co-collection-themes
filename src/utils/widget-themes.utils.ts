// Import theme CSS modules for widget styling
// @ts-expect-error TS(2307): Cannot find module '../themes/african-giving-tradi... Remove this comment to see the full error message
import africanGivingTraditionsStyles from '../themes/african-giving-traditions/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/datamarts/theme.modu... Remove this comment to see the full error message
import datamartsStyles from '../themes/datamarts/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/datasets/theme.modul... Remove this comment to see the full error message
import datasetsStyles from '../themes/datasets/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/gtrex/theme.module.c... Remove this comment to see the full error message
import gtrexStyles from '../themes/gtrex/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/gtdc/theme.module.cs... Remove this comment to see the full error message
import gtdcStyles from '../themes/gtdc/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/problems-solutions/t... Remove this comment to see the full error message
import problemsSolutionsStyles from '../themes/problems-solutions/theme.module.css';
// @ts-expect-error TS(2307): Cannot find module '../themes/viz-database/theme.m... Remove this comment to see the full error message
import vizDatabaseStyles from '../themes/viz-database/theme.module.css';

// Map theme names to their CSS modules
const THEME_STYLES_MAP = {
  'african-giving-traditions': africanGivingTraditionsStyles,
  datamarts: datamartsStyles,
  datasets: datasetsStyles,
  'giving-lab': gtrexStyles,
  givinglab: gtrexStyles,
  gtrex: gtrexStyles,
  gtdc: gtdcStyles,
  'gtdc-projects': gtdcStyles,
  'problems-solutions': problemsSolutionsStyles,
  'viz-database': vizDatabaseStyles,
  'viz-database-beta': vizDatabaseStyles,
};

/**
 * Get theme-specific CSS classes for widget styling
 * @param {string|string[]} themeName - Theme name or array of theme names
 * @returns {object} CSS module object with theme-specific classes
 */
export const getThemeStyles = (themeName: any) => {
  // Accept a single name; if an array is passed, return first match that exists
  if (Array.isArray(themeName)) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return themeName.map((n) => THEME_STYLES_MAP[n]).find(Boolean) || {};
  }

  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return THEME_STYLES_MAP[themeName] || {};
};

export const widgetThemeStyles = Object.freeze({ ...THEME_STYLES_MAP });
