import styles from './Banner.module.scss';

type BannerProps = {
  message: React.ReactNode,
  showLoading?: boolean;
  warning?: boolean;
  style?: React.CSSProperties;
};

function Banner({
  message,
  showLoading = false,
  warning = false,
  ...rest
}: BannerProps) {
  return (
    <div
      className={`${styles.banner} ${warning && styles.warning}`}
      {...(warning ? {role: 'alert'} : {})}
      {...rest}>
      {showLoading && (
        <div className={styles['lds-ripple']}>
          <div />
          <div />
        </div>
      )}
      <p className={styles['banner-text']}>{message}</p>
    </div>
  );
}

export default Banner;
