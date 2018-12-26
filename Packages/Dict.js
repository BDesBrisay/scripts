import React from 'react';

import styles from './Dict.css';

const Dict = ({ query, data, packageKey }) => {
  const nounArr = data.filter(item => item.syntactic_category === 'Noun');
  const verbArr = data.filter(item => item.syntactic_category === 'Verb');
  const adjArr = data.filter(item => item.syntactic_category === 'Adjective');
  const word = query.replace('define', '');

  let nouns;
  if(nounArr.length > 0) {
    nouns = (
      <div>
        <p className={styles.syntaxHeader}>Noun</p>
        {nounArr.length > 0 && nounArr.map((item, index) => (
          <div key={index} className={styles.definitionContain}>
            <p className={styles.definitionNum}>{index + 1}.</p>
            <p className={styles.definition}>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  let adjectives;
  if(adjArr.length > 0) {
    adjectives = (
      <div>
        <p className={styles.syntaxHeader}>Adjectives</p>
        {adjArr.length > 0 && adjArr.map((item, index) => (
          <div key={index} className={styles.definitionContain}>
            <p className={styles.definitionNum}>{index + 1}.</p>
            <p className={styles.definition}>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  let verbs;
  if(verbArr.length > 0) {
    verbs = (
      <div>
        <p className={styles.syntaxHeader}>Verb</p>
        {verbArr.length > 0 && verbArr.map((item, index) => (
          <div key={index} className={styles.definitionContain}>
            <p className={styles.definitionNum}>{index + 1}.</p>
            <p className={styles.definition}>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.mainContain}>
      <h2 className={styles.mainWord}>{word}</h2>
      {nouns}
      {adjectives}
      {verbs}
    </div>
  );
};

export default Dict;
