export const convertFileSize = (megabyte: any) => Number(megabyte) > 999 ? `${megabyte / 1000} GB` : `${megabyte} MB`;

export const truncateText = (text: any, n: any, useWordBoundary = true) => {
  if (text.length <= n) {
    return text;
  }
  const subString = text.slice(0, n - 1);
  return (
    (useWordBoundary ? subString.slice(0, subString.lastIndexOf(' ')) : subString) + '...'
  );
};

export const arrayToString = (arr: any, separator = ', ') => {
  if (!Array.isArray(arr)) return '';
  return arr.join(separator);
};

export const getDataYearsLabels = (data_years: any) => {
  if (!data_years || !Array.isArray(data_years) || data_years.length < 1) return null;

  const getFirstYear = (yrs: any) => yrs[0];
  const getLastYear = (yrs: any) => yrs[yrs.length - 1];
  const orderedYears = data_years.sort((a, b) => a - b);

  if (orderedYears.length === 1) {
    return `${getFirstYear(orderedYears)}`;
  } else {
    return `${getFirstYear(orderedYears)} - ${getLastYear(orderedYears)}`;
  }
};

// TODO: use response from BE rather than this sanitize to display values in FE.
export const sanitizeSearch = (search: any) => {
  return (
    // collapse whitespace
    search
      // Temporarily remove ampersands - TODO: look into this later
      .replace(/&/g, '') // remove ampersands
      .replace(/^\s+|\s+$/g, '') // remove leading/trailing spaces
      .replace(/\s\s+/g, ' ')
  );
};
