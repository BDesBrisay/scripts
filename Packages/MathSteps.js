import React from 'react';

import styles from '../index.css';

const MathSteps = ({ query, data, packageKey }) => {
  return (
    <div className={styles.answer}>
      <small>{query}</small>
      <h3>{packageKey}</h3>
    </div>
  );
};

export default MathSteps;
