/**
 * Utility function, if array joins array elements, otherwise returns the value
 * @param {*} val
 * @returns {string}
 */
export const displayArrayItems = (val) => {
  return Array.isArray(val) ? val.join(', ') : val;
};

/**
 * Utility function, searches through array of additional CTA objects
 * and returns the object with a defined url
 * @param {*} custom_fields
 * @returns {undefined | { type: 'slide'|'report'|'template', url: string, label: string }}
 */
export const getAvailableUrls = (custom_fields, CTA_LABELS) => {
  const { slide_url, report_url, template_url } = custom_fields;
  const urls = [
    { type: 'slide', url: slide_url, label: CTA_LABELS.SLIDE },
    { type: 'report', url: report_url, label: CTA_LABELS.REPORT },
    { type: 'template', url: template_url, label: CTA_LABELS.TEMPLATE },
  ];
  return urls.find((item) => item.url?.length > 0);
};
