import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';

function Banner({message, showLoading, warning, ...rest}) {
  return (
    <div
      className={`banner ${warning && 'warning'}`}
      {...(warning ? {role: 'alert'} : {})}
      {...rest}>
      {showLoading && (
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      )}
      <p className="banner-text">{message}</p>
    </div>
  );
}

Banner.propTypes = {
  message: PropTypes.string.isRequired,
  showLoading: PropTypes.bool,
  warning: PropTypes.bool,
};

Banner.defaultProps = {
  showLoading: false,
  warning: false,
};

export default Banner;
