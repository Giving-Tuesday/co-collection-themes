import styles from './LinkButton.module.css';

const LinkButton = ({
  url,
  children,
  type = 'primary',
  newWindow = false,
  xsmall,
  small,
  isCentered,
  ...props
}) => {
  if (!url || url.length === 0) return null;

  const classNames = [
    styles.linkButton,
    styles[type],
    xsmall && styles.xsmall,
    small && styles.small,
    isCentered && styles.isCentered,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={url}
      className={classNames}
      {...(newWindow ? { target: '_blank' } : {})}
      {...props}
    >
      {children}
    </a>
  );
};

export default LinkButton;
