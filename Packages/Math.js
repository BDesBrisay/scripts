import React from 'react';

import styles from './Math.css';

const Math = ({ query, data, packageKey }) => {
  return (
    <div className={styles.mathContain}>
      <p>{query}</p>
      <h1>{typeof data === 'number' && data}</h1>
      <h1>{(data && data.value) && data.value}</h1>
    </div>
  );
};

export default Math;
