import styles from './BaseCard.module.css';
import pageStyles from '../BaseItemPage/BaseItemPage.module.css';

/**
 * @file Provides a reusable, styled card container for consistent layout and spacing across the app.
 * Exports the BaseCard component and a CardWrapper alias for semantic usage.
 */

/**
 * A presentational wrapper that applies the project's standard card styling.
 * Combines the global "daro-card" class with CSS Module classes (base and wrapper),
 * allows additional classes via className, and forwards standard div attributes.
 *
 * Use this component to wrap arbitrary content in a consistently styled card across the app.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {import('react').ReactNode} props.children - Content to render inside the card.
 * @param {import('react').CSSProperties} [props.style] - Inline styles for the root div.
 * @param {string} [props.className] - Extra class names appended to the default classes.
 * @param {...any} [rest] - Additional DOM attributes (e.g., id, onClick, data-*, aria-*) forwarded to the root div.
 * @returns {JSX.Element} A styled div that wraps its children.
 */

const BaseCard = ({ children, style, className = '', ...rest }) => {
  return (
    <div
      className={`daro-card ${pageStyles.base} ${styles.base} ${styles.wrapper} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BaseCard;

/**
 * Alias of BaseCard for semantic usage in layout composition.
 * @see BaseCard
 */
export const CardWrapper = BaseCard;
