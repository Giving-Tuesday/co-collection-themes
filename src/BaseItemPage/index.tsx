/**
 * @file Provides a reusable, styled item-page container for consistent layout and spacing.
 * Mirrors the BaseCard API for familiarity.
 */

/**
 * A presentational wrapper that applies the project's standard item-page styling.
 * Combines the global "daro-item-page" class with CSS Module classes (base and wrapper),
 * allows additional classes via className, and forwards standard div attributes.
 *
 * Use this to wrap full-page or detail views in a consistent, themeable container.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {import('react').ReactNode} props.children - Content to render inside the item page container.
 * @param {import('react').CSSProperties} [props.style] - Inline styles for the root div.
 * @param {string} [props.className] - Extra class names appended to the default classes.
 * @param {...any} [rest] - Additional DOM attributes (e.g., id, onClick, data-*, aria-*) forwarded to the root div.
 * @returns {JSX.Element} A styled div that wraps its children.
 * @example
 * <BaseItemPage className="my-item" style={{ maxWidth: 960 }} aria-live="polite">
 *   <h1>Item Title</h1>
 *   <p>Long-form content</p>
 * </BaseItemPage>
 */
import styles from './BaseItemPage.module.css';

const BaseItemPage = ({ children, style, className = '', ...rest }) => {
  return (
    <article
      className={`daro-item-page ${styles.base} ${styles.wrapper} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </article>
  );
};

export default BaseItemPage;

/**
 * Alias of BaseItemPage for semantic usage in layout composition.
 * @see BaseItemPage
 */
export const ItemPageWrapper = BaseItemPage;
