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
      data-testid='banner-test-id'
      {...(warning ? {role: 'alert'} : {})}
      {...rest}>
      {showLoading && (
        <div className={styles['lds-ripple']} data-testid='banner-spinner-test-id'>
          <div className={styles['first-ring']}/>
          <div className={styles['second-ring']}/>
        </div>
      )}
      <p className={styles['banner-text']}>{message}</p>
    </div>
  );
}

export default Banner;
