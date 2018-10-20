import React from 'react';

import sharedStyles from '../index.css';
import styles from './Apod.css';

const Apod = ({ query, data, packageKey }) => {
  return (
    <div className={sharedStyles.answerCol}>
      <h3 className={styles.apodLabel}>Astronomy Picture of the Day</h3>
      <div className={sharedStyles.answerRow}>
        <div className={sharedStyles.mainCol}>
          {data.url &&
            data.media_type === 'video'
            ? <iframe src={data.url} title={data.title} className={styles.apodIframe} type="text/html" frameBorder="0"></iframe>
            : <img src={data.url} className={styles.apodImage} alt={data.title} />
          }
        </div>
        <div className={styles.sideContain}>
          <h2 className={styles.apodName}>{data.title}</h2>
          {data.copyright && <p className={styles.apodAuthor}>By {data.copyright}</p>}
          <p className={styles.apodDate}>{data.date}</p>
          <p className={styles.apodDesc}>{data.explanation}</p>
          <a href="https://apod.nasa.gov" className={styles.apodLink}>apod.nasa.gov</a> 
        </div>
      </div>
    </div>
  );
};

export default Apod;
