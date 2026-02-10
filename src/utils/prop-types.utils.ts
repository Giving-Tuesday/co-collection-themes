// Validate that either href or to is provided; if to is used, CustomLink must be supplied.
export const linkTargetValidator = (props, propName, componentName) => {
  const { href, to, CustomLink } = props;
  if (!href && !to) {
    return new Error(`${componentName}: either 'href' or 'to' must be provided.`);
  }
  if (to && !CustomLink) {
    return new Error(`${componentName}: 'CustomLink' is required when 'to' is used.`);
  }
  return null;
};
