// Import theme CSS modules for widget styling
import africanGivingTraditionsStyles from '../themes/african-giving-traditions/theme.module.css';
import datamartsStyles from '../themes/datamarts/theme.module.css';
import datasetsStyles from '../themes/datasets/theme.module.css';
import gtrexStyles from '../themes/gtrex/theme.module.css';
import gtdcStyles from '../themes/gtdc/theme.module.css';
import problemsSolutionsStyles from '../themes/problems-solutions/theme.module.css';
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
export const getThemeStyles = (themeName) => {
  // Accept a single name; if an array is passed, return first match that exists
  if (Array.isArray(themeName)) {
    return themeName.map((n) => THEME_STYLES_MAP[n]).find(Boolean) || {};
  }

  return THEME_STYLES_MAP[themeName] || {};
};

export const widgetThemeStyles = Object.freeze({ ...THEME_STYLES_MAP });
