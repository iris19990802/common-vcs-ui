import React from 'react';
import PropTypes from 'prop-types';
import styles from './progress.less';

const colorTheme = {
  red: '#ea524e',
  blue: '#1590ff',
};

const Progress = (props = {}) => {
  const { percent, showSpiner } = props;
  return (
    <>
      <div
        className={styles.bar}
        style={{
          width: `${percent}%`,
          transition: 'all 200ms ease 0s',
          background: colorTheme['blue'],
        }}
      />
      {showSpiner ? (
        <div className={styles.spinner}>
          <div
            className={styles['spinner-icon']}
            style={{ borderTopColor: colorTheme['blue'] }}
          />
        </div>
      ) : null}
    </>
  );
};

Progress.propTypes = {
  percent: PropTypes.number,
  showSpiner: PropTypes.bool,
};
Progress.defaultProps = {
  percent: 0,
  showSpiner: false,
};

export default Progress;
