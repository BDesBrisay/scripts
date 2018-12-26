import React from 'react';

import unCamelCase from '../../../utils/unCamelCase';
import styles from './PeriodicElements.css';

const fieldNames = ['atomicNumber','symbol','atomicMass','electronicConfiguration','standardState','groupBlock','yearDiscovered']

const PeriodicElements = ({ query, data, packageKey }) => {
  const filteredData = Object.keys(data).filter((item) => fieldNames.includes(item));
  return (
    <div className={styles.elementContain}>
      <h1>{data.name}</h1>
      {filteredData.map((key, index) => (
        <p key={index}><strong>{unCamelCase(key)}:</strong> {data[key]}</p>
      ))}
    </div>
  );
};

export default PeriodicElements;
